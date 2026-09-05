# Prerender — the argument in the served HTML

Scope for making every page's HTML carry its content at build time, with
client-side hydration on top. Written 2026-09-05, before building.

## Why

Ten of the thirteen entry pages are Vue-mounted: the served HTML is a head
and an empty `#app`, and the argument arrives only after JavaScript runs.
On a site whose thesis is that the platform handles accessibility natively,
that is a gap between the claim and the artefact — anyone who views source,
blocks scripts, or fetches the page with a tool that does not execute
JavaScript gets nothing. Google indexing is fine and is not the motivation;
the beneficiaries are view-source readers, script blockers, and every
non-executing fetcher, AI agents included. The legal pages, the style guide,
the 404, and the broken page are already static and untouched.

Not doing: rewording the thesis to dodge the gap, serving different content
by user agent, or converting the MPA to an SPA with a router.

## Shape

Each entry is one component tree with no router, so:

- `src/entries/prerender.ts` maps entry names to views and exports
  `render(name)` = `renderToString(createSSRApp(view))`.
- `scripts/prerender.mjs` runs after the client build: a vite SSR build of
  that entry (production mode, so scoped-style hashes match the client
  bundle), then per page it replaces `<div id="app"></div>` in `dist/*.html`
  with the rendered markup. `npm run build` chains it, so the e2e suite,
  which builds and previews, exercises prerendered output.
- A dev-only vite plugin does the same at request time via
  `ssrLoadModule`, so `npm run dev` serves prerendered pages too — which is
  where Vue reports hydration mismatches (production stays silent), so
  development is where mismatches get caught.
- `mount.ts` switches `createApp` for `createSSRApp`, which hydrates.

## SSR-safety changes (measured, not assumed)

A grep for browser APIs in render paths found 16 call sites in 8 files.
Handlers are already safe. The ones that run during render:

- `useSiteTheme.ts` read `document` at module scope and ran a
  `watchEffect` writing `localStorage` at import — an SSR crash on import.
  Now the theme starts as `system` on both sides and syncs from the
  document in `onMounted`, and the effect that writes back starts only
  after that sync (starting it earlier would wipe the stored theme with the
  default). The inline no-flash script still applies the saved theme before
  first paint, so the page never flashes; only the closed theme panel's
  radio state catches up after mount.
- `ShowcaseFrame.vue` evaluated `CSS.supports()` in a computed. Now
  `supported` starts true and is decided in `onMounted`; the "your browser
  doesn't support this yet" note appears after mount where it applies.
- `ThemePickerDemo.vue` computed `contrast-color()` support at setup.
  Same pattern.
- The chapter rail was filled by `ChapterSection` children registering
  during render — in SSR the rail is emitted before the children exist, so
  prerendered chapters would ship an empty Contents rail and hydration
  would add it back with a shift. Chapter pages now declare their sections
  as data (`sections` object in each page script), bind each
  `ChapterSection` from it, and pass the derived rail to `ChapterLayout`
  via the `sections` prop that already existed. One source per page, no
  drift, deterministic on both sides. Registration stays as the fallback
  and still supplies each section's view-timeline index.

## Verification bar

- Zero hydration-mismatch warnings on every page in dev.
- Gates green (`typecheck`, `lint:css`, `lint:js`), `npm run build` clean.
- A permanent e2e spec fetches every prerendered page's raw HTML and
  asserts a known content string per page and no empty mount point.
- The axe sweep across three engines and the keyboard specs stay green.
- Theme no-flash still holds; cross-document view transitions verified in
  a real Chrome.
- First paint: measured before and after. `blocking="render"` on the entry
  scripts existed so first paint never showed an empty `#app`; with real
  HTML that reason evaporates, but removing it is its own decision, made
  on the measurement.

## Outcome (2026-09-05)

- All ten pages prerender; every one of the 83 scoped-style hashes in the
  served markup exists in the client CSS (production-mode SSR build).
- Dev-server hydration sweep of all ten pages: zero warnings, zero errors.
  Two hydration issues were found and fixed on the way: SVG `<use>` hrefs
  hydrate as read-only DOM properties (now bound with `.attr`), and the
  Custom Highlight demo decided support at setup (now `onMounted`).
- The full e2e suite against the prerendered build: 124 passed, including
  the new per-page raw-HTML spec, the axe sweep in three engines, and every
  keyboard spec.
- `blocking="render"` retired from production output. Measured with
  Playwright on a throttled connection (1.5 Mbit/s, 40 ms latency), six
  samples each: hub first contentful paint 956 ms with blocking → 588 ms
  without; the craft page's blocked paint did not even register before
  `load`, where the unblocked page painted at ~1.2 s. Cross-document view
  transitions still get a full page to snapshot because the HTML is full
  before any script runs. A production-build screencast of a reload shows
  one blank frame at 18 ms, the complete styled page at 92 ms, and no
  visual change afterwards; hydration performs zero DOM mutations.
- The attribute stays in the source shells for the dev server, where CSS
  arrives through JavaScript: without it, prerendered dev pages painted
  unstyled and snapped into place (worst in dark mode). The build strips it
  on its own, so this costs production nothing; the plugin that used to
  re-add it after the build is gone.
- Still owed to the bar: a real-Chrome check of the cross-document
  transitions and the theme no-flash after deploy.
