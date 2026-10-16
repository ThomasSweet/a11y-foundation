import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const roadmap = readFileSync(fileURLToPath(new URL('../../ROADMAP.md', import.meta.url)), 'utf8')
const words = (text: string) => text.split(/\s+/).filter(Boolean).length
const at = (heading: string) => roadmap.indexOf(`\n${heading}\n`)

const recentlyDone = roadmap
  .slice(at('## Recently done'))
  .split('\n')
  .filter((line) => line.startsWith('- '))

describe('ROADMAP.md', () => {
  it('stays within its budget', () => {
    expect(words(roadmap)).toBeLessThanOrEqual(3500)
  })

  it('keeps the headings the monthly routine reads, in their places', () => {
    const open = at('## Open')
    const decisions = at('## Standing decisions')
    expect(open).toBeGreaterThan(-1)
    expect(decisions).toBeGreaterThan(open)
    for (const heading of ['### Standards re-checks (dated)', '### Owed checks', '### Watchlist']) {
      const position = at(heading)
      expect(position, heading).toBeGreaterThan(open)
      expect(position, heading).toBeLessThan(decisions)
    }
    expect(roadmap.indexOf('**What earns a what-changed line.**')).toBeGreaterThan(decisions)
  })

  it('keeps Recently done to fifteen dated one-liners with a PR number', () => {
    expect(at('## Recently done')).toBeGreaterThan(-1)
    expect(recentlyDone.length).toBeGreaterThan(0)
    expect(recentlyDone.length).toBeLessThanOrEqual(15)
    for (const line of recentlyDone) {
      const match = line.match(/^- (\d{4}-\d{2}-\d{2}): (.+) #\d+$/)
      expect(match, line).not.toBeNull()
      expect(words(match?.[2] ?? ''), line).toBeLessThanOrEqual(25)
    }
  })
})
