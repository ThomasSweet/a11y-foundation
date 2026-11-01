import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('../../', import.meta.url))
const order = readFileSync(`${root}src/styles/layers.css`, 'utf8').trim()

const heads = readdirSync(root)
  .filter((name) => name.endsWith('.html'))
  .concat('checks/index.html')
  .map((name) => [name, readFileSync(`${root}${name}`, 'utf8')] as const)

describe('the layer order in each page head', () => {
  it('is checked on every page', () => {
    expect(heads.length).toBeGreaterThanOrEqual(15)
  })

  it.each(heads)('%s states it before any other CSS, the same as layers.css', (_, html) => {
    const [, firstStyle = ''] = html.match(/<style>([\s\S]*?)<\/style>/) ?? []
    expect(firstStyle.trim().slice(0, order.length)).toBe(order)

    const stylesheet = html.search(/<link[^>]+rel="stylesheet"/)
    if (stylesheet !== -1) expect(html.indexOf('<style>')).toBeLessThan(stylesheet)
  })
})
