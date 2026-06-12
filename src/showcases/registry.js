/**
 * Showcase registry — single source of truth for the CSS showcases section.
 *
 * To add a showcase:
 *   1. Build the demo component in ./demos/ (keep it small and focused on
 *      ONE feature; wrap new syntax in @supports with a usable fallback).
 *   2. Add an entry here. App.vue renders everything from this list,
 *      grouped by status.
 *
 * status:
 *   'stable'   — interoperable in current Chrome, Firefox, and Safari
 *                (Baseline / completed Interop focus areas). May be used
 *                in the foundation itself.
 *   'emerging' — an active Interop focus area or feature with partial
 *                support. Demo only; always progressive enhancement.
 *
 * Support policy for this repo: current browser versions only (roughly
 * the last two years). No fallbacks for anything older.
 *
 * Sources for status decisions:
 *   - https://wpt.fyi/interop-2026 (Interop dashboard)
 *   - https://web-platform-dx.github.io/web-features-explorer/ (Baseline)
 */

import ContainerCardDemo from './demos/ContainerCardDemo.vue'
import AnchorPopoverDemo from './demos/AnchorPopoverDemo.vue'

export const showcases = [
  {
    id: 'container-queries',
    title: 'Container queries',
    status: 'stable',
    supports: 'container-type: inline-size',
    summary:
      'Components respond to the space they actually get instead of the ' +
      'viewport. Together with auto-fit/minmax grids, this replaces most ' +
      'media queries — use the slider to resize the container, not the ' +
      'window.',
    links: [
      {
        label: 'MDN: container queries',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries',
      },
    ],
    component: ContainerCardDemo,
  },
  {
    id: 'anchor-positioning',
    title: 'Anchor positioning',
    status: 'emerging',
    supports: 'anchor-name: --a',
    summary:
      'Tether a popover to the element that opened it, in pure CSS. ' +
      'Combined with the popover attribute (which gives keyboard ' +
      'dismissal and focus behavior for free), this replaces JS ' +
      'positioning libraries. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: anchor positioning',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning',
      },
      {
        label: 'Interop 2026 dashboard',
        href: 'https://wpt.fyi/interop-2026',
      },
    ],
    component: AnchorPopoverDemo,
  },

  // Skeleton entries to fill in — same pattern as above:
  //
  // { id: 'style-queries',          status: 'emerging', supports: '...' }
  //     @container style(--variant: featured) — Interop 2026
  // { id: 'scroll-driven-animations', status: 'emerging',
  //     supports: 'animation-timeline: scroll()' } — Interop 2026;
  //     pairs well with the reduced-motion story in preferences.css
  // { id: 'contrast-color',         status: 'emerging',
  //     supports: 'color: contrast-color(red)' } — Interop 2026;
  //     very on-topic for this repo
  // { id: 'has-selector',           status: 'stable',
  //     supports: 'selector(:has(a))' }
  // { id: 'subgrid',                status: 'stable',
  //     supports: 'grid-template-columns: subgrid' }
  // { id: 'text-wrap',              status: 'stable',
  //     supports: 'text-wrap: balance' }
]
