import { beforeAll, describe, expect, it } from 'vitest'

import { evaluateBaseline } from '../../scripts/baseline-watch.js'

// See scripts/baseline-watch.js for the manifest and the removal-bar policy
// (CSS @supports fallbacks go at 'high', JS fallbacks at 'low').
const { removable, newlyAvailable, unknown } = evaluateBaseline()

describe('baseline-watch', () => {
  beforeAll(() => {
    // Informational, never a failure: surface features that just became newly
    // available so we *notice*, even though we keep their (cheap CSS) fallback.
    if (newlyAvailable.length) {
      console.info('\nℹ baseline-watch — newly available (fallbacks still kept):')
      for (const e of newlyAvailable) {
        console.info(`  • ${e.name} — Baseline low ${e.date}; used in ${e.used.join(', ')}`)
      }
    }
  })

  it('has no stale manifest ids', () => {
    expect(unknown, `unknown web-features id(s): ${unknown.join(', ')}`).toEqual([])
  })

  it('keeps every fallback until its feature reaches the removal bar', () => {
    // When this fails, a fallback is now dead weight. Remove it in the listed
    // files and delete the manifest entry — the message says where.
    const detail = removable
      .map((e) => `${e.name} reached Baseline ${e.status} (bar ${e.bar}) — used in ${e.used.join(', ')}`)
      .join('\n')
    expect(removable, detail).toEqual([])
  })
})
