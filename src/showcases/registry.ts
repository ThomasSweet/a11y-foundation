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
import ThemePickerDemo from './demos/ThemePickerDemo.vue'
import SlidingIndicatorDemo from './demos/SlidingIndicatorDemo.vue'
import StyleQueryCuesDemo from './demos/StyleQueryCuesDemo.vue'
import ShapeDemo from './demos/ShapeDemo.vue'
import StartingStyleDemo from './demos/StartingStyleDemo.vue'
import AttrDemo from './demos/AttrDemo.vue'
import ScrollSnapDemo from './demos/ScrollSnapDemo.vue'
import FieldSizingDemo from './demos/FieldSizingDemo.vue'
import PopoverMenuDemo from './demos/PopoverMenuDemo.vue'
import ScrollStateDemo from './demos/ScrollStateDemo.vue'
import HighlightApiDemo from './demos/HighlightApiDemo.vue'
import DialogPolishDemo from './demos/DialogPolishDemo.vue'
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
      'Style an element from its descendants’ state — something no ' +
      'upward selector can do. A row highlights while it :has(:checked), and ' +
      'persists after focus leaves (where :focus-within can’t). Focus is ' +
      'left to :focus-within — the right tool for that. Zero JS for the styling.',
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
    id: 'scroll-snap',
    title: 'Scroll snap',
    status: 'stable',
    supports: 'scroll-snap-type: x mandatory',
    summary:
      'A horizontal strip where each card locks to centre as you scroll — ' +
      'scroll-snap-type on the track, scroll-snap-align on the cards. The ' +
      'strip is a focusable region, so the keyboard scrolls it too, and ' +
      'snapping rides the existing scroll-behavior, instant under reduced ' +
      'motion. No JS, no scroll listeners.',
    links: [
      {
        label: 'MDN: CSS scroll snap',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap',
      },
    ],
    component: ScrollSnapDemo,
  },
  {
    id: 'popover',
    title: 'Popover attribute',
    status: 'stable',
    supports: '',
    summary:
      'A real actions menu wired by id alone — the platform hands you ' +
      'Esc-to-close, light (click-outside) dismiss, top-layer rendering, and ' +
      'aria-expanded toggling for free. A div-based dropdown reimplements all ' +
      'of that in JS; here it is two attributes, and items close it ' +
      'declaratively with popovertargetaction.',
    links: [
      {
        label: 'MDN: popover',
        href: 'https://developer.mozilla.org/en-US/docs/Web/API/Popover_API',
      },
    ],
    component: PopoverMenuDemo,
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
    id: 'theme-picker',
    title: 'Contrast-clamped theme picker',
    status: 'emerging',
    supports: 'color: oklch(from red l c h)',
    summary:
      'The same engine, made interactive: pick an accent and drag its ' +
      'lightness, and a pure-CSS clamp snaps it out of the “muddy middle” ' +
      'where no black/white label could reach WCAG AA. You can’t drag it into ' +
      'an inaccessible state — the math is relative-color and min()/max() in ' +
      'the cascade, not JS. CVD-robust presets included.',
    links: [
      {
        label: 'MDN: relative colors',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors',
      },
      {
        label: 'WCAG: Contrast (Minimum) 1.4.3',
        href: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
      },
    ],
    component: ThemePickerDemo,
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
    title: 'Container style queries · non-color cues',
    status: 'emerging',
    supports: '',
    summary:
      'Query a container’s custom-property value (not just its size) to ' +
      'restyle descendants with no prop drilling. Here it powers an a11y ' +
      'win: a single --cues toggle adds non-color shapes to every status ' +
      'inside, so meaning never rests on color alone. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: style queries',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries',
      },
      {
        label: 'WCAG: Use of Color (1.4.1)',
        href: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
      },
    ],
    component: StyleQueryCuesDemo,
  },
  {
    id: 'shape-function',
    title: 'shape()',
    status: 'emerging',
    supports: 'clip-path: shape(from 0 0, line to 100% 0)',
    summary:
      'Responsive, keyword-based clip paths (lines, arcs, curves) that ' +
      'can use percentages and custom properties — unlike path(), which ' +
      'is frozen SVG coordinates. Here it curves a decorative band; the ' +
      'text stays clear of the clip. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: shape()',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/shape',
      },
    ],
    component: ShapeDemo,
  },
  {
    id: 'starting-style',
    title: '@starting-style',
    status: 'emerging',
    supports: 'transition-behavior: allow-discrete',
    summary:
      'Animate an element in from display:none — entry transitions with no ' +
      'JS — and out via transition-behavior: allow-discrete. The transitions ' +
      'use motion tokens, so they respect reduced motion. Interop 2026 focus ' +
      'area.',
    links: [
      {
        label: 'MDN: @starting-style',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style',
      },
    ],
    component: StartingStyleDemo,
  },
  {
    id: 'advanced-attr',
    title: 'Advanced attr()',
    status: 'emerging',
    supports: 'width: calc(attr(data-value type(<number>), 0) * 1%)',
    summary:
      'attr() with types — read data attributes as lengths, colors, or ' +
      'numbers in any property, not just content. Here it drives bar widths ' +
      'straight from data-value; the percentages stay as real text. Interop ' +
      '2026 focus area; not widely shipped yet, so a CSS-var fallback stands in.',
    links: [
      {
        label: 'MDN: attr()',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/attr',
      },
    ],
    component: AttrDemo,
  },
  {
    id: 'field-sizing',
    title: 'field-sizing: content',
    status: 'emerging',
    supports: 'field-sizing: content',
    summary:
      'A textarea that grows and shrinks with its content — no scrollHeight ' +
      'measuring, no resize listeners, no JS. It tracks the text between a ' +
      'min and max height (in lh units); without support it falls back to a ' +
      'fixed, drag-to-resize box. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: field-sizing',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing',
      },
    ],
    component: FieldSizingDemo,
  },
  {
    id: 'scroll-state',
    title: 'Scroll-state queries',
    status: 'emerging',
    supports: 'container-type: scroll-state',
    summary:
      'Container queries that react to how an element sits in a scroller — ' +
      'scroll-state(snapped) and scroll-state(stuck). A card knows when it’s ' +
      'the snapped one and a header knows when it’s pinned, with no scroll ' +
      'listeners and no JS — the clean fix for the “highlight the current ' +
      'item / detect stuck” problems. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: scroll-state queries',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_conditional_rules/Container_scroll-state_queries',
      },
      {
        label: 'Interop 2026 dashboard',
        href: 'https://wpt.fyi/interop-2026',
      },
    ],
    component: ScrollStateDemo,
  },
  {
    id: 'custom-highlight',
    title: 'Custom Highlight API',
    status: 'emerging',
    supports: '',
    summary:
      'Paint ranges of text from JS via ::highlight() — styled in CSS, with no ' +
      'wrapper elements inserted and the accessibility tree left untouched. ' +
      'Great for live search matches or annotations; because it’s presentation ' +
      'only, never let it be the sole carrier of meaning. Interop 2026 area.',
    links: [
      {
        label: 'MDN: CSS Custom Highlight API',
        href: 'https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API',
      },
    ],
    component: HighlightApiDemo,
  },
  {
    id: 'dialog-polish',
    title: 'Dialog & popover niceties',
    status: 'emerging',
    supports: '',
    summary:
      'Newer overlay ergonomics: a popover="hint" toggletip (show + dismiss ' +
      'for free) and a <dialog closedby="none"> takeover that Esc and ' +
      'outside-clicks can’t dismiss, for the rare must-decide moment. Styling ' +
      'keys off the new :open pseudo-class. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: dialog closedby',
        href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby',
      },
      {
        label: 'MDN: :open',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:open',
      },
    ],
    component: DialogPolishDemo,
  },

  // Further candidates: media state pseudo-classes (custom player),
  // anchor-positioned tooltips, customizable <select>.
]
