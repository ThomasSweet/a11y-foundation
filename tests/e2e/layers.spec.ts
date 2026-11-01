import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { test, expect } from '@playwright/test'

const root = fileURLToPath(new URL('../../', import.meta.url))
const pages = readdirSync(root)
  .filter((name) => name.endsWith('.html'))
  .map((name) => `/${name}`)
  .concat('/checks/')

test('the page list covers every page', () => {
  expect(pages.length).toBeGreaterThanOrEqual(15)
})

for (const path of pages) {
  test(`every rule ${path} loads sits in a layer`, async ({ page }) => {
    await page.goto(path)
    const { sheets, unlayered } = await page.evaluate(() => {
      const outside = (rules: CSSRuleList): string[] =>
        [...rules].flatMap((rule) => {
          if (rule instanceof CSSLayerBlockRule || rule instanceof CSSLayerStatementRule) return []
          if (rule instanceof CSSGroupingRule && !(rule instanceof CSSStyleRule)) return outside(rule.cssRules)
          return [rule.cssText.slice(0, 120)]
        })
      const loaded = [...document.styleSheets]
      return { sheets: loaded.length, unlayered: loaded.flatMap((sheet) => outside(sheet.cssRules)) }
    })
    expect(sheets).toBeGreaterThan(0)
    expect(unlayered).toEqual([])
  })
}
