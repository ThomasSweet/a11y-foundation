import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('../../', import.meta.url))
const heads = readdirSync(root)
  .filter((file) => file.endsWith('.html'))
  .map((file) => [file, readFileSync(root + file, 'utf8')] as const)
  .filter(([, html]) => html.includes('@view-transition'))
const baseCss = readFileSync(root + 'src/styles/base.css', 'utf8')

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
    expect(html).toMatch(/:root:active-view-transition-type\(page\) body\s*\{\s*visibility:\s*hidden;\s*\}/)
  })

  it('is answered by base.css, which shows the body again', () => {
    expect(baseCss).toMatch(/:root:active-view-transition-type\(page\) body\s*\{\s*visibility:\s*visible;\s*\}/)
  })
})
