import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('../../', import.meta.url))
const tokens = readFileSync(`${root}src/styles/tokens.css`, 'utf8')
const desk = tokens.match(/--color-bg-subtle:\s*(light-dark\([^)]*\));/)?.[1]

const entries = readdirSync(root)
  .filter((name) => name.endsWith('.html'))
  .map((name) => ({ name, html: readFileSync(`${root}${name}`, 'utf8') }))
  .filter(({ html }) => html.includes('src="/src/entries/'))

describe('boot ground', () => {
  it('paints the desk colour from tokens.css before the stylesheet arrives', () => {
    expect(desk).toBeDefined()
    expect(entries.length).toBeGreaterThan(0)
    for (const { name, html } of entries) {
      expect(html.match(/--boot-ground:\s*(light-dark\([^)]*\));/)?.[1], name).toBe(desk)
    }
  })
})
