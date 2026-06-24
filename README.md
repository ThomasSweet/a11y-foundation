# Accessible by default

An accessibility-first styling foundation — SCSS mixins, design tokens, and
a cascade-layer architecture — demonstrated in a small Vue 3 playground.
(Repository and package id: `a11y-foundation`.)

The goal: components that adapt to **user preferences** (reduced motion,
high contrast, forced colors, dark mode, reduced transparency) and **input
capabilities** (hover, touch) by default, with the cascade doing the work
instead of `!important`.

## What's inside

- **Cascade layers** (`@layer reset, tokens, base, layout, components,
  utilities, preferences`) — user preferences always win over component
  styles, without specificity battles. The one rule: no unlayered CSS.
- **Design tokens** with `color-scheme` + `light-dark()` — each color
  declared once, OS-preference and manual theming from the same tokens,
  native form controls included.
- **Preference mixins** — `reduced-motion()`, `reduced-transparency()`,
  `high-contrast()`, `forced-colors()`, `dark-mode()`.
- **Interaction mixins** — `can-hover()`, `touch-primary()` for capability
  detection (enhancement only, never gating).
- **Em-based breakpoint mixins** — `from()`, `between()` with media query
  range syntax, responsive to the user's font size settings.
- **Accessibility utilities** — `.visually-hidden`, skip link, focus-visible
  styling that meets WCAG 2.2 focus appearance requirements, WCAG 2.5.8
  minimum target sizes as base styles.
- **Vue demo components** — accessible button, native `<dialog>` modal,
  form fields with wired-up hints/errors, theme toggle.

## Getting started

```sh
npm install
npm run dev        # playground at http://localhost:5173
npm run lint:css   # stylelint, including mixin-order enforcement
npm run build
```

## Try it with your OS preferences

The playground responds live to OS settings — no reload needed:

- **Reduced motion** → spinner stops, dialog entry animation disappears
- **Dark mode / theme toggle** → all tokens and native controls flip
- **Increased contrast** → borders strengthen, decorative shadows drop
- **Forced colors (Windows)** → buttons and dialogs keep visible boundaries
- **Keyboard only** → skip link appears on first Tab, consistent focus rings

## Accessibility

This project practises what it shows. It targets **WCAG 2.2 AA**, works with a
keyboard and a screen reader, and honours reduced-motion, contrast, forced-colors,
and colour-scheme preferences — never relying on colour alone to carry meaning.

Newer platform features (anchor positioning, scroll-driven animation, container
queries, `contrast-color()`) are layered as **progressive enhancements** behind
`@supports`: where a browser supports them you get the richer version; where it
doesn't you get an accessible fallback, not a broken page.

It's a **demo/playground**, not a production dependency — built to be explored and
learned from. The full statement lives in the site footer. Found a barrier?
[Open an issue](https://github.com/ThomasSweet/a11y-foundation/issues).

The site itself includes a **"The proof"** section that walks through how
accessibility testing actually layers — static checks, unit logic, an automated
`axe` sweep, then keyboard and screen-reader passes — and, crucially, what a
scanner like `axe` can and can't catch. The suite below is that model, runnable:

```sh
npm run test:unit  # contrast-clamp guarantee + Baseline fallback watch (Vitest)
npm run test:e2e   # axe sweep + keyboard/focus behaviour, across Chromium/Firefox/WebKit
```

## Conventions

See [GUIDE.md](./GUIDE.md) for the full coding guide: the layer rules, the
mixin ordering convention, theming, and how to write component styles in
Vue SFCs (`<style scoped>` wrapped in `@layer components`).

## Credits

The decorative hero pictograms are
[Material Symbols](https://github.com/google/material-design-icons) by Google,
used under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
