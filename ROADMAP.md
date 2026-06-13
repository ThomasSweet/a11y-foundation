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

## 6. "Moving indicator" interaction pattern (new section)

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

### 4. `@use` vs `@import`, and per-component folders

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

### 8. TypeScript

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
`.theme--*` preset with two values — data, not code. Any `.surface` subtree
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

**Next (not started):**
- **Colour-vision-deficiency themes** — palettes tuned for protanopia /
  deuteranopia / tritanopia, *plus* style-query-driven non-colour cues. This
  is the next theming step and the genuine home for container style queries.
- **Contrast clamp + user picker** (stretch) — currently the guarantee
  assumes seeds in safe lightness ranges (a mid-lightness accent can't reach
  4.5:1 with black or white text). A picker would clamp arbitrary seeds into
  safe ranges so you *can't* choose an inaccessible theme.
- Could grow `theming.css` into a `src/theming/` dir as it expands.
- Also feeds #10 (modern UI) — this is the color/contrast machinery it needs.

## Done log

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
