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

  test('every chapter page marks itself in the switcher and offers prev/next', async ({
    page,
  }) => {
    const chapters = [
      { path: '/standard.html', label: 'Standard', prev: null, next: /02 · The craft/ },
      { path: '/craft.html', label: 'Craft', prev: /01 · The standard/, next: /03 · CSS showcase/ },
      { path: '/showcase.html', label: 'CSS', prev: /02 · The craft/, next: /04 · The proof/ },
      { path: '/proof.html', label: 'Proof', prev: /03 · CSS showcase/, next: null },
    ]

    for (const c of chapters) {
      await page.goto(c.path)

      // The legend's chapter switcher announces where you are.
      const current = page.locator('.chapter-switch-link[aria-current="page"]')
      await expect(current).toHaveCount(1)
      await expect(current).toContainText(c.label)

      // Reading-order escape hatches at the sheet's title block.
      if (c.prev) await expect(page.getByRole('link', { name: c.prev })).toBeVisible()
      if (c.next) await expect(page.getByRole('link', { name: c.next })).toBeVisible()
    }
  })

  test('hub plates link every chapter', async ({ page }) => {
    await page.goto('/')
    const plates = page.locator('.hub-plate')
    await expect(plates).toHaveCount(4)
    await expect(plates.nth(0)).toHaveAttribute('href', '/standard.html')
    await expect(plates.nth(1)).toHaveAttribute('href', '/craft.html')
    await expect(plates.nth(2)).toHaveAttribute('href', '/showcase.html')
    await expect(plates.nth(3)).toHaveAttribute('href', '/proof.html')
  })

  test('native dialog traps focus and closes on Escape', async ({ page }) => {
    await page.goto('/craft.html')
    await page.getByRole('button', { name: /open dialog/i }).click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    // showModal() should move focus into the dialog.
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true)

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('popover menu opens and light-dismisses with Escape', async ({ page }) => {
    await page.goto('/showcase.html')
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

  test('theme choice carries across chapter pages', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /theme settings/i }).click()
    await page.getByRole('radio', { name: 'Ocean' }).check()

    // A cross-document navigation must land already themed (no flash, no reset).
    await page.goto('/craft.html')
    expect(await page.evaluate(() => document.documentElement.dataset.preset)).toBe('ocean')
  })

  test('segmented control behaves as a native radio group', async ({ page }) => {
    await page.goto('/showcase.html')
    const list = page.getByRole('radio', { name: 'List' })
    await list.scrollIntoViewIfNeeded()
    await list.focus()
    await expect(list).toBeChecked()

    await page.keyboard.press('ArrowRight')
    await expect(page.getByRole('radio', { name: 'Grid' })).toBeChecked()
  })

  test('a link to a filtered-out showcase still reveals it (:target beats the filter)', async ({
    page,
  }) => {
    await page.goto('/showcase.html')
    // Filter to "forms" — the popover showcase (tagged interaction) is hidden.
    // Set :checked directly; the CSS :has() filter reacts to the property, and
    // it dodges a WebKit quirk clicking the custom-styled radio.
    await page.locator('.showcase-filter input[value="forms"]').evaluate((el) => {
      ;(el as HTMLInputElement).checked = true
    })
    const popover = page.locator('#showcase-popover')
    await expect(popover).toBeHidden()

    // A legend link navigates by fragment; the target must un-hide.
    await page.evaluate(() => {
      location.hash = '#showcase-popover'
    })
    await expect(popover).toBeVisible()
  })

  test('legacy one-page anchors forward to their chapter pages', async ({ page }) => {
    await page.goto('/#craft-validation')
    await expect(page).toHaveURL(/\/craft\.html#craft-validation$/)
    await expect(page.getByRole('heading', { name: /validation that waits its turn/i })).toBeVisible()
  })
})
