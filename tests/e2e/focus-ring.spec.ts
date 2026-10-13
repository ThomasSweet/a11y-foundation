import { test, expect, type Locator, type Page } from '@playwright/test'

function ringCuts(page: Page, selector: string) {
  return page.evaluate((query) => {
    const probe = document.createElement('div')
    probe.style.cssText =
      'position: absolute; visibility: hidden; inline-size: var(--focus-ring-width); block-size: var(--focus-ring-offset);'
    document.body.append(probe)
    const reach = probe.getBoundingClientRect().width + probe.getBoundingClientRect().height
    probe.remove()

    const nameOf = (el: Element) =>
      `${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/)[0]} "${(el.textContent ?? '').trim().slice(0, 24)}"`
    const scrolls = (overflow: string) => overflow === 'auto' || overflow === 'scroll'
    const found: string[] = []
    const targets = [...document.querySelectorAll(query)].filter(
      (target) => !target.parentElement?.closest('details:not([open])'),
    )

    for (const target of targets) {
      const box = target.getBoundingClientRect()
      if (box.width === 0 || box.height === 0) continue
      const own = document.createElement('span')
      own.style.cssText =
        'position: absolute; visibility: hidden; inline-size: calc(var(--focus-ring-width) + var(--focus-ring-offset));'
      target.append(own)
      const outside = own.getBoundingClientRect().width
      own.remove()
      const cut = { top: 0, right: 0, bottom: 0, left: 0 }
      for (let ancestor = target.parentElement; ancestor && ancestor !== document.body; ancestor = ancestor.parentElement) {
        const style = getComputedStyle(ancestor)
        const contained = /paint|content|strict/.test(style.contain) || style.contentVisibility === 'auto'
        const clipsInline = contained || style.overflowX !== 'visible'
        const clipsBlock = contained || style.overflowY !== 'visible'
        if (!clipsInline && !clipsBlock) continue
        const frame = ancestor.getBoundingClientRect()
        const left = box.left - (frame.left + ancestor.clientLeft)
        const top = box.top - (frame.top + ancestor.clientTop)
        if (clipsInline) {
          const start = scrolls(style.overflowX) ? left + ancestor.scrollLeft : left
          const room = scrolls(style.overflowX) ? ancestor.scrollWidth : ancestor.clientWidth
          cut.left = Math.max(cut.left, outside - start)
          cut.right = Math.max(cut.right, start + box.width + outside - room)
        }
        if (clipsBlock) {
          const start = scrolls(style.overflowY) ? top + ancestor.scrollTop : top
          const room = scrolls(style.overflowY) ? ancestor.scrollHeight : ancestor.clientHeight
          cut.top = Math.max(cut.top, outside - start)
          cut.bottom = Math.max(cut.bottom, start + box.height + outside - room)
        }
      }
      const sides = Object.entries(cut)
        .filter(([, amount]) => amount > 0.5)
        .map(([side, amount]) => `${side} ${Math.round(amount)}`)
      if (sides.length) found.push(`${nameOf(target)}: ${sides.join(', ')}`)
    }
    return { reach, count: targets.length, found }
  }, selector)
}

async function paintedSides(page: Page, button: Locator) {
  await button.scrollIntoViewIfNeeded()
  const box = await button.boundingBox()
  if (!box) throw new Error('button has no box')
  const inset = 10
  const strips = {
    top: { x: box.x + inset, y: box.y - 5, width: box.width - 2 * inset, height: 5 },
    right: { x: box.x + box.width, y: box.y + inset, width: 6, height: box.height - 2 * inset },
    bottom: { x: box.x + inset, y: box.y + box.height, width: box.width - 2 * inset, height: 6 },
    left: { x: box.x - 6, y: box.y + inset, width: 6, height: box.height - 2 * inset },
  }
  const shoot = async () => {
    const shots: Record<string, Buffer> = {}
    for (const [side, clip] of Object.entries(strips)) {
      shots[side] = await page.screenshot({
        clip: {
          x: Math.round(clip.x),
          y: Math.round(clip.y),
          width: Math.round(clip.width),
          height: Math.round(clip.height),
        },
      })
    }
    return shots
  }

  await button.evaluate((el) => (el as HTMLElement).blur())
  const atRest = await shoot()
  await button.evaluate((el) => (el as HTMLElement).focus({ focusVisible: true } as FocusOptions))
  expect(await button.evaluate((el) => el.matches(':focus-visible'))).toBe(true)
  const focused = await shoot()
  await button.evaluate((el) => (el as HTMLElement).blur())

  return Object.keys(strips).filter((side) => !atRest[side].equals(focused[side]))
}

function ringRoom(link: Locator, reveal: boolean) {
  return link.evaluate((el, scrollFirst) => {
    if (scrollFirst) el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' })
    const scroller = el.closest('.focus-obscured-viewport')
    const bar = scroller?.querySelector('.focus-obscured-bar')
    if (!scroller || !bar) throw new Error('demo not found')
    const probe = document.createElement('span')
    probe.style.cssText =
      'position: absolute; visibility: hidden; inline-size: calc(var(--focus-ring-width) + var(--focus-ring-offset));'
    el.append(probe)
    const reach = probe.getBoundingClientRect().width
    probe.remove()
    const box = el.getBoundingClientRect()
    const frame = scroller.getBoundingClientRect()
    const above = box.top - bar.getBoundingClientRect().bottom
    const below = frame.top + scroller.clientTop + scroller.clientHeight - box.bottom
    return { focusVisible: el.matches(':focus-visible'), reach, spare: Math.min(above, below) - reach }
  }, reveal)
}

test.describe('the global focus ring', () => {
  test('a focused text field gets the global ring, not a component one', async ({ page }) => {
    await page.goto('/craft.html')
    const field = page.getByRole('textbox', { name: 'Display name' })
    await field.focus()
    await expect(field).toHaveCSS('outline-width', '3px')
    await expect(field).toHaveCSS('outline-offset', '2px')
    await expect(field).toHaveCSS('outline-style', 'solid')
  })

  test.describe('with reduced motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } })

    test('the ring is drawn in the same frame as the focus', async ({ page }) => {
      await page.goto('/craft.html')
      const field = page.getByRole('textbox', { name: 'Display name' })
      const atOnce = await field.evaluate((el) => {
        ;(el as HTMLElement).focus()
        const style = getComputedStyle(el)
        return { focusVisible: el.matches(':focus-visible'), style: style.outlineStyle, width: style.outlineWidth }
      })
      expect(atOnce).toEqual({ focusVisible: true, style: 'solid', width: '3px' })
    })
  })
})

test.describe('focus rings and the boxes that clip them', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })

  test('paint containment cuts the ring, and padding of ring width plus offset keeps it', async ({ page }) => {
    await page.goto('/craft.html')
    const boxes = page.locator('.contained-ring-box')
    await expect(boxes).toHaveCount(2)
    await expect(boxes.nth(0)).toHaveCSS('contain', 'paint')
    await expect(boxes.nth(1)).toHaveCSS('contain', 'paint')
    await expect(boxes.nth(0)).toHaveCSS('padding', '0px')
    await expect(boxes.nth(1)).toHaveCSS('padding', '5px')

    const bare = await ringCuts(page, '.contained-ring-box:not(.contained-ring-box-padded) .contained-ring-button')
    expect(bare.reach).toBe(5)
    expect(bare.found).toHaveLength(1)
    expect(bare.found[0]).toContain('right 5, bottom 5, left 5')
    expect(bare.found[0]).not.toContain('top')

    const padded = await ringCuts(page, '.contained-ring-box-padded .contained-ring-button')
    expect(padded.count).toBe(1)
    expect(padded.found).toEqual([])
  })

  test('the engine really paints what the figure says: one line left without padding, four with it', async ({
    page,
  }) => {
    await page.goto('/craft.html')
    expect(await paintedSides(page, page.getByRole('button', { name: 'Save draft' }))).toEqual(['top'])
    expect(await paintedSides(page, page.getByRole('button', { name: 'Publish', exact: true }))).toEqual([
      'top',
      'right',
      'bottom',
      'left',
    ])
  })

  for (const path of ['/craft.html', '/proof.html', '/agent-skill.html', '/showcase.html']) {
    test(`no code block or copy button on ${path} loses part of its ring`, async ({ page }) => {
      await page.goto(path)
      await page.evaluate(() => {
        for (const details of document.querySelectorAll('details')) details.open = true
      })
      const cuts = await ringCuts(page, '.code-block-pre, .code-block-copy')
      expect(cuts.count).toBeGreaterThan(0)
      expect(cuts.found).toEqual([])
    })
  }

  for (const width of [320, 1280]) {
    test(`the 2.4.11 demo leaves room for every link's ring at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto('/standard.html')
      const cuts = await ringCuts(page, '.focus-obscured-link')
      expect(cuts.count).toBe(8)
      expect(cuts.found).toEqual([])

      const atRest = await ringRoom(page.locator('.focus-obscured-link').first(), false)
      expect(atRest.reach).toBe(1)
      expect(atRest.spare).toBeGreaterThanOrEqual(-0.5)
    })
  }

  test('revealed at the nearest edge, every 2.4.11 link keeps its ring clear of the sticky bar and the scroller', async ({
    page,
  }) => {
    await page.goto('/standard.html')
    const links = page.locator('.focus-obscured-link')
    await expect(links).toHaveCount(8)

    for (const index of [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0]) {
      const room = await ringRoom(links.nth(index), true)
      expect(room.reach, `link ${index}: ring reach outside the link`).toBe(1)
      expect(room.spare, `link ${index}: room beyond the ring`).toBeGreaterThanOrEqual(-0.5)
    }
  })

  test('focus reveals every 2.4.11 link clear of the sticky bar and the scroller, forwards and back', async ({
    page,
  }) => {
    await page.goto('/standard.html')
    const links = page.locator('.focus-obscured-link')
    await expect(links).toHaveCount(8)

    for (const index of [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0]) {
      await links.nth(index).focus()
      const room = await ringRoom(links.nth(index), false)
      expect(room.focusVisible, `link ${index}: shows a focus ring`).toBe(true)
      expect(room.reach, `link ${index}: ring reach outside the link`).toBe(1)
      expect(room.spare, `link ${index}: room beyond the ring`).toBeGreaterThanOrEqual(-0.5)
    }
  })

  test('the first and last chapter bar links keep their ring inside a 320 pixel viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 })
    await page.goto('/craft.html')
    const links = page.getByRole('navigation', { name: 'Chapter shortcuts' }).getByRole('link')
    await expect(links).toHaveCount(5)

    for (const link of [links.first(), links.last()]) {
      await link.focus()
      await expect
        .poll(() =>
          link.evaluate((el) => {
            const probe = document.createElement('span')
            probe.style.cssText =
              'position: absolute; visibility: hidden; inline-size: calc(var(--focus-ring-width) + var(--focus-ring-offset));'
            el.append(probe)
            const reach = probe.getBoundingClientRect().width
            probe.remove()
            const box = el.getBoundingClientRect()
            return (
              el.matches(':focus-visible') &&
              reach === 5 &&
              box.left - reach >= -0.5 &&
              box.right + reach <= document.documentElement.clientWidth + 0.5 &&
              box.top - reach >= -0.5 &&
              box.bottom + reach <= window.innerHeight + 0.5
            )
          }),
        )
        .toBe(true)
    }
  })

  test('chapter bar labels stay inside their links when text is enlarged', async ({ page }) => {
    await page.setViewportSize({ width: 402, height: 800 })
    await page.goto('/standard.html')
    await page.addStyleTag({
      content: '*, *::before, *::after { transition-property: none !important; } html { font-size: 200% !important; }',
    })
    const overhang = await page.evaluate(() =>
      [...document.querySelectorAll('.chapter-bar-link')].map((link) => {
        const frame = link.getBoundingClientRect()
        return Math.round(
          Math.max(
            0,
            ...[...link.children].map((child) => {
              const box = child.getBoundingClientRect()
              return Math.max(frame.left - box.left, box.right - frame.right)
            }),
          ),
        )
      }),
    )
    expect(overhang).toEqual([0, 0, 0, 0, 0])
  })
})
