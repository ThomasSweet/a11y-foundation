import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = resolve(import.meta.dirname, '..')
const ssrOut = resolve(root, 'dist-ssr')
const marker = '<div id="app"></div>'

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entries/prerender.ts', outDir: ssrOut, emptyOutDir: true },
})

const { views, render } = await import(pathToFileURL(resolve(ssrOut, 'prerender.js')).href)

for (const name of Object.keys(views)) {
  const file = resolve(root, 'dist', `${name}.html`)
  const shell = readFileSync(file, 'utf8')
  if (!shell.includes(marker)) throw new Error(`prerender: no mount point in ${name}.html`)
  writeFileSync(file, shell.replace(marker, `<div id="app">${await render(name)}</div>`))
}

rmSync(ssrOut, { recursive: true, force: true })
console.log(`prerender: injected ${Object.keys(views).length} pages`)
