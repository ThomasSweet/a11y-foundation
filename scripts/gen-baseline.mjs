/**
 * gen-baseline
 *
 * Emits src/showcases/baseline-data.json — the per-showcase Baseline status
 * (level, dates, per-browser versions) extracted from the `web-features`
 * package. Runs before every build (prebuild), so the badges are as fresh as
 * the last dependency bump; the JSON is committed so dev works without a
 * generate step.
 *
 * Only the ~25 needed entries are extracted — never import `web-features`
 * in client code (the full dataset would bloat the bundle by megabytes).
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { features } from 'web-features'

/** Showcase id (registry) → web-features id. Combo demos without one clear
    upstream feature are simply absent — no badge is rendered for them. */
const SHOWCASE_FEATURES = {
  'container-queries': 'container-queries',
  'has-selector': 'has',
  'quantity-queries': 'has',
  subgrid: 'subgrid',
  'sliding-indicator': 'has',
  'text-wrap': 'text-wrap-balance',
  'scroll-snap': 'scroll-snap',
  popover: 'popover',
  'user-valid': 'user-pseudos',
  'anchor-positioning': 'anchor-positioning',
  'anchor-tooltip': 'anchor-positioning',
  'contrast-color': 'contrast-color',
  theming: 'relative-color',
  'theme-picker': 'relative-color',
  'scroll-driven-animations': 'scroll-driven-animations',
  'style-queries': 'container-style-queries',
  'shape-function': 'shape-function',
  'starting-style': 'starting-style',
  'advanced-attr': 'attr',
  'field-sizing': 'field-sizing',
  'css-zoom': 'zoom',
  'customizable-select': 'customizable-select',
  'scroll-state': 'container-scroll-state-queries',
  'custom-highlight': 'highlight',
  'dialog-polish': 'dialog-closedby',
  'interest-invokers': 'interest-invokers',
  'view-transitions': 'view-transitions',
}

const BROWSERS = ['chrome', 'edge', 'firefox', 'safari']

const unknown = Object.entries(SHOWCASE_FEATURES).filter(([, id]) => !features[id])
if (unknown.length) {
  console.error(
    'gen-baseline: unknown web-features id(s): ' +
      unknown.map(([s, id]) => `${s} → ${id}`).join(', '),
  )
  process.exit(1)
}

const data = Object.fromEntries(
  Object.entries(SHOWCASE_FEATURES).map(([showcaseId, featureId]) => {
    const f = features[featureId]
    return [
      showcaseId,
      {
        feature: featureId,
        name: f.name,
        baseline: f.status.baseline, // 'high' | 'low' | false
        lowDate: f.status.baseline_low_date ?? null,
        highDate: f.status.baseline_high_date ?? null,
        support: Object.fromEntries(BROWSERS.map((b) => [b, f.status.support[b] ?? null])),
      },
    ]
  }),
)

const out = fileURLToPath(new URL('../src/showcases/baseline-data.json', import.meta.url))
writeFileSync(out, JSON.stringify(data, null, 2) + '\n')
console.log(`gen-baseline: wrote ${Object.keys(data).length} entries to baseline-data.json`)
