import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('../../', import.meta.url))
const page = readFileSync(`${root}src/site/StatementView/StatementView.vue`, 'utf8')
const repositoryFile = readFileSync(`${root}ACCESSIBILITY.md`, 'utf8')
const reviewed = /Last\s+reviewed\s+on\s+(\d{1,2}\s+\w+\s+\d{4})/

describe('accessibility statement', () => {
  it('carries the same review date on the site and in the repository', () => {
    const onPage = page.match(reviewed)?.[1].replace(/\s+/g, ' ')
    const inRepository = repositoryFile.match(reviewed)?.[1].replace(/\s+/g, ' ')
    expect(onPage).toBeDefined()
    expect(inRepository).toBe(onPage)
  })
})
