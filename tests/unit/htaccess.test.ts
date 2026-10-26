import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const htaccess = readFileSync(fileURLToPath(new URL('../../public/.htaccess', import.meta.url)), 'utf8')

describe('the server rules for the agent files', () => {
  it('serve the markdown and llms.txt as UTF-8', () => {
    const charset = htaccess.match(/^AddCharset utf-8 (.+)$/m)?.[1].split(/\s+/) ?? []
    expect(charset).toEqual(expect.arrayContaining(['.md', '.txt']))
  })

  it('send the /llms folder to llms.txt instead of a 403', () => {
    expect(htaccess).toMatch(/^\s*RewriteRule \^llms\/\?\$ \/llms\.txt \[R=302,L\]$/m)
  })
})
