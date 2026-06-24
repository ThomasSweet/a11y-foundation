/**
 * One-off icon/OG-image generator. No native rasteriser (rsvg/magick/sharp) is
 * available, so we drive Playwright's bundled Chromium to render each asset at
 * exact pixel dimensions and screenshot it to PNG. The source of truth for the
 * mark is public/favicon.svg; the shapes below mirror it.
 *
 * Run:  node scripts/gen-icons.mjs
 */
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'public')

const GRAD = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#7c3aed"/>
</linearGradient>`

// Full-bleed mark (no tile margin) — Apple/PWA mask their own rounding, and the
// ring stays inside the maskable safe zone (~22%–78%).
const markFullBleed = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>${GRAD}</defs>
  <rect width="100" height="100" fill="url(#g)"/>
  <rect x="22" y="22" width="56" height="56" rx="16" fill="none" stroke="#fff" stroke-width="7"/>
  <circle cx="50" cy="50" r="7" fill="#fff"/>
</svg>`

// The tile mark (rounded corners) for the OG image.
const markTile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="150" height="150">
  <defs>${GRAD}</defs>
  <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#g)"/>
  <rect x="14" y="14" width="36" height="36" rx="10" fill="none" stroke="#fff" stroke-width="4.5"/>
  <circle cx="32" cy="32" r="4.5" fill="#fff"/>
</svg>`

const iconPage = (svg) =>
  `<!doctype html><meta charset="utf-8"><style>*{margin:0}html,body{width:100%;height:100%}svg{display:block;width:100vw;height:100vh}</style>${svg}`

const ogPage = `<!doctype html><meta charset="utf-8"><style>
  *{margin:0;box-sizing:border-box}
  html,body{width:1200px;height:630px}
  body{background:#0f0f0f;color:#f0f0f0;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
    padding:84px;display:flex;flex-direction:column;justify-content:space-between;
    background-image:radial-gradient(60% 80% at 12% -10%, rgba(37,99,235,.30), transparent 60%),
      radial-gradient(60% 80% at 100% 0%, rgba(124,58,237,.26), transparent 60%);}
  .row{display:flex;align-items:center;gap:28px}
  .kicker{font-size:30px;font-weight:500;color:#c4c4c4;letter-spacing:-.01em}
  h1{font-size:88px;line-height:1.04;font-weight:800;letter-spacing:-.02em;max-width:18ch}
  .grad{background:linear-gradient(100deg,#3b82f6,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent}
  .sub{font-size:30px;color:#c4c4c4;font-weight:400;max-width:30ch}
  .foot{font-size:24px;color:#8a8a8a;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
</style>
<div class="row">${markTile}<span class="kicker">an accessibility-first styling playground</span></div>
<h1><span class="grad">Accessible</span> by default</h1>
<div>
  <p class="sub">Modern CSS handles accessibility natively — with little to no JavaScript.</p>
  <p class="foot" style="margin-top:18px">WCAG 2.2 AA · Interop 2026 · progressive enhancement</p>
</div>`

const jobs = [
  { name: 'apple-touch-icon.png', w: 180, h: 180, html: iconPage(markFullBleed) },
  { name: 'icon-192.png', w: 192, h: 192, html: iconPage(markFullBleed) },
  { name: 'icon-512.png', w: 512, h: 512, html: iconPage(markFullBleed) },
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
