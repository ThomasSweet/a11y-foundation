/**
 * gen-baseline-icons
 *
 * Extracts the official Baseline status icons, browser logos, and support
 * marks from the web-platform-dx/baseline-status component (the widget MDN
 * and web.dev use) into a single SVG sprite:
 * src/showcases/BaselineBadge/baseline-sprite.svg
 *
 * A sprite because the logos are heavy (Safari alone ~20 kB): each icon is
 * defined once and every badge references it with <use>, instead of 25
 * badges × 4 logos of inline duplication.
 *
 * Internal ids (gradients/clips) are namespaced per icon so they can't
 * collide inside the one sprite document — a technical adaptation only; the
 * artwork is unchanged (Baseline assets are CC BY-ND; logos must not be
 * visually altered).
 *
 * Run manually (`node scripts/gen-baseline-icons.mjs`) when upstream
 * changes; the sprite is committed. Network fetch, so NOT part of the build.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const BASE = 'https://raw.githubusercontent.com/web-platform-dx/baseline-status/main/'

const iconSrc = await (await fetch(BASE + 'baseline-icon.js')).text()
const statusSrc = await (await fetch(BASE + 'baseline-status.js')).text()

/** Pull the first <svg>…</svg> after `key: html\`` in source. */
function extract(src, key) {
  const m = src.match(new RegExp(`'?${key}'?: html\\\`\\s*(<svg[\\s\\S]*?</svg>)`))
  if (!m) throw new Error(`icon not found: ${key}`)
  return m[1]
}

/** Outer <svg> → <symbol id> (keeps/derives viewBox), namespaces inner ids. */
function toSymbol(svg, id) {
  const open = svg.match(/<svg[^>]*>/)[0]
  const inner = svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
  let viewBox = open.match(/viewBox="([^"]+)"/)?.[1]
  if (!viewBox) {
    const w = open.match(/width="(\d+)"/)?.[1]
    const h = open.match(/height="(\d+)"/)?.[1]
    viewBox = `0 0 ${w} ${h}`
  }
  const namespaced = inner
    .replaceAll(/id="([\w-]+)"/g, `id="${id}-$1"`)
    .replaceAll(/url\(#([\w-]+)\)/g, `url(#${id}-$1)`)
    .replaceAll(/href="#([\w-]+)"/g, `href="#${id}-$1"`)
  return `<symbol id="${id}" viewBox="${viewBox}">${namespaced}</symbol>`
}

const symbols = [
  toSymbol(extract(iconSrc, 'widely'), 'bl-widely'),
  toSymbol(extract(iconSrc, 'newly'), 'bl-newly'),
  toSymbol(extract(iconSrc, 'limited'), 'bl-limited'),
  toSymbol(extract(statusSrc, 'chrome'), 'bl-chrome'),
  toSymbol(extract(statusSrc, 'edge'), 'bl-edge'),
  toSymbol(extract(statusSrc, 'firefox'), 'bl-firefox'),
  toSymbol(extract(statusSrc, 'safari'), 'bl-safari'),
  toSymbol(extract(statusSrc, 'available'), 'bl-available'),
  toSymbol(extract(statusSrc, 'unavailable'), 'bl-unavailable'),
]

const out = fileURLToPath(
  new URL('../src/showcases/BaselineBadge/baseline-sprite.svg', import.meta.url),
)
writeFileSync(out, `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('\n')}</svg>\n`)
console.log(`gen-baseline-icons: wrote ${symbols.length} symbols to baseline-sprite.svg`)
