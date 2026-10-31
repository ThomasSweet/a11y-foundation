import { describe, expect, it } from 'vitest'

import { recentlyDone, wrongNumbers } from '../../scripts/check-recently-done.mjs'

type Entry = { text: string }

const roadmap = (done: string[], open = '- 2026-10-01: An Open line that only looks like one. #12') =>
  [
    '# Roadmap',
    '',
    '## Open',
    '',
    open,
    '',
    '## Recently done',
    '',
    ...done,
    '',
    'Older work is in the merged pull requests.',
    '',
  ].join('\n')

const sweep = "- 2026-10-29: The site's CSS has no comments left. #103"
const firefox = '- 2026-10-29: Local Firefox runs work again on macOS 27. #103'
const reveals = '- 2026-10-29: Reveals step aside for jump targets and keyboard focus. #102'
const deploy = '- 2026-10-29: The deploy stops with a clear message. #101'
const base = [reveals, deploy]

const flagged = (before: string[], after: string[], pr: number) =>
  wrongNumbers(roadmap(before), roadmap(after), pr).map((item: Entry) => item.text)

describe('check-recently-done', () => {
  it('reads the Recently done lines with their line numbers and parts', () => {
    expect(recentlyDone(roadmap(base))).toEqual([
      {
        text: reveals,
        line: 9,
        date: '2026-10-29',
        body: 'Reveals step aside for jump targets and keyboard focus.',
        number: '102',
      },
      { text: deploy, line: 10, date: '2026-10-29', body: 'The deploy stops with a clear message.', number: '101' },
    ])
  })

  it("passes a new line that ends with the pull request's own number", () => {
    expect(flagged(base, [sweep, ...base], 103)).toEqual([])
  })

  it('fails a new line that ends with a guessed number, as #95 shipped #93', () => {
    const agentFiles = '- 2026-10-26: Agent files: /llms/ no longer answers 403. #93'
    expect(flagged(base, [agentFiles, ...base], 95)).toEqual([agentFiles])
  })

  it('fails only the wrong line when a pull request adds two, as #103 shipped #104', () => {
    const guessed = sweep.replace('#103', '#104')
    expect(flagged(base, [guessed, firefox, ...base], 103)).toEqual([guessed])
  })

  it("passes a correction of an older line's number, as #104 corrected #103's", () => {
    const fixes = '- 2026-10-29: Three small CSS fixes. #104'
    const guessed = sweep.replace('#103', '#104')
    expect(flagged([guessed, firefox, ...base], [fixes, sweep, firefox, ...base], 104)).toEqual([])
  })

  it('passes an older line reworded or redated in place', () => {
    const reworded = deploy.replace('a clear message', 'a clear message and names the commit')
    const redated = reveals.replace('2026-10-29', '2026-10-28')
    expect(flagged(base, [redated, reworded], 105)).toEqual([])
  })

  it('passes dropping the oldest line and reordering the rest', () => {
    expect(flagged([sweep, ...base], [deploy, sweep], 105)).toEqual([])
  })

  it('fails a new line with no number at all', () => {
    const bare = '- 2026-10-30: A line that ships with no number.'
    expect(flagged(base, [bare, ...base], 105)).toEqual([bare])
  })

  it('lets each older line excuse one edit only', () => {
    const reworded = deploy.replace('a clear message', 'a clearer message')
    const copied = '- 2026-10-29: A new line that copied the number of the line below. #101'
    expect(flagged(base, [copied, reveals, reworded], 105)).toHaveLength(1)
  })

  it('ignores dated lines outside Recently done', () => {
    const after = roadmap(base, "- 2026-10-30: An Open line with another pull request's number. #77")
    expect(wrongNumbers(roadmap(base), after, 105)).toEqual([])
  })

  it('checks nothing when the base has no Recently done section yet', () => {
    expect(wrongNumbers('# Roadmap\n\n## Done\n', roadmap([sweep, ...base]), 105)).toEqual([])
  })
})
