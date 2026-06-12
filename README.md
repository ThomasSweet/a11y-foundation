# Mixin Library

An accessibility-first styling foundation — SCSS mixins, design tokens, and
a cascade-layer architecture — demonstrated in a small Vue 3 playground.

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

## Conventions

See [GUIDE.md](./GUIDE.md) for the full coding guide: the layer rules, the
mixin ordering convention, theming, and how to write component styles in
Vue SFCs (`<style scoped>` wrapped in `@layer components`).
