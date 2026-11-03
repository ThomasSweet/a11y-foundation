import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import AxeBuilder from '@axe-core/playwright'
import { test, expect, type Locator, type Page } from '@playwright/test'

const presetSource = readFileSync(
  fileURLToPath(new URL('../../src/styles/theming/presets.css', import.meta.url)),
  'utf8',
)
const presets = [...presetSource.matchAll(/:root\[data-preset='([a-z-]+)'\]/g)].map((match) => match[1])

const schemes = [
  { name: 'light', theme: 'light', preset: '' },
  { name: 'dark', theme: 'dark', preset: '' },
  ...presets.map((preset) => ({ name: preset, theme: '', preset })),
]

interface Measured {
  alpha: number
  text: { black: number; white: number }
  subtle: { black: number; white: number }
  border: number
  subtleOnSurface: number
}

function measure(page: Page, scheme: { theme: string; preset: string }, tint: string) {
  return page.evaluate(
    ({ theme, preset, tintValue }): Measured => {
      const root = document.documentElement
      if (theme) root.dataset.theme = theme
      else delete root.dataset.theme
      if (preset) root.dataset.preset = preset
      else delete root.dataset.preset

      const probe = document.createElement('div')
      document.body.append(probe)
      const resolve = (value: string) => {
        probe.style.backgroundColor = value
        return getComputedStyle(probe).backgroundColor
      }
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) throw new Error('no 2d context')
      const paint = (...layers: string[]) => {
        context.clearRect(0, 0, 1, 1)
        for (const layer of layers) {
          context.fillStyle = layer
          context.fillRect(0, 0, 1, 1)
        }
        return [...context.getImageData(0, 0, 1, 1).data]
      }
      const luminance = (pixel: number[]) => {
        const [r, g, b] = pixel.slice(0, 3).map((value) => {
          const channel = value / 255
          return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
        })
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
      }
      const ratio = (a: number[], b: number[]) => {
        const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x)
        return (lighter + 0.05) / (darker + 0.05)
      }

      const glass = resolve(tintValue)
      const overBlack = paint('#000', glass)
      const overWhite = paint('#fff', glass)
      const text = paint(resolve('var(--color-text)'))
      const subtle = paint(resolve('var(--color-text-subtle)'))
      const surface = paint(resolve('var(--color-surface)'))
      const result = {
        alpha: paint(glass)[3] / 255,
        text: { black: ratio(text, overBlack), white: ratio(text, overWhite) },
        subtle: { black: ratio(subtle, overBlack), white: ratio(subtle, overWhite) },
        border: ratio(paint(resolve('var(--color-border)')), surface),
        subtleOnSurface: ratio(subtle, surface),
      }
      probe.remove()
      return result
    },
    { ...scheme, tintValue: tint },
  )
}

const token = 'var(--color-surface-glass)'
const decorativeTint = 'rgb(from var(--color-surface-glass) r g b / 40%)'
const printed = (ratio: number) => `${ratio.toFixed(2).replace(/\.00$/, '')}:1`

function barAlpha(bar: Locator) {
  return bar.evaluate((el) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const context = canvas.getContext('2d')
    if (!context) throw new Error('no 2d context')
    context.fillStyle = getComputedStyle(el).backgroundColor
    context.fillRect(0, 0, 1, 1)
    return Math.round((context.getImageData(0, 0, 1, 1).data[3] / 255) * 100) / 100
  })
}

function cardState(card: Locator) {
  return card.evaluate((el) => {
    const probe = document.createElement('span')
    probe.style.color = 'CanvasText'
    el.append(probe)
    const canvasText = getComputedStyle(probe).color
    probe.remove()
    const style = getComputedStyle(el)
    return { shadow: style.boxShadow, borderIsSystemText: style.borderTopColor === canvasText }
  })
}

function sectionText(page: Page, id: string) {
  return page.locator(`section[aria-labelledby="${id}"]`).innerText()
}

test.describe('glass surfaces', () => {
  test('the preset list is read from the stylesheet', () => {
    expect(presets.length).toBeGreaterThanOrEqual(8)
    expect(presets).toContain('midnight')
  })

  test('the glass token keeps both text colours at 4.5:1 over black and over white in every scheme', async ({
    page,
  }) => {
    await page.goto('/craft.html')
    for (const scheme of schemes) {
      const measured = await measure(page, scheme, token)
      expect(measured.alpha, `${scheme.name}: the token must resolve to a translucent colour`).toBeGreaterThan(0.5)
      expect(measured.alpha, `${scheme.name}: the token must resolve to a translucent colour`).toBeLessThan(1)
      expect(Math.min(measured.text.black, measured.text.white), `${scheme.name}: body text on glass`).toBeGreaterThanOrEqual(4.5)
      expect(Math.min(measured.subtle.black, measured.subtle.white), `${scheme.name}: subtle text on glass`).toBeGreaterThanOrEqual(4.5)
    }
  })

  test('the figures printed under the glass demo are the measured ones', async ({ page }) => {
    await page.goto('/craft.html')
    const light = { name: 'light', theme: 'light', preset: '' }
    const dark = { name: 'dark', theme: 'dark', preset: '' }
    const light40 = await measure(page, light, decorativeTint)
    const dark40 = await measure(page, dark, decorativeTint)
    const light90 = await measure(page, light, token)
    const dark90 = await measure(page, dark, token)

    const readout = page.locator('.glass-contrast-readout li')
    await expect(readout.nth(0)).toContainText(
      `text ${printed(light40.text.black)} and subtle text ${printed(light40.subtle.black)} in light, ${printed(dark40.text.white)} and about 1:1 in dark`,
    )
    expect(dark40.subtle.white).toBeLessThan(1.05)
    await expect(readout.nth(1)).toContainText(
      `text ${printed(light90.text.black)} and subtle text ${printed(light90.subtle.black)} in light, ${printed(dark90.text.white)} and ${printed(dark90.subtle.white)} in dark`,
    )
  })

  test('the demo switches the tint, and the simulated preference makes the bar opaque', async ({ page }) => {
    await page.goto('/craft.html')
    const demo = page.locator('.glass-contrast')
    const bar = demo.locator('.glass-contrast-bar')
    const decorative = demo.getByRole('radio', { name: 'Decorative tint, 40%' })
    const tokenTint = demo.getByRole('radio', { name: 'Token tint, 90%' })
    const reduce = demo.getByRole('checkbox', { name: 'Simulate: I prefer reduced transparency' })

    await expect(tokenTint).toBeChecked()
    expect(await barAlpha(bar)).toBeCloseTo(0.9, 1)
    await expect(bar).toHaveCSS('backdrop-filter', 'blur(8px)')

    await decorative.check()
    expect(await barAlpha(bar)).toBeCloseTo(0.4, 1)

    await reduce.check()
    expect(await barAlpha(bar)).toBe(1)
    await expect(bar).toHaveCSS('backdrop-filter', 'none')

    await tokenTint.check()
    expect(await barAlpha(bar)).toBe(1)

    await reduce.uncheck()
    expect(await barAlpha(bar)).toBeCloseTo(0.9, 1)
    await expect(demo.locator('.glass-contrast-note')).toHaveCount(2)
    await expect(demo.locator('.glass-contrast-note-reduced')).toBeHidden()
    await expect(demo.locator('.glass-contrast-note-forced')).toBeHidden()
  })

  test('the stage is a labelled tab stop, the block can scroll out from under the bar, and the bar stays', async ({
    page,
  }) => {
    await page.goto('/craft.html')
    const stage = page.getByRole('region', { name: 'Page scrolling under a glass bar' })
    await expect(stage).toHaveAttribute('tabindex', '0')

    const measured = () =>
      stage.evaluate((el) => {
        const bar = el.querySelector('.glass-contrast-bar')
        const photo = el.querySelector('.glass-contrast-photo')
        if (!bar || !photo) throw new Error('demo parts not found')
        return {
          range: el.scrollHeight - el.clientHeight,
          photo: photo.getBoundingClientRect().height,
          scrolled: el.scrollTop,
          barGap: Math.round(bar.getBoundingClientRect().top - el.getBoundingClientRect().top - el.clientTop),
        }
      })

    const atRest = await measured()
    expect(atRest.barGap).toBe(0)
    expect(atRest.range).toBeGreaterThanOrEqual(atRest.photo)

    await stage.evaluate((el) => el.scrollTo({ top: el.scrollHeight, behavior: 'instant' }))
    const atEnd = await measured()
    expect(atEnd.scrolled).toBeGreaterThanOrEqual(atRest.photo)
    expect(atEnd.barGap).toBe(0)
  })

  test('the real reduced-transparency preference beats the decorative tint and says so', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'only Chromium reads prefers-reduced-transparency')
    const session = await page.context().newCDPSession(page)
    await session.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-transparency', value: 'reduce' }],
    })
    await page.goto('/craft.html')
    const demo = page.locator('.glass-contrast')
    const bar = demo.locator('.glass-contrast-bar')
    await demo.getByRole('radio', { name: 'Decorative tint, 40%' }).check()
    expect(await barAlpha(bar)).toBe(1)
    await expect(bar).toHaveCSS('backdrop-filter', 'none')
    await expect(demo.locator('.glass-contrast-note-reduced')).toBeVisible()
  })
})

test.describe('more contrast', () => {
  test('the checkbox strengthens the card, the second line and the focus ring', async ({ page }) => {
    await page.goto('/craft.html')
    const demo = page.locator('.more-contrast-demo')
    const card = demo.locator('.more-contrast-demo-card')
    const field = demo.getByRole('textbox', { name: 'Note for the courier' })
    const toggle = demo.getByRole('checkbox', { name: 'Simulate: I prefer more contrast' })
    const colours = () =>
      demo.evaluate((el) => ({
        meta: getComputedStyle(el.querySelector('.more-contrast-demo-meta') as Element).color,
        title: getComputedStyle(el.querySelector('.more-contrast-demo-title') as Element).color,
      }))

    const before = await cardState(card)
    expect(before.shadow).not.toBe('none')
    expect(before.borderIsSystemText).toBe(false)
    const coloursBefore = await colours()
    expect(coloursBefore.meta).not.toBe(coloursBefore.title)
    await field.focus()
    await expect(field).toHaveCSS('outline-width', '3px')
    await expect(demo.locator('.more-contrast-demo-status-default')).toBeVisible()
    await expect(demo.locator('.more-contrast-demo-status-more')).toBeHidden()

    await toggle.check()
    expect(await cardState(card)).toEqual({ shadow: 'none', borderIsSystemText: true })
    const coloursAfter = await colours()
    expect(coloursAfter.meta).toBe(coloursAfter.title)
    await field.focus()
    await expect(field).toHaveCSS('outline-width', '4px')
    await expect(demo.locator('.more-contrast-demo-status-more')).toBeVisible()
    await expect(demo.locator('.more-contrast-demo-status-default')).toBeHidden()

    await toggle.uncheck()
    expect((await cardState(card)).shadow).not.toBe('none')
    await expect(demo.locator('.more-contrast-demo-status-default')).toBeVisible()
  })

  test('the field edge has 3:1 against the card before anyone asks, and the default figures are the printed ones', async ({
    page,
  }) => {
    await page.goto('/craft.html')
    const ratio = await page.locator('.more-contrast-demo').evaluate((el) => {
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) throw new Error('no 2d context')
      const luminance = (colour: string) => {
        context.clearRect(0, 0, 1, 1)
        context.fillStyle = colour
        context.fillRect(0, 0, 1, 1)
        const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map((value) => {
          const channel = value / 255
          return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
        })
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
      }
      const edge = luminance(getComputedStyle(el.querySelector('.more-contrast-demo-input') as Element).borderTopColor)
      const card = luminance(getComputedStyle(el.querySelector('.more-contrast-demo-card') as Element).backgroundColor)
      return (Math.max(edge, card) + 0.05) / (Math.min(edge, card) + 0.05)
    })
    expect(ratio).toBeGreaterThanOrEqual(3)

    const light = await measure(page, { theme: 'light', preset: '' }, token)
    const prose = await sectionText(page, 'craft-more-contrast')
    expect(prose).toContain(`a card border goes from ${printed(light.border)} to`)
    expect(prose).toContain(`subtle text from ${printed(light.subtleOnSurface)} to`)
  })

  test.describe('with the preference set', () => {
    test.use({ contextOptions: { contrast: 'more' } })

    test('the page answers without the checkbox, with the printed figures', async ({ page }) => {
      await page.goto('/craft.html')
      const demo = page.locator('.more-contrast-demo')
      await expect(demo.getByRole('checkbox', { name: 'Simulate: I prefer more contrast' })).not.toBeChecked()
      expect(await cardState(demo.locator('.more-contrast-demo-card'))).toEqual({
        shadow: 'none',
        borderIsSystemText: true,
      })
      await expect(demo.locator('.more-contrast-demo-status-more')).toBeVisible()
      await expect(demo.locator('.more-contrast-demo-status-default')).toBeHidden()

      const name = page.getByRole('textbox', { name: 'Display name' })
      await name.focus()
      await expect(name).toHaveCSS('outline-width', '4px')

      const light = await measure(page, { theme: 'light', preset: '' }, token)
      const prose = await sectionText(page, 'craft-more-contrast')
      expect(prose).toContain(`to ${printed(light.border)} against its surface`)
      expect(prose).toContain(`to ${printed(light.subtleOnSurface)}. Tick the box`)
    })
  })

  test.describe('with forced colours', () => {
    test.use({ contextOptions: { forcedColors: 'active' } })

    test('only the forced-colours sentences show', async ({ page }) => {
      await page.goto('/craft.html')
      const demo = page.locator('.more-contrast-demo')
      await expect(demo.locator('.more-contrast-demo-status-forced')).toBeVisible()
      await expect(demo.locator('.more-contrast-demo-status-default')).toBeHidden()
      await expect(demo.locator('.more-contrast-demo-status-more')).toBeHidden()
      await demo.getByRole('checkbox', { name: 'Simulate: I prefer more contrast' }).check()
      await expect(demo.locator('.more-contrast-demo-status-forced')).toBeVisible()
      await expect(demo.locator('.more-contrast-demo-status-more')).toBeHidden()

      const glass = page.locator('.glass-contrast')
      await expect(glass.locator('.glass-contrast-note-forced')).toBeVisible()
      await expect(glass.locator('.glass-contrast-note-reduced')).toBeHidden()
    })
  })
})

test.describe('text field', () => {
  function fieldEdge(field: Locator, scheme: { theme: string; preset: string }, invalid: boolean) {
    return field.evaluate(
      (input, { theme, preset, invalid }) => {
        const root = document.documentElement
        if (theme) root.dataset.theme = theme
        else delete root.dataset.theme
        if (preset) root.dataset.preset = preset
        else delete root.dataset.preset

        if (invalid) input.setAttribute('aria-invalid', 'true')
        else input.removeAttribute('aria-invalid')

        const canvas = document.createElement('canvas')
        canvas.width = 1
        canvas.height = 1
        const context = canvas.getContext('2d', { willReadFrequently: true })
        if (!context) throw new Error('no 2d context')
        const paint = (colour: string) => {
          context.clearRect(0, 0, 1, 1)
          context.fillStyle = colour
          context.fillRect(0, 0, 1, 1)
          return [...context.getImageData(0, 0, 1, 1).data]
        }
        const luminance = (pixel: number[]) => {
          const [r, g, b] = pixel.slice(0, 3).map((value) => {
            const channel = value / 255
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
          })
          return 0.2126 * r + 0.7152 * g + 0.0722 * b
        }
        const ratio = (a: number[], b: number[]) => {
          const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x)
          return (lighter + 0.05) / (darker + 0.05)
        }

        let backdrop = input.parentElement
        while (backdrop && paint(getComputedStyle(backdrop).backgroundColor)[3] < 255) {
          backdrop = backdrop.parentElement
        }
        if (!backdrop) throw new Error('no opaque backdrop')

        const style = getComputedStyle(input)
        const edge = paint(style.borderTopColor)
        const result = {
          colour: style.borderTopColor,
          width: style.borderTopWidth,
          fill: ratio(edge, paint(style.backgroundColor)),
          backdrop: ratio(edge, paint(getComputedStyle(backdrop).backgroundColor)),
        }
        input.removeAttribute('aria-invalid')
        return result
      },
      { ...scheme, invalid },
    )
  }

  test('the resting, invalid and valid edges reach 3:1 against the fill and the backdrop in every scheme', async ({
    page,
  }) => {
    await page.goto('/craft.html')
    const field = page.getByRole('textbox', { name: 'Display name' })
    const resting = new Map<string, string>()

    for (const scheme of schemes) {
      const edge = await fieldEdge(field, scheme, false)
      resting.set(scheme.name, edge.colour)
      expect(edge.width, `${scheme.name}: resting edge`).toBe('1px')
      expect(Math.min(edge.fill, edge.backdrop), `${scheme.name}: resting edge`).toBeGreaterThanOrEqual(3)

      const invalid = await fieldEdge(field, scheme, true)
      expect(invalid.width, `${scheme.name}: invalid edge`).toBe('2px')
      expect(Math.min(invalid.fill, invalid.backdrop), `${scheme.name}: invalid edge`).toBeGreaterThanOrEqual(3)
    }

    await field.pressSequentially('Ada')
    await page.keyboard.press('Tab')
    expect(await field.evaluate((el) => el.matches(':user-valid'))).toBe(true)

    for (const scheme of schemes) {
      const valid = await fieldEdge(field, scheme, false)
      expect(valid.width, `${scheme.name}: valid edge`).toBe('1px')
      expect(valid.colour, `${scheme.name}: valid edge`).not.toBe(resting.get(scheme.name))
      expect(Math.min(valid.fill, valid.backdrop), `${scheme.name}: valid edge`).toBeGreaterThanOrEqual(3)
    }
  })
})

test.describe('form controls', () => {
  function failingControls(page: Page, scheme: { theme: string; preset: string }) {
    return page.evaluate(({ theme, preset }) => {
      const root = document.documentElement
      if (theme) root.dataset.theme = theme
      else delete root.dataset.theme
      if (preset) root.dataset.preset = preset
      else delete root.dataset.preset

      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) throw new Error('no 2d context')
      const paint = (...layers: string[]) => {
        context.clearRect(0, 0, 1, 1)
        for (const layer of layers) {
          context.fillStyle = layer
          context.fillRect(0, 0, 1, 1)
        }
        return [...context.getImageData(0, 0, 1, 1).data]
      }
      const luminance = (pixel: number[]) => {
        const [r, g, b] = pixel.slice(0, 3).map((value) => {
          const channel = value / 255
          return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
        })
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
      }
      const ratio = (a: number[], b: number[]) => {
        const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x)
        return (lighter + 0.05) / (darker + 0.05)
      }
      const backdropLayers = (element: Element) => {
        const layers: string[] = []
        for (let node = element.parentElement; node; node = node.parentElement) {
          const colour = getComputedStyle(node).backgroundColor
          layers.unshift(colour)
          if (paint(colour)[3] === 255) return layers
        }
        throw new Error('no opaque backdrop')
      }

      const selector = 'input:not([type=checkbox], [type=radio], [type=range], [type=hidden]), textarea, select'
      const controls = [...document.querySelectorAll<HTMLInputElement>(selector)].filter(
        (control) =>
          control.type !== 'submit' &&
          control.type !== 'button' &&
          !control.disabled &&
          !control.closest('[inert]') &&
          control.checkVisibility({ visibilityProperty: true }),
      )

      const failures = controls.flatMap((control) => {
        const drawn =
          control.matches('select') && getComputedStyle(control).appearance === 'base-select'
            ? (control.querySelector('button') ?? control)
            : control
        const style = getComputedStyle(drawn)
        const layers = backdropLayers(drawn)
        const backdrop = paint(...layers)
        const fill = control.type === 'color' ? backdrop : paint(...layers, style.backgroundColor)
        const edge = paint(...layers, style.borderTopColor)
        const fillShowsIt = ratio(fill, backdrop) >= 3
        const edgeShowsIt = parseFloat(style.borderTopWidth) > 0 && Math.min(ratio(edge, fill), ratio(edge, backdrop)) >= 3
        if (fillShowsIt || edgeShowsIt) return []
        const name = control.labels?.[0]?.childNodes[0]?.textContent?.trim() || control.className
        return [`${name}: ${ratio(edge, backdrop).toFixed(2)}:1`]
      })
      return { checked: controls.length, failures }
    }, scheme)
  }

  async function openPage(page: Page, path: string) {
    await page.goto(path)
    await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' })
    await page.evaluate(() => {
      for (const details of document.querySelectorAll('details')) details.open = true
    })
  }

  for (const path of ['/standard.html', '/craft.html', '/showcase.html', '/proof.html']) {
    test(`every text control and select on ${path} shows its edge at 3:1 in every scheme`, async ({ page }) => {
      await openPage(page, path)
      for (const scheme of schemes) {
        const { checked, failures } = await failingControls(page, scheme)
        expect(checked, `${scheme.name}: controls found`).toBeGreaterThan(0)
        expect(failures, scheme.name).toEqual([])
      }
    })
  }

  test('the patient field keeps 3:1 once it settles on valid or invalid, in every scheme', async ({ page }) => {
    await openPage(page, '/showcase.html')
    const patient = page.locator('.user-valid-input-patient')
    for (const value of ['ada@example.com', 'not an address']) {
      await patient.fill(value)
      await patient.blur()
      for (const scheme of schemes) {
        expect((await failingControls(page, scheme)).failures, `${value}, ${scheme.name}`).toEqual([])
      }
    }
  })

  test('the custom select keeps 3:1 on every status, in every scheme', async ({ page }) => {
    await openPage(page, '/showcase.html')
    const select = page.locator('select.custom-select')
    const values = await select.locator('option').evaluateAll((options) =>
      options.map((option) => (option as HTMLOptionElement).value),
    )
    expect(values.length).toBeGreaterThan(1)
    for (const value of values) {
      await select.selectOption(value)
      for (const scheme of schemes) {
        expect((await failingControls(page, scheme)).failures, `${value}, ${scheme.name}`).toEqual([])
      }
    }
  })
})

declare global {
  interface Window {
    contrast: {
      resolve(value: string): string
      paint(...layers: string[]): number[]
      ratio(a: number[], b: number[]): number
      layersUnder(element: Element): string[]
    }
  }
}

function installContrast() {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) throw new Error('no 2d context')
  const paint = (...layers: string[]) => {
    context.clearRect(0, 0, 1, 1)
    for (const layer of layers) {
      context.fillStyle = layer
      context.fillRect(0, 0, 1, 1)
    }
    return [...context.getImageData(0, 0, 1, 1).data]
  }
  const luminance = (pixel: number[]) => {
    const [r, g, b] = pixel.slice(0, 3).map((value) => {
      const channel = value / 255
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const ratio = (a: number[], b: number[]) => {
    const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x)
    return (lighter + 0.05) / (darker + 0.05)
  }
  const resolve = (value: string) => {
    const probe = document.createElement('div')
    document.body.append(probe)
    probe.style.backgroundColor = value
    const resolved = getComputedStyle(probe).backgroundColor
    probe.remove()
    return resolved
  }
  const layersUnder = (element: Element) => {
    const layers: string[] = []
    for (let node: Element | null = element; node; node = node.parentElement) {
      const colour = getComputedStyle(node).backgroundColor
      layers.unshift(colour)
      if (paint(colour)[3] === 255) return layers
    }
    throw new Error('no opaque backdrop')
  }
  window.contrast = { resolve, paint, ratio, layersUnder }
}

test.describe('text', () => {
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
    '/evaluation.html',
    '/privacy.html',
    '/impressum.html',
    '/404.html',
  ]

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(installContrast)
  })

  async function openWithoutGrid(page: Page, path: string) {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(path, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' })
    await page.evaluate(() => {
      for (const details of document.querySelectorAll('details')) details.open = true
      for (const element of document.querySelectorAll<HTMLElement>('*')) {
        if (getComputedStyle(element).backgroundSize.startsWith('28px')) element.style.backgroundImage = 'none'
      }
    })
  }

  async function useScheme(page: Page, scheme: { theme: string; preset: string }) {
    await page.evaluate(({ theme, preset }) => {
      const root = document.documentElement
      if (theme) root.dataset.theme = theme
      else delete root.dataset.theme
      if (preset) root.dataset.preset = preset
      else delete root.dataset.preset
      return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    }, scheme)
  }

  async function axeFailures(page: Page, scheme: { name: string }, selector?: string) {
    const builder = new AxeBuilder({ page }).withRules(['color-contrast']).exclude('iframe')
    if (selector) builder.include(selector)
    const { violations } = await builder.analyze()
    return violations.flatMap((violation) =>
      violation.nodes.map((node) => `${scheme.name}: ${node.target.join(' ')} at ${node.any[0]?.data?.contrastRatio}:1`),
    )
  }

  function placeholderFailures(page: Page, scheme: { name: string }) {
    return page.evaluate((name) => {
      const { paint, ratio, layersUnder } = window.contrast
      const fields = [...document.querySelectorAll<HTMLInputElement>('input[placeholder], textarea[placeholder]')].filter(
        (field) => field.placeholder.trim() && field.checkVisibility({ visibilityProperty: true }),
      )
      return fields.flatMap((field) => {
        const placeholder = getComputedStyle(field, '::placeholder')
        const under = layersUnder(field)
        const text = `rgb(from ${placeholder.color} r g b / calc(alpha * ${placeholder.opacity}))`
        const measured = ratio(paint(...under, text), paint(...under))
        return measured >= 4.5
          ? []
          : [`${name}: ${field.className || field.name || field.placeholder} placeholder at ${measured.toFixed(2)}:1`]
      })
    }, scheme.name)
  }

  for (const path of pages) {
    test(`text on ${path} reaches its ratio in every scheme, with the grid removed so axe can decide`, async ({
      page,
    }) => {
      await openWithoutGrid(page, path)
      const failures: string[] = []
      for (const scheme of schemes) {
        await useScheme(page, scheme)
        failures.push(...(await axeFailures(page, scheme)), ...(await placeholderFailures(page, scheme)))
      }
      expect(failures).toEqual([])
    })
  }

  for (const [path, selector] of [
    ['/', '.hub-plate'],
    ['/', '.hub-sheet'],
    ['/standard.html', '.chapter-nav'],
    ['/audit-room.html', '.practice-room-nav'],
  ] as const) {
    test(`${selector} on ${path} keeps its text at 4.5:1 on hover, in every scheme`, async ({ page }) => {
      await openWithoutGrid(page, path)
      const target = page.locator(selector).first()
      await target.scrollIntoViewIfNeeded()
      await target.hover()
      const failures: string[] = []
      for (const scheme of schemes) {
        await useScheme(page, scheme)
        failures.push(...(await axeFailures(page, scheme, selector)))
      }
      expect(failures).toEqual([])
    })
  }

  test('accent and redline ink keep 4.5:1 on the sheet, the soft tint and a grid line, in every scheme', async ({
    page,
  }) => {
    await page.goto('/craft.html')
    for (const scheme of schemes) {
      await useScheme(page, scheme)
      const worst = await page.evaluate(() => {
        const { resolve, paint, ratio } = window.contrast
        const sheet = resolve('var(--bp-sheet)')
        const line = resolve('var(--bp-line)')
        const tint = resolve('var(--bp-accent-soft)')
        const grounds = [paint(sheet), paint(sheet, line), paint(sheet, tint), paint(sheet, line, tint)]
        const worstOn = (ink: string) => Math.min(...grounds.map((ground) => ratio(paint(sheet, resolve(ink)), ground)))
        return { accent: worstOn('var(--bp-accent-ink)'), redline: worstOn('var(--bp-redline-ink)') }
      })
      expect(worst.accent, `${scheme.name}: accent ink`).toBeGreaterThanOrEqual(4.5)
      expect(worst.redline, `${scheme.name}: redline ink`).toBeGreaterThanOrEqual(4.5)
    }
  })

  test('the snap cards and the shape banner tag keep 4.5:1 along the accent gradient, in every scheme', async ({
    page,
  }) => {
    await page.goto('/showcase.html')
    for (const scheme of schemes) {
      await useScheme(page, scheme)
      const worst = await page.evaluate(() => {
        const { resolve, paint, ratio } = window.contrast
        const style = (selector: string) => getComputedStyle(document.querySelector(selector)!)
        const faded = (colour: string, opacity: string) => `rgb(from ${colour} r g b / calc(alpha * ${opacity}))`
        const cardText = style('.snap-card-label').color
        const cardNumber = faded(style('.snap-card-n').color, style('.snap-card-n').opacity)
        const tag = style('.shape-banner-tag')
        let card = Infinity
        let banner = Infinity
        for (const space of ['srgb', 'oklab']) {
          for (let share = 0; share <= 100; share += 10) {
            const stop = resolve(`color-mix(in ${space}, var(--color-primary) ${share}%, var(--color-accent))`)
            card = Math.min(card, ratio(paint(stop, cardText), paint(stop)), ratio(paint(stop, cardNumber), paint(stop)))
            banner = Math.min(banner, ratio(paint(stop, tag.backgroundColor, tag.color), paint(stop, tag.backgroundColor)))
          }
        }
        return { card, banner }
      })
      expect(worst.card, `${scheme.name}: snap card text`).toBeGreaterThanOrEqual(4.5)
      expect(worst.banner, `${scheme.name}: shape banner tag`).toBeGreaterThanOrEqual(4.5)
    }
  })

  test('text in the first What changed row keeps 4.5:1 where its tint is strongest, in every scheme', async ({
    page,
  }) => {
    await page.goto('/')
    for (const scheme of schemes) {
      await useScheme(page, scheme)
      const failures = await page.evaluate((name) => {
        const { resolve, paint, ratio, layersUnder } = window.contrast
        const row = document.querySelector('.hub-revision:first-child')!
        const under = [...layersUnder(row), resolve('var(--bp-accent-soft)')]
        const texts = [...row.querySelectorAll('*')].filter((element) =>
          [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()),
        )
        return texts.flatMap((element) => {
          const colour = getComputedStyle(element).color
          const measured = ratio(paint(...under, colour), paint(...under))
          return measured >= 4.5 ? [] : [`${name}: ${element.className} at ${measured.toFixed(2)}:1`]
        })
      }, scheme.name)
      expect(failures).toEqual([])
    }
  })

  test('the sentence in the inert example keeps 4.5:1, with only its button dimmed, in every scheme', async ({
    page,
  }) => {
    await page.goto('/craft.html')
    for (const scheme of schemes) {
      await useScheme(page, scheme)
      const measured = await page.evaluate(() => {
        const { paint, ratio, layersUnder } = window.contrast
        const sentence = document.querySelector('.hiding-example-inert p')!
        let opacity = 1
        for (let node: Element | null = sentence; node; node = node.parentElement) {
          opacity *= Number(getComputedStyle(node).opacity)
        }
        const under = layersUnder(sentence)
        const text = `rgb(from ${getComputedStyle(sentence).color} r g b / calc(alpha * ${opacity}))`
        return ratio(paint(...under, text), paint(...under))
      })
      expect(measured, scheme.name).toBeGreaterThanOrEqual(4.5)
    }
  })
})
