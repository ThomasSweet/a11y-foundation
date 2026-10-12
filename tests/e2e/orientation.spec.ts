import { test, expect, type Locator, type Page } from '@playwright/test'

function card(page: Page) {
  return page.locator('article.criterion').filter({ has: page.locator('.criterion-id', { hasText: '1.3.4' }) })
}

function screenOverhang(demo: Locator) {
  return demo.evaluate((el) => {
    const device = el.querySelector('.orientation-device') as HTMLElement
    const screen = el.querySelector('.orientation-screen') as HTMLElement
    const style = getComputedStyle(device)
    const frame = device.getBoundingClientRect()
    const box = screen.getBoundingClientRect()
    const inner = {
      top: frame.top + device.clientTop + parseFloat(style.paddingTop),
      bottom: frame.bottom - parseFloat(style.borderBottomWidth) - parseFloat(style.paddingBottom),
      left: frame.left + device.clientLeft + parseFloat(style.paddingLeft),
      right: frame.right - parseFloat(style.borderRightWidth) - parseFloat(style.paddingRight),
    }
    return Math.round(
      Math.max(0, inner.top - box.top, box.bottom - inner.bottom, inner.left - box.left, box.right - inner.right),
    )
  })
}

test.describe('1.3.4 Orientation demo', () => {
  test('the layout follows the shape of the frame through the container query', async ({ page }) => {
    await page.goto('/standard.html')
    const demo = card(page)
    const device = demo.locator('.orientation-device')
    const rotate = demo.locator('.orientation-rotate')
    const shape = () => device.evaluate((el) => Math.sign(el.clientWidth - el.clientHeight))
    const columns = () =>
      demo
        .locator('.orientation-app-list')
        .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length)

    await expect(rotate).toHaveText('Rotate to landscape')
    expect(await shape()).toBe(-1)
    await expect(demo.getByText('Portrait layout')).toBeVisible()
    await expect(demo.getByText('Landscape layout')).toBeHidden()
    await expect(demo.locator('.orientation-notice')).toBeHidden()
    expect(await columns()).toBe(1)

    await rotate.click()
    await expect(rotate).toHaveText('Rotate to portrait')
    expect(await shape()).toBe(1)
    await expect(demo.getByText('Landscape layout')).toBeVisible()
    await expect(demo.getByText('Portrait layout')).toBeHidden()
    expect(await columns()).toBe(3)
  })

  test('at 320 pixels the landscape frame is still wider than tall, scrolls its own content and shows its label', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 })
    await page.goto('/standard.html')
    const demo = card(page)
    await demo.locator('.orientation-rotate').click()
    await expect(demo.getByText('Landscape layout')).toBeVisible()

    const measured = await demo.evaluate((el) => {
      const device = el.querySelector('.orientation-device') as HTMLElement
      const screen = el.querySelector('.orientation-screen') as HTMLElement
      const label = el.querySelector('.orientation-app-layout-landscape') as HTMLElement
      const frame = (el.querySelector('.criterion-demo') ?? el).getBoundingClientRect()
      const box = device.getBoundingClientRect()
      const view = screen.getBoundingClientRect()
      const text = label.getBoundingClientRect()
      return {
        landscape: box.width > box.height,
        sidewaysScroll: screen.scrollWidth - screen.clientWidth,
        scrollsDown: screen.scrollHeight > screen.clientHeight && getComputedStyle(screen).overflowY === 'auto',
        insideFrame: box.left >= frame.left - 0.5 && box.right <= frame.right + 0.5,
        labelInView: screen.scrollTop === 0 && text.top >= view.top && text.bottom <= view.bottom,
      }
    })
    expect(measured).toEqual({
      landscape: true,
      sidewaysScroll: 0,
      scrollsDown: true,
      insideFrame: true,
      labelInView: true,
    })
  })

  for (const width of [320, 1280]) {
    test(`the screen stays inside the device frame in both orientations and both states at ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto('/standard.html')
      const demo = card(page)

      expect(await screenOverhang(demo)).toBe(0)
      await demo.locator('.orientation-rotate').click()
      expect(await screenOverhang(demo)).toBe(0)
      await demo.locator('.break-toggle input').check()
      expect(await screenOverhang(demo)).toBe(0)
      await demo.locator('.orientation-rotate').click()
      await expect(demo.locator('.orientation-notice')).toBeVisible()
      expect(await screenOverhang(demo)).toBe(0)
    })
  }

  test('broken, a portrait frame shows the rotate notice and a landscape frame shows the app', async ({
    page,
  }) => {
    await page.goto('/standard.html')
    const demo = card(page)
    await demo.locator('.break-toggle input').check()
    await expect(demo.locator('.orientation-notice')).toBeVisible()
    await expect(demo.locator('.orientation-notice')).toContainText('Rotate your device to landscape')
    await expect(demo.locator('.orientation-app')).toBeHidden()

    await demo.locator('.orientation-rotate').click()
    await expect(demo.locator('.orientation-notice')).toBeHidden()
    await expect(demo.locator('.orientation-app')).toBeVisible()
    await expect(demo.getByText('Landscape layout')).toBeVisible()
    await expect(
      demo.locator('.criterion-demo [role="alert"], .criterion-demo [role="status"], .criterion-demo [aria-live]'),
    ).toHaveCount(0)
  })

  test('the device screen is a labelled tab stop', async ({ page }) => {
    await page.goto('/standard.html')
    const screen = card(page).getByRole('group', { name: 'Device screen', exact: true })
    await expect(screen).toHaveAttribute('tabindex', '0')
    await screen.focus()
    await expect(screen).toBeFocused()
  })
})
