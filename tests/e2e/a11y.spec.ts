import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// A floor, not a ceiling: axe catches the ~30–40% of WCAG that's
// machine-detectable (labels, ARIA, contrast, landmarks, heading order). The
// page loads in its compliant state — the "break this rule" demos default to
// OFF — so a clean sweep here is meaningful.

test('home page has no automatically-detectable accessibility violations', async ({ page }) => {
  // Scan as a reduced-motion user. The scroll-driven section-reveal holds
  // sections at opacity:0 until scrolled into view (fill: both); a static scan
  // would read that transient as invisible text. Reduced motion disables the
  // reveal entirely, which is the honest state to audit anyway — content must
  // never depend on motion to be perceivable.
  await page.emulateMedia({ reducedMotion: 'reduce' })

  // Wait for the network to settle and webfonts to load before scanning:
  // fallback-font metrics can shift text size/weight enough to flip a
  // borderline contrast check, which would make the sweep flaky.
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.evaluate(() => document.fonts.ready)

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()

  expect(results.violations).toEqual([])
})
