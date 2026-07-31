import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

test('the specimen is exactly as broken as documented', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/audit-room.html', { waitUntil: 'networkidle' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.evaluate(() => document.fonts.ready)

  const results = await new AxeBuilder({ page })
    .withTags(tags)
    .include('#audit-specimen')
    .analyze()

  expect(results.violations.map((v) => v.id).sort()).toEqual([
    'color-contrast',
    'image-alt',
  ])
})

test('everything outside the specimen is clean', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/audit-room.html', { waitUntil: 'networkidle' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.evaluate(() => document.fonts.ready)

  const results = await new AxeBuilder({ page })
    .withTags(tags)
    .exclude('#audit-specimen')
    .analyze()

  expect(results.violations).toEqual([])
})

test('the skip route and the answer tiers work by keyboard', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/audit-room.html', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: /skip past the broken page/i }).click()
  await expect(page.locator('#audit-room-answers')).toBeInViewport()

  const firstHint = page.locator('.audit-room-hint').first()
  await firstHint.focus()
  await page.keyboard.press('Enter')
  const firstReveal = page.locator('.audit-room-reveal summary').first()
  await expect(firstReveal).toBeVisible()
  await firstReveal.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.audit-room-reveal-body').first()).toBeVisible()
})
