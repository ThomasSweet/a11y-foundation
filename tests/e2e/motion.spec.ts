import { test, expect, type Page } from '@playwright/test'

const shapeAnimation = (page: Page, frame: number) =>
  page
    .locator('.loading-frame')
    .nth(frame)
    .locator('.loading-shape')
    .first()
    .evaluate((el) => {
      const style = getComputedStyle(el)
      return `${style.animationName.replace(/-[0-9a-f]{8}$/, '')} ${style.animationDuration}`
    })

test.describe('reduced motion keeps a busy region busy', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })

  test('the sweep freezes everything except an aria-busy region, which fades instead', async ({ page }) => {
    await page.goto('/craft.html')
    await expect(page.locator('.loading-card').nth(1)).toHaveAttribute('aria-busy', 'true')

    await expect.poll(() => shapeAnimation(page, 0)).toMatch(/^loading-breathe (1e-05s|0\.00001s)$/)
    await expect.poll(() => shapeAnimation(page, 1)).toBe('loading-breathe 2s')

    const spinner = await page.locator('.motion-spinner').evaluate((el) => getComputedStyle(el).animationDuration)
    expect(spinner).toMatch(/^(1e-05s|0\.00001s)$/)
  })
})

test('the simulate toggle shows the same exception without the OS setting', async ({ page }) => {
  await page.goto('/craft.html')
  await expect.poll(() => shapeAnimation(page, 1)).toBe('loading-shimmer 1.4s')

  await page.locator('.loading-simulate').check()
  await expect.poll(() => shapeAnimation(page, 0)).toBe('none 0s')
  await expect.poll(() => shapeAnimation(page, 1)).toBe('loading-breathe 2s')
})

for (const path of ['/standard.html', '/craft.html', '/showcase.html', '/proof.html']) {
  test(`every rail link on ${path} follows its own section`, async ({ page }) => {
    await page.goto(path)
    test.skip(!(await page.evaluate(() => CSS.supports('animation-timeline: view()'))), 'no scroll-driven animations')

    const links = await page.locator('.chapter-section-link').count()
    expect(links).toBeGreaterThan(0)

    const unlit = await page.evaluate(() =>
      [...document.querySelectorAll('.chapter-section-link')]
        .filter((link) => {
          const section = document.querySelector(link.getAttribute('href') ?? '')
          return !document.getAnimations().some((animation) => {
            const subject = (animation.timeline as { subject?: Element } | null)?.subject
            return (animation.effect as KeyframeEffect | null)?.target === link && !!section && !!subject?.contains(section)
          })
        })
        .map((link) => link.textContent?.trim()),
    )
    expect(unlit).toEqual([])
  })
}
