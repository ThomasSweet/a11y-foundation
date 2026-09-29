import { test, expect, type Page } from '@playwright/test'

const hintId = 'anchor-tooltip-name'

function trigger(page: Page) {
  return page.locator(`[aria-describedby="${hintId}"]`)
}

function hint(page: Page) {
  return page.locator(`#${hintId}`)
}

async function placeTrigger(page: Page, top: number) {
  await page.evaluate(
    ([id, top]) => {
      const button = document.querySelector(`[aria-describedby="${id}"]`)!
      const offset = button.getBoundingClientRect().top - top
      window.scrollTo({ top: window.scrollY + offset, behavior: 'instant' })
      return new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      )
    },
    [hintId, top] as const,
  )
}

function placement(page: Page) {
  return page.evaluate((id) => {
    const button = document.querySelector(`[aria-describedby="${id}"]`)!.getBoundingClientRect()
    const bubble = document.getElementById(id)!.getBoundingClientRect()
    const inView = bubble.top >= 0 && bubble.bottom <= window.innerHeight
    const tethered = (gap: number) => gap >= 0 && gap <= 12
    const where = tethered(button.top - bubble.bottom)
      ? 'above'
      : tethered(bubble.top - button.bottom)
        ? 'below'
        : `detached (hint ${Math.round(bubble.top)}..${Math.round(bubble.bottom)}, trigger ${Math.round(button.top)}..${Math.round(button.bottom)})`
    return inView ? where : `${where}, off-screen`
  }, hintId)
}

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  test.describe(`anchor-positioned tooltip, reduced motion: ${reducedMotion}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion })
      await page.goto('/showcase.html')
    })

    test('opens above its trigger when there is room', async ({ page }) => {
      await placeTrigger(page, 360)
      await trigger(page).focus()
      await expect(hint(page)).toBeVisible()
      await expect.poll(() => placement(page)).toBe('above')
    })

    test('flips below when the open hint is scrolled to the top edge', async ({ page }) => {
      await placeTrigger(page, 360)
      await trigger(page).focus()
      await expect.poll(() => placement(page)).toBe('above')

      await placeTrigger(page, 4)
      await expect.poll(() => placement(page)).toBe('below')
      await expect(hint(page)).toBeVisible()
    })

    test('opens below when focused at the top edge', async ({ page }) => {
      await placeTrigger(page, 4)
      await trigger(page).focus()
      await expect(hint(page)).toBeVisible()
      await expect.poll(() => placement(page)).toBe('below')
    })

    test('closes on blur after flipping', async ({ page }) => {
      await placeTrigger(page, 360)
      await trigger(page).focus()
      await placeTrigger(page, 4)
      await expect.poll(() => placement(page)).toBe('below')

      await trigger(page).blur()
      await expect(hint(page)).toBeHidden()
    })

    for (const [where, top] of [
      ['above', 360],
      ['below', 4],
    ] as const) {
      test(`keeps hover while the pointer crosses to the hint ${where} its trigger`, async ({ page }) => {
        await placeTrigger(page, top)
        const button = (await trigger(page).boundingBox())!
        const x = button.x + button.width / 2
        await page.mouse.move(x, button.y + button.height / 2)
        await expect.poll(() => placement(page)).toBe(where)

        const bubble = (await hint(page).boundingBox())!
        const start = Math.round(button.y + button.height / 2)
        const end = Math.round(bubble.y + bubble.height / 2)
        const direction = Math.sign(end - start)
        expect(direction, 'the hint and its trigger share a centre').not.toBe(0)
        for (let y = start; y !== end; y += direction / 2) {
          await page.mouse.move(x, y)
          const hovered = await page.evaluate(
            (id) => document.querySelector(`#${id}:hover, [aria-describedby="${id}"]:hover`) !== null,
            hintId,
          )
          expect(hovered, `hover lost at y=${y.toFixed(1)}`).toBe(true)
        }

        await page.mouse.move(4, 400)
        await expect(hint(page)).toBeHidden()
      })
    }
  })
}
