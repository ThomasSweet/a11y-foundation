# a11y-foundation — Coding Guide

A reference for using and extending this styling foundation consistently.
Following these conventions keeps the cascade predictable, avoids specificity
conflicts, and ensures accessibility preferences always win.

---

## File overview

```
src/
├── styles/
│   ├── layers.css          — @layer stack declaration (imported FIRST)
│   ├── reset.css           — element normalization            (layer: reset)
│   ├── tokens.css          — design tokens, light-dark theming (layer: tokens)
│   ├── theming/
│   │   ├── engine.css      — seed-driven palette derivation     (layer: themes)
│   │   ├── presets.css     — the theme presets, two seeds each  (layer: themes)
│   │   └── blueprint.css   — the blueprint skin's --bp-* tokens (layer: themes)
│   ├── base.css            — bare-element styles, target sizes (layer: base)
│   ├── utilities.css       — .visually-hidden, .skip-link   (layer: utilities)
│   ├── preferences.css     — global preference overrides  (layer: preferences)
│   ├── index.css           — entry point importing all of the above
│   └── scss/
│       ├── _breakpoints.scss   — from(), between()
│       ├── _containers.scss    — cq-from(), cq-between()
│       ├── _interaction.scss   — can-hover(), touch-primary()
│       ├── _preferences.scss   — reduced-motion(), reduced-transparency(),
│       │                         high-contrast(), forced-colors(),
│       │                         dark-mode(), light-mode()
│       └── _mixins.scss        — barrel file
├── components/             — reusable components, one folder each:
│   ├── AppButton/          — AppButton.vue + AppButton.scss (via <style scoped src>)
│   ├── AppDialog/          — native <dialog> with closedby
│   ├── TextField/          — labelled input with :user-invalid cues
│   └── ThemeToggle/        — the header theme control; useSiteTheme.ts is the composable
├── site/                   — the blueprint shell shared by every Vue page
│   ├── SiteFrame/          — page frame, grid, header, title-block footer
│   ├── HubView/            — the overview hub (index page)
│   ├── HubRevisions/       — the hub's "What changed" block; revisions.ts is the registry
│   ├── ChapterLayout/      — chapter chrome: legend rail, header, watermark;
│   │                         chapterSections.ts holds the section registry
│   ├── ChapterSection/     — one chapter section; registers itself with the rail
│   ├── AgentSkillView/, DevToolsView/, GlossaryView/,
│   │   ScreenReaderView/   — the four reference sheets, each a SiteFrame page
│   ├── AuditRoomView/, ListeningRoomView/
│   │                       — the practice rooms P·01 and P·02, each a
│   │                         SiteFrame page built on PracticeRoom
│   ├── PracticeRoom/       — the room chrome both practice rooms share:
│   │                         contract and skip link, the inert preview of the
│   │                         broken page, the two-tier answers list
│   └── pillars.ts          — the four chapters (order, titles, hrefs, icons)
├── pages/                  — one thin root per chapter: StandardPage, CraftPage,
│                             ShowcasePage, ProofPage (ChapterLayout plus sections)
├── entries/                — one module per HTML file; mount.ts imports the
│                             stylesheet and hydrates, prerender.ts lists every view
├── showcases/              — CSS showcases grouped by Baseline tier (see "CSS showcases")
│   ├── registry.ts         — typed metadata for every showcase, drives ShowcasePage
│   ├── baseline-data.json  — generated per-showcase Baseline status, committed
│   ├── ShowcaseFrame/      — wrapper: Baseline badge, support detection, code panel, links
│   ├── BaselineBadge/      — the badge and its sprite of the official Baseline icons
│   ├── CodeBlock/          — the "Show the code" panel
│   └── demos/              — one folder per CSS feature: XDemo.vue + XDemo.snippet.*
├── criteria/               — "Guidelines, alive" WCAG demos
│   ├── registry.ts         — typed metadata for every criterion
│   ├── CriteriaTimeline/   — the criteria on WCAG's timeline
│   ├── CriterionFrame/     — wrapper with the "break this rule" switch
│   ├── StandardsMap/       — laws by the WCAG version they cite; standardsMapData.ts
│   └── demos/              — one component per criterion
├── craft/                  — the craft chapter: demos/, CodeCompare, CraftLinks,
│                             links.ts and snippets.ts (the per-section data)
├── testing/                — the proof chapter's pieces: AccessibilityTree,
│                             AuditStylesheet, CoverageMatrix, TestingLayers
├── glossary/               — terms.ts (the glossary registry) and GlossaryRef.vue
├── icons/                  — pillarIcons.ts, the chapter icons
├── legal/                  — legal.scss for the static impressum and privacy pages
└── styleguide/             — styleguide.scss for the static style-guide page

scripts/
├── gen-baseline.mjs        — writes src/showcases/baseline-data.json from web-features (prebuild)
├── gen-feed.mjs            — writes public/feed.xml from revisions.ts (prebuild; npm run feed:gen)
├── gen-moves.mjs           — proposes what-changed lines after a web-features bump (npm run moves:gen)
├── gen-skill.mjs           — emits the agent skill's references and the public/llms/ mirror (npm run skill:gen)
├── gen-icons.mjs           — favicon, PWA icons, apple-touch icon, OG image, social preview (npm run icons:gen)
├── gen-baseline-icons.mjs  — fetches the official Baseline icon sprite; manual, needs the network
├── baseline-watch.js       — the fallback MANIFEST; report via npm run baseline:check, gate via vitest
└── prerender.mjs           — SSR build of every view into dist/*.html, the second half of npm run build

tests/
├── unit/                   — vitest, node environment: themePickerMath, showcaseSnippets,
│                             baseline, revisions
└── e2e/                    — Playwright in Chromium, Firefox and WebKit: a11y, keyboard,
                              inversion, audit-room, listening-room, prerender, feed,
                              standards-map, anchor-tooltip, responsive, contrast,
                              focus-ring, orientation

.github/workflows/
├── ci.yml                  — the gates, on push and pull_request to main
├── deploy.yml              — production deploy after a green CI run on main
└── baseline-moves.yml      — the Monday bot: web-features bump and a what-changed PR

skills/accessible-by-default/
├── SKILL.md                — hand-written
└── references/             — generated by gen-skill.mjs: wcag-criteria, modern-css, css-snippets

public/                     — copied verbatim into dist/; the parts that are generated:
├── feed.xml                — the Atom feed, from gen-feed.mjs
├── llms/                   — SKILL.md and the three references, mirrored by gen-skill.mjs
├── favicon.svg, icon-192.png, icon-512.png, apple-touch-icon.png, og-image.png
│                           — from gen-icons.mjs
├── sitemap.xml             — hand-maintained: add a page here when you add an HTML file
└── broken-page.html, broken-press-kit.html
                            — hand-written, noindex: the practice rooms' broken
                              pages, built without this site's styles or layers
```

---

## Cascade layers — the one rule

`layers.css` declares the stack:

```css
@layer reset, tokens, themes, base, layout, components, utilities, preferences;
```

Later layers beat earlier layers regardless of specificity or source order.
That's what lets `preferences` win without `!important`.

**The rule: no unlayered CSS, ever.**
Unlayered styles beat *all* layered styles — a single unlayered
`outline: none` in a component would silently defeat the focus styling in
the `preferences` layer. Every rule you write must be inside a layer:

| What you're writing                  | Layer        |
|--------------------------------------|--------------|
| Element resets                       | `reset`      |
| Custom properties / tokens           | `tokens`     |
| Bare-element defaults (h1, a, input) | `base`       |
| Page composition, grids, containers  | `layout`     |
| Component styles (all Vue SFCs)      | `components` |
| Single-purpose helper classes        | `utilities`  |
| User preference overrides            | `preferences`|

### In Vue single-file components

Wrap the whole style block:

```vue
<style scoped lang="scss">
@layer components {
  .card {
    /* ... */
  }
}
</style>
```

`scoped` handles name collisions (so no BEM ceremony is needed);
`@layer components` keeps the cascade guarantees intact. Both, always.

---

## CSS class naming

Because every SFC uses `<style scoped>`, class names are already isolated per
component — there's no collision to defend against, so there's no reason for
short, cryptic prefixes. **Name classes for the role they play, spelled out in
full, in kebab-case.**

- **Readable, spelled-out prefix**, derived from the component or feature:
  `.theme-picker-preview`, `.scroll-state-track`, `.reflow-viewport` —
  not `.tp-preview`, `.sst-track`, `.rf-viewport`. The next reader should know
  what they're looking at without decoding an abbreviation.
- **One prefix per component block**, with the part as a suffix:
  `.theme-picker-controls`, `.theme-picker-report`, `.theme-picker-note`.
- **State is a second class** using the `is-` / `has-` convention, toggled with
  a binding — never folded into the structural name:
  `class="theme-picker-report is-fail"` ← `:class="{ 'is-fail': … }"`.
- **Match custom-property names to the block** too: `--dialog-…`, not `--dp-…`.
- **Shared / global classes stay unprefixed and stable** — they're the
  exception, because they're *meant* to be reused across components:
  `.surface`, `.surface-title`, `.skip-link`, `.visually-hidden`.

Spelling it out costs a few characters; it buys a stylesheet (and a DOM
inspector) that reads like prose. The hash `scoped` appends keeps everything
collision-free regardless of how plain the names are.

---

## Component folders & TypeScript

Each reusable component lives in **its own folder**, with the styles in a
sibling `.scss` file referenced by `src` — which keeps Vue's `scoped` +
`@layer` guarantees while moving CSS out of the SFC:

```
components/AppButton/
  AppButton.vue     ← template + <script setup lang="ts">
  AppButton.scss    ← @layer components { … }
```

Tests do not sit beside the component: vitest includes only
`tests/unit/**/*.test.ts` (`vitest.config.ts`), and interaction behaviour is
covered by the Playwright suite in `tests/e2e/`.

```vue
<!-- AppButton.vue -->
<style scoped lang="scss" src="./AppButton.scss"></style>
```

The library mixins are still injected by Vite's `additionalData`, so the
external `.scss` files use `@include can-hover { … }` etc. with **no `@use`**,
exactly like inline blocks did.

**TypeScript** is adopted where there's real logic:

- `<script setup lang="ts">` in components (transpiled by esbuild — no extra
  dependency for dev/build). Prefer type-based props:
  `withDefaults(defineProps<{ variant?: 'primary' | 'secondary' }>(), { … })`.
- Content lives in typed registries, so the data and the components that
  consume it stay in sync: `src/showcases/registry.ts` (`Showcase[]`),
  `src/criteria/registry.ts` (`Criterion[]`),
  `src/criteria/StandardsMap/standardsMapData.ts` (the laws, plus the
  `sourcesRead` stamp the map prints; move that date when you re-read the
  sources), `src/site/HubRevisions/revisions.ts` (`Revision[]`, see "What
  changed"), `src/craft/links.ts` and `src/craft/snippets.ts` (the craft
  chapter's per-section links and bad-to-good pairs), and
  `src/glossary/terms.ts` (`GlossaryEntry[]`).
- `npm run typecheck` runs `vue-tsc --noEmit`. Run it alongside
  `npm run lint:css` and `npm run lint:js` before committing — a clean build
  does **not** imply a clean type-check (esbuild strips types without checking
  them), and neither implies clean lint. Then `npm run test:unit`: vitest in
  the node environment, holding the ThemePicker contrast maths
  (`themePickerMath.test.ts`), the snippet guard that fails a showcase folder
  without a `*.snippet.*` file (`showcaseSnippets.test.ts`), the Baseline gate
  that fails when a fallback in the `MANIFEST` of `scripts/baseline-watch.js`
  has reached its removal bar (`baseline.test.ts`), and the revisions guard
  (`revisions.test.ts`, see "What changed"). `npm run test:e2e` builds, serves
  and runs the Playwright suite in three engines; `npm run baseline:check`
  prints the Baseline report the gate is built on. CI runs all of it.
- `npm run lint:js` is ESLint (flat config, `eslint.config.js`) over JS/TS/Vue,
  at `--max-warnings 0`. It is deliberately lean: types belong to vue-tsc and
  formatting rules are switched off, so what remains flags real defects. The
  few `vue/no-v-html` suppressions are per-site and each carries its reason.
- The registries feed one more consumer: `npm run skill:gen` emits the Agent
  Skill's reference files under `skills/accessible-by-default/references/`
  and mirrors them, together with the hand-written `SKILL.md`, to
  `public/llms/`, which is what `/llms.txt` links.
  **Re-run it after adding or editing a criterion or a showcase**, or the
  published skill drifts from the site. CI enforces this: the "Generated files
  are committed" step runs `skill:gen` after the build and fails when
  `skills/`, `public/llms/`, `public/feed.xml` or
  `src/showcases/baseline-data.json` differ from what is committed. The
  Monday bot regenerates all of them itself (see "Continuous integration and
  deployment"). The script loads the registries through Vite's SSR pipeline
  (they import `.vue` and `?raw`, so plain node can't), and emits only
  context-free fields — `summary`, `passText` and `failText` are written for
  someone looking at a live demo and don't travel.
- **`npm run build` prints ~14 `[lightningcss minify]` warnings, and they are
  expected.** Vite's minifier does not recognise the newest selectors this site
  showcases: `::scroll-button()`, `::scroll-marker`, `::scroll-marker-group`,
  `:target-current`, `:interest-source`, `::highlight()`. Verified July 2026
  that it warns and then emits every one of them **unchanged** — the occurrence
  counts in `dist/assets/*.css` match the warning counts exactly. Nothing is
  stripped or rewritten. If you ever need to re-check, grep the built CSS for
  the selector rather than trusting the warning. They will disappear on their
  own as lightningcss catches up with the specs.

### Script writes state into the document

Where script is the right tool, it writes what it knows into the document: an
element's text, an attribute such as `aria-pressed`, a status message, or
focus. CSS then styles from that. A custom property is not in the
accessibility tree, so it never holds the only copy of a state; it may carry a
value for styling, such as a hue or a count (`--pick-h`, `--n`). Ask first
whether the platform already exposes the state as a pseudo-class or an
attribute: if it does, a script copy is a second source of truth, and the two
drift.

---

## Comments

Zero by default. The code says what. The reasoning belongs in the commit
message and the pull request. A rule the next change has to follow belongs in
this guide, and an engine bug you work around goes in "Engine behaviours we
work around". A decision about what the site will or will not do goes under
"Standing decisions" in `ROADMAP.md`, in one sentence with its reason. A
longer record of why goes in `docs/history/` only when a later reader will
ask. If a comment ever seems load-bearing, propose its exact text in review
and wait for a yes before adding it. CSS, SCSS and Vue `<style>` blocks carry
none, ever.

---

## Chapter page anatomy

Every chapter page (`standard`, `craft`, `proof`, `showcase`) is the same
four-layer composition. Each layer has one job:

- **`SiteFrame`** — the paper: sheet outline, grid, registration marks, the
  header and the title-block footer. Knows nothing about chapters; the hub,
  the four reference sheets (glossary, agent skill, screen reader, devtools)
  and the two practice rooms (audit room, listening room) use it too. The
  impressum, privacy and style-guide pages do not: they are static HTML
  styled by `legal.scss` and `styleguide.scss`, and never mount Vue.
- **`ChapterLayout`** — one chapter's chrome: the legend rail (chapter
  switcher + section scroll-spy), the chapter header, the mobile bottom bar,
  prev/next. Renders into `SiteFrame` and **provides the section registry**.
- **`ChapterSection`** — one section: the `<section class="demo">` wrapper
  and the anchor-carrying `<h3>`. Registers itself with the layout (see
  below) and receives its position back.
- **Leaf content** — demos, `CodeCompare`, `CraftLinks`, prose. Composed
  freely in the section's slot; the wrapper imposes nothing on it.

### Sections — declared once, registered too

Each chapter page declares its sections as data and binds every
`ChapterSection` from it. The declared list feeds the rail through
`ChapterLayout`'s `sections` prop, which is what lets the rail be rendered on
the server: prerendering emits the layout's rail before the slot content
exists, so a rail that only learned its sections from children registering
would ship empty.

```vue
<ChapterLayout id="craft" :sections="rail">
  <ChapterSection v-bind="sections.lightDark">
    <p>…prose…</p>
    <LightDarkDemo />
  </ChapterSection>
</ChapterLayout>
```

```ts
const sections = {
  lightDark: { id: 'craft-light-dark', title: 'Dark mode from one source of truth', railLabel: 'Dark mode from one source' },
} satisfies Record<string, ChapterSectionEntry>
const rail = railFrom(Object.values(sections))
```

`ChapterSection` still registers `{ id, title, railLabel? }` with the
layout's registry (`site/ChapterLayout/chapterSections.ts`, via
provide/inject) and gets its 1-based position back, which sets its
`--chapter-sec-N` view timeline — the hook the rail's scroll-spy attaches
to. Registration is also the rail's fallback when no prop is passed. A
section's rail text is `railLabel ?? title`.

The rules that keep it sound:

- **The `sections` object is in template order.** Position comes from mount
  order and the rail comes from the object, so the two must agree;
  reordering a section means moving both its entry and its markup. A
  `ChapterSection` renders unconditionally — never behind `v-if`.
- **`rail-label` says the task in boring prose.** The rail is navigation:
  "Reduced motion", "Truncating text", "Scrollbars". Titles keep their
  character; the label is where the plain words live. Omit it only when the
  title already is the plain words.
- **Ids are unique per page.** Registration dedupes by id (that's what keeps
  hot reload from double-counting), so a duplicated id silently merges.
- **Pages without `ChapterSection`** — the showcase's tier groups — pass
  `sections` directly and own their `view-timeline-name` numbering.
- **The rail's `timeline-scope` follows the rail.** `ChapterLayout` writes
  one `--chapter-sec-N` per rail entry into `--chapter-timelines`, so a
  section's number is its position in the rail. A fixed list in the
  stylesheet once stopped at twelve, and in Chromium craft's thirteenth and
  fourteenth links never lit up (WebKit and Firefox resolve the names
  without `timeline-scope`).

## Prerendering and SSR safety

`npm run build` runs the client build and then `scripts/prerender.mjs`: a
vite SSR build of `src/entries/prerender.ts` (production mode, so
scoped-style hashes match the client bundle) renders every view with
`renderToString` and injects the markup into `dist/*.html` in place of the
empty `#app`. The dev server does the same per request through
`ssrLoadModule` (the `prerender-dev` plugin in `vite.config.js`), so
`npm run dev` serves prerendered pages too — and since Vue reports hydration
mismatches only in development, development is where they get caught.
`mount.ts` hydrates with `createSSRApp`.

Before any of that, `npm run build` has a `prebuild` step: `gen-baseline`
then `gen-feed`. Both rewrite committed files, `src/showcases/baseline-data.json`
and `public/feed.xml`, so an edit to `revisions.ts` or a `web-features` bump
shows up as a modified generated file after the build, and that modified file
belongs in the commit. The reverse also holds: a hand edit to either file is
overwritten by the next build.

What that demands of every component:

- **No browser APIs during render.** `window`, `document`, `CSS.supports`,
  `matchMedia`, `localStorage` must not run at module scope, in `setup`, or
  in a `computed` the template reads — the server has none of them. Put
  them in `onMounted` or in event handlers.
- **Render the same tree on both sides.** Anything environment-dependent
  (feature support, a stored preference) starts from a fixed default the
  server renders too, then updates in `onMounted`. `ShowcaseFrame`'s
  `supported` and `useSiteTheme` are the reference patterns. A divergence
  shows up as `[Vue warn]: Hydration … mismatch` in the dev console; the
  bar is zero.
- **Bind SVG `href` as an attribute** (`:href.attr`) — the hydration path
  otherwise sets it as a DOM property, which is read-only on `<use>`.
- **New views register in `prerender.ts`** under the HTML file's basename,
  or they ship as an empty shell. `tests/e2e/prerender.spec.ts` fetches
  every page's raw HTML and asserts its content is there.
- **`blocking="render"` on the entry scripts is for the dev server only.**
  In development Vite injects CSS through JavaScript, so without it the
  prerendered content paints unstyled and then snaps into place — a flash
  that is worst in dark mode, where the placeholder background and the
  real palette differ most. The attribute makes the browser wait for the
  module graph, so the first paint is styled. The build strips it (Vite
  drops unknown attributes when it rewrites entry scripts), and production
  does not need it: its CSS is a render-blocking `<link>` in the head, so
  the prerendered page paints styled at once and hydration changes nothing
  visible. Do not restore the old plugin that re-added the attribute after
  the build — it would only delay production's first paint.

---

## Setup

Node 26 or newer (`engines` in `package.json`), the version CI runs.
`gen-feed` (part of `prebuild`) and `gen-moves` import `revisions.ts`
directly, which relies on Node's type stripping.

npm 11.16 or newer, enforced by `devEngines` in `package.json`: an older npm
stops with `EBADDEVENGINES` instead of quietly ignoring the install rules in
the project `.npmrc`. There are two:

- `min-release-age=3` installs only versions published at least three days
  ago, the window in which a compromised release is usually noticed and
  pulled. `npm ci` from the lockfile is unaffected, and `@latest` resolves to
  the newest version that is old enough. For an urgent fix, lift it for one
  command: `npm update <pkg> --min-release-age=0`.
- `strict-allow-scripts=true` fails an install when a dependency brings an
  install script nobody has reviewed. `allowScripts` in `package.json`
  records the decisions. It denies the only two today, `@parcel/watcher`
  and `fsevents`, which ship prebuilt binaries and work without their
  scripts. Review a new one with `npm install-scripts ls`, then
  `npm install-scripts approve <pkg>` or `deny <pkg>`.

Never set `ignore-scripts=true` in `.npmrc`: npm would also skip the
project's own `prebuild`, and the build would ship stale Baseline data and
a stale feed.

There is no `main` module. Each HTML file loads one module from `src/entries/`
(`hub.ts`, `standard.ts`, and so on), and every one of them calls `mount()`
from `src/entries/mount.ts`, which is the single place the stylesheet is
imported:

```ts
import '../styles/index.css'
```

The three static pages (impressum, privacy, style guide) never mount Vue;
they link `/src/styles/index.css` directly from their `<head>`, followed by
their own `legal.scss` or `styleguide.scss`.

The SCSS mixins are injected into every SFC style block via
`css.preprocessorOptions.scss.additionalData` in `vite.config.js` —
**do not** `@use` the barrel again inside components. In plain `.scss`
files outside Vite, import it yourself:

```scss
@use 'path/to/styles/scss/mixins' as *;
```

---

## Mixin order within a selector block

This is the most important authoring rule in this guide.
**Always write mixins in this order** inside any selector
(enforced by Stylelint via `order/order`):

```scss
.component {
  // 1. Base styles — no mixin, applies to all viewports and contexts
  padding: var(--space-4);
  color: var(--color-text);

  // 2. Breakpoint mixins — smallest to largest
  @include from('md') {
    padding: var(--space-8);
  }

  // 3. Between — only when a style applies to a specific range
  @include between('sm', 'lg') {
    border: 1px solid var(--color-border);
  }

  // 3b. Container queries — same position as breakpoints, same ordering;
  //     a component should use cq-* OR from()/between(), rarely both
  @include cq-from('sm') {
    grid-template-columns: auto 1fr;
  }

  // 4. Interaction — hover and touch enhancements
  @include can-hover {
    &:hover {
      background-color: var(--color-bg-subtle);
    }
  }

  @include touch-primary {
    padding-block: var(--space-3); // grow toward the 44px best practice
  }

  // 5. User preferences — always last, always win
  @include reduced-motion {
    transition: none;
  }

  @include reduced-transparency {
    backdrop-filter: none;
  }

  @include high-contrast {
    border: 2px solid currentColor;
  }

  @include forced-colors {
    outline: 2px solid ButtonText;
  }

  @include dark-mode {
    // Only use this if the token system doesn't cover your case
  }
}
```

**Why this order?**
Within one selector, later rules at equal specificity win, so preferences
written last override layout and interaction styles. Across files, the
layer stack provides the same guarantee.

---

## Breakpoint mixins

Breakpoints are **em-based**: em media queries respond to the user's default
font size setting, not just the viewport — px queries don't. This matters to
low-vision users who raise their browser's base font size instead of zooming.

### `from($key)`

Applies styles from a breakpoint upward (mobile-first).

```scss
.card {
  font-size: var(--text-base);

  @include from('lg') {
    font-size: var(--text-lg);
  }
}
```

### `between($lower, $upper)`

Applies styles between two breakpoints (inclusive lower, exclusive upper).
Compiles to media query range syntax (`(48em <= width < 64em)`), which has
no dead zone at fractional widths — unlike the old `max-width: $max - 1px`
approach.

```scss
.sidebar {
  display: none;

  @include between('md', 'xl') {
    display: block;
  }
}
```

### Available breakpoints

| Key   | Value | px @ 16px default |
|-------|-------|-------------------|
| `sm`  | 30em  | 480px             |
| `md`  | 48em  | 768px             |
| `lg`  | 64em  | 1024px            |
| `xl`  | 80em  | 1280px            |
| `xxl` | 96em  | 1536px            |

To change values, edit `$breakpoints` in `_breakpoints.scss`; the map is the
only source (the `--bp-*` custom properties are the blueprint skin's tokens,
not breakpoints).

---

## Container query mixins

**Default to container queries for components; reserve media queries for
page-level composition** (app shell, navigation, the things that genuinely
depend on the viewport). A well-written component layout usually needs no
media query at all:

1. **Intrinsic first** — let flex/grid do the work:
   `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`, `flex-wrap`,
   `min()/max()/clamp()`. No query of any kind.
2. **Container queries second** — when the component must *restructure*
   (stack → side-by-side), query its own container with `cq-from()`.
3. **Media queries last** — only for viewport-level concerns.

### Establishing a container

The element you query must declare itself a container — and note that a
container query can only affect the container's **descendants**, never the
container itself (an element can't query its own size):

```scss
.card-cell {
  container-type: inline-size;        // anonymous
}

.sidebar {
  container: sidebar / inline-size;   // named — query from deep children
}
```

### `cq-from($key, $name: null)` / `cq-between($lower, $upper, $name: null)`

Same semantics as `from()`/`between()`, but against the nearest (or named)
container:

```scss
.card {
  display: grid;
  gap: var(--space-3);

  @include cq-from('sm') {
    grid-template-columns: auto 1fr;
  }

  @include cq-from('md', 'sidebar') {
    gap: var(--space-6);
  }
}
```

### Available container sizes

Deliberately a separate scale from the viewport breakpoints — containers
are component-scale, so the steps start smaller and stop earlier.

| Key  | Value | px @ 16px default |
|------|-------|-------------------|
| `xs` | 16em  | 256px             |
| `sm` | 24em  | 384px             |
| `md` | 36em  | 576px             |
| `lg` | 48em  | 768px             |

Sizes are em-based for the same reason as the breakpoints: in a container
query, `em` resolves against the container's font size, so layouts adapt
when users raise their base font size.

---

## Layout that cannot be widened

Three rules, each from a bug the October 2026 sweep found on this site, and
each guarded by `tests/e2e/responsive.spec.ts`:

1. **A grid used as a vertical stack names its column.** `display: grid`
   with no columns has one implicit `auto` track, and an auto track is never
   narrower than the min-content of its widest child. One long code path or
   one text input (20 characters by default, a different pixel width in
   every engine) then widens the whole stack, and `.site-sheet` clips what
   sticks out. Write `grid-template-columns: minmax(0, 1fr)` on every
   single-column grid, and `minmax(0, 1fr)` instead of `1fr` in
   multi-column ones. `min-inline-size: 0` on the grid itself is not enough:
   it frees the box, not the track.
2. **A token that cannot break needs `overflow-wrap: anywhere`.** The
   reset's `break-word` wraps a long word only once its box is already
   narrow; it does not lower min-content. `base.css` applies `anywhere` to
   inline `code`, `kbd` and `samp` inside prose. Add it yourself to a
   label, name or path set in its own element.
3. **Do not ask an engine to guess.** An absolutely positioned SVG or image
   with no size, inside an inline containing block, is sized differently by
   WebKit: give it `inline-size` and `aspect-ratio`, and make the
   containing block `inline-block`. A `<legend>` floated inside a flex or
   grid fieldset is a flex item in Chromium and Firefox and stays on the
   border in WebKit: keep the fieldset a block, float the legend, and let
   the options flow as `inline-flex`. `justify-self` on a block child of a
   block container works only in Chromium: use `inline-size: fit-content`.

The spec loads every page at 320 CSS pixels, at 320 with WCAG 1.4.12 text
spacing and at 1280 with 200% text, and fails on sideways scroll or on any
text or control cut off by an ancestor that clips. A new page goes in its
`pages` list. Playwright's WebKit is not iOS Safari, so a layout change
to the chrome still wants a look on a real iPhone.

---

## Engine behaviours we work around

Each entry is an engine behaviour measured on this site: what happens, what
the site does, and when to look again. Unless an entry says otherwise, each
was last checked on 2026-10-17 with the engines Playwright 1.64.1 runs:
Chromium 156, Firefox 157 and WebKit 27.2. Playwright's WebKit is not iOS
Safari. After a Playwright bump,
run each entry's re-check, write the fixing version into the entry, and drop
the workaround when it can go. A change that adds a workaround adds its entry
here.

### Anchored elements

Measured on 2026-09-28 on the anchor tooltip demo. `anchor-tooltip.spec.ts`
covers each one in three engines; to re-check one, undo its workaround and run
the spec.

- **All engines, by spec: a `center` column never flips a wide box.**
  `position-area: top center` limits the box to its anchor's column, so a box
  wider than the anchor overflows every fallback and keeps its base position.
  Use `block-start span-all`.
- **Firefox: an element with a `position-try` fallback applied reports stale
  computed style.** `getComputedStyle`, and with it Playwright's visibility
  checks, keeps old `visibility` and `opacity` values (even an inline style),
  while Firefox 157 repaints the element correctly. Show and hide by toggling
  `display` with `allow-discrete` and `@starting-style`, not with
  `visibility` or `opacity` alone: `display: none` removes the box, so the
  checks hold. Firefox skips the `display` fade-out on any element, anchored
  or not.
- **WebKit up to 26.5: a near-zero `display` exit on an anchored element
  never finished.** At the 0.01ms the reduced-motion safety net forces, the
  hint stayed open. Fixed in WebKit 27.2: with the workaround removed, the
  spec passed 60 of 60 runs. The workaround, `transition-property: none`
  under reduced motion in the demo and in its snippet, stays while Safari 26
  is in use; it costs nothing, because the net already removes the fade.
- **Chromium, as Web Animations defines it: a scroll-driven `transform`
  keeps a card the containing block of a fixed element inside it**, even after
  the range ends. WebKit 26.5 did not do this on 2026-09-28. Keep
  `data-reveal="off"` on such a demo ("Adding a showcase"). Nothing to
  re-check.

### Focus and scrolling

- **Firefox scrolls a focused element only when less than about one line of
  it is left inside the scrolling area**, after `scroll-padding` and
  `scroll-margin` are taken off the edge, and no engine takes a sticky or
  fixed bar into account. A margin moves that threshold but does not
  guarantee clearance: on the 2.4.11 demo, 5 of 10 hand-scrolled placements
  stayed up to 20px under the sticky bar in Firefox, none in Chromium or
  WebKit. Do not rely on `scroll-padding` or `scroll-margin` to clear a bar
  for focus: move the bar. The chapter bar slides away while
  `:focus-visible` matches outside it, and an era header turns
  `position: static` while `:focus-visible` matches inside its era.
- **WebKit 27.2 honours root `scroll-padding` on keyboard focus, start and
  end side, except for text fields**: it brings a field in only as far as its
  text line, so on craft a 44px field stayed about 6.5px under the bar. The
  September reading, focused controls under the chapter bar with root
  `scroll-padding-block-end` set, did not reproduce. Neither page relies on
  it now. Before a change does, measure on that page with real key presses,
  after the scroll settles.
- **`view-timeline-inset: auto` takes the scroller's `scroll-padding`**, as
  specified. A root `scroll-padding-block-end` of 64px made every anonymous
  `view()` reveal start 64px late and then pop. The site sets no root
  `scroll-padding`; any future one has to be checked against the reveals.
- **iOS WebKit 26: a `tabindex="-1"` element focused by script matches
  `:focus-visible`** (July 2026), so the whole content column drew the ring
  after a dialog closed. `preferences.css` removes the outline from
  `[tabindex='-1']:focus-visible` in every engine, so the skip-link target
  shows no ring after the jump either. That is accepted, because it is not a
  Tab stop. Re-check on an iPhone after a major iOS release.

### Layout and styling

- **Firefox and WebKit take a flex container's max-content width from its
  items' content, not a definite `flex-basis`** (all three do it when the
  basis is a percentage), so a padded max-content list of flex-basis cards
  loses its end padding, or gains extra space when the content is wider than
  the basis. The strip first lost its padding to padding on the scroller
  itself, which fails in all three (September 2026). The pattern that works
  in all three: the scroller
  is an inline-size container, the list inside it is
  `inline-size: max-content` and carries the padding, and each card has
  `flex: none` and an `inline-size` in `cqi` (`ScrollSnapDemo`,
  `ScrollStateDemo`).
- **WebKit resolves `block-size: 100%` inside a block or flex parent whose
  height comes from `aspect-ratio` against the parent's border box**, so the
  1.3.4 demo's screen stuck out 20px (October 2026); without size
  containment the parent grows instead and its ratio breaks. Any grid parent
  avoids it; the demo's frame is a grid,
  `grid-template: minmax(0, 1fr) / minmax(0, 1fr)`, with no percentage
  height. Re-check in `orientation.spec.ts` with the percentage restored and
  the frame set to `display: block`.
- **WebKit 27.2: a customizable select's `<selectedcontent>` gets
  `white-space: nowrap` and `overflow: clip` from the built-in stylesheet**,
  where Chromium 156 lets it wrap, so at 320px with a wide font and WCAG text
  spacing the chosen value was cut off (October 2026). Set
  `white-space: normal` on it (`CustomSelectDemo` and its snippet). Re-check
  by removing it and running the showcase's responsive spec.
- **iOS Safari 26 did not apply pseudo-element rules written inside a style
  query** (July 2026), so the non-colour state cues vanished. Set a custom
  property in the query and render it from a `::before` rule outside it
  (`StyleQueryCuesDemo`). Playwright's WebKit 26.5 does apply them, so only a
  real device shows whether Safari 27 fixed it. `LightDarkDemo`'s moon glyph
  still uses `::after` inside a query.

### In tests

- **WebKit: Tab skips links, buttons and checkboxes.** Playwright's WebKit
  follows Safari's default, where Tab reaches text fields and pop-up menus.
  Keyboard specs press `Alt+Tab` and `Alt+Shift+Tab` in WebKit, as
  Option+Tab does in Safari. This is a default, not a bug.
- **Focus scrolling is not instant.** WebKit scrolls a focused element into
  view on a timer after `focus()`, and Firefox mis-scrolls when synthetic key
  presses arrive with no gap between them (October 2026). A spec that
  measures where focus lands waits with the `focusSettled()` helper in
  `keyboard.spec.ts`, or polls.

---

## Interaction mixins

### Target sizes come first — and not from these mixins

Small targets hurt mouse users with motor impairments too, so minimum
target size is a **base style** (`base.css` applies the WCAG 2.5.8 AA
minimum of 24×24px to interactive elements), not a touch-only adjustment.
Use `touch-primary()` to raise targets toward 44×44px — the WCAG 2.5.5
(AAA) / platform-guideline best practice — on coarse pointers.

### `can-hover()`

For hover effects and fine-pointer enhancements only.
Never use to show or hide features — only to enhance them.

```scss
.button {
  background-color: var(--color-primary);

  @include can-hover {
    &:hover {
      background-color: var(--color-primary-hover);
    }
  }
}
```

### `touch-primary()`

For coarse-pointer adjustments — typically increasing touch target size
or spacing.

```scss
.icon-button {
  padding: var(--space-2);

  @include touch-primary {
    padding: var(--space-4);
  }
}
```

**Note:** A user may switch input modes mid-session (e.g. connecting a mouse
to a tablet). Design so base styles work for both, and use these mixins only
for enhancement.

---

## Preference mixins

### `reduced-motion()`

Disable or simplify animations and transitions.

```scss
.spinner {
  animation: spin 1s linear infinite;

  @include reduced-motion {
    animation: none;
  }
}
```

Two global safety nets already exist in `preferences.css`:
animations/transitions are force-shortened to 0.01ms (which keeps
`animationend`/`transitionend` events firing for JS), and the
`--duration-*` tokens are zeroed. Anything using the motion tokens needs
**no per-component override** — use this mixin only when removal isn't
enough and you want a simplified alternative (e.g. a static icon
replacing a spinner).

The mixin can restyle anything except an animation's running time: the
net's `!important` fixes every duration at 0.01ms and every iteration count
at 1. Motion that has to keep running under reduced motion lives inside a
region marked `aria-busy="true"`, which the net skips for animations
(transitions and smooth scrolling stay swept). Only the loading skeleton
uses it: under reduced motion it swaps its shimmer for a slow opacity fade,
which WCAG does not count as motion animation, and the fade ends when the
region stops being busy. Never add `aria-busy` just to get motion: it tells
screen readers the region is loading. In a project without a blanket net,
the mixin alone does this.

One consequence for tests. The reset gives every element a 0.01ms transition
on every property, so under reduced motion a computed value read right after
a state change is still the old one until the next frame. A focused element
reports `outline-offset: 0px` for that frame, in all three engines. On the CI
runner WebKit can take seconds to produce a frame for an idle page. A spec
that emulates reduced motion must not read a transitionable computed value
straight after focus, hover or a class change: read the token, or the
pseudo-class (`:focus-visible`), or leave reduced motion off for that test.

The same frame delays a stylesheet that a spec injects: the responsive spec's
text-spacing and 200% text settings had not applied when its first
measurement ran (in Firefox not at all). Inject such a stylesheet with
`transition-property: none` and it applies in the same task.

### `reduced-transparency()`

Replace translucent or blurred surfaces with opaque ones. This is a courtesy
on top of a tint that already passes: `prefers-reduced-transparency` ships
in Chromium only, so the base color has to reach 4.5:1 without it. Use
`--color-surface-glass` (90% alpha) instead of a hand-picked alpha:
`tests/e2e/contrast.spec.ts` holds it to 4.5:1 for body and subtle text over
solid black and solid white, in light, dark and every preset.

```scss
.sticky-header {
  background-color: var(--color-surface-glass);
  backdrop-filter: blur(8px);

  @include reduced-transparency {
    background-color: var(--color-surface);
    backdrop-filter: none;
  }
}
```

### `high-contrast()`

Strengthen borders, remove decorative shadows, increase text contrast.

```scss
.tag {
  background-color: var(--color-bg-subtle);
  border: 1px solid transparent;

  @include high-contrast {
    border-color: currentColor;
  }
}
```

Inside `prefers-contrast: more` blocks, prefer `currentColor` or system
colors (`CanvasText`) over hardcoded values — a hardcoded `#000` border is
invisible for users who combine high contrast with dark mode.

Most components need no override at all. `preferences.css` answers the
preference once, at the tokens: `--color-border` becomes `CanvasText`,
`--color-text-subtle` becomes `--color-text`, the three shadows become
`none` and `--focus-ring-width` becomes 4px. Reach for the mixin only for an
edge that does not use `--color-border`. A `.surface` derives its own
palette on the element, so the `:root` override cannot reach inside it;
`preferences.css` sets its `--mix-border` and `--mix-text-subtle` to 100%
instead. That mixes both all the way to the surface's own text colour, which
stays visible where `CanvasText` would not: a surface without a
`color-scheme` of its own takes the page's, so a light surface on a dark
page would get white on near-white.

### Room for the focus ring

The focus ring is drawn by the `preferences` layer on every element, 3px
wide at a 2px offset (4px wide under `prefers-contrast: more` and in the two
contrast presets), so it sits outside the element's own box. A component
cannot restyle it without `!important`: a normal `outline` rule in the
`components` layer loses to the layer above, so components declare none.
Under forced colours the layer swaps only the ring's colour for
`ButtonText`, in a block after the general rule, so the width and offset
hold, 4px included. An earlier block before the general rule never applied:
Chromium drew the ring in a translucent forced colour, and Firefox drew it
in each element's own colour, `LinkText` on links. What a component can do is
leave room. Any ancestor that clips
(`overflow` other than `visible`, `contain: paint | content | strict`,
`content-visibility: auto`) cuts the ring at its padding edge, in all three
engines, and so does the edge of the viewport for a fixed bar. Give that
ancestor padding of
`calc(var(--focus-ring-width) + var(--focus-ring-offset))` on every side a
focusable child can touch. `overflow-clip-margin` is not a substitute: it
only helps containment and `overflow: clip`, never a scroll container, and
Safari does not support it.

Where room is tight, pull the ring inside instead. The ring's geometry is a
token, so a component may set it on the focusable element:
`--focus-ring-offset: var(--focus-ring-offset-inset)` turns the 2px offset
inwards, and the 3px ring then reaches only 1px past the element's edge. The
2.4.11 demo's links do this, because they sit in a small scroller under a
sticky bar. An `outline-offset` declaration in the component would lose to
the preferences layer; the token does not. `tests/e2e/focus-ring.spec.ts` checks the code
blocks, the 2.4.11 demo and the chapter bar this way.

### `forced-colors()`

Windows High Contrast Mode. Restore meaning lost when the browser replaces
colors with system palette values. Use CSS system color keywords
(`ButtonText`, `Canvas`, `CanvasText`, `LinkText`, …) — never hardcode hex
values inside this mixin.

```scss
.badge {
  background-color: var(--color-success);
  color: var(--color-text-inverse);

  @include forced-colors {
    border: 2px solid ButtonText;
  }
}
```

### `dark-mode()` / `light-mode()`

Use only for cases the token system doesn't cover (e.g. an image or SVG that
needs a different treatment in dark mode). Color changes belong in
`tokens.css`.

```scss
.logo-image {
  filter: none;

  @include dark-mode {
    filter: invert(1) hue-rotate(180deg);
  }
}
```

---

## Design tokens and theming

Always use tokens, never hardcode values.

```scss
// ✅ correct
padding: var(--space-4);
color: var(--color-text);
transition: color var(--duration-normal) var(--easing-standard);

// ❌ avoid
padding: 16px;
color: #111111;
transition: color 250ms ease;
```

### Fluid type

Body text stays on the fixed `--text-*` steps. A font size that tracks the
viewport or a container (`vw`, `cqi`) keeps a `rem` term in its middle
value: engines and layouts differ in what zoom does to `vw` and `cqi`, but a
`rem` term always grows with zoom and with the reader's font size. Its cap
stays within 1.5 times its floor: the floor is in `rem`, so by 300% zoom,
Safari's limit, the floor alone doubles the text, as 1.4.4 asks.
`--text-display-sm` meets this; `--text-display` (1.8 times) and
`.chapter-no` (1.57 times, and no `rem` term) do not yet (Known debt in
`ROADMAP.md`).

### How theming works

`tokens.css` sets `color-scheme: light dark` on `:root` and declares every
color token once with `light-dark(lightValue, darkValue)`:

```css
--color-bg: light-dark(#ffffff, #0f0f0f);
```

- With no override, tokens follow the OS preference.
- Manual switching sets `data-theme="light" | "dark"` on `<html>`, which
  flips `color-scheme` — every token follows automatically. No duplicated
  palettes.
- `color-scheme` also switches **native UI** (form controls, scrollbars)
  with the theme, which a custom-property-only approach misses.
- Scrollbars: `base.css` tints every thumb from `--color-text` at half
  strength (`scrollbar-color` is inherited, so setting it on `html` reaches
  nested scrollers) and switches it to `--color-primary` while focus is
  inside a `[tabindex="0"]` region; the width stays `auto`, never `thin`. A
  scrollable region always carries `tabindex="0"`, a role and a label, and
  the `tabindex` is what the focus rule keys off. The role comes first: a
  `<div>` or `<pre>` maps to the generic role, which ARIA does not allow to
  carry a name. Every named region is a landmark, so `role="region"` suits a
  scroller worth a stop in the landmark list, and `role="group"` suits one
  that would only crowd it, such as a code block: craft's comparisons alone
  hold 32.
  `CodeBlock`'s `<pre>` keeps `tabindex="0"` even when its code fits: a stop
  that exists only while the code overflows would need script to measure it.
- The presets (`data-preset` on `<html>`, set by `ThemeToggle`) are data in
  `theming/presets.css`: two seeds each, from which `theming/engine.css`
  derives the whole `--color-*` palette. `theming/blueprint.css` maps that
  palette onto the blueprint skin's `--bp-*` tokens, so a preset re-inks the
  page with no rules of its own.
- The theming core never uses a style query: colour reaches every element
  through custom-property inheritance and `light-dark()`. A style query is
  for a cue colour cannot carry, such as a glyph or a border style per state
  (`StyleQueryCuesDemo`). Keep pseudo-element rules out of the query (see
  "Engine behaviours we work around").

### Motion tokens

Motion tokens are reset to `0.01ms` in `preferences.css` when the user has
requested reduced motion, so transitions using `var(--duration-*)`
automatically respect that preference with no extra component code.

### Scroll-driven animations

A scroll or view timeline ignores `animation-duration`, so neither the motion
tokens nor the 0.01ms override reach it: under emulated `reduce` the
scroll-driven showcase's progress bar still runs. Three rules follow.

1. **Anything that moves content carries its own gate**,
   `@media (prefers-reduced-motion: no-preference)`, as the chapter, card and
   era reveals do. The progress bar runs ungated on purpose, a one-to-one
   mirror of the scroll like the scrollbar thumb: a judgement call, not an
   exemption 2.3.3 grants.
2. **Animate `opacity`, `transform` or `translate`, nothing else.** A colour
   or a custom property on a scroll timeline restyles everything that reads
   it on every frame; a scroll-driven palette built that way jittered and was
   dropped.
3. **A reveal uses `fill: none`, and its range ends by the time the element
   is fully in view.** With `both`, the start state holds before the element
   enters, so boxes below the fold report shifted positions and a jump to an
   anchor overshoots. A range that runs past "fully in view" leaves text
   faded if the reader stops scrolling inside it. An element taller than the
   viewport is never fully in view, so its range ends within 160px, or as it
   fills the viewport if that comes first:
   `entry 0% entry min(100%, 160px)`, after a plain `160px` line for an
   engine that rejects `min()` there. The chapter, showcase card, era and
   criterion reveals all do this. The one exception is the timeline's
   strata: textless bars, hidden from assistive technology, that pour in one
   after another while in view, so each holds its start state until its
   turn (`backwards`).

### Cross-document view transitions

Pages change with `@view-transition` in `base.css`, inside the
reduced-motion gate: the header and the title block stay put while the
content fades in over 0.2s, and every link stays live. Four rules shape it.

1. **Capture nothing.** A captured element takes no clicks while the
   transition runs, and `pointer-events: none` on `::view-transition`
   cannot change that (csswg-drafts #11596): a whole-page fade of 0.5s
   swallowed every click for half a second in Chromium and WebKit. A
   captured `.site-content` failed too: on a long page restored far down,
   Chromium's snapshot came out blank, and a popover opened during the fade
   sat under the snapshot. So the root is unnamed, the live `.site-content`
   runs an ordinary opacity animation while the type matches, and
   `::view-transition`, which has nothing in it, runs the same keyframes
   only to keep the transition, and with it the type, alive until the fade
   ends.
2. **Nothing on a page joins a page change.** An element with a permanent
   `view-transition-name` is captured on every navigation and drawn over
   the next page. The showcase's view-transition demo sets its card names
   through `--view-transition-item-name` and drops them while
   `:active-view-transition-type(page)` matches. Its own same-document
   morph has no type, so it keeps the browser's defaults, as its snippet
   shows.
3. **The opt-in in each page's head carries the type.** Chrome reads the
   inline `@view-transition` in the head before the bundled one: without
   `types: page` there, Chrome 156 dropped the type on 11 of 15 navigations
   and fell back to its own whole-page cross-fade. The inline style no
   longer paints `::view-transition` either: an opaque overlay hides the
   live page beneath it.
4. **The page stays hidden until its styles arrive.** The dev server
   injects CSS by script after the first frame, and with nothing captured
   there is no old snapshot to cover that: each page change showed three to
   five unstyled frames. So the inline style also unnames the root, hides
   the body while the type matches and holds the transition for up to 0.5s,
   and `base.css` shows the body again. A production build has its
   stylesheet before the first frame, so the body is never hidden there,
   and a stylesheet that fails to load costs half a second, not the page.

---

## Utility classes

### `.visually-hidden`

Hides content visually while keeping it available to screen readers.
Use for labels on icon-only buttons, context for AT, live-region text.

```html
<button type="button">
  <svg aria-hidden="true">…</svg>
  <span class="visually-hidden">Close dialog</span>
</button>
```

### `.visually-hidden-focusable` and `.skip-link`

The focusable variant becomes visible on focus — the building block for
skip links. Place the skip link as the first focusable element in `<body>`:

```html
<a class="skip-link visually-hidden-focusable" href="#main">
  Skip to main content
</a>
…
<main id="main" tabindex="-1">…</main>
```

---

## CSS showcases

`src/showcases/` demonstrates new CSS alongside the toolkit. Two rules keep
it from drifting into a random demo dump:

1. **Every showcase earns its place** by being relevant to accessible,
   resilient UI — not just visually novel.
2. **Every showcase is a progressive enhancement.** New syntax goes behind
   `@supports`, and the fallback must stay usable.

### Browser support policy

Current versions of Chrome, Firefox, and Safari — roughly the last two
years. No fallbacks for anything older. Three tiers, and none of them is
hand-maintained: `scripts/gen-baseline.mjs` runs in `prebuild`, reads the
`web-features` package and writes `src/showcases/baseline-data.json`
(committed, so `npm run dev` needs no generate step); `tierOf()` at the tail
of `src/showcases/registry.ts` derives every showcase's tier from that file.
Entries carry no tier field, and `ShowcasePage` groups them by the derived
one:

| Tier                   | Baseline status              | Allowed where?                                                         |
|------------------------|------------------------------|------------------------------------------------------------------------|
| `widely-available`     | high                         | Foundation, site chrome and demos                                      |
| `newly-available`      | low                          | Foundation and chrome unguarded; demos behind `@supports`, fallback kept |
| `limited-availability` | not Baseline, or no mapping  | Demos and chrome, behind `@supports` or skipped harmlessly where CSS cannot test for it, with an accessible fallback |

The site chrome uses showcased features on purpose ("does the site dogfood
this?" is one of the standing decisions in `ROADMAP.md`): the theme panel is
anchor-positioned, the chapter reveals are scroll-driven, and page content
fades in with cross-document view transitions. Each of those degrades to a working
page in an engine without it.

A showcase changes tier when the data does: a `web-features` bump (the
Monday bot, see "What changed") regenerates the JSON and the next build
regroups the page. Nothing is promoted by hand. The references behind the
data are the [web-features explorer](https://web-platform-dx.github.io/web-features-explorer/)
and the current year's Interop dashboard on wpt.fyi, which the registry
header links.

### Adding a showcase

1. Create a folder `src/showcases/demos/XDemo/` holding `XDemo.vue` (one
   feature per demo, real-UI context preferred: a card, a form, a popover,
   not an abstract box) and at least one portable excerpt,
   `XDemo.snippet.html`, `.css` or `.js`, for the "Show the code" panel.
   Snippets are plain copy-paste CSS and markup, no `@layer`, no tokens, and
   both linters skip them. `tests/unit/showcaseSnippets.test.ts` fails a
   folder that has no snippet.
2. In `src/showcases/registry.ts`, import the component and the snippets
   (`?raw`) and add an entry to `entries` with a `supports` condition
   (`CSS.supports()` syntax) or, for a JS API that CSS cannot express, a
   `detect` function. `ShowcaseFrame` uses it to tell visitors whether they
   see the feature or the fallback. File order only sets the order within a
   tier group.
3. Map the entry's id to its `web-features` id in `SHOWCASE_FEATURES` in
   `scripts/gen-baseline.mjs`. An unmapped id gets no badge and lands in
   limited availability; an id `web-features` does not know fails the
   script. `polygon-round` is the one deliberate omission, with the reason
   noted beside the map: there is no upstream id for the `round` keyword
   yet, and the nearest one would claim the wrong tier.
4. If the demo ships a fallback that should go once the feature is
   interoperable (an `@supports` branch, or JavaScript), add an entry to the
   `MANIFEST` in `scripts/baseline-watch.js` naming the kind and the files
   it lives in. The vitest gate fails the day the feature reaches its
   removal bar, and the message says what to delete.
5. If the demo holds a `position: fixed` element outside the top layer (an
   anchored hint, say), put `data-reveal="off"` on the demo's root. The
   showcase page reveals each card with a scroll-driven `transform`, and
   Chromium makes such a card the containing block of its fixed
   descendants, even after the animation has ended, so the element would be
   placed against the card instead of the viewport. The page skips the
   reveal for any card that contains the attribute. On a chapter's `.demo`
   wrapper the same attribute switches off the chapter reveal.
6. Run `npm run build` (the prebuild rewrites `baseline-data.json`) and
   `npm run skill:gen`, and commit the generated files with the demo; CI
   checks that they match.

The `entries` array in `registry.ts` ends with a two-line note of further
candidates. After it come `tierOf()`, the mapping from each demo component
to its source folder on GitHub (an `import.meta.glob` over `demos/`), and
the exported `showcases` list that adds `tier` and `sourceHref` to every
entry.

---

## What changed: the revisions registry, the feed, the Monday bot

One registry, `src/site/HubRevisions/revisions.ts`, drives two outputs:

- The hub block. `HubRevisions.vue` renders `<section id="what-changed">`
  with the newest `revisionsShown` entries (currently six), sorted by date.
- The Atom feed. `scripts/gen-feed.mjs` writes `public/feed.xml` in
  `prebuild`, or alone with `npm run feed:gen`. Every Vue page shell links
  the feed from its `<head>` (`rel="alternate"`,
  `type="application/atom+xml"`), `.htaccess` forces the MIME type, and
  `llms.txt` lists it under Optional.

The editorial rule: the block is what moved in the platform and the
standards, and what it changed here. A line goes in only if a reader can act
on it: a platform or standards fact with its consequence on the site, or a
new thing here to try. Never plumbing; prerendering, the 404 page and
transition durations belong in git history. One sentence, exactly one link,
to the primary source or to the place on the site. Each entry is `lead`,
`linkText`, `href` and `tail`, and the template renders them as text, link,
text, which is what makes "one link" structural. Dates are hand-set. Ids
are feed slugs and must stay stable once published: the feed's `<id>` embeds
the id and the date, so a renamed id or a moved date is a new entry to every
reader. Settle both before the line ships.

The Monday bot (`baseline-moves.yml`) proposes lines from `web-features`
data through `scripts/gen-moves.mjs`. The script diffs the freshly generated
`baseline-data.json` against the committed one (`--new` and `--old` take
explicit files; by default the new side is the working file and the old side
is `git show HEAD:` of it), and for each `web-features` feature writes a
line when an engine newly ships it, when it becomes Baseline newly
available, and when it becomes widely available; `--dry-run` prints without
touching the registry, otherwise the lines are inserted at the top of
`revisions`. Several showcases can share one feature (the two anchor
showcases, the three `:has()` ones), so a move is reported once, linked to
the first of them in `SHOWCASE_FEATURES` order. The wording follows what the
data can prove. A feature's engine version in `web-features` is the first
release that supports every one of its compat keys, so the script reads the
per-key data too: an engine that already shipped some keys "completes" the
feature and is "the first engine to ship all of it", and only an engine with
no earlier keys "ships" it. The "that showcase now runs in two engines"
tails are kept for the case where no other engine has any part of it. A
"completes" that changes no Baseline tier goes into the pull request body
under its own heading and not into the registry: the showcases already ran
there, so a reader has nothing to act on. It dedupes twice: by id, and by
"an existing line already links one of that feature's showcases within 60
days either side and names the same engine, or the same Baseline tier",
matched on word boundaries so that "Safari 26.2" does not count as "Safari
26". So a hand-written line, such as
`firefox-155-typed-attr`, suppresses the bot's duplicate as long as it links
a showcase anchor for that feature and names the engine, while a further
engine arriving on the same feature still gets its own line. A person
reviews the proposal against the release notes and merges.
`tests/unit/revisions.test.ts` is the guard the PR must pass: unique ids and
titles, valid ISO dates that are today or earlier, no markup in `lead`
or `tail`, non-empty `linkText`, a site-relative or https `href`, and a
showcase anchor that resolves to a registry id. `tests/e2e/feed.spec.ts`
checks the served feed carries one entry per revision, and
`prerender.spec.ts` checks the hub's block and the standard page's map are
in the prerendered HTML.

---

## Adding new breakpoints

1. Add the key/value to `$breakpoints` in `_breakpoints.scss` (em units)
2. Document it in the breakpoints table in this guide

---

## Continuous integration and deployment

Three workflows under `.github/workflows/`; the deploy secrets are referred
to by name only (`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`, `DEPLOY_REPO`,
`DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`, `BOT_TOKEN`) and are configured in
GitHub, never in the tree.

All three are repository tooling, like the generators in `scripts/`: none of
them adds a runtime dependency or anything the served pages execute.

**`ci.yml`** runs on push and pull_request to `main`, on Node 26 with
`npm ci`. The `verify` job runs each gate as its own step so a failure points
at the exact check: `typecheck`, `lint:css`, `lint:js`, `baseline:check`
(informational, never fails), `test:unit`, `build`, then "Generated files
are committed", which runs `skill:gen` and `git diff --exit-code` over
`skills/`, `public/llms/`, `public/feed.xml` and
`src/showcases/baseline-data.json`. The `e2e` job installs the Playwright
browsers and runs the suite in Chromium, Firefox and WebKit, uploading the
report on failure. There is no cron: `npm ci` installs the locked
`web-features`, so a scheduled run could never see new Baseline data. The
bot below is the mechanism for that.

`axe-core` is pinned to an exact version, because the audit-room and
listening-room specs pin exact findings. Bump it and `@axe-core/playwright` in
the same change: the wrapper wants a matching `axe-core` minor, so bumping
one alone installs a second copy and the pin stops governing the specs.

**Before a change to a spec is ready**, run the whole suite with the JSON
reporter and read the slowest tests:

```sh
PLAYWRIGHT_JSON_OUTPUT_FILE=/tmp/e2e.json npm run test:e2e -- --reporter=list,json
jq -r '[.. | .specs? // empty | .[] | .title as $t | .file as $f | .tests[] | {d: ([.results[].duration] | max), n: "\($f): \($t) [\(.projectName)]"}] | sort_by(-.d) | .[:10][] | "\(.d / 1000)s  \(.n)"' /tmp/e2e.json
```

The runner can be several times slower than a laptop, and every test has
Playwright's default 30 second limit: in October a check that took 10 seconds
locally passed on its pull request and then timed out on main. A green
pull-request run can also hide a flake, because CI retries a failed test
once. Read the job's annotations and the "flaky" count in the run summary;
the report is uploaded only when the job fails.

**`deploy.yml`** does not run beside CI. It triggers on `workflow_run` of the
CI workflow completing on `main` and proceeds only when that run's
conclusion is success (manual dispatch still works). It checks out the CI
run's head sha, builds, pushes `dist/` over SSH as a new commit on the
production repository's `deploy` branch, pulls on the server, confirms the
live index carries the new hashed asset, writes the live feed's top six
entries to the job summary, and comments the same summary on the pull
request associated with that sha. It starts a fresh `deploy` branch only
when `git ls-remote` finds none in the repository; any other failure to
read the repository stops the deploy, and the log names the commit the new
build is added to.

**`baseline-moves.yml`** is the Monday bot: 09:30 UTC and on dispatch, bash
with pipefail, one concurrency group. It bumps `web-features` to the latest
exact version that is at least three days old (the `.npmrc` cooldown),
regenerates `baseline-data.json`, regenerates the agent skill
and the llms mirror, runs `gen-moves` to propose what-changed lines,
regenerates the feed, and opens a pull request on `chore/baseline-moves`
with the `baseline` label. The title says whether anything moved. It needs
the `BOT_TOKEN` secret: a PR opened with the default token triggers no
workflows, so CI would never run on it.

Staging is not in CI. The staging host serves an idle placeholder from the
`gh-pages` branch written by `deploy-staging-idle.sh`; `deploy-staging.sh`
mirrors a full build to the production server's `deploy-staging` branch and
is kept for the next design round. A build with `STAGING=1` carries a
`noindex` meta tag (`vite.config.js`), so the staging subdomain is never
crawled.

---

## Linting

Stylelint is wired in (`npm run lint:css`) with:

- `stylelint-config-standard-scss` + the Vue SCSS config, covering
  `.css`, `.scss`, and `<style>` blocks in `.vue` files
- `stylelint-order` enforcing the mixin order defined in this guide
- `stylelint-value-no-unknown-custom-properties`, which fails a `var(--x)`
  whose property is defined nowhere (a typo'd token would otherwise collapse
  silently to the initial value). `.stylelintrc.json` names the global
  token files in `importFrom`: `tokens.css`, `theming/engine.css`,
  `theming/presets.css`, `theming/blueprint.css` and `preferences.css`; add
  a new global stylesheet there or its tokens read as unknown. Properties a
  component defines in its own style block are recognised automatically.
  The `customProperties` allow-list beside it holds the properties set only
  from templates via `:style` bindings (`--swatch-bg`, `--pick-h`, and so
  on); extend it when a template injects a property that CSS then reads.

`*.snippet.*` files are excluded from both linters: `.stylelintignore` skips
`src/**/*.snippet.css`, and `eslint.config.js` ignores
`src/showcases/**/*.snippet.*` (together with `dist/`, `node_modules/` and
`public/`). They are portable excerpts, plain on purpose, and must not
follow this repository's rules.
