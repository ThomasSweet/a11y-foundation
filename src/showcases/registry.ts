/**
 * Showcase registry — single source of truth for the CSS showcases section.
 *
 * To add a showcase:
 *   1. Build the demo component in ./demos/ (keep it small and focused on
 *      ONE feature; wrap new syntax in @supports with a usable fallback).
 *   2. Add an entry here. App.vue renders everything from this list,
 *      grouped by status.
 *
 * Entries without a demo yet use PlaceholderDemo with a `todo` (and
 * optional `hint` CSS) via `props` — swap in a real component when built.
 *
 * status:
 *   'stable'   — interoperable in current Chrome, Firefox, and Safari
 *                (Baseline / completed Interop focus areas). May be used
 *                in the foundation itself.
 *   'emerging' — an active Interop focus area or feature with partial
 *                support. Demo only; always progressive enhancement.
 *
 * supports — a CSS.supports() condition so ShowcaseFrame can tell
 *   visitors whether they see the feature or the fallback. Leave '' when
 *   there is no demo yet or no clean supports check.
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
import HasSelectorDemo from './demos/HasSelectorDemo.vue'
import SubgridDemo from './demos/SubgridDemo.vue'
import ContrastColorDemo from './demos/ContrastColorDemo.vue'
import ScrollProgressDemo from './demos/ScrollProgressDemo.vue'
import TextWrapDemo from './demos/TextWrapDemo.vue'
import ThemeShowcaseDemo from './demos/ThemeShowcaseDemo.vue'
import SlidingIndicatorDemo from './demos/SlidingIndicatorDemo.vue'
import PlaceholderDemo from './demos/PlaceholderDemo.vue'
import type { Component } from 'vue'

export interface Showcase {
  id: string
  title: string
  status: 'stable' | 'emerging'
  supports: string
  summary: string
  links?: { label: string; href: string }[]
  component: Component
  /** Extra props forwarded to the demo component (e.g. PlaceholderDemo). */
  props?: Record<string, unknown>
}

export const showcases: Showcase[] = [
  /* ---------------------------------------------------------------------
     Stable — interoperable everywhere, fair game for the foundation
  --------------------------------------------------------------------- */
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
    id: 'has-selector',
    title: ':has() relational selector',
    status: 'stable',
    supports: 'selector(:has(a))',
    summary:
      'Style a parent from the state of its children. Selection cards ' +
      'built on real radio inputs keep native semantics, keyboard ' +
      'support, and form behavior — the styling needs zero JS.',
    links: [
      {
        label: 'MDN: :has()',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:has',
      },
    ],
    component: HasSelectorDemo,
  },
  {
    id: 'subgrid',
    title: 'Subgrid',
    status: 'stable',
    supports: 'grid-template-rows: subgrid',
    summary:
      'Nested grids adopt their parent’s tracks, so card internals ' +
      'align across siblings no matter how long the content gets — the ' +
      'kind of alignment that used to require fixed heights or JS.',
    links: [
      {
        label: 'MDN: subgrid',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid',
      },
    ],
    component: SubgridDemo,
  },
  {
    id: 'sliding-indicator',
    title: 'Sliding selection indicator',
    status: 'stable',
    supports: 'selector(:has(*))',
    summary:
      'A modern way to visualize selection: one pill that travels between ' +
      'options instead of fading per-item. Pure CSS — :has() reads the ' +
      'checked radio, the motion tokens drive the slide (instant under ' +
      'reduced motion) — over real, keyboard-navigable radios.',
    links: [
      {
        label: 'MDN: :has()',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:has',
      },
    ],
    component: SlidingIndicatorDemo,
  },
  {
    id: 'text-wrap',
    title: 'text-wrap: balance / pretty',
    status: 'stable',
    supports: 'text-wrap: balance',
    summary:
      'Let the browser decide line breaks. balance evens out short blocks ' +
      'like headings; pretty stops body copy from ending on an orphaned ' +
      'word. Better readability for zero markup and no JS.',
    links: [
      {
        label: 'MDN: text-wrap',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap',
      },
    ],
    component: TextWrapDemo,
  },
  {
    id: 'popover',
    title: 'Popover attribute',
    status: 'stable',
    supports: '',
    summary:
      'Declarative overlays with Esc-to-dismiss, light dismiss, top-layer ' +
      'rendering, and aria-expanded wiring built in. Already doing the ' +
      'heavy lifting in the anchor positioning showcase below.',
    links: [
      {
        label: 'MDN: popover',
        href: 'https://developer.mozilla.org/en-US/docs/Web/API/Popover_API',
      },
    ],
    component: PlaceholderDemo,
    props: {
      todo:
        'Build a standalone toggletip or menu demo: focus on what the ' +
        'platform gives for free vs. a div-based dropdown. Try ' +
        'popover="hint" for non-interactive tooltips and @starting-style ' +
        'for entry transitions.',
      hint: '<button popovertarget="tip">?</button>\n<div id="tip" popover>…</div>',
    },
  },

  /* ---------------------------------------------------------------------
     Emerging — Interop 2026 focus areas, demos only, behind @supports
  --------------------------------------------------------------------- */
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
  {
    id: 'contrast-color',
    title: 'contrast-color()',
    status: 'emerging',
    supports: 'color: contrast-color(red)',
    summary:
      'The browser picks a contrasting text color for any background — ' +
      'user-generated colors, theming APIs, data-viz palettes stay ' +
      'readable without contrast math. Interop 2026 focus area; about as ' +
      'on-brand for this repo as it gets.',
    links: [
      {
        label: 'MDN: contrast-color()',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/contrast-color',
      },
    ],
    component: ContrastColorDemo,
  },
  {
    id: 'theming',
    title: 'Contrast-safe theming',
    status: 'emerging',
    supports: 'color: oklch(from red l c h)',
    summary:
      'One engine, many themes. Each theme is just two seed colors; the full ' +
      'accessible palette — surfaces, borders, text, focus ring — is derived ' +
      'with color-mix(), relative color syntax, and contrast-color(). Adding ' +
      'a theme is data, not code, and contrast stays safe by construction.',
    links: [
      {
        label: 'MDN: relative colors',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors',
      },
      {
        label: 'MDN: contrast-color()',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/contrast-color',
      },
    ],
    component: ThemeShowcaseDemo,
  },
  {
    id: 'scroll-driven-animations',
    title: 'Scroll-driven animations',
    status: 'emerging',
    supports: 'animation-timeline: scroll()',
    summary:
      'Animations driven by scroll position instead of time — no scroll ' +
      'listeners, runs off the main thread. Because the motion mirrors ' +
      'the user’s own gesture, a progress bar like this one needs no ' +
      'reduced-motion override. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: scroll-driven animations',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations',
      },
    ],
    component: ScrollProgressDemo,
  },
  {
    id: 'style-queries',
    title: 'Container style queries',
    status: 'emerging',
    supports: '',
    summary:
      'Query a container’s custom property values, not just its ' +
      'size — variant styling ("featured", "compact") flows down to ' +
      'descendants without prop drilling or extra classes. Interop 2026 ' +
      'focus area.',
    links: [
      {
        label: 'MDN: style queries',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries',
      },
    ],
    component: PlaceholderDemo,
    props: {
      todo:
        'Build a card that restyles its children when the container ' +
        'sets --variant: featured. Note: there is no clean CSS.supports() ' +
        'check for style queries — detect by measuring an element inside ' +
        'an @container style() block if a support note is needed.',
      hint: '.card-cell { --variant: featured; }\n@container style(--variant: featured) {\n  .card-title { font-size: var(--text-xl); }\n}',
    },
  },
  {
    id: 'shape-function',
    title: 'shape()',
    status: 'emerging',
    supports: '',
    summary:
      'Responsive, keyword-based clip paths (lines, arcs, curves) that ' +
      'can use percentages and custom properties — unlike path(), which ' +
      'is frozen SVG coordinates. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: shape()',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/shape',
      },
    ],
    component: PlaceholderDemo,
    props: {
      todo:
        'Build a decorative clipped hero or image treatment. A11y angle ' +
        'to demonstrate: keep text OUT of clipped regions, and check the ' +
        'design under forced-colors where backgrounds may vanish.',
      hint: 'clip-path: shape(from 0% 0%, line to 100% 0%, line to 100% 85%, curve to 0% 100% with 50% 70%);',
    },
  },
  {
    id: 'advanced-attr',
    title: 'Advanced attr()',
    status: 'emerging',
    supports: '',
    summary:
      'attr() with types — read data attributes as lengths, colors, or ' +
      'numbers in any property, not just content. Bridges markup-borne ' +
      'data (CMS output, table data) into CSS. Interop 2026 focus area; ' +
      'not shipped anywhere yet.',
    links: [
      {
        label: 'MDN: attr()',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/attr',
      },
    ],
    component: PlaceholderDemo,
    props: {
      todo:
        'Candidate demo once a browser ships: a bar chart where ' +
        'inline-size comes from attr(data-value type(<percentage>)) — ' +
        'real, accessible table markup styled into bars.',
      hint: '.bar { inline-size: attr(data-value type(<percentage>), 0%); }',
    },
  },

  // Further stable candidates: @starting-style, :user-valid/:user-invalid,
  // dialog (already in the components section).
]
