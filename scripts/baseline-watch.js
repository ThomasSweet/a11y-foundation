/**
 * baseline-watch
 *
 * Tracks the progressive enhancements we ship behind a fallback and tells us
 * when that fallback can go.
 *
 * The MANIFEST is the single source of truth. The pure `evaluateBaseline()`
 * below is consumed two ways: a Vitest spec asserts nothing is removable yet
 * (the gate), and the CLI at the bottom prints a detailed report (`npm run
 * baseline:check`, also what the scheduled CI run surfaces).
 *
 * Removal bar — set by the *kind* of fallback, because they cost differently:
 *
 *   CSS @supports fallback → remove at 'high' (WIDELY available)
 *     Cheap and graceful. While the feature is only newly available the
 *     @supports guard still does real work (gates older engines); once widely
 *     available the guard is always-true dead code, so it's safe to inline.
 *
 *   JS fallback → remove at 'low' (NEWLY available)
 *     Ships bytes and fights the "least JS" goal, so drop it as soon as the
 *     feature is interop'd, accepting graceful degradation for old browsers.
 *
 * An explicit `bar` on an entry overrides the default for that feature.
 *
 * Deliberately NOT tracked — these have no removable fallback to clean up:
 *   <dialog closedby>     — an HTML attribute that older browsers ignore (Esc +
 *                           the close button still work); nothing to remove.
 *   view-transitions      — startViewTransition() is inherently JS and stays.
 *   attr() (typed)        — AttrDemo's fallback is a teaching artifact; keep it.
 *   light-dark()          — LightDarkDemo intentionally contrasts it with @media.
 */
import { features } from 'web-features'

/** @typedef {{ id: string, fallback: 'css' | 'js', used: string[], bar?: 'low' | 'high' }} Entry */

/** @type {Entry[]} */
export const MANIFEST = [
  { id: 'anchor-positioning', fallback: 'css', used: ['PopoverMenuDemo', 'AnchorPopoverDemo', 'DialogPolishDemo'] },
  { id: 'scroll-driven-animations', fallback: 'css', used: ['ScrollProgressDemo', 'CriteriaTimeline', 'App.vue'] },
  { id: 'field-sizing', fallback: 'css', used: ['FieldSizingDemo'] },
  { id: 'contrast-color', fallback: 'css', used: ['ContrastColorDemo', 'theming.css'] },
  { id: 'container-scroll-state-queries', fallback: 'css', used: ['ScrollStateDemo'] },
  { id: 'container-style-queries', fallback: 'css', used: ['StyleQueryCuesDemo'] },
  { id: 'shape-function', fallback: 'css', used: ['ShapeDemo'] },
]

// 'false' (not Baseline) < 'low' (newly available) < 'high' (widely available)
export const RANK = { false: 0, low: 1, high: 2 }

/** The Baseline level at which a given entry's fallback becomes removable. */
export function barFor(entry) {
  return entry.bar ?? (entry.fallback === 'js' ? 'low' : 'high')
}

/**
 * Classify every tracked feature against current Baseline data.
 * @param {typeof features} [featureData]
 * @returns {{ removable: object[], newlyAvailable: object[], unknown: string[] }}
 */
export function evaluateBaseline(featureData = features) {
  const removable = []
  const newlyAvailable = []
  const unknown = []

  for (const entry of MANIFEST) {
    const feature = featureData[entry.id]
    if (!feature) {
      unknown.push(entry.id)
      continue
    }
    const status = String(feature.status?.baseline) // 'false' | 'low' | 'high'
    const bar = barFor(entry)
    const date =
      feature.status?.baseline_high_date || feature.status?.baseline_low_date || '?'
    const info = { ...entry, status, bar, date, name: feature.name }

    if (RANK[status] >= RANK[bar]) {
      removable.push(info) // fallback is now dead weight
    } else if (status === 'low') {
      newlyAvailable.push(info) // newly available, but fallback still earns its keep
    }
  }

  return { removable, newlyAvailable, unknown }
}

// --- CLI ---------------------------------------------------------------------
// Runs only when invoked directly (`node scripts/baseline-watch.js`), not when
// imported by the test.
import { pathToFileURL } from 'node:url'

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { removable, newlyAvailable, unknown } = evaluateBaseline()

  if (unknown.length) {
    console.error('baseline-watch: unknown web-features id(s): ' + unknown.join(', '))
    process.exit(2)
  }

  if (newlyAvailable.length) {
    console.log('baseline-watch: newly available (fallbacks still kept):')
    for (const e of newlyAvailable) {
      console.log(`  • ${e.name} — Baseline low ${e.date}; used in ${e.used.join(', ')}`)
    }
  }

  if (removable.length) {
    console.error(
      '\nbaseline-watch: these fallbacks have reached their removal bar and are now dead weight:\n' +
        removable
          .map(
            (e) =>
              `  • ${e.name} (${e.id}) — Baseline ${e.status} ${e.date}, bar ${e.bar}\n` +
              `    Remove the fallback in: ${e.used.join(', ')}, then drop the manifest entry.`,
          )
          .join('\n\n'),
    )
    process.exit(1)
  }

  console.log(
    `baseline-watch: ✓ all ${MANIFEST.length} tracked fallbacks still below their bar.`,
  )
}
