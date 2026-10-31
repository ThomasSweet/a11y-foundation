import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const entry = /^- (\d{4}-\d{2}-\d{2}): (.*?)(?: #(\d+))?$/

export function recentlyDone(roadmap) {
  const lines = roadmap.split('\n')
  const start = lines.indexOf('## Recently done')
  if (start === -1) return []
  const found = []
  for (let index = start + 1; index < lines.length && !lines[index].startsWith('## '); index++) {
    const match = lines[index].match(entry)
    if (match) found.push({ text: lines[index], line: index + 1, date: match[1], body: match[2], number: match[3] ?? null })
  }
  return found
}

function without(lines, others) {
  const left = [...others]
  return lines.filter((item) => {
    const index = left.findIndex((other) => other.text === item.text)
    if (index === -1) return true
    left.splice(index, 1)
    return false
  })
}

function sharedParts(a, b) {
  return [a.date === b.date, a.body === b.body, a.number === b.number].filter(Boolean).length
}

export function wrongNumbers(before, after, pr) {
  if (!before.split('\n').includes('## Recently done')) return []
  const old = recentlyDone(before)
  const now = recentlyDone(after)
  const removed = without(old, now)
  return without(now, old).filter((item) => {
    if (item.number === String(pr)) return false
    let closest = -1
    let shared = 1
    for (const [index, other] of removed.entries()) {
      if (sharedParts(other, item) > shared) [closest, shared] = [index, sharedParts(other, item)]
    }
    if (closest === -1) return true
    removed.splice(closest, 1)
    return false
  })
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const args = process.argv.slice(2)
  const flag = (name) => {
    const index = args.indexOf(name)
    return index === -1 ? null : args[index + 1]
  }
  const pr = flag('--pr')
  const base = flag('--base')
  if (!/^\d+$/.test(pr ?? '') || !base) {
    console.error('usage: node scripts/check-recently-done.mjs --pr <number> --base <git ref>')
    process.exit(2)
  }
  let before
  try {
    before = execFileSync('git', ['show', `${base}:ROADMAP.md`], { cwd: root, encoding: 'utf8', stdio: 'pipe' })
  } catch {
    console.error(`cannot read ROADMAP.md at ${base}; a pull request checkout needs fetch-depth 2`)
    process.exit(2)
  }
  const after = readFileSync(resolve(root, 'ROADMAP.md'), 'utf8')
  const wrong = wrongNumbers(before, after, pr)
  for (const item of wrong) {
    console.error(`ROADMAP.md:${item.line}: a new Recently done line must end with #${pr}, this pull request's number:`)
    console.error(`  ${item.text}`)
  }
  if (wrong.length) process.exit(1)
  console.log(`Recently done: no line this pull request adds carries a number other than #${pr}.`)
}
