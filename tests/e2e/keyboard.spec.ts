import { test, expect } from '@playwright/test'

// The accessibility *behaviours* that silently regress — these are exactly the
// things the project leans on the platform for, so they're worth pinning.
test.describe('keyboard & focus behaviour', () => {
  test('skip link targets main and is the first tab stop', async ({ page, browserName }) => {
    await page.goto('/')
    const skip = page.getByRole('link', { name: /skip to main content/i })
    await expect(skip).toHaveAttribute('href', '#main')

    // WebKit emulates macOS Safari, which only Tabs through form controls unless
    // "Full Keyboard Access" is enabled — so Tab won't land on a link there.
    // (The link is still reachable for users who have that setting on.)
    if (browserName !== 'webkit') {
      await page.keyboard.press('Tab')
      await expect(skip).toBeFocused()
    }
  })

  test('native dialog traps focus and closes on Escape', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /open dialog/i }).click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    // showModal() should move focus into the dialog.
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true)

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('popover menu opens and light-dismisses with Escape', async ({ page }) => {
    await page.goto('/')
    const trigger = page.getByRole('button', { name: /actions/i })
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click()

    const menu = page.getByRole('menu')
    await expect(menu).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
  })

  test('theme panel applies a preset and light-dismisses with Escape', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /theme settings/i }).click()

    const ocean = page.getByRole('radio', { name: 'Ocean' })
    await expect(ocean).toBeVisible()
    await ocean.check()
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.preset))
      .toBe('ocean')

    await page.keyboard.press('Escape')
    await expect(ocean).toBeHidden()

    // The preset must survive a reload via the pre-paint head script.
    await page.reload()
    expect(await page.evaluate(() => document.documentElement.dataset.preset)).toBe('ocean')
  })

  test('segmented control behaves as a native radio group', async ({ page }) => {
    await page.goto('/')
    const list = page.getByRole('radio', { name: 'List' })
    await list.scrollIntoViewIfNeeded()
    await list.focus()
    await expect(list).toBeChecked()

    await page.keyboard.press('ArrowRight')
    await expect(page.getByRole('radio', { name: 'Grid' })).toBeChecked()
  })
})
