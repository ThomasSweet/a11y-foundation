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

## 2. Anchor positioning — automatic repositioning

The anchor showcase currently uses a single `position-try-fallbacks:
flip-block`. Make it genuinely viewport-aware:

- Add inline flipping and corner fallbacks
  (`flip-block, flip-inline, flip-start`), or define explicit
  `@position-try` fallback blocks for finer control.
- Test against all four viewport edges and confirm the panel never clips.

Scope: `AnchorPopoverDemo.vue`. Pure CSS — no JS positioning.

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
  `text-wrap: balance/pretty`, `@starting-style`.
