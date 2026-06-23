import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

// Each showcase lives in its own folder under demos/ — XDemo/XDemo.vue plus at
// least one portable excerpt (XDemo.snippet.html / .css / .js) for the "Show
// the code" panel. This guard keeps a new showcase from landing without one.
// A filesystem check (not a registry import) keeps the test in the fast node
// environment: the registry pulls in .vue components, which need the Vue plugin.
const demosDir = fileURLToPath(
  new URL('../../src/showcases/demos', import.meta.url),
)
const demoFolders = readdirSync(demosDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && /Demo$/.test(e.name))
  .map((e) => e.name)

describe('showcase folders', () => {
  it('finds the demo folders', () => {
    expect(demoFolders.length).toBeGreaterThan(0)
  })

  it.each(demoFolders)('%s holds its component and a code snippet', (folder) => {
    const files = readdirSync(`${demosDir}/${folder}`)
    expect(files, `${folder}/ is missing ${folder}.vue`).toContain(`${folder}.vue`)

    const hasSnippet = ['html', 'css', 'js'].some((ext) =>
      files.includes(`${folder}.snippet.${ext}`),
    )
    expect(
      hasSnippet,
      `${folder}/ is missing a ${folder}.snippet.{html,css,js} file for the "Show the code" panel`,
    ).toBe(true)
  })
})
