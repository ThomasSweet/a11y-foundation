/**
 * Showcase registry — single source of truth for the CSS showcases section;
 * App.vue renders this list grouped by Baseline tier.
 *
 * To add one: build a small demo under ./demos/ (one feature, new syntax behind
 * @supports with a fallback) plus a portable *.snippet.* excerpt, add an entry
 * here, and map its id in scripts/gen-baseline.mjs.
 *
 * tier is DERIVED from Baseline data at build time (gen-baseline.mjs →
 * baseline-data.json), never hand-maintained: 'widely-available' (Baseline
 * high) may be used in the foundation itself; 'newly-available' (Baseline low)
 * is interoperable but recent; 'limited-availability' is demo-only, always
 * behind @supports. File order only sets the order within each group.
 * supports = a CSS.supports() condition so ShowcaseFrame can tell visitors
 * whether they see the feature or the fallback ('' when none applies). For
 * JS APIs that CSS.supports() can't express, use `detect` instead.
 *
 * Sources: https://wpt.fyi/interop-2026, https://web-platform-dx.github.io/web-features-explorer/
 */

import baselineData from './baseline-data.json'
import ContainerCardDemo from './demos/ContainerCardDemo/ContainerCardDemo.vue'
import AnchorPopoverDemo from './demos/AnchorPopoverDemo/AnchorPopoverDemo.vue'
import HasSelectorDemo from './demos/HasSelectorDemo/HasSelectorDemo.vue'
import QuantityQueriesDemo from './demos/QuantityQueriesDemo/QuantityQueriesDemo.vue'
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
import CssCarouselDemo from './demos/CssCarouselDemo/CssCarouselDemo.vue'
import cssCarouselSnippetCss from './demos/CssCarouselDemo/CssCarouselDemo.snippet.css?raw'
import CqUnitsDemo from './demos/CqUnitsDemo/CqUnitsDemo.vue'
import cqUnitsSnippetCss from './demos/CqUnitsDemo/CqUnitsDemo.snippet.css?raw'
import UserValidDemo from './demos/UserValidDemo/UserValidDemo.vue'
import userValidSnippetCss from './demos/UserValidDemo/UserValidDemo.snippet.css?raw'
import quantitySnippetHtml from './demos/QuantityQueriesDemo/QuantityQueriesDemo.snippet.html?raw'
import quantitySnippetCss from './demos/QuantityQueriesDemo/QuantityQueriesDemo.snippet.css?raw'
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

export type BaselineTier = 'widely-available' | 'newly-available' | 'limited-availability'

export interface Showcase {
  id: string
  title: string
  tier: BaselineTier
  supports: string
  /** JS feature test for APIs CSS.supports() can't express (View Transitions,
      Custom Highlight API). Takes precedence over `supports`. */
  detect?: () => boolean
  summary: string
  /** One sentence naming who the feature helps and how — rendered as the
      card's distinct accessibility-payoff line. */
  payoff: string
  /** Topic tags for the catalog filter — values must exist in the
      $showcase-tags list in App.vue's styles. */
  tags: string[]
  links?: { label: string; href: string }[]
  component: Component
  props?: Record<string, unknown>
  /** Portable excerpts for the "Show the code" panel — free of this repo's
      tokens/mixins/@layer plumbing, so they stay copy-paste ready. */
  snippetHtml?: string
  snippetCss?: string
  /** Only for genuine JS-API features (Custom Highlight API, View Transitions). */
  snippetJs?: string
  /** Link to this demo's full source folder on GitHub. The "Show the code"
      panel is a portable excerpt; this points to the real, complete component. */
  sourceHref?: string
}

const entries: Omit<Showcase, 'tier'>[] = [
  /* Stable — interoperable everywhere, fair game for the foundation. */
  {
    id: 'container-queries',
    title: 'Container queries',
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
    payoff:
      'Layouts that adapt to their space survive 400% zoom and squeezed sidebars alike — low-vision users get reflow (1.4.10) for free.',
    tags: ['layout'],
    component: ContainerCardDemo,
    snippetHtml: containerSnippetHtml,
    snippetCss: containerSnippetCss,
  },
  {
    id: 'cq-units',
    title: 'Container query units',
    supports: 'width: 1cqi',
    summary:
      'The other half of container queries: cqi units inside clamp() scale ' +
      'type and spacing in proportion to the component’s own space — no ' +
      'breakpoints, no broken in-between states, and rem bounds keep the ' +
      'user’s font-size preference in charge. The timeline’s ghost years ' +
      'run on this.',
    links: [
      {
        label: 'MDN: container query length units',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries#container_query_length_units',
      },
    ],
    payoff:
      'The rem bounds in every clamp() keep the user’s font-size preference in charge at any container width — no breakpoint ever overrides it.',
    tags: ['layout', 'typography'],
    component: CqUnitsDemo,
    snippetCss: cqUnitsSnippetCss,
  },
  {
    id: 'has-selector',
    title: ':has() relational selector',
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
    payoff:
      ':has() styles states the DOM already knows — no JS class-toggling that can drift from the real, announced state.',
    tags: ['interaction'],
    component: HasSelectorDemo,
    snippetHtml: hasSnippetHtml,
    snippetCss: hasSnippetCss,
  },
  {
    id: 'quantity-queries',
    title: 'Count-aware layouts (quantity queries)',
    supports: 'selector(:has(> :nth-child(2)))',
    summary:
      'The chat-app photo bundle, in pure CSS: the grid counts its own ' +
      'children with exact-count quantity queries — ' +
      ':has(> :nth-child(3):last-child) reads "exactly three" — and ' +
      're-composes its grid-template-areas per count. One photo renders big, ' +
      'three make a lead with a stacked pair, five or more fall into a ' +
      'mosaic. A pattern everyone assumes needs JS; the technique Heydon ' +
      'Pickering coined pre-:has() now works upward.',
    links: [
      {
        label: 'MDN: :has()',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:has',
      },
      {
        label: 'A List Apart: Quantity Queries for CSS',
        href: 'https://alistapart.com/article/quantity-queries-for-css/',
      },
    ],
    payoff:
      'Count-aware layout keeps items at usable sizes however many a CMS delivers — target size (2.5.8) survives real content.',
    tags: ['layout'],
    component: QuantityQueriesDemo,
    snippetHtml: quantitySnippetHtml,
    snippetCss: quantitySnippetCss,
  },
  {
    id: 'subgrid',
    title: 'Subgrid',
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
    payoff:
      'Aligned tracks across cards keep visual order and reading order identical — what a screen reader announces matches what eyes scan.',
    tags: ['layout'],
    component: SubgridDemo,
    snippetCss: subgridSnippetCss,
  },
  {
    id: 'sliding-indicator',
    title: 'Sliding selection indicator',
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
    payoff:
      'The moving highlight is a native radio group underneath — arrow keys, focus, and announcements come from the platform; only the paint animates.',
    tags: ['interaction', 'motion'],
    component: SlidingIndicatorDemo,
    snippetHtml: slidingSnippetHtml,
    snippetCss: slidingSnippetCss,
  },
  {
    id: 'text-wrap',
    title: 'text-wrap: balance / pretty',
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
    payoff:
      'Better line breaks with zero extra markup — nothing for assistive tech to trip on, and headings stay balanced at every zoom level.',
    tags: ['typography'],
    component: TextWrapDemo,
    snippetCss: textWrapSnippetCss,
  },
  {
    id: 'scroll-snap',
    title: 'Scroll snap',
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
    payoff:
      'Snap points give wheel, touch, and keyboard scrolling the same stopping places — no JS carousel intercepting arrow keys.',
    tags: ['scroll'],
    component: ScrollSnapDemo,
    snippetHtml: scrollSnapSnippetHtml,
    snippetCss: scrollSnapSnippetCss,
  },
  {
    id: 'popover',
    title: 'Popover attribute',
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
    payoff:
      'Esc-to-close, light dismiss, and aria-expanded come with the attribute — the keyboard traps of hand-rolled dropdowns never exist.',
    tags: ['interaction'],
    component: PopoverMenuDemo,
    snippetHtml: popoverSnippetHtml,
  },
  {
    id: 'user-valid',
    title: ':user-valid / :user-invalid',
    supports: 'selector(:user-valid)',
    summary:
      'Validation styling with manners — these pseudo-classes match only ' +
      'after the user has actually interacted with a field, so an empty ' +
      'required form isn’t flagged red on first paint. Newly Baseline ' +
      'widely available; the foundation’s own TextField builds on it.',
    links: [
      {
        label: 'MDN: :user-invalid',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid',
      },
    ],
    payoff:
      'Errors wait until someone has actually been in the field — no red flags shouting at screen-magnifier users before they’ve typed a character.',
    tags: ['forms'],
    component: UserValidDemo,
    snippetCss: userValidSnippetCss,
  },

  {
    id: 'anchor-positioning',
    title: 'Anchor positioning',
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
    payoff:
      'Tethered UI repositions instead of clipping at viewport edges — magnified and small-screen users keep the attached panel on screen.',
    tags: ['layout', 'interaction'],
    component: AnchorPopoverDemo,
    snippetHtml: anchorPopoverSnippetHtml,
    snippetCss: anchorPopoverSnippetCss,
  },
  {
    id: 'anchor-tooltip',
    title: 'Anchor-positioned tooltip',
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
    payoff:
      'Position fallbacks flip the tooltip into view at any zoom, and the pattern stays hoverable and dismissible (1.4.13).',
    tags: ['interaction'],
    component: AnchorTooltipDemo,
    snippetHtml: anchorTooltipSnippetHtml,
    snippetCss: anchorTooltipSnippetCss,
  },
  {
    id: 'contrast-color',
    title: 'contrast-color()',
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
    payoff:
      'The browser computes the readable label color for any background — text contrast becomes a guarantee, not a design-review catch.',
    tags: ['theming'],
    component: ContrastColorDemo,
    snippetCss: contrastColorSnippetCss,
  },
  {
    id: 'theming',
    title: 'Contrast-safe theming',
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
    payoff:
      'Every derived palette flips text to black or white against its seed — a theme cannot accidentally ship unreadable text (1.4.3 by construction).',
    tags: ['theming'],
    component: ThemeShowcaseDemo,
    snippetCss: themingSnippetCss,
  },
  {
    id: 'theme-picker',
    title: 'Contrast-clamped theme picker',
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
    payoff:
      'User color choices are clamped into the contrast-safe range — personalization without letting anyone pick their way into failure.',
    tags: ['theming', 'forms'],
    component: ThemePickerDemo,
    snippetCss: themePickerSnippetCss,
  },
  {
    id: 'scroll-driven-animations',
    title: 'Scroll-driven animations',
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
    payoff:
      'Scroll effects run off the main thread and collapse under prefers-reduced-motion — vestibular safety without losing the flourish.',
    tags: ['scroll', 'motion'],
    component: ScrollProgressDemo,
    snippetCss: scrollProgressSnippetCss,
  },
  {
    id: 'style-queries',
    title: 'Container style queries · non-color cues',
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
    payoff:
      'Non-color cues switch on from one inherited flag — meaning stops resting on color alone (1.4.1) with no per-component code.',
    tags: ['theming'],
    component: StyleQueryCuesDemo,
    snippetCss: styleQuerySnippetCss,
  },
  {
    id: 'shape-function',
    title: 'shape()',
    supports: 'clip-path: shape(from 0 0, line to 100% 0)',
    summary:
      'Responsive, keyword-based clip paths (lines, arcs, curves) that ' +
      'can use percentages and custom properties — unlike path(), which ' +
      'is frozen SVG coordinates. Resize the two cards to watch the ' +
      'path() clip detach while shape() reflows, then morph a third with a ' +
      'registered @property. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: shape()',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/shape',
      },
    ],
    payoff:
      'The decorative clip never touches the text flow — zoom, reflow, and screen readers meet ordinary paragraphs underneath.',
    tags: ['layout'],
    component: ShapeDemo,
    snippetCss: shapeSnippetCss,
  },
  {
    id: 'starting-style',
    title: '@starting-style',
    supports: 'transition-behavior: allow-discrete',
    summary:
      'Animate an element in from display:none — entry transitions with no ' +
      'JS — and out via transition-behavior: allow-discrete. Composes with ' +
      'container queries too: responsive reveals that fade instead of pop. ' +
      'The transitions use motion tokens, so they respect reduced motion. ' +
      'Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: @starting-style',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style',
      },
    ],
    payoff:
      'Entry and exit animate without JS timers — and display:none keeps closed panels truly gone from the accessibility tree, not just faded.',
    tags: ['motion'],
    component: StartingStyleDemo,
    snippetCss: startingStyleSnippetCss,
  },
  {
    id: 'advanced-attr',
    title: 'Advanced attr()',
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
    payoff:
      'The styling reads the same attribute assistive tech could expose — one source of truth for the visual and the announced value.',
    tags: ['layout'],
    component: AttrDemo,
    snippetHtml: attrSnippetHtml,
    snippetCss: attrSnippetCss,
  },
  {
    id: 'field-sizing',
    title: 'field-sizing: content',
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
    payoff:
      'Inputs grow with their content — screen-magnifier users see their whole answer instead of text scrolling out of a fixed box.',
    tags: ['forms'],
    component: FieldSizingDemo,
    snippetHtml: fieldSizingSnippetHtml,
    snippetCss: fieldSizingSnippetCss,
  },
  {
    id: 'css-zoom',
    title: 'CSS zoom',
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
    payoff:
      'zoom scales a component the way real users magnify — a one-line testing lens for reflow and text-resize criteria.',
    tags: ['layout'],
    component: ZoomCompareDemo,
    snippetCss: zoomSnippetCss,
  },
  {
    id: 'customizable-select',
    title: 'Customizable <select>',
    supports: 'appearance: base-select',
    summary:
      'A native <select> opted into full CSS styling with appearance: ' +
      'base-select — the control, the dropdown, and rich option content ' +
      '(status dots, descriptions, optgroups, a disabled option), plus a ' +
      'trigger that tints with the selection — all without leaving the ' +
      'platform. ' +
      'Keyboard, type-ahead, the screen-reader combobox, and form submission ' +
      'stay native, so it replaces the hand-rolled ARIA combobox. Without ' +
      'support it falls back to a plain native select. Interop 2026 focus area.',
    links: [
      {
        label: 'MDN: Customizable select',
        href: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Customizable_select',
      },
    ],
    payoff:
      'Styled options on a real <select> — the keyboard model, mobile pickers, and screen-reader semantics stay native instead of ARIA-rebuilt.',
    tags: ['forms'],
    component: CustomSelectDemo,
    snippetHtml: customSelectSnippetHtml,
    snippetCss: customSelectSnippetCss,
  },
  {
    id: 'scroll-state',
    title: 'Scroll-state queries',
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
    payoff:
      'The bar reacts to scrolling via CSS state, not scroll listeners — the main thread stays free, so assistive tech stays responsive.',
    tags: ['scroll'],
    component: ScrollStateDemo,
    snippetCss: scrollStateSnippetCss,
  },
  {
    id: 'css-carousel',
    title: 'Pure-CSS carousel',
    supports: 'selector(::scroll-marker)',
    summary:
      'Scroll buttons and marker dots generated entirely by CSS — focusable, ' +
      'named (the content slash-alt syntax is mandatory craft here), and ' +
      'auto-disabling at the ends. Underneath it stays an ordinary snap ' +
      'scroller, so browsers without support lose the chrome, not the ' +
      'content. Screen-reader announcement of the generated controls still ' +
      'varies — honest status: enhancement, not yet a pattern replacement.',
    links: [
      {
        label: 'MDN: ::scroll-marker',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-marker',
      },
    ],
    payoff:
      'The generated buttons and dots are focusable and named — and without support it stays a keyboard-scrollable region, never a dead widget.',
    tags: ['scroll', 'interaction'],
    component: CssCarouselDemo,
    snippetCss: cssCarouselSnippetCss,
  },
  {
    id: 'custom-highlight',
    title: 'Custom Highlight API',
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
    payoff:
      'Highlights paint without wrapping spans — the text a screen reader reads is untouched by the visual layer.',
    tags: ['typography'],
    component: HighlightApiDemo,
    snippetCss: highlightSnippetCss,
    snippetJs: highlightSnippetJs,
  },
  {
    id: 'dialog-polish',
    title: 'Dialog & popover niceties',
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
    payoff:
      'showModal() brings focus trapping, Esc, and an inert background from the platform — the three things hand-rolled modals get wrong.',
    tags: ['interaction'],
    component: DialogPolishDemo,
    snippetHtml: dialogPolishSnippetHtml,
    snippetCss: dialogPolishSnippetCss,
  },
  {
    id: 'interest-invokers',
    title: 'Interest invokers (interestfor)',
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
    payoff:
      'Hover previews with built-in delays, keyboard parity, and Esc — the hover-only tooltip failures of 1.4.13, handled by an attribute.',
    tags: ['interaction'],
    component: InterestInvokerDemo,
    snippetHtml: interestSnippetHtml,
    snippetCss: interestSnippetCss,
  },

  {
    id: 'view-transitions',
    title: 'View Transitions',
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
    payoff:
      'Cross-page continuity as pure enhancement — reduced-motion users get an ordinary navigation, and no JS router is required at all.',
    tags: ['motion'],
    component: ViewTransitionDemo,
    snippetCss: viewTransitionSnippetCss,
    snippetJs: viewTransitionSnippetJs,
  },

  // Further candidates: media state pseudo-classes (custom player),
  // anchor-positioned tooltips, customizable <select>.
]

const tierOf = (id: string): BaselineTier => {
  const baseline = (baselineData as Record<string, BaselineInfo>)[id]?.baseline
  if (baseline === 'high') return 'widely-available'
  if (baseline === 'low') return 'newly-available'
  return 'limited-availability'
}

/* Map each demo component to its source folder on GitHub, derived from the file
   tree so there's no per-entry path to keep in sync. The "Show the code" panel
   only holds a portable excerpt — this is the full, real implementation. */
const REPO_TREE = 'https://github.com/ThomasSweet/a11y-foundation/tree/main/'
const demoModules = import.meta.glob<{ default: Component }>('./demos/*/*.vue', {
  eager: true,
})
const sourceHrefByComponent = new Map<Component, string>()
for (const [path, module] of Object.entries(demoModules)) {
  // './demos/Foo/Foo.vue' -> 'src/showcases/demos/Foo'
  const dir = path.replace(/^\.\//, 'src/showcases/').replace(/\/[^/]+$/, '')
  sourceHrefByComponent.set(module.default, REPO_TREE + dir)
}

export const showcases: Showcase[] = entries.map((e) => ({
  ...e,
  tier: tierOf(e.id),
  sourceHref: sourceHrefByComponent.get(e.component),
}))
