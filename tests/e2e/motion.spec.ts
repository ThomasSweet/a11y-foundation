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
