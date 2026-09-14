import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

import { laws } from '../../src/criteria/StandardsMap/standardsMapData'

const lawName = (id: string) => {
  const law = laws.find((l) => l.id === id)
  if (!law) throw new Error(`no law with id "${id}" in standardsMapData`)
  return law.name
}

const eaa = lawName('eaa')
const psbar = lawName('psbar')

const lawDetails = (page: Page, name: string) =>
  page.locator('details.standards-map-law').filter({
    has: page.locator('.standards-map-name', { hasText: name }),
  })

const openMap = async (page: Page) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/standard.html', { waitUntil: 'networkidle' })
  await expect(page.locator('.standards-map')).toBeVisible()
}

test.describe('standards map', () => {
  test('opening a law reveals its chain down to the core', async ({ page }) => {
    await openMap(page)
    const details = lawDetails(page, eaa)
    await details.locator('summary').click()
    await expect(details).toHaveAttribute('open', '')
    await expect(details.locator('.standards-map-chain')).toContainText('EN 301 549')
  })

  test('only one law stays open at a time', async ({ page }) => {
    await openMap(page)
    const first = lawDetails(page, eaa)
    const second = lawDetails(page, psbar)

    await first.locator('summary').click()
    await expect(first).toHaveAttribute('open', '')

    await second.locator('summary').click()
    await expect(second).toHaveAttribute('open', '')
    await expect(first).not.toHaveAttribute('open', '')
  })

  test('Space on a focused summary toggles its law', async ({ page }) => {
    await openMap(page)
    const details = page.locator('details.standards-map-law').first()
    const summary = details.locator('summary')

    await summary.focus()
    await expect(summary).toBeFocused()
    await page.keyboard.press('Space')
    await expect(details).toHaveAttribute('open', '')

    await page.keyboard.press('Space')
    await expect(details).not.toHaveAttribute('open', '')
  })

  test('has no automatically-detectable accessibility violations with a law open', async ({
    page,
  }) => {
    await openMap(page)
    const details = lawDetails(page, eaa)
    await details.locator('summary').click()
    await expect(details).toHaveAttribute('open', '')
    await page.evaluate(() => document.fonts.ready)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
})
