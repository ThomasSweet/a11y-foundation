/**
 * Brand asset generator — favicon, PWA icons, apple-touch icon, OG image.
 *
 * The mark ("a11y" drafted: compass-drawn a, twin rules as the 11, straight-
 * edge y) is defined ONCE below; favicon.svg and every PNG are emitted from
 * it, so the assets can never drift apart. The header mark in SiteFrame.vue
 * inlines the same geometry to inherit the live theme — if the mark changes,
 * update it there too (the one intentional duplicate, for theme inheritance).
 *
 * No native rasteriser is available, so PNGs are rendered by screenshotting
 * Playwright's bundled Chromium at exact pixel dimensions.
 *
 * Run:  node scripts/gen-icons.mjs
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'public')

// Default-theme brand colors (the in-site header mark follows the live theme
// instead; these statics are for contexts that can't know it).
const INK_LIGHT = '#1a1a1a'
const INK_DARK = '#f2f2f2'
const ACCENT_LIGHT = 'oklch(52% 0.16 260deg)'
const ACCENT_DARK = 'oklch(72% 0.15 250deg)'
const PAPER = '#f5f5f5'

/** The v3 mark, in a 64×64 box: baseline 46, x-height 26, symmetric
 *  overshoots; content spans x 3.6–62, y 18.4–58.6 (center 32.8, 38.5). */
const mark = (ink, accent) => `
  <circle cx="13.6" cy="36" r="8.4" fill="none" stroke="${ink}" stroke-width="3.2"/>
  <path d="M22 22.5 V49.5" fill="none" stroke="${ink}" stroke-width="3.2"/>
  <circle cx="13.6" cy="36" r="1.8" fill="${accent}"/>
  <path d="M30.7 20 V52" fill="none" stroke="${accent}" stroke-width="3.2"/>
  <path d="M40.4 20 V52" fill="none" stroke="${accent}" stroke-width="3.2"/>
  <path d="M48 26.5 L54.2 46" fill="none" stroke="${ink}" stroke-width="3.2"/>
  <path d="M60.4 26.5 L50.7 57" fill="none" stroke="${ink}" stroke-width="3.2"/>`

// --- favicon.svg: scheme-adaptive, transparent ground ---------------------
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Accessible by default">
  <style>
    .ink { stroke: ${INK_LIGHT}; }
    .acc { stroke: ${ACCENT_LIGHT}; }
    .prk { fill: ${ACCENT_LIGHT}; }
    @media (prefers-color-scheme: dark) {
      .ink { stroke: ${INK_DARK}; }
      .acc { stroke: ${ACCENT_DARK}; }
      .prk { fill: ${ACCENT_DARK}; }
    }
  </style>
  <g fill="none" stroke-width="3.2">
    <circle class="ink" cx="13.6" cy="36" r="8.4"/>
    <path class="ink" d="M22 22.5 V49.5"/>
    <path class="acc" d="M30.7 20 V52"/>
    <path class="acc" d="M40.4 20 V52"/>
    <path class="ink" d="M48 26.5 L54.2 46"/>
    <path class="ink" d="M60.4 26.5 L50.7 57"/>
  </g>
  <circle class="prk" cx="13.6" cy="36" r="1.8" stroke="none"/>
</svg>
`
writeFileSync(resolve(out, 'favicon.svg'), favicon)
console.log('✓ favicon.svg')

// --- Maskable tile: paper + faint grid, mark inside the safe zone ---------
// (No frame or reg ticks: round masks would slice them; the grid crops
// gracefully. Mark width 56/100 keeps every corner inside the r=40 circle.)
const tile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="${PAPER}"/>
  <path d="M0 12.5 H100 M0 37.5 H100 M0 62.5 H100 M0 87.5 H100
           M12.5 0 V100 M37.5 0 V100 M62.5 0 V100 M87.5 0 V100"
    stroke="oklch(52% 0.16 260deg / 0.10)" stroke-width="1" fill="none"/>
  <g transform="translate(50 50) scale(0.958) translate(-32.8 -38.5)">${mark(INK_LIGHT, ACCENT_LIGHT)}</g>
</svg>`

const iconPage = (svg) =>
  `<!doctype html><meta charset="utf-8"><style>*{margin:0}html,body{width:100%;height:100%}svg{display:block;width:100vw;height:100vh}</style>${svg}`

// --- OG image: the link preview is itself a drawing sheet -----------------
const ogMark = `<svg viewBox="0 0 64 44" width="310" style="overflow:visible">
  <g transform="translate(0 -16)">${mark(INK_LIGHT, ACCENT_LIGHT)}</g>
</svg>`

const ogPage = `<!doctype html><meta charset="utf-8"><style>
  *{margin:0;box-sizing:border-box}
  html,body{width:1200px;height:630px}
  body{background:${PAPER};color:${INK_LIGHT};font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
    position:relative;padding:64px 90px 0;
    background-image:linear-gradient(oklch(52% 0.16 260deg / 0.05) 1px, transparent 1px),
      linear-gradient(90deg, oklch(52% 0.16 260deg / 0.05) 1px, transparent 1px);
    background-size:42px 42px;background-position:-1px -1px}
  .frame{position:absolute;inset:14px;outline:2px solid oklch(52% 0.16 260deg / 0.42);pointer-events:none}
  .reg{position:absolute;width:22px;height:22px;border:0 solid oklch(52% 0.16 260deg)}
  .tl{top:6px;left:6px;border-top-width:3px;border-left-width:3px}
  .br{bottom:6px;right:6px;border-bottom-width:3px;border-right-width:3px}
  .dim{position:relative;width:310px;height:20px;margin:14px 0 26px}
  .dim .line{position:absolute;inset-inline:0;top:9px;border-top:3px solid oklch(52% 0.16 260deg)}
  .dim .ext{position:absolute;top:0;height:20px;border-left:2.5px solid ${INK_LIGHT}}
  .dim .tick{position:absolute;top:8.5px;width:18px;border-top:2.5px solid oklch(52% 0.16 260deg);transform:rotate(-45deg)}
  h1{font-size:72px;line-height:1.02;font-weight:800;letter-spacing:-.02em}
  .sub{margin-top:14px;font:22px ui-monospace,'SF Mono',Menlo,monospace;color:#4a4a4a;letter-spacing:.01em;max-width:52ch}
  .tb{position:absolute;left:40px;right:40px;bottom:36px;display:flex;border:2px solid oklch(52% 0.16 260deg / 0.42)}
  .tb div{flex:1;padding:12px 18px;border-right:1.5px solid oklch(52% 0.16 260deg / 0.3)}
  .tb div:last-child{border-right:0}
  .tb .l{display:block;font:600 13px ui-monospace,Menlo,monospace;letter-spacing:.12em;color:#6a6a6a;text-transform:uppercase}
  .tb .v{display:block;margin-top:4px;font:600 19px ui-monospace,Menlo,monospace;letter-spacing:.04em;text-transform:uppercase}
</style>
<span class="frame"></span><span class="reg tl"></span><span class="reg br"></span>
${ogMark}
<div class="dim"><span class="ext" style="left:0"></span><span class="ext" style="right:0"></span>
  <span class="line"></span><span class="tick" style="left:-9px"></span><span class="tick" style="right:-9px"></span></div>
<h1>Accessible by default</h1>
<p class="sub">How much of accessibility the web platform handles natively — with little to no JavaScript.</p>
<div class="tb">
  <div style="flex:1.7"><span class="l">Project</span><span class="v">accessible-by-default.dev</span></div>
  <div><span class="l">Drawn by</span><span class="v">Thomas Sweet</span></div>
  <div><span class="l">Scale</span><span class="v">1:1</span></div>
  <div><span class="l">Sheet</span><span class="v">00 · Index</span></div>
</div>`

const jobs = [
  { name: 'apple-touch-icon.png', w: 180, h: 180, html: iconPage(tile) },
  { name: 'icon-192.png', w: 192, h: 192, html: iconPage(tile) },
  { name: 'icon-512.png', w: 512, h: 512, html: iconPage(tile) },
  { name: 'og-image.png', w: 1200, h: 630, html: ogPage },
]

const browser = await chromium.launch()
for (const job of jobs) {
  const page = await browser.newPage({
    viewport: { width: job.w, height: job.h },
    deviceScaleFactor: 1,
  })
  await page.setContent(job.html, { waitUntil: 'networkidle' })
  await page.screenshot({ path: resolve(out, job.name), type: 'png' })
  await page.close()
  console.log(`✓ ${job.name} (${job.w}×${job.h})`)
}
await browser.close()
