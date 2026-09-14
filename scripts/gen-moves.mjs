import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { revisions } from '../src/site/HubRevisions/revisions.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const flag = (name) => {
  const index = args.indexOf(name)
  return index === -1 ? null : args[index + 1]
}
const dryRun = args.includes('--dry-run')

const dataPath = resolve(root, 'src/showcases/baseline-data.json')
const registryPath = resolve(root, 'src/site/HubRevisions/revisions.ts')
const current = JSON.parse(readFileSync(flag('--new') ?? dataPath, 'utf8'))
const previous = flag('--old')
  ? JSON.parse(readFileSync(flag('--old'), 'utf8'))
  : JSON.parse(execFileSync('git', ['show', 'HEAD:src/showcases/baseline-data.json'], { cwd: root, encoding: 'utf8' }))
const browsers = JSON.parse(readFileSync(resolve(root, 'node_modules/web-features/data.json'), 'utf8')).browsers

const engines = ['chrome', 'firefox', 'safari']
const labels = { chrome: 'Chrome', firefox: 'Firefox', safari: 'Safari' }
const today = new Date().toISOString().slice(0, 10)
const releaseDate = (browser, version) =>
  browsers[browser]?.releases.find((release) => release.version === version)?.date ?? null
const engineCount = (support) => engines.filter((browser) => support[browser]).length
const tierRank = { false: 0, low: 1, high: 2 }

const moves = []
for (const [id, now] of Object.entries(current)) {
  const before = previous[id]
  if (!before) continue
  const href = `/showcase.html#showcase-${id}`
  const newlyAvailable = now.baseline === 'low' && tierRank[before.baseline] < 1
  const widelyAvailable = now.baseline === 'high' && tierRank[before.baseline] < 2
  const arrivals = engines.filter((browser) => now.support[browser] && !before.support[browser])

  if (arrivals.length > 0) {
    const count = engineCount(now.support)
    const names = arrivals.map((browser) => `${labels[browser]} ${now.support[browser]}`)
    const who = names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`
    const dates = arrivals.map((browser) => releaseDate(browser, now.support[browser]) ?? now.lowDate ?? today)
    const tail = newlyAvailable
      ? `, ${count >= 3 && arrivals.length === 1 ? 'the third engine' : 'completing the engines'}, so it is Baseline newly available.`
      : count === 1
        ? ', the first engine to ship it.'
        : count === 2
          ? ', so that showcase now runs in two engines.'
          : ', so that showcase now runs in every engine.'
    moves.push({
      id: `${id}-${arrivals.map((browser) => `${browser}-${now.support[browser]}`).join('-')}`,
      date: dates.sort().at(-1),
      area: 'Showcase',
      title: `${who} ${arrivals.length === 1 ? 'ships' : 'ship'} ${now.name}`,
      lead: `${who} ${arrivals.length === 1 ? 'ships' : 'ship'} `,
      linkText: now.name,
      href,
      tail,
      mentions: names,
    })
  }

  if (newlyAvailable && arrivals.length === 0) {
    moves.push({
      id: `${id}-baseline-newly`,
      date: now.lowDate ?? today,
      area: 'Showcase',
      title: `${now.name} is Baseline newly available`,
      lead: '',
      linkText: now.name,
      href,
      tail: ' is Baseline newly available: every current engine ships it.',
      mentions: ['newly available'],
    })
  }

  if (widelyAvailable) {
    moves.push({
      id: `${id}-baseline-widely`,
      date: now.highDate ?? today,
      area: 'Showcase',
      title: `${now.name} is Baseline widely available`,
      lead: '',
      linkText: now.name,
      href,
      tail: ' is Baseline widely available: safe to use without a fallback.',
      mentions: ['widely available'],
    })
  }
}

const known = new Set(revisions.map((revision) => revision.id))
const daysApart = (a, b) => Math.abs(Date.parse(a) - Date.parse(b)) / 86_400_000
const mentioned = (revision, move) => {
  const text = `${revision.title} ${revision.lead}${revision.linkText}${revision.tail}`.toLowerCase()
  return move.mentions.some((mention) => text.includes(mention.toLowerCase()))
}
const covered = (move) =>
  known.has(move.id) ||
  revisions.some(
    (revision) => revision.href === move.href && daysApart(revision.date, move.date) <= 60 && mentioned(revision, move),
  )
const fresh = moves.filter((move) => !covered(move)).sort((a, b) => b.date.localeCompare(a.date))

if (fresh.length === 0) {
  console.log('gen-moves: nothing moved')
  process.exit(0)
}

console.log('Lines proposed from web-features data. Check each against the release notes before merging.')
console.log('')
for (const move of fresh) console.log(`- ${move.date} · ${move.area} · ${move.lead}${move.linkText}${move.tail} (${move.href})`)

if (dryRun) process.exit(0)

const quote = (text) => `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
const literal = (move) =>
  [
    '  {',
    `    id: ${quote(move.id)},`,
    `    date: ${quote(move.date)},`,
    `    area: ${quote(move.area)},`,
    `    title: ${quote(move.title)},`,
    `    lead: ${quote(move.lead)},`,
    `    linkText: ${quote(move.linkText)},`,
    `    href: ${quote(move.href)},`,
    `    tail: ${quote(move.tail)},`,
    '  },',
  ].join('\n')

const marker = 'export const revisions: Revision[] = [\n'
const source = readFileSync(registryPath, 'utf8')
if (!source.includes(marker)) throw new Error('gen-moves: registry marker not found')
writeFileSync(registryPath, source.replace(marker, marker + fresh.map(literal).join('\n') + '\n'))
console.log('')
console.log(`gen-moves: ${fresh.length} line(s) added to src/site/HubRevisions/revisions.ts`)
