---
name: accessible-by-default
description: Build web UI that is accessible through the platform instead of patched with ARIA and JavaScript. Use when writing or reviewing HTML and CSS for any web interface - choosing between a native element and a hand-built component, styling focus, honouring user preferences such as reduced motion or forced colors, meeting WCAG 2.2, or deciding whether a modern CSS feature is safe to ship.
---

# Accessible by default

The web platform ships most of accessibility already built in. Most barriers
are not missing ARIA — they are a native element that was replaced by a `div`,
and then partially rebuilt.

So the rule is: **use the thing that already does the job, and don't break what
it gives you.** Everything below follows from that.

## Before building a component, check what already exists

| You need | Use | Not |
| --- | --- | --- |
| A modal | `<dialog>` + `showModal()` | div + focus-trap library |
| A menu, tooltip, or any transient overlay | `popover` attribute (+ anchor positioning) | div + click-outside handler |
| Expand/collapse | `<details>` / `<summary>` | div + `aria-expanded` + height JS |
| A dropdown | `<select>` (customisable `<select>` if you must restyle) | div + listbox roles |
| Any clickable thing | `<button>` | `<div onclick>` |
| Anything that navigates | `<a href>` | `<button>` + `router.push` |
| A form field label | `<label for>` | `placeholder`, `aria-label` |
| Grouped controls | `<fieldset>` + `<legend>` | div + `aria-labelledby` |
| Field validation styling | `:user-valid` / `:user-invalid` | JS class toggling on every keystroke |
| A progress or loading state | `<progress>`, `aria-busy` | animated div with no name |

Each native element brings keyboard behaviour, focus management, a role, an
accessible name, and platform conventions the user already knows. A rebuilt
version starts at zero and has to earn all of it back.

**The first rule of ARIA:** if a native element gives you the semantics, use it
instead of the ARIA attribute. No ARIA is better than bad ARIA — a wrong role
overrides what the element correctly reported.

## Non-negotiables in anything you write

- **Never remove focus visibility.** `outline: none` is only acceptable when
  the same rule paints a visible replacement. Style `:focus-visible`, keep it
  at least 3:1 against what surrounds it, and never let sticky headers cover
  the focused element (WCAG 2.2 adds 2.4.11 for exactly this).
- **Keyboard reaches everything, in a sensible order.** Reading order is DOM
  order; CSS reordering (`order`, `grid-area`, `flex-direction: row-reverse`)
  desyncs the two. Never use `tabindex` greater than 0.
- **Never signal with color alone.** Pair it with text, an icon, or a shape.
- **Text contrast 4.5:1**, large text 3:1, and 3:1 for the visual boundary of
  any control or meaningful graphic.
- **Pointer targets at least 24x24 CSS pixels**, or spaced far enough apart to
  amount to the same thing. 44px is the comfortable choice.
- **Reflow at 320 CSS pixels** — equivalently 400% zoom — without a second
  scroll direction. Logical properties, intrinsic grids, and
  `min-inline-size: 0` on flex/grid children get you most of the way.
- **Never disable zoom.** No `user-scalable=no`, no `maximum-scale=1`.
- **Every image, icon, and control has a name**, and decorative ones are
  explicitly empty (`alt=""`) rather than unnamed.

## User preferences are not features to opt into

Preference queries are how people tell you what they need. Treat them as
constraints, not enhancements:

```css
@media (prefers-reduced-motion: reduce) { /* no transforms, no auto-play */ }
@media (prefers-contrast: more) { /* strengthen borders, drop decorative shadows */ }
@media (forced-colors: active) { /* keep boundaries visible; system colors win */ }
@media (prefers-reduced-transparency: reduce) { /* make translucent surfaces opaque */ }
```

Two things that follow:

- **Motion is the enhancement, not the baseline.** Anything that moves on its
  own must stop, or be finite and short. If reduced motion is set, the end
  state must still be reachable — bypass the animation, don't cancel the result.
- **In forced-colors mode, backgrounds and shadows disappear.** Anything whose
  meaning was carried by a background needs a real `border` there. Test it;
  it breaks silently.

Use `light-dark()` with `color-scheme` so both schemes come from one token, and
put user-preference rules in a **cascade layer that sits above components**, so
they win without `!important`.

## Shipping modern CSS

Prefer the platform feature over a library, but check its Baseline tier first
and guard anything not yet widely available:

```css
.thing { /* the fallback: complete and usable on its own */ }

@supports (anchor-name: --x) {
  .thing { /* the enhancement */ }
}
```

The fallback is not a degraded mode — it is the page. Build it first, then let
the guard add to it.

`references/modern-css.md` lists what is safe to ship right now, grouped by
Baseline tier, each with its `@supports` condition and the accessibility
problem it solves. Read it before reaching for a JS library to do layout,
positioning, theming, or transitions.

## Common ways this goes wrong

- A `div` with a click handler: no role, no keyboard, no focus.
- `aria-label` on something with no interactive role — it names nothing.
- `placeholder` used as the label; it vanishes on input and often fails contrast.
- `aria-hidden="true"` on a container that still holds focusable children.
- A rebuilt `<select>` that traps arrow keys or drops type-ahead.
- Error states shown only in red.
- Icon-only buttons with no accessible name.
- Animation that respects `prefers-reduced-motion` for movement but keeps an
  auto-advancing carousel running.
- Focus sent to a `<div>` on route change without `tabindex="-1"` and a heading
  to land on.

## Checking the work

Automated scanning is necessary and never sufficient — it can prove markup is
malformed, not that a flow is usable. Layer the checks:

1. **Static** — linting and type checks catch structural mistakes early.
2. **Unit** — assert the logic that guarantees a criterion (contrast maths,
   focus order helpers) rather than the pixels.
3. **Automated scan** — `axe` across every page and every important state, in
   more than one engine.
4. **Keyboard** — tab through the whole flow. Can you reach it, see where you
   are, act, and get back out?
5. **Screen reader** — the state you can only get by listening: does the name
   match the visible label, is the change announced, is the order sane?

A state that can't be reached by keyboard cannot be scanned, so step 3 will
report it as clean. Steps 4 and 5 are where real barriers surface.

## References

Load these when the task calls for them, not up front:

- **`references/wcag-criteria.md`** — the success criteria most often broken by
  hand-built components, each with the requirement and who pays when it's
  missed. Use when reviewing for conformance or justifying a decision.
- **`references/modern-css.md`** — modern CSS and HTML features grouped by
  Baseline tier, with the `@supports` guard and accessibility payoff of each.
  Use when choosing an approach.
- **`references/css-snippets.md`** — the accessible implementation of every
  feature in the catalog, free of framework and token plumbing. Use when
  writing the code.

The reference files are generated from the live demos at
<https://accessible-by-default.dev>, where every criterion has a "break this
rule" toggle that shows the failure it prevents.
