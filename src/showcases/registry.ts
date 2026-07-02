/**
 * Showcase registry — single source of truth for the CSS showcases section;
 * App.vue renders this list grouped by status.
 *
 * To add one: build a small demo under ./demos/ (one feature, new syntax behind
 * @supports with a fallback) plus a portable *.snippet.* excerpt, then add an
 * entry here.
 *
 * status: 'stable' = interoperable now (Baseline / done Interop areas), may be
 * used in the foundation itself; 'emerging' = active Interop area / partial
 * support, demo only, always progressive enhancement.
 * supports = a CSS.supports() condition so ShowcaseFrame can tell visitors
 * whether they see the feature or the fallback ('' when none applies). For
 * JS APIs that CSS.supports() can't express, use `detect` instead.
 *
 * Sources: https://wpt.fyi/interop-2026, https://web-platform-dx.github.io/web-features-explorer/
 */

import ContainerCardDemo from './demos/ContainerCardDemo/ContainerCardDemo.vue'
import AnchorPopoverDemo from './demos/AnchorPopoverDemo/AnchorPopoverDemo.vue'
import HasSelectorDemo from './demos/HasSelectorDemo/HasSelectorDemo.vue'
import SubgridDemo from './demos/SubgridDemo/SubgridDemo.vue'
import ContrastColorDemo from './demos/ContrastColorDemo/ContrastColorDemo.vue'
import ScrollProgressDemo from './demos/ScrollProgressDemo/ScrollProgressDemo.vue'
import TextWrapDemo from './demos/TextWrapDemo/TextWrapDemo.vue'
import ThemeShowcaseDemo from './demos/ThemeShowcaseDemo/ThemeShowcaseDemo.vue'
import ThemePickerDemo from './demos/ThemePickerDemo/ThemePickerDemo.vue'
import SlidingIndicatorDemo from './demos/SlidingIndicatorDemo/SlidingIndicatorDemo.vue'
import StyleQueryCuesDemo from './demos/StyleQueryCuesDemo/StyleQueryCuesDemo.vue'
import ShapeDemo from './demos/ShapeDemo/ShapeDemo.vue'
import StartingStyleDemo from './demos/StartingStyleDemo/StartingStyleDemo.vue'
import AttrDemo from './demos/AttrDemo/AttrDemo.vue'
import ScrollSnapDemo from './demos/ScrollSnapDemo/ScrollSnapDemo.vue'
import FieldSizingDemo from './demos/FieldSizingDemo/FieldSizingDemo.vue'
import CustomSelectDemo from './demos/CustomSelectDemo/CustomSelectDemo.vue'
import AnchorTooltipDemo from './demos/AnchorTooltipDemo/AnchorTooltipDemo.vue'
import ZoomCompareDemo from './demos/ZoomCompareDemo/ZoomCompareDemo.vue'
import PopoverMenuDemo from './demos/PopoverMenuDemo/PopoverMenuDemo.vue'
import ScrollStateDemo from './demos/ScrollStateDemo/ScrollStateDemo.vue'
import HighlightApiDemo from './demos/HighlightApiDemo/HighlightApiDemo.vue'
import DialogPolishDemo from './demos/DialogPolishDemo/DialogPolishDemo.vue'
import InterestInvokerDemo from './demos/InterestInvokerDemo/InterestInvokerDemo.vue'
import ViewTransitionDemo from './demos/ViewTransitionDemo/ViewTransitionDemo.vue'
import type { Component } from 'vue'

// Portable "Show the code" excerpts, imported raw from each demo's sibling files.
import containerSnippetHtml from './demos/ContainerCardDemo/ContainerCardDemo.snippet.html?raw'
import containerSnippetCss from './demos/ContainerCardDemo/ContainerCardDemo.snippet.css?raw'
import hasSnippetHtml from './demos/HasSelectorDemo/HasSelectorDemo.snippet.html?raw'
import hasSnippetCss from './demos/HasSelectorDemo/HasSelectorDemo.snippet.css?raw'
import subgridSnippetCss from './demos/SubgridDemo/SubgridDemo.snippet.css?raw'
import slidingSnippetHtml from './demos/SlidingIndicatorDemo/SlidingIndicatorDemo.snippet.html?raw'
import slidingSnippetCss from './demos/SlidingIndicatorDemo/SlidingIndicatorDemo.snippet.css?raw'
import textWrapSnippetCss from './demos/TextWrapDemo/TextWrapDemo.snippet.css?raw'
import scrollSnapSnippetHtml from './demos/ScrollSnapDemo/ScrollSnapDemo.snippet.html?raw'
import scrollSnapSnippetCss from './demos/ScrollSnapDemo/ScrollSnapDemo.snippet.css?raw'
import popoverSnippetHtml from './demos/PopoverMenuDemo/PopoverMenuDemo.snippet.html?raw'
import anchorPopoverSnippetHtml from './demos/AnchorPopoverDemo/AnchorPopoverDemo.snippet.html?raw'
import anchorPopoverSnippetCss from './demos/AnchorPopoverDemo/AnchorPopoverDemo.snippet.css?raw'
import anchorTooltipSnippetHtml from './demos/AnchorTooltipDemo/AnchorTooltipDemo.snippet.html?raw'
import anchorTooltipSnippetCss from './demos/AnchorTooltipDemo/AnchorTooltipDemo.snippet.css?raw'
import contrastColorSnippetCss from './demos/ContrastColorDemo/ContrastColorDemo.snippet.css?raw'
import themingSnippetCss from './demos/ThemeShowcaseDemo/ThemeShowcaseDemo.snippet.css?raw'
import themePickerSnippetCss from './demos/ThemePickerDemo/ThemePickerDemo.snippet.css?raw'
import scrollProgressSnippetCss from './demos/ScrollProgressDemo/ScrollProgressDemo.snippet.css?raw'
import styleQuerySnippetCss from './demos/StyleQueryCuesDemo/StyleQueryCuesDemo.snippet.css?raw'
import shapeSnippetCss from './demos/ShapeDemo/ShapeDemo.snippet.css?raw'
import startingStyleSnippetCss from './demos/StartingStyleDemo/StartingStyleDemo.snippet.css?raw'
import attrSnippetHtml from './demos/AttrDemo/AttrDemo.snippet.html?raw'
import attrSnippetCss from './demos/AttrDemo/AttrDemo.snippet.css?raw'
import fieldSizingSnippetHtml from './demos/FieldSizingDemo/FieldSizingDemo.snippet.html?raw'
import fieldSizingSnippetCss from './demos/FieldSizingDemo/FieldSizingDemo.snippet.css?raw'
import zoomSnippetCss from './demos/ZoomCompareDemo/ZoomCompareDemo.snippet.css?raw'
import customSelectSnippetHtml from './demos/CustomSelectDemo/CustomSelectDemo.snippet.html?raw'
import customSelectSnippetCss from './demos/CustomSelectDemo/CustomSelectDemo.snippet.css?raw'
import scrollStateSnippetCss from './demos/ScrollStateDemo/ScrollStateDemo.snippet.css?raw'
import highlightSnippetCss from './demos/HighlightApiDemo/HighlightApiDemo.snippet.css?raw'
import highlightSnippetJs from './demos/HighlightApiDemo/HighlightApiDemo.snippet.js?raw'
import dialogPolishSnippetHtml from './demos/DialogPolishDemo/DialogPolishDemo.snippet.html?raw'
import dialogPolishSnippetCss from './demos/DialogPolishDemo/DialogPolishDemo.snippet.css?raw'
import interestSnippetHtml from './demos/InterestInvokerDemo/InterestInvokerDemo.snippet.html?raw'
import interestSnippetCss from './demos/InterestInvokerDemo/InterestInvokerDemo.snippet.css?raw'
import viewTransitionSnippetCss from './demos/ViewTransitionDemo/ViewTransitionDemo.snippet.css?raw'
import viewTransitionSnippetJs from './demos/ViewTransitionDemo/ViewTransitionDemo.snippet.js?raw'

/** Per-showcase Baseline status, generated into baseline-data.json by
    scripts/gen-baseline.mjs from the web-features package (build-time — the
    full dataset must never reach the client bundle). */
export interface BaselineInfo {
  feature: string
  name: string
  baseline: 'high' | 'low' | false
  lowDate: string | null
  highDate: string | null
  support: Record<string, string | null>
}

export interface Showcase {
  id: string
  title: string
  status: 'stable' | 'emerging'
  supports: string
  /** JS feature test for APIs CSS.supports() can't express (View Transitions,
      Custom Highlight API). Takes precedence over `supports`. */
  detect?: () => boolean
  summary: string
  links?: { label: string; href: string }[]
  component: Component
  props?: Record<string, unknown>
  /** Portable excerpts for the "Show the code" panel — free of this repo's
      tokens/mixins/@layer plumbing, so they stay copy-paste ready. */
  snippetHtml?: string
  snippetCss?: string
  /** Only for genuine JS-API features (Custom Highlight API, View Transitions). */
  snippetJs?: string
}

export const showcases: Showcase[] = [
  /* Stable — interoperable everywhere, fair game for the foundation. */
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
    snippetHtml: containerSnippetHtml,
    snippetCss: containerSnippetCss,
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
    snippetHtml: hasSnippetHtml,
    snippetCss: hasSnippetCss,
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
    snippetCss: subgridSnippetCss,
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
    snippetHtml: slidingSnippetHtml,
    snippetCss: slidingSnippetCss,
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
    snippetCss: textWrapSnippetCss,
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
    snippetHtml: scrollSnapSnippetHtml,
    snippetCss: scrollSnapSnippetCss,
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
    snippetHtml: popoverSnippetHtml,
  },

  /* Emerging — Interop 2026 focus areas; demos only, behind @supports. */
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
    snippetHtml: anchorPopoverSnippetHtml,
    snippetCss: anchorPopoverSnippetCss,
  },
  {
    id: 'anchor-tooltip',
    title: 'Anchor-positioned tooltip',
    status: 'emerging',
    supports: 'anchor-name: --a',
    summary:
      'A hover/focus hint tethered to its trigger with anchor positioning, ' +
      'flipping sides via position-try-fallbacks when it would hit an edge — ' +
      'no positioning JS. It also nails the parts of WCAG 1.4.13 most tooltips ' +
      'miss: keyboard-focus reveal, hoverable, and persistent. The one leg CSS ' +
      'can’t reach (Esc-to-dismiss) is called out honestly. Without anchor ' +
      'support it falls back to a fixed above-the-trigger placement.',
    links: [
      {
        label: 'MDN: anchor positioning',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning',
      },
      {
        label: 'WCAG: Understanding 1.4.13',
        href: 'https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html',
      },
    ],
    component: AnchorTooltipDemo,
    snippetHtml: anchorTooltipSnippetHtml,
    snippetCss: anchorTooltipSnippetCss,
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
    snippetCss: contrastColorSnippetCss,
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
    snippetCss: themingSnippetCss,
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
    snippetCss: themePickerSnippetCss,
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
    snippetCss: scrollProgressSnippetCss,
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
    snippetCss: styleQuerySnippetCss,
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
    snippetCss: shapeSnippetCss,
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
    snippetCss: startingStyleSnippetCss,
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
    snippetHtml: attrSnippetHtml,
    snippetCss: attrSnippetCss,
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
    snippetHtml: fieldSizingSnippetHtml,
    snippetCss: fieldSizingSnippetCss,
  },
  {
    id: 'css-zoom',
    title: 'CSS zoom',
    status: 'emerging',
    supports: 'zoom: 2',
    summary:
      'The newly-interoperable zoom property magnifies an element AND reflows ' +
      'the layout around it — like the browser’s own zoom — where transform: ' +
      'scale() only repaints bigger and overlaps its neighbours. That reflow is ' +
      'the accessible behaviour (WCAG 1.4.10), so zoom is the right tool for a ' +
      'per-component “make this bigger” control. Pure-CSS radio control via :has().',
    links: [
      {
        label: 'MDN: zoom',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/zoom',
      },
    ],
    component: ZoomCompareDemo,
    snippetCss: zoomSnippetCss,
  },
  {
    id: 'customizable-select',
    title: 'Customizable <select>',
    status: 'emerging',
    supports: 'appearance: base-select',
    summary:
      'A native <select> opted into full CSS styling with appearance: ' +
      'base-select — the control, the dropdown, and rich option content ' +
      '(here, a status dot + description), all without leaving the platform. ' +
      'Keyboard, type-ahead, the screen-reader combobox, and form submission ' +
      'stay native, so it replaces the hand-rolled ARIA combobox. Without ' +
      'support it falls back to a plain native select. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: Customizable select',
        href: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Customizable_select',
      },
    ],
    component: CustomSelectDemo,
    snippetHtml: customSelectSnippetHtml,
    snippetCss: customSelectSnippetCss,
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
    snippetCss: scrollStateSnippetCss,
  },
  {
    id: 'custom-highlight',
    title: 'Custom Highlight API',
    status: 'emerging',
    supports: '',
    detect: () => 'highlights' in CSS,
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
    snippetCss: highlightSnippetCss,
    snippetJs: highlightSnippetJs,
  },
  {
    id: 'dialog-polish',
    title: 'Dialog & popover niceties',
    status: 'emerging',
    supports: 'selector(:open)',
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
    snippetHtml: dialogPolishSnippetHtml,
    snippetCss: dialogPolishSnippetCss,
  },
  {
    id: 'interest-invokers',
    title: 'Interest invokers (interestfor)',
    status: 'emerging',
    supports: 'interest-delay: 0s',
    summary:
      'Hover, keyboard focus, or touch long-press invokes a popover from one ' +
      'HTML attribute — link previews and rich tooltips with the delays, Esc ' +
      'dismissal, and accessibility mapping supplied by the browser, no ' +
      'tooltip library. This closes the gap the anchor-tooltip demo calls out: ' +
      'hover content that meets all of WCAG 1.4.13, including dismissible. ' +
      'Chrome 142+; everywhere else the links are simply links.',
    links: [
      {
        label: 'MDN: interest-delay',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/interest-delay',
      },
      {
        label: 'Chrome Status: Interest Invokers',
        href: 'https://chromestatus.com/feature/4530756656562176',
      },
    ],
    component: InterestInvokerDemo,
    snippetHtml: interestSnippetHtml,
    snippetCss: interestSnippetCss,
  },

  {
    id: 'view-transitions',
    title: 'View Transitions',
    status: 'emerging',
    supports: '',
    detect: () => 'startViewTransition' in document,
    summary:
      'Animate between two DOM states by giving shared elements a ' +
      'view-transition-name and wrapping the change in startViewTransition() — ' +
      'the browser tweens position, size, and cross-fade with no FLIP math or ' +
      'animation library. Switch the layout to see the cards morph; it’s ' +
      'skipped under reduced motion, so the swap stays instant and correct.',
    links: [
      {
        label: 'MDN: View Transition API',
        href: 'https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API',
      },
    ],
    component: ViewTransitionDemo,
    snippetCss: viewTransitionSnippetCss,
    snippetJs: viewTransitionSnippetJs,
  },

  // Further candidates: media state pseudo-classes (custom player),
  // anchor-positioned tooltips, customizable <select>.
]
