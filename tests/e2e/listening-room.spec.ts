import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

test('the press kit passes the WCAG rule set outright', async ({ page }) => {
  await page.goto('/broken-press-kit.html', { waitUntil: 'networkidle' })
  await expect(page.locator('.press-kit-setlist')).toBeVisible()
  await page.evaluate(() => document.fonts.ready)

  const results = await new AxeBuilder({ page }).withTags(tags).analyze()

  expect(results.violations.map((v) => v.id).sort()).toEqual([])
})

test('the best-practice rule set finds exactly the documented two', async ({ page }) => {
  await page.goto('/broken-press-kit.html', { waitUntil: 'networkidle' })
  await expect(page.locator('.press-kit-setlist')).toBeVisible()
  await page.evaluate(() => document.fonts.ready)

  const results = await new AxeBuilder({ page })
    .withTags([...tags, 'best-practice'])
    .analyze()

  expect(results.violations.map((v) => v.id).sort()).toEqual([
    'empty-heading',
    'heading-order',
  ])
})

test('everything outside the broken page is clean', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/listening-room.html', { waitUntil: 'networkidle' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.evaluate(() => document.fonts.ready)

  const results = await new AxeBuilder({ page })
    .withTags(tags)
    .exclude('#broken-page')
    .analyze()

  expect(results.violations).toEqual([])
})

test('the tree is pinned where the scanner is blind', async ({ page }) => {
  await page.goto('/broken-press-kit.html', { waitUntil: 'networkidle' })
  await expect(page.locator('.press-kit-setlist')).toBeVisible()

  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('')
  await expect(page.locator('h1')).toMatchAriaSnapshot(`
    - heading [level=1]:
      - img
  `)

  const setlist = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Setlist', exact: true }) })
  await expect(setlist).toHaveCount(1)
  await expect(setlist.getByRole('list')).toHaveCount(0)

  const rider = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Technical rider', exact: true }) })
  await expect(rider).toHaveCount(1)
  await expect(rider.getByRole('table')).toHaveCount(0)

  const tour = page.locator('section[aria-hidden="true"]')
  await expect(tour.getByText('12.09.2026, Berlin, Kellerklub Anfang')).toBeVisible()
  expect(await tour.ariaSnapshot()).toBe('')
  await expect(page.getByRole('heading', { name: 'Tour dates', exact: true })).toHaveCount(0)
  await expect(tour.getByRole('listitem')).toHaveCount(0)

  const biography = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Biography', exact: true }) })
    .locator('p')
    .first()
  await expect(biography).toContainText('Fitis sind vier Musiker aus Berlin')
  expect(await biography.getAttribute('lang')).toBeNull()
  expect(
    await biography.evaluate((el) => el.closest('[lang]')?.tagName.toLowerCase() ?? null),
  ).toBe('html')

  await expect(page.locator('.press-kit-social a').first()).toHaveAccessibleName(
    'Instagram Instagram',
  )
})

test('the skip route and the answer tiers work by keyboard', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/listening-room.html', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: /skip past the broken page/i }).click()
  await expect(page.locator('#listening-room-answers')).toBeInViewport()

  const firstHint = page.locator('.practice-answers-hint').first()
  await firstHint.focus()
  await page.keyboard.press('Enter')
  const firstReveal = page.locator('.practice-answers-reveal summary').first()
  await expect(firstReveal).toBeVisible()
  await firstReveal.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.practice-answers-reveal-body').first()).toBeVisible()
})
