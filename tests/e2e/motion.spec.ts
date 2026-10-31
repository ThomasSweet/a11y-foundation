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

test.describe('a reveal never stands between the reader and where they were sent', () => {
  const open = async (page: Page, path: string) => {
    await page.goto(path)
    test.skip(!(await page.evaluate(() => CSS.supports('animation-timeline: view()'))), 'no scroll-driven animations')
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
  }

  const peek = (page: Page, target: string, pixels: number, reveal = '.demo') =>
    page.evaluate(
      async ([selector, pixels, reveal]) => {
        let el = document.querySelector(selector)?.closest<HTMLElement>(reveal) ?? null
        let top = 0
        for (; el; el = el.offsetParent as HTMLElement | null) top += el.offsetTop
        scrollTo({ top: top - innerHeight + pixels, behavior: 'instant' })
        await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)))
      },
      [target, pixels, reveal] as const,
    )

  const landing = (page: Page, id: string) =>
    page.locator(`#${id}`).evaluate(async (target) => {
      await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)))
      return target.getBoundingClientRect().top - parseFloat(getComputedStyle(target).scrollMarginBlockStart)
    })

  test('a rail jump into a section that is still revealing lands under the scroll margin', async ({ page }) => {
    await open(page, '/craft.html')
    const ids = await page
      .locator('.chapter-section-link')
      .evaluateAll((links) => links.slice(1).map((link) => link.getAttribute('href')?.slice(1) ?? ''))
    expect(ids.length).toBeGreaterThan(0)

    for (const id of ids) {
      await peek(page, `#${id}`, 30)
      await page.locator(`.chapter-section-link[href="#${id}"]`).click()
      const miss = await landing(page, id)
      expect(Math.abs(miss), `#${id} lands ${miss}px from its scroll margin`).toBeLessThan(2)
    }
  })

  test('a jump to a showcase card that is still revealing lands under the scroll margin', async ({ page }) => {
    await open(page, '/showcase.html')
    const ids = await page
      .locator('.showcase-group')
      .evaluateAll((groups) => groups.map((group) => group.querySelector(".showcase:not(:has([data-reveal='off']))")?.id ?? ''))
    expect(ids.length).toBeGreaterThan(0)

    for (const id of ids) {
      await peek(page, `#${id}`, 30, '.showcase')
      await page.evaluate((hash) => (location.hash = hash), id)
      const miss = await landing(page, id)
      expect(Math.abs(miss), `#${id} lands ${miss}px from its scroll margin`).toBeLessThan(2)
    }
  })

  test('a jump into a timeline era that is still revealing lands under the scroll margin', async ({ page }) => {
    await open(page, '/standard.html')
    const ids = await page
      .locator('.timeline-era:has(.criterion-title)')
      .evaluateAll((eras) => eras.map((era) => era.querySelector('.criterion-title')?.id ?? ''))
    expect(ids.length).toBeGreaterThan(0)

    for (const id of ids) {
      await peek(page, `#${id}`, 30, '.timeline-era')
      await page.evaluate((hash) => (location.hash = hash), id)
      const miss = await landing(page, id)
      expect(Math.abs(miss), `#${id} lands ${miss}px from its scroll margin`).toBeLessThan(2)
    }
  })

  test('a link reached by Tab inside a section that is still revealing is fully opaque', async ({ page, browserName }) => {
    await open(page, '/proof.html')
    const link = page.locator('.demo', { has: page.locator('#testing-coverage') }).locator('a[href]').first()
    await peek(page, '#testing-coverage', 96)
    await link.evaluate((target) => {
      const stops = [...document.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea, summary')].filter(
        (el) => el.tabIndex >= 0 && el.getClientRects().length > 0,
      )
      stops[stops.indexOf(target as HTMLElement) - 1]?.focus({ preventScroll: true })
    })
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
    await expect(link).toBeFocused()

    const opacity = await link.evaluate(async (target) => {
      await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)))
      let product = 1
      for (let el: Element | null = target; el; el = el.parentElement) product *= Number(getComputedStyle(el).opacity)
      return product
    })
    expect(opacity).toBeGreaterThan(0.99)
  })
})

test.describe('a page change keeps every link live', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } })

  test('a link clicked while the page change runs takes the reader on', async ({ page }) => {
    await page.addInitScript(() => {
      addEventListener('pagereveal', (event) => {
        const arrived = performance.now()
        const transition = (event as PageRevealEvent).viewTransition
        let running = !!transition
        transition?.ready.then(
          () => document.documentElement.animate([], { duration: 10_000, pseudoElement: '::view-transition' }),
          () => {},
        )
        transition?.finished.finally(() => (running = false))
        sessionStorage.setItem(`reveal:${location.pathname}`, String(!!transition))
        addEventListener(
          'click',
          (click) => {
            const href = click.target instanceof Element ? click.target.closest('a')?.getAttribute('href') : null
            sessionStorage.setItem(
              `click:${location.pathname}`,
              JSON.stringify({ after: performance.now() - arrived, running, href }),
            )
          },
          { capture: true, once: true },
        )
      })
    })

    await page.goto('/craft.html')
    test.skip(!(await page.evaluate(() => 'CSSViewTransitionRule' in window)), 'no cross-document view transitions')

    await page.locator('.chapter-switch a[href="/proof.html"]').click()
    await page.waitForURL('**/proof.html', { waitUntil: 'commit' })
    const box = await page.waitForFunction(
      () =>
        sessionStorage.getItem('reveal:/proof.html') &&
        document.querySelector('.chapter-switch a[href="/standard.html"]')?.getBoundingClientRect().toJSON(),
    )
    const { x, y, width, height } = await box.jsonValue()
    await page.mouse.click(x + width / 2, y + height / 2)

    await expect(page).toHaveURL(/\/standard\.html$/)
    expect(await page.evaluate(() => sessionStorage.getItem('reveal:/proof.html'))).toBe('true')
    const click = await page.evaluate(() => JSON.parse(sessionStorage.getItem('click:/proof.html') ?? 'null'))
    expect(click).toMatchObject({ running: true, href: '/standard.html' })
  })
})
