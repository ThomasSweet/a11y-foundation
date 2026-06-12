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
│   ├── base.css            — bare-element styles, target sizes (layer: base)
│   ├── utilities.css       — .visually-hidden, .skip-link   (layer: utilities)
│   ├── preferences.css     — global preference overrides  (layer: preferences)
│   ├── index.css           — entry point importing all of the above
│   └── scss/
│       ├── _breakpoints.scss   — from(), between()
│       ├── _interaction.scss   — can-hover(), touch-primary()
│       ├── _preferences.scss   — reduced-motion(), reduced-transparency(),
│       │                         high-contrast(), forced-colors(),
│       │                         dark-mode(), light-mode()
│       └── _mixins.scss        — barrel file
└── components/             — Vue demo components using all of the above
```

---

## Cascade layers — the one rule

`layers.css` declares the stack:

```css
@layer reset, tokens, base, layout, components, utilities, preferences;
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

## Setup

`src/main.js` imports the single entry point:

```js
import './styles/index.css'
```

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

To change values, edit `$breakpoints` in `_breakpoints.scss` and mirror the
change in the `--bp-*` tokens in `tokens.css`.

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

### `reduced-transparency()`

Replace translucent or blurred surfaces with opaque ones. Translucency can
make text illegible for low-vision users depending on what scrolls beneath.

```scss
.sticky-header {
  background-color: rgb(255 255 255 / 0.7);
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

### Motion tokens

Motion tokens are reset to `0.01ms` in `preferences.css` when the user has
requested reduced motion, so transitions using `var(--duration-*)`
automatically respect that preference with no extra component code.

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

## Adding new breakpoints

1. Add the key/value to `$breakpoints` in `_breakpoints.scss` (em units)
2. Add a matching `--bp-{key}` token in `tokens.css`
3. Document it in the breakpoints table in this guide

---

## Linting

Stylelint is wired in (`npm run lint:css`) with:

- `stylelint-config-standard-scss` + the Vue SCSS config, covering
  `.css`, `.scss`, and `<style>` blocks in `.vue` files
- `stylelint-order` enforcing the mixin order defined in this guide
