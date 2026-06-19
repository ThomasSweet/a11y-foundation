import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// The project-specific test: don't just check the compliant state is clean —
// drive a demo and prove it behaves as it claims. The ThemePicker's claim is
// "you can't drag the accent into a label that fails WCAG AA."
//
// A nice twist surfaced while writing this: the rendered label uses
// contrast-color() (a feature this project itself champions), which always
// picks the maximum-contrast option — a SECOND safety net beyond the lightness
// clamp. So even with the clamp bypassed, the painted label stays accessible
// in a contrast-color()-capable browser, and axe (which reads computed colour)
// sees no violation. The demo's read-out instead models the black/white *flip*
// fallback, which is what fails in the dead zone.
//
// So we verify two true things:
//   1. axe confirms the live preview is contrast-clean while clamped, and
//   2. the demo's own read-out flips to a failure the moment the clamp is
//      bypassed into the dead zone — i.e. it teaches exactly what it claims.
test.describe('ThemePicker — the clamp guarantee, verified in a real browser', () => {
  test('clamped preview is contrast-clean; bypassing flips the read-out to a failure', async ({
    page,
  }) => {
    await page.goto('/')
    await page.locator('.tp-preview').scrollIntoViewIfNeeded()
    const readout = page.locator('.tp-note')

    // Clamp ON (default lightness sits in the dead zone): read-out reports AA,
    // and an external auditor finds no contrast violation in the live preview.
    await expect(readout).toContainText(/meets WCAG AA|safe range/i)
    const clamped = await new AxeBuilder({ page })
      .include('.tp-preview')
      .withRules(['color-contrast'])
      .analyze()
    expect(clamped.violations).toEqual([])

    // Bypass the clamp at the same lightness → the read-out flips to a failure,
    // proving the demo surfaces the exact problem the clamp prevents.
    await page.getByRole('checkbox', { name: /bypass the safety clamp/i }).check()
    await expect(readout).toContainText(/turn the clamp back on/i)
  })
})
