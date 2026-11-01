import { test, expect, type Page } from '@playwright/test'

const pages = [
  '/',
  '/standard.html',
  '/craft.html',
  '/showcase.html',
  '/proof.html',
  '/glossary.html',
  '/styleguide.html',
  '/agent-skill.html',
  '/checks/',
  '/audit-room.html',
  '/listening-room.html',
  '/screen-reader.html',
  '/devtools.html',
  '/accessibility.html',
  '/privacy.html',
  '/impressum.html',
]

const textSpacing =
  '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-block-end: 2em !important; }'
const doubleText = 'html { font-size: 200% !important; }'
const appliedAtOnce = '*, *::before, *::after { transition-property: none !important; }'
const wideFont =
  '* { font-family: Verdana, "DejaVu Sans", sans-serif !important; } code, kbd, samp, pre { font-family: "Courier New", monospace !important; }'

const settings = [
  { name: 'at 320 CSS pixels', width: 320, height: 568, css: '' },
  { name: 'at 320 CSS pixels with WCAG text spacing', width: 320, height: 568, css: textSpacing },
  { name: 'at 1280 CSS pixels with 200% text', width: 1280, height: 800, css: doubleText },
  { name: 'at 320 CSS pixels with a wide font and WCAG text spacing', width: 320, height: 568, css: wideFont + textSpacing },
  { name: 'at 1280 CSS pixels with a wide font and 200% text', width: 1280, height: 800, css: wideFont + doubleText },
]

function cutOffContent(page: Page) {
  return page.evaluate(() => {
    const nameOf = (el: Element) => {
      const name = typeof el.className === 'string' && el.className ? `.${el.className.trim().split(/\s+/)[0]}` : ''
      const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 30)
      return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}${name}${text ? ` "${text}"` : ''}`
    }
    const inClosedDetails = (el: Element) => {
      const closed = el.parentElement?.closest('details:not([open])')
      if (!closed) return false
      const summary = closed.querySelector(':scope > summary')
      return !summary || !summary.contains(el)
    }
    const controls = new Set(['a', 'button', 'input', 'select', 'textarea', 'img', 'summary'])
    const found: string[] = []

    for (const clipper of document.querySelectorAll('body *')) {
      const overflow = getComputedStyle(clipper).overflowX
      if (overflow !== 'hidden' && overflow !== 'clip') continue
      const frame = clipper.getBoundingClientRect()
      if (frame.width < 8 || frame.height < 2) continue

      let worst = 0
      let culprit = ''
      for (const el of clipper.querySelectorAll('*')) {
        const hasText = [...el.childNodes].some(
          (node) => node.nodeType === Node.TEXT_NODE && (node.textContent ?? '').trim().length > 1,
        )
        if (!hasText && !controls.has(el.tagName.toLowerCase())) continue
        const style = getComputedStyle(el)
        if (style.display === 'none' || style.visibility !== 'visible' || Number(style.opacity) === 0) continue
        if (style.position === 'fixed' || style.clipPath === 'inset(50%)') continue
        if (el.closest('[aria-hidden="true"], svg, [inert]') || inClosedDetails(el)) continue

        let nested = false
        for (let node = el.parentElement; node && node !== clipper; node = node.parentElement) {
          const inner = getComputedStyle(node)
          if (inner.overflowX !== 'visible' || inner.position === 'fixed') {
            nested = true
            break
          }
        }
        if (nested) continue

        for (const box of el.getClientRects()) {
          if (box.width < 1 || box.height < 1 || box.bottom < frame.top || box.top > frame.bottom) continue
          const over = Math.max(box.right - frame.right, frame.left - box.left)
          if (over > 1.5 && over > worst) {
            worst = over
            culprit = nameOf(el)
          }
        }
      }
      if (worst > 0) found.push(`${culprit} is cut off by ${Math.round(worst)}px inside ${nameOf(clipper).slice(0, 40)}`)
    }
    return found
  })
}

test.describe('the hub title strike', () => {
  for (const width of [320, 402, 1280]) {
    test(`crosses its own two words at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')

      const { text, strike, em } = await page.evaluate(() => {
        const span = document.querySelector('.hub-strike')!
        const range = document.createRange()
        range.selectNodeContents(span.firstChild!)
        const words = range.getBoundingClientRect()
        const lines = [...span.querySelectorAll('.hub-strike-scribble-ink')].map((path) =>
          path.getBoundingClientRect(),
        )
        return {
          em: parseFloat(getComputedStyle(span).fontSize),
          text: { left: words.left, right: words.right, top: words.top, bottom: words.bottom },
          strike: {
            left: Math.min(...lines.map((line) => line.left)),
            right: Math.max(...lines.map((line) => line.right)),
            top: Math.min(...lines.map((line) => line.top)),
            bottom: Math.max(...lines.map((line) => line.bottom)),
          },
        }
      })

      expect(strike.left, 'starts at the first letter').toBeGreaterThan(text.left - 0.25 * em)
      expect(strike.left, 'starts at the first letter').toBeLessThan(text.left + 0.1 * em)
      expect(strike.right, 'ends at the last letter').toBeGreaterThan(text.right - 0.1 * em)
      expect(strike.right, 'ends at the last letter').toBeLessThan(text.right + 0.4 * em)
      expect(strike.top, 'sits inside the line of text').toBeGreaterThan(text.top - 0.1 * em)
      expect(strike.bottom, 'sits inside the line of text').toBeLessThan(text.bottom + 0.1 * em)
    })
  }
})

test.describe('a legend sits inline with its options', () => {
  for (const [path, selector] of [
    ['/craft.html', '.content-stress-control'],
    ['/craft.html', '.light-dark-switch'],
    ['/showcase.html', '.showcase-filter'],
  ] as const) {
    test(`${selector} on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path)

      const { legend, first } = await page.locator(selector).evaluate((fieldset) => {
        const middle = (el: Element) => {
          const box = el.getBoundingClientRect()
          return { y: box.top + box.height / 2, left: box.left, right: box.right }
        }
        return {
          legend: middle(fieldset.querySelector('legend')!),
          first: middle(fieldset.querySelector('label')!),
        }
      })

      expect(Math.abs(legend.y - first.y), 'legend and first option share a row').toBeLessThan(6)
      expect(first.left, 'the first option follows the legend').toBeGreaterThan(legend.right)
    })
  }
})

test.describe('nothing overflows or is cut off', () => {
  for (const path of pages) {
    for (const setting of settings) {
      test(`${path} ${setting.name}`, async ({ page }) => {
        await page.setViewportSize({ width: setting.width, height: setting.height })
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.goto(path)
        if (setting.css) await page.addStyleTag({ content: appliedAtOnce + setting.css })

        await expect
          .poll(() => page.evaluate(() => document.documentElement.scrollWidth), 'the page scrolls sideways')
          .toBeLessThanOrEqual(setting.width)
        await expect.poll(() => cutOffContent(page), 'content is cut off').toEqual([])
      })
    }
  }
})
