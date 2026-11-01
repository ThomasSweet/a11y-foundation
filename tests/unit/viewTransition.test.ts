import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('../../', import.meta.url))
const heads = readdirSync(root)
  .filter((file) => file.endsWith('.html'))
  .concat('checks/index.html')
  .map((file) => [file, readFileSync(root + file, 'utf8')] as const)
  .filter(([, html]) => html.includes('@view-transition'))
const baseCss = readFileSync(root + 'src/styles/base.css', 'utf8')

const hideBody = /:root:active-view-transition-type\(page\) body\s*\{\s*visibility:\s*hidden;\s*\}/
const showBody = /:root:active-view-transition-type\(page\) body\s*\{\s*visibility:\s*visible;\s*\}/

const enclosingBlocks = (css: string, at: number) => {
  const open: string[] = []
  let start = 0
  for (let index = 0; index < at; index++) {
    if (css[index] === '{') {
      open.push(css.slice(start, index).trim())
      start = index + 1
    } else if (css[index] === '}') {
      open.pop()
      start = index + 1
    } else if (css[index] === ';') {
      start = index + 1
    }
  }
  return open
}

const layerOf = (css: string, rule: RegExp) => {
  const at = css.search(rule)
  return at < 0 ? undefined : enclosingBlocks(css, at).find((prelude) => prelude.startsWith('@layer'))
}

const styleHolding = (html: string, rule: RegExp) =>
  [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(([, css]) => css).find((css) => rule.test(css)) ?? ''

describe('the cross-document view transition opt-in in each page head', () => {
  it('is on the chapter and sheet pages', () => {
    expect(heads.length).toBeGreaterThanOrEqual(10)
  })

  it.each(heads)('carries the page type in %s, so Chrome keeps it', (_, html) => {
    expect(html.match(/@view-transition\s*\{[^}]*\}/)?.[0]).toMatch(/types:\s*page\s*;/)
  })

  it.each(heads)('never paints over the live page in %s', (_, html) => {
    expect(html).not.toMatch(/::view-transition\s*\{[^}]*background/)
  })

  it.each(heads)('hides the body in %s until the bundled styles arrive', (_, html) => {
    expect(html).toMatch(hideBody)
  })

  it.each(heads)('hides the body in %s from the base layer, where base.css can undo it', (_, html) => {
    expect(layerOf(styleHolding(html, hideBody), hideBody)).toBe('@layer base')
  })

  it('is answered by base.css, which shows the body again', () => {
    expect(baseCss).toMatch(showBody)
  })

  it('is answered from the same layer, so the later stylesheet wins', () => {
    expect(layerOf(baseCss, showBody)).toBe('@layer base')
  })
})
