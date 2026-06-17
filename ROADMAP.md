# Roadmap & ideas

A running list of things to explore. Not a backlog with deadlines — a place
to capture intent so decisions stay consistent. Items are roughly grouped;
order is not priority.

The guiding constraints for everything here (from the project's character):

- **CSS/SCSS-first.** This is a styling showcase. Reach for a platform
  feature before JavaScript; reach for a tiny bit of Vue before a library.
- **Use what ships.** Current evergreen browsers only (~2 years back).
  No heavy dependencies, no complicated scripts.
- **Accessibility is the point**, not a checkbox — every idea below has to
  survive keyboard, screen reader, reduced-motion, and forced-colors.

---

## 1. Minimal native form validation

**Partially done (June 2026):** the CSS slice landed — `TextField.vue` now
styles `:user-valid` / `:user-invalid` (only after interaction, thicker
border as a non-color cue), gained a `required` prop, and gates the success
state to non-empty fields via `:placeholder-shown` (so an empty *optional*
field stays neutral, never green or invalid). The demo shows both paths: a
required display name and an optional `type="email"` field — the latter
also uses a `pattern` (HTML attribute, no JS) to require a dotted domain,
since `type="email"` alone accepts `a@b`. Required fields get a visual `*`
in the label (`aria-hidden`, since `required` already conveys it to AT).
**Still to do:**
surfacing the browser's native validation message into `aria-describedby`
and gating submit (the JS part) — and note that native validity is not yet
reflected to assistive tech via `aria-invalid` (only the explicit `error`
prop sets it); that wiring belongs with the JS part.

Build the smallest functional validation that leans on the platform:

- Native constraint validation (`required`, `type="email"`, `pattern`,
  `minlength`) as the source of truth.
- Style from validity pseudo-classes — crucially **`:user-valid` /
  `:user-invalid`** (not bare `:valid`/`:invalid`), so fields don't show
  errors before the user has interacted. This is the detail that makes
  native validation actually pleasant.
- JS only for what CSS can't do: surfacing the browser's validation
  message into an `aria-describedby`'d element, and gating submit.

Touches `TextField.vue`. Good candidate to also become a showcase entry
(`:user-valid` is in the stable tier). The registry backlog comment
already notes `:user-valid/:user-invalid`.

## 2. Anchor positioning — automatic repositioning ✅ Done (June 2026)

`AnchorPopoverDemo.vue` now uses `position-try-fallbacks: flip-block,
flip-inline, flip-block flip-inline`, so the panel flips across any
viewport edge (including the corner case) with no JS. Kept here for
posterity. Possible later refinement: explicit `@position-try` blocks if
finer control than the flip keywords is ever needed.

## 6. "Moving indicator" interaction pattern ✅ Done (June 2026)

Shipped as the `sliding-indicator` showcase: a view-switcher pill that
travels between options as one continuous object. Pure CSS — `:has()` reads
the checked radio to set `--i`, and the slide uses a motion token (so it's
an instant jump under reduced motion). Built over real, arrow-key-navigable
radios; the selected label also firms up (state isn't carried by position
alone). Original notes kept below; possible extension: a hover variant.

Explore selection/focus/hover indicators that *travel* between elements as
one continuous object, instead of fading in/out per element. Goal: more
visually interesting than the usual opacity/border-width change, but with
**equal or less** code and no accessibility cost.

Avenues to try (cheapest first):

- A single absolutely-positioned indicator element animated between
  targets — often less markup than per-item borders.
- **View Transitions API** with a shared `view-transition-name` on the
  indicator (already an Interop focus area / showcase candidate).
- Vue `<TransitionGroup>` for list reordering/movement.

Rules: the indicator is decorative (`aria-hidden`); real state stays on the
native control. Motion must mirror the user's own action and respect
reduced-motion. New section — does **not** need to live in the `:has()`
demo. (Separately: the `:has()` radio demo's focus styles need cleanup —
Thomas to look at.)

## 7. Page-to-page transitions

Have shared components morph across navigation instead of wiping and
rebuilding. Prefer what's available out of the box:

- **Cross-document View Transitions** (`@view-transition { navigation:
  auto }`) — works for MPA-style navigation with almost no JS.
- Vue's built-in `<Transition>` / Router transitions for SPA navigation.

Same constraint as #6: only adopt if it works without large, complicated
JavaScript.

## 5. A less "documentation-like" interactive site (long-term, discuss)

The current preview is intentionally plain — it reads as docs. Long-term,
reimagine it as something more engaging that still demonstrates the
features in real context. **Open design question — Thomas has ideas to
bring; to be discussed together** before any building starts.

## 9. "Guidelines, alive" — accessibility as a living standard

**Started (June 2026, criterion-first).** A section that treats WCAG not as
a static checklist but as an evolving standard, made tactile. The thesis:
the POUR *principles* are stable, but the *criteria* keep being added as
tech and understanding change (2.1 mobile/low-vision/cognitive; 2.2 focus,
dragging, target size; 3.0 draft = a shift from binary pass/fail to graded
outcomes). The POV: accessibility isn't a feature added on top — it's the
baseline these guidelines keep formalizing, and this foundation already
runs it.

The novel core (the bit not seen 10K times) is the **"break this rule"
toggle**: each demo is compliant by default and can switch its compliance
OFF so you *feel* the failure. Built so far:

- `src/criteria/` mirrors `src/showcases/`: `CriterionFrame.vue` (chrome +
  break-it toggle + `role="status"` pass/fail announcement), `registry.js`,
  `demos/`.
- **2.5.8 Target Size (Minimum)** — a toolbar that collapses to ~16px
  crowded targets when broken. Maps to the 24px base rule + `touch-primary()`.
- **1.4.10 Reflow** — a ~340px "phone" viewport whose content reflows to one
  column by default (intrinsic auto-fit/min() layout) and is forced past the
  viewport into 2D scrolling when broken. Maps to the project's
  media-query-free layout approach.
- **1.4.11 Non-text Contrast** — controls outlined only by borders; the
  shared border color drops from ~3.5:1 to ~1.2:1 when broken, so the
  controls melt into the background. Verified by computing the actual WCAG
  contrast ratio (compliant ≥3:1, broken <3:1). Maps to the token system;
  sets up the contrast work in #11.
- **2.4.11 Focus Not Obscured (Minimum)** — a scrolling panel with a sticky
  bar; `scroll-margin` keeps focused links clear of it (48px > 41px bar),
  broken drops the offset to 0 so the focus ring hides under the bar.
- **2.4.13 Focus Appearance** — buttons whose focus ring is the project's
  thick high-contrast token ring (3px + offset), broken shrinks it to a
  faint 1px hairline at zero offset. (Verified by reading the authored
  `:focus-visible` rules — script focus can't trigger `:focus-visible`.)
- **2.3.3 Animation from Interactions** — a panel with an entry slide on
  reload. Solved the "only felt with reduced-motion on" caveat with an
  in-demo "simulate reduced-motion" toggle; a single `--rm` custom-property
  switch governs all motion (compliant flips it to 1 on simulated OR real
  preference; broken forces it back to 0). Verified the duration matrix:
  compliant+pref = 0s, broken+pref = 0.45s.
- **1.3.4 Orientation** — a rotatable device frame; compliant adapts to both
  orientations, broken locks to landscape and shows the classic "rotate your
  device" wall in portrait. Verified the show/hide matrix and the
  portrait↔landscape dimension swap.

Each demo regresses ONLY the criterion in question (semantics stay intact),
via a `broken` slot prop → its own `.is-broken` styles.

**The planned criteria set is complete** — 7 living criteria spanning all
four POUR principles and WCAG 2.1 + 2.2: 2.5.8, 1.4.10, 1.4.11, 2.4.11,
2.4.13, 2.3.3, 1.3.4. Further criteria can be added the same way.

The narrative wrappers that turn these 7 cards into the "living standard"
story are now folded into **#10** (they converge with the modern-UI pass —
see there). Planned sequence: **#11 theming first** (it builds the color
machinery #10 needs), then the combined #10 experience.

---

## Cross-cutting decisions (questions raised — notes below)

### 3. CSS naming strategy

The appeal of BEM here isn't scoping (Vue `scoped` already gives us that) —
it's that the naming *discipline* forces you to think about template
structure, and keeps a component's many elements organized into legible
sections. That's a real value even when collisions aren't a risk.

Options to weigh, not yet decided:

- **Keep BEM-style names inside scoped styles**, purely as a structural/
  documentation convention (`block__element`, `block--modifier`). Costs
  nothing technically; buys the mental model you like.
- **A lighter house convention** — root class = component, descendants
  named by their *role* (`.card-title`, `.card-meta`), no `__`/`--`
  ceremony. This is roughly what the repo does today, just informally;
  worth making it an explicit rule in GUIDE.md either way.

Decision needed: write the chosen convention into GUIDE.md so it's not
"random naming" but a documented, intentional one. Note: less relevant in a
small project, more valuable as components grow many-elemented.

### 4. `@use` vs `@import`, and per-component folders — folders ✅ Done (June 2026)

Per-component folders done: reusable components moved to `Component/Component.vue`
+ `Component.scss` (via `<style scoped src>`), mixin injection intact, verified
clean. The `@use`/`@import` notes below stand (no change needed). Original
notes kept for posterity.

**Sass `@use` vs `@import`:** not really a tradeoff anymore — Sass
`@import` is **deprecated and being removed** from Dart Sass. `@use` is the
modern replacement: loads each file once (no duplicate output), namespaces
members, and keeps things private by default. This project already does the
right thing — mixins come in via `@use "...mixins" as *` injected through
Vite's `additionalData`. No action needed for Sass.

(Note the separate thing: the CSS-native `@import` chain in
`styles/index.css` is a *different* feature — runtime CSS imports. It's
fine as-is for a project this size; could later move to JS imports so the
bundler concatenates them, but that's a minor optimization, not a
correctness issue.)

**Per-component folders:** colocate each component's files in its own
folder, e.g.

```
components/
  AppButton/
    AppButton.vue
    AppButton.scss      ← styles extracted from the SFC
    AppButton.test.ts   ← future
    ...                 ← future utilities, fixtures
```

Key detail so we don't lose scoping: Vue lets the SFC reference an external
stylesheet **and keep scoping**:

```vue
<style scoped lang="scss" src="./AppButton.scss"></style>
```

That preserves the `@layer components` + `scoped` guarantees from GUIDE.md
while moving CSS into its own file. Worth a small spike on one component
first to confirm the layer wrapping and the Vite mixin injection still
behave through `src`.

### 8. TypeScript ✅ Done (June 2026)

Adopted incrementally: `lang="ts"` on components/frames/App.vue, type-based
props (`withDefaults(defineProps<…>(), …)`), registries converted to typed
`.ts` (`Showcase[]` / `Criterion[]`), `typecheck` script via `vue-tsc`.
Demos stay simple. Kept here for posterity; original notes below.

Low risk here, and unlikely to "make our lives harder" — Vue + Vite support
TS with essentially zero extra setup:

- Add `lang="ts"` to `<script setup>` where there's actual logic.
- Type-check with `vue-tsc` (one dev dependency, no runtime cost, no build
  complexity).

Given the project is mostly CSS/SCSS with thin Vue glue, adopt it
**incrementally and opportunistically** — type the files that have real
logic (registry, any composables), don't force it on trivial demos. No big
migration, no dependency sprawl. Aligns with "showcase of clever, clean
Vue."

---

## Parking lot

- More TODOs to come — add them here as they surface.
- Showcase backlog (separate, in `src/showcases/registry.js`): style
  queries, `shape()`, advanced `attr()`, popover standalone demo,
  `@starting-style`.

## 10. Modern UI + "living standard" narrative (one combined effort)

**In progress (June 2026).** Done so far: the design-language pass (modern
shell/hero/type/depth/glow), the **version timeline** (`CriteriaTimeline`),
the **conformance-model shift** beat (`ConformanceShift` — interactive
binary-vs-graded), the **legal/geographic map** (`LegalMap` — WCAG core +
converging laws), and the **moving-indicator** interaction (the
`sliding-indicator` showcase; see #6), **scroll-driven motion** (section
reveals + page progress bar), and the **tabbed restructure with View
Transitions** (#12 — gives the page its through-line). **#10 is
complete**, including the polish pass (card hover, dialog-button fix, sticky
glassy tab bar, punchier reveal, scroll-morphing timeline spine) and
deep-linking the active pillar to the URL hash.

**Decided (June 2026): the narrative wrappers and the modern-UI pass are the
same effort, not two.** A timeline / scroll-told experience is inherently a
visual-and-motion artifact, so building the narrative *is* the occasion to
apply the modern aesthetic. They ship together.

The two halves:

- **Narrative (information architecture):** turn the 7 flat criterion cards
  into the "a11y is a living, evolving standard" story —
  (a) a **version timeline** (2.0→2.1→2.2→3.0-draft) where each version
  reveals the criteria it added and our existing cards slot into their
  version; (b) the **conformance-model shift** (binary A/AA/AAA → WCAG 3.0
  draft outcome/scoring) as the "progress" beat; (c) a **legal/geographic
  map** (WCAG core wrapped by EN 301 549 / EAA in force since mid-2025,
  Section 508, ADA…). Always backed by live demos, never pure prose.
- **Modern UI (visual language):** move away from the flat/"Bootstrap-ish"
  look — depth, bolder type scale, spacing rhythm, color vibrancy, glassy
  rounded surfaces, scroll-choreographed motion.

**The key principle that unifies them and fits our goals:** the medium is the
message. The mechanisms that make a modern scroll experience feel alive —
scroll-driven animations, view transitions, container queries,
`contrast-color`, `color-mix` — are the *exact cutting-edge CSS features we
already showcase*, and they're reduced-motion-aware. So the experience is
built FROM our accessible-CSS features, and **the live demos are the visual
interest — no hero imagery needed** (resolves Thomas's "modern UI = big
images" worry).

Reference aesthetic: the Framer design genre (dark canvas, gradient accents,
big type, generous spacing, soft depth/glass, spring/scroll motion). Adopt
the *language*, swap hero images for our demos. **Thomas to share a
screenshot or 2–3 specific likes** for pixel-level calibration; a fetched
link only yields text, not visual design.

**Dependency:** #11 theming produces the color/contrast machinery
(`color-mix`, `contrast-color`, palettes, guaranteed ratios) that a vibrant
UI needs — so do #11 first; it feeds this. Non-negotiable guardrail: survives
dark mode (already), forced-colors, reduced-motion, high-contrast — the
existing preference mixins enforce it. That constraint IS the thesis:
exciting *and* accessible, proven in one artifact. Likely lives in
`tokens.css` + component styles so the foundation absorbs it.

## 11. Contrast-safe theming — seed-driven derivation engine

**Engine built (June 2026).** A theme is just **two seed colors**
(`--seed-surface` + `--seed-accent`); the entire working palette (the same
`--color-*` tokens components already consume) is derived once in
`src/styles/theming.css` (new `themes` @layer). Adding a theme = a
`.theme-*` preset with two values — data, not code. Any `.surface` subtree
re-themes automatically; components need zero changes.

How it stays contrast-safe by construction:
- Text colors flip to black/white against their background via the OKLCH
  lightness of the seed (`oklch(from … clamp(0,(0.62 - l)*infinity,1) 0 0)`),
  so text is always on the high-contrast side; `contrast-color()` refines it
  where supported (`@supports`).
- Greys (surface steps, borders, muted text) are **mixed toward the text
  color** with `color-mix(in oklab, …)`, so they gain contrast in the same
  direction — light and dark themes both work from one rule set.

Verified: 4 starter themes (Default, Ocean, Midnight, Sunset), every pairing
passes WCAG AA — text/bg 17–20:1, muted 6.6–9.9:1, border ≥3.78:1, button
label 5.7–8.5:1 (measured via canvas sRGB sampling). Demo:
`ThemeShowcaseDemo.vue`, registered as the `theming` showcase (emerging).

**Decision on container style queries:** for the core *switch*, plain
custom-property inheritance was cleaner than style queries (no bloat, works
everywhere) — so the engine doesn't use them. They're **reserved for the
colour-vision themes**, where they earn their place by adding NON-colour cues
(underlines, patterns, icons) to descendants that style queries can do and
inheritance can't.

**Next:**
- **Non-colour cues via container style queries** ✅ Done (June 2026) — the
  `style-queries` showcase (`StyleQueryCuesDemo`): a single `--cues` toggle on
  a container makes `@container style(--cues: on)` add a distinct *shape* to
  every status inside, so meaning never rests on colour alone (WCAG 1.4.1).
  Status also carries an `aria-label` for screen readers. This is the genuine
  home for container style queries.
- **CVD-tuned palette presets** ✅ Done (June 2026) — three `.theme-*` presets
  (`cobalt` / `teal` / `amber`) on hues that survive red–green deficiencies,
  each with strong label lightness-contrast; surfaced in `ThemeShowcaseDemo`
  and as quick-apply chips in the picker. Named for the hue, not the person.
- **Contrast clamp + user picker** ✅ Done (June 2026) — `ThemePickerDemo`: an
  accent hue + lightness picker where a **pure-CSS clamp** (relative color +
  `min()`/`max()` + a step built from `(0.62 − L)*100000` clamped to 0–1)
  snaps lightness out of the "muddy middle" (dead zone 0.45–0.78) so the
  black/white label always clears AA. Verified hue-robust: 156-sample
  hue×lightness sweep, 0 failures, min 6.27:1 (analytic worst case 6.24:1 at
  cyan ~190°); a *bypass* toggle reveals the failures the clamp prevents. The
  numeric read-out uses an OKLab→sRGB→WCAG contrast calc in JS (the only JS;
  the theming itself is all cascade). Gotcha logged: don't verify oklch
  contrast via `canvas` fillStyle sampling — it mishandled the color space and
  gave wrong ratios; the analytic OKLab math is the source of truth.
- Could grow `theming.css` into a `src/theming/` dir as it expands.
- Also feeds #10 (modern UI) — this is the color/contrast machinery it needs.

## 12. Content restructure — give the page a through-line ✅ Done (June 2026)

Shipped the **tabbed-views** option: the page is now three pillars
(Foundation / Guidelines / CSS showcases) behind an accessible tablist
(`role=tablist/tab/tabpanel`, roving `tabindex`, arrow/Home/End keys,
`aria-selected`/`aria-controls`). The tab nav reuses our own sliding-pill
indicator, and panel swaps animate with **View Transitions** (Vue `nextTick`
pattern) — guarded by reduced-motion, `@supports`, AND document visibility
(a hidden tab can't run the transition's render-loop callback). Panels use
`v-show` so component state (toggles, sliders) persists across switches.
Follow-ups: **deep-linking ✅ Done (June 2026)** — the active pillar syncs to
the URL hash (`#foundation`/`#guidelines`/`#showcases`): honored on load,
`pushState` on tab change, and `popstate` makes back/forward work. Still
open: a sticky glassy tab bar. Original options/notes kept below.



The page has grown into one long scroll with no narrative spine across the
top level. The content falls into **three natural pillars**:

1. **Foundation** — the toolkit components (Buttons, Dialog, Form fields,
   Motion): tokens, layers, preferences in action.
2. **Guidelines, alive** — the WCAG narrative (timeline → conformance shift →
   legal map).
3. **CSS showcases** — cutting-edge CSS, stable vs emerging.

Two structural options (Thomas to choose):
- **Tabbed views (single page, recommended):** a top-level switcher between
  the three pillars, animated with **View Transitions**, using our own
  `sliding-indicator` as the nav. No routing dependency; "the medium is the
  message" (the site navigates with the components it showcases). Deep-link
  via URL hash optional. This is also the natural home for View Transitions
  (deferred from the motion layer).
- **Multi-page routing:** real routes per pillar with vue-router + cross-
  document/SPA View Transitions. Proper URLs/deep links, at the cost of a
  dependency and more structure.

Either way, add a persistent nav/header showing the structure, and an
on-page table of contents per pillar. Recommendation: start with tabbed
views (no new deps, reuses our components); promote to routing later only if
deep-linking/SEO demands it.

## Done log

- **Two showcase fixes** (June 2026): (1) **Dialogs centered** — the reset's
  `* { margin: 0 }` (author layer) was overriding the UA `dialog { margin:
  auto }` that centers modal dialogs, dropping them to the top-left. Restored
  `dialog { margin: auto }` in the reset layer so every dialog centers. (2)
  **Anchored popovers now flip at the viewport edge** — root cause: we'd
  overridden the popover UA default `position: fixed` with `position:
  absolute`, so the containing block became `.app-shell` (`position: relative`,
  full page height) instead of the viewport; the panel never "overflowed" so
  `position-try-fallbacks` never fired. Switched both anchored demos back to
  `position: fixed`. Verified: flips above near the bottom edge, stays below
  when there's room, no spurious flips. (Gotcha logged: a transformed ancestor
  — even the section-reveal's identity matrix — was a red herring here; the
  real trap was `position: absolute` + a `position: relative` ancestor.)
- **Three Interop-2026 showcases from the Syntax video** (June 2026), chosen by
  gap analysis against the episode's feature list: (1) **Scroll-state queries**
  (`ScrollStateDemo`) — `@container scroll-state(snapped: inline)` makes the
  centered card highlight itself + show a "snapped" badge; `scroll-state(stuck:
  top)` restyles a sticky header once pinned. Pure CSS, no scroll listeners —
  the legit version of the active-indicator/"highlight current item" idea the
  hosts flagged as a JS pain point. (2) **Custom Highlight API**
  (`HighlightApiDemo`) — live search-match highlighting via `::highlight()` +
  `CSS.highlights` + `Range`, no wrapper spans, a11y tree untouched; caption
  notes it's presentation-only. The `::highlight()` rule lives in a 2nd
  *unscoped* style block (it's a global named pseudo Vue scoping would break).
  (3) **Dialog/popover niceties** (`DialogPolishDemo`) — `popover="hint"`
  toggletip + `<dialog closedby="none">` takeover, styled via `:open`. Verified
  live: snapped highlights exactly 1 card, stuck badge+shadow on pin, highlight
  count updates/clears, dialog opens via `:open`.
- **Contrast-clamped theme picker + CVD presets** (June 2026): interactive
  `ThemePickerDemo` proving the engine can't be dragged into an inaccessible
  state (pure-CSS lightness clamp; bypass toggle to show the failures it
  prevents), plus three CVD-robust `.theme-*` presets in the gallery. Full
  detail under #11 "Next". 156-sample sweep: 0 AA failures, min 6.27:1.
- **Top reading-progress bar removed** (June 2026): the fixed `.scroll-progress`
  bar in the app shell just duplicated the native scrollbar, so it was dropped
  with no replacement. (The standalone `ScrollProgressDemo` in the showcases —
  which demonstrates the technique in isolation — stays.)
- **Scroll-driven app chrome — tried & reverted** (June 2026): prototyped three
  combined scroll-driven effects in the shell — a CSS-only scrollspy rail
  (named `view-timeline`s read via `timeline-scope`, no JS), pinning/shrinking
  section headers, and an ambient `@property`-driven accent-hue travel. All
  three removed per user feedback: the sticky headers made scanning content
  more confusing, the rail didn't look good, and the hue travel was effectively
  invisible (it only tinted the rail). Lesson kept for next attempt: find a
  scroll-driven idea that's genuinely integrated/visible, ideally from a
  reference the user supplies. Pre-existing `.demo` section-reveal is untouched.
- **Popover menu anchoring** (June 2026): the standalone popover menu was
  rendering via the UA default (centered/cornered) — added anchor positioning
  (`anchor-name` on the trigger, `position-anchor`/`position-area`/
  `position-try-fallbacks` on the menu, clearing the UA `inset/margin`) so it
  tethers under its button, with the UA placement as the no-support fallback.
- **Three more showcases** (June 2026): `ScrollSnapDemo` (stable — horizontal
  `scroll-snap-type: x mandatory` strip, cards `scroll-snap-align: center`, a
  focusable `role="region"` so the keyboard scrolls it, rides the foundation's
  reduced-motion `scroll-behavior`); `FieldSizingDemo` (emerging — textarea
  `field-sizing: content` behind `@supports`, min/max in `lh`, `resize:
  vertical` + `rows` fallback); `PopoverMenuDemo` (stable — real actions menu
  on the `popover` attribute: Esc/light-dismiss/top-layer/`aria-expanded` for
  free, items close declaratively via `popovertargetaction="hide"`, entry
  transition via `@starting-style`). Replaced the popover placeholder with the
  real demo. Verified live: snap 5 cards x-mandatory, field 50→170px grow +
  shrink, popover open/declarative-close/status. Lint/typecheck/build green.
- **Fixes round** (June 2026): (1) Focus Appearance demo now actually differs
  — the foundation's `*:focus-visible` (preferences layer) was overriding the
  broken state, so the broken rule now uses `!important` (the anti-pattern is
  the lesson). (2) text-wrap example columns capped at 18rem so headings wrap
  on wide screens. (3) More whitespace + bolder type (space-20/24 tokens,
  bigger gaps/padding, 800-weight display). (4) Card hover replaced with a
  subtle smooth shadow lift, also on `:focus-within`. (5) `:has()` demo
  reworked to a selectable list — `:has(:checked)` styles the row (persists,
  upward), `:focus-within` handles focus (the right tool). Also: `attr()`
  showcase wired (`AttrDemo`, with CSS-var fallback).
- **shape() + @starting-style showcases** — `ShapeDemo` (curved decorative
  band via `clip-path: shape()`, text kept clear) and `StartingStyleDemo`
  (animate in from display:none, exit via `allow-discrete`, motion-token
  gated). Fixed a real bug: the `@supports`/`supports` test `shape(from 0 0)`
  is invalid without a command, so it always read false — now uses a valid
  test. Also slowed the timeline spine fill (`cover 12% 96%`). June 2026.
- **#10 polish pass** — card hover lift (showcase + criterion, can-hover,
  motion-token transitions), fixed the full-width "Open dialog" button
  (wrapped in `.demo-row`), sticky glassy pillar tab bar (reduced-transparency
  + forced-colors fallbacks), punchier section reveal, and a scroll-morphing
  timeline spine (accent line "draws" + markers pop via `view()` timelines,
  reduced-motion/@supports gated). June 2026.
- **#11 non-color cues (container style queries)** — `StyleQueryCuesDemo`:
  `@container style(--cues: on)` adds shapes to color-only statuses; realizes
  the `style-queries` showcase. June 2026.
- **#12 deep-linking** — active pillar ↔ URL hash, with back/forward via
  popstate. June 2026.
- **#12 content restructure** — three pillars behind an accessible tablist
  with View-Transition panel swaps; reuses the sliding-pill nav. Includes a
  visibility guard so the transition is skipped on hidden tabs. June 2026.
- **#10 scroll-driven motion** — sections ease in on scroll (`view()`
  timeline) and a page reading-progress bar (`scroll()` timeline). Reveal is
  progressive enhancement: off by default, added only under
  prefers-reduced-motion:no-preference + @supports. June 2026.
- **#6 moving indicator** — `sliding-indicator` showcase: a selection pill
  that travels between options, pure CSS (`:has()` + motion tokens). June 2026.
- **#10 conformance-model shift** — `ConformanceShift`: drag failing-checks
  to watch binary AA flip to Fail while the WCAG 3.0 graded score degrades
  gradually (verified: 2/5 → Fail vs 60% Bronze). June 2026.
- **#10 legal map** — `LegalMap`: WCAG core with EU/EAA, US 508, ADA Title II,
  Canada converging on it (with an "evolving snapshot" disclaimer). June 2026.
- **#10 design-language pass** — modern shell: hero with gradient-text title,
  fluid display type scale (clamp), layered light/dark shadows, accent page
  glow, card elevation. All preference-aware (forced-colors fallback for the
  gradient text, glow drops under reduced-transparency). June 2026.
- **#10 version timeline** — "Guidelines, alive" reframed as a WCAG timeline
  (`CriteriaTimeline`): eras 2.0→2.1→2.2→3.0 on a spine, the 7 criteria
  grouped under their version, foundation/draft eras as hollow-marker notes.
  June 2026.
- **Per-component folders + extracted SCSS** (#4) — each reusable component
  in its own folder with styles in a sibling `.scss` via `<style scoped src>`;
  mixin injection still works. June 2026.
- **TypeScript adoption** (#8) — `lang="ts"` on components/frames/App,
  type-based props, registries → typed `.ts` (`Showcase[]`/`Criterion[]`),
  `typecheck` script (`vue-tsc`). Build + typecheck both clean. June 2026.
- **Anchor positioning fix** — cleared the UA popover centering
  (`inset: auto`) that was overriding `position-area`; panel now anchors to
  the trigger — June 2026.
- **Dialog light-dismiss** — coordinate-based backdrop-click close on
  `AppDialog`; Esc + focus-trap stay native — June 2026.
- **Contrast-safe theming engine** — seed→palette derivation, 4 themes, all
  WCAG AA (#11) — June 2026.
- **1.3.4 Orientation** criterion (break-it demo) — completes the planned
  7-criterion set (#9) — June 2026.
- **2.3.3 Animation from Interactions** criterion (break-it demo, with
  simulated-preference toggle) (#9) — June 2026.
- **2.4.11 Focus Not Obscured + 2.4.13 Focus Appearance** criteria
  (break-it demos) (#9) — June 2026.
- **1.4.11 Non-text Contrast** criterion (break-it demo) (#9) — June 2026.
- **1.4.10 Reflow** criterion (break-it demo) (#9) — June 2026.
- **"Guidelines, alive" section + first criterion (2.5.8) with break-it
  toggle** (#9) — June 2026.
- **`text-wrap: balance / pretty`** showcase (stable tier) — June 2026.
- **Anchor auto-repositioning** (#2) — June 2026.
- **`:user-valid` / `:user-invalid` styling** (CSS slice of #1) — June 2026.
