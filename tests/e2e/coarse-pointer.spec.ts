import { test, expect, type Page } from '@playwright/test'

test.use({
  contextOptions: { reducedMotion: 'reduce' },
  hasTouch: true,
  launchOptions: async ({ browserName, launchOptions }, use) => {
    await use(
      browserName === 'firefox'
        ? { ...launchOptions, firefoxUserPrefs: { ...launchOptions.firefoxUserPrefs, 'ui.primaryPointerCapabilities': 1 } }
        : launchOptions,
    )
  },
})

const codeActions = (page: Page) =>
  page.locator('.showcase-code-actions:has(.showcase-code-summary):has(.showcase-source)').evaluateAll((rows) =>
    rows.map((row) => {
      const [summary, source] = ['.showcase-code-summary', '.showcase-source'].map(
        (selector) => row.querySelector(selector)?.getBoundingClientRect() ?? new DOMRect(),
      )
      return {
        card: row.closest('.showcase')?.id ?? '',
        rem: parseFloat(getComputedStyle(document.documentElement).fontSize),
        summary: { top: summary.top, right: summary.right, height: summary.height },
        source: { top: source.top, left: source.left, height: source.height },
      }
    }),
  )

for (const [setting, css] of [
  ['at the default text size', ''],
  ['with 200% text', 'html { font-size: 200% !important; }'],
] as const) {
  test(`on a coarse pointer, each showcase card's code summary and source link share one target size ${setting}`, async ({
    page,
  }) => {
    await page.goto('/showcase.html')
    expect(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)).toBe(true)
    if (css) await page.addStyleTag({ content: css })

    await expect(async () => {
      const rows = await codeActions(page)
      expect(rows.length).toBeGreaterThan(2)
      for (const { card, rem, summary, source } of rows) {
        expect(summary.height, `#${card} summary`).toBeGreaterThanOrEqual(Math.max(52, 3.25 * rem) - 0.5)
        expect(Math.abs(source.height - summary.height), `#${card} source link height`).toBeLessThan(0.5)
        if (source.left >= summary.right) {
          expect(Math.abs(source.top - summary.top), `#${card} source link top`).toBeLessThan(0.5)
        }
      }
    }).toPass({ timeout: 5000 })
  })
}
