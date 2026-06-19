import { describe, expect, it } from 'vitest'

import {
  assessPick,
  contrast,
  relLuminance,
} from '../../src/showcases/demos/themePickerMath'

describe('contrast primitives', () => {
  it('rates black-on-white at the canonical 21:1', () => {
    expect(contrast(1, 0)).toBeCloseTo(21, 5)
  })

  it('maps OKLCH lightness extremes to sRGB luminance extremes', () => {
    expect(relLuminance(1, 0, 0)).toBeGreaterThan(0.99) // white
    expect(relLuminance(0, 0, 0)).toBeCloseTo(0, 5) // black
  })
})

describe('assessPick — the clamp guarantee', () => {
  // The demo's whole promise: with the clamp on, even the black/white FALLBACK
  // (no contrast-color()) hits WCAG AA at ANY hue or picked lightness. Sweep it.
  it('keeps the fallback at AA for every hue and lightness while clamped', () => {
    const failures: string[] = []
    for (let h = 0; h <= 360; h += 5) {
      for (let l = 0; l <= 100; l += 2) {
        const { fallback } = assessPick({ h, l, bypass: false })
        if (!fallback.passes) failures.push(`h=${h} l=${l} → ${fallback.ratio}:1`)
      }
    }
    expect(failures, `clamped fallback should never fail AA:\n${failures.join('\n')}`).toEqual([])
  })

  it('reports contrast-color() as at least as good as the fallback', () => {
    // contrast-color() picks the better of black/white, so it can only equal or
    // beat the flip — the reason a bypassed label can render fine anyway.
    for (let l = 0; l <= 100; l += 5) {
      const r = assessPick({ h: 265, l, bypass: true })
      expect(Number(r.rendered.ratio)).toBeGreaterThanOrEqual(Number(r.fallback.ratio))
    }
  })

  it('snaps a mid-range pick to the nearest safe extreme', () => {
    // Below the flip threshold → capped at the dark-safe ceiling (45%).
    expect(assessPick({ h: 200, l: 60, bypass: false }).appliedPct).toBe(45)
    // Above it → floored at the light-safe minimum (78%).
    expect(assessPick({ h: 200, l: 65, bypass: false }).appliedPct).toBe(78)
    // Already safe → passes through untouched.
    expect(assessPick({ h: 200, l: 90, bypass: false }).appliedPct).toBe(90)
  })

  it('exposes the fallback failure when the clamp is bypassed into the dead zone', () => {
    const bypassed = assessPick({ h: 265, l: 60, bypass: true })
    expect(bypassed.fallback.passes).toBe(false)
    // contrast-color() still rescues the rendered label at this hue — which is
    // exactly why the read-out must distinguish fallback from rendered.
    expect(bypassed.rendered.passes).toBe(true)
    // Same pick, clamp on → the fallback is safe again. This is what the clamp buys.
    expect(assessPick({ h: 265, l: 60, bypass: false }).fallback.passes).toBe(true)
  })
})
