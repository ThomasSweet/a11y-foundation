/**
 * Bad→good code pairs shown beneath each craft demo (see CodeCompare). Each
 * mirrors the real CSS/HTML of the component it sits under, so the teaching
 * snippet can't drift from what the demo actually does. Spread onto CodeCompare
 * with v-bind — the object shape is exactly its props.
 */
export interface CraftCompareSnippet {
  language: 'CSS' | 'HTML'
  mistake: string
  craft: string
}

export const craftSnippets = {
  // Mirrors TextField.scss — the only diff is the pseudo-class and the cue.
  validation: {
    language: 'CSS',
    mistake: `/* :invalid matches immediately — a required field is
   "invalid" while empty, so it flags before any input. */
input:invalid {
  border-color: red;
}`,
    craft: `/* :user-invalid waits for interaction, so pristine
   fields stay neutral. Thicker border = non-colour cue. */
input:user-invalid {
  border-color: var(--color-error);
  border-width: 2px;
}`,
  },

  // Mirrors AppDialog — native <dialog> + showModal().
  dialog: {
    language: 'HTML',
    mistake: `<!-- A div "dialog": now hand-write focus trapping,
     Esc-to-close, an inert background, scroll locking… -->
<div class="modal" role="dialog" aria-modal="true">
  …
</div>`,
    craft: `<!-- dialog.showModal() gives focus trapping, Esc, an
     inert background and top-layer stacking, all free. -->
<dialog class="modal">
  …
</dialog>`,
  },

  // Mirrors MotionDemo — one variable stills every animation at once.
  motion: {
    language: 'CSS',
    mistake: `/* Spins for everyone, including someone who asked
   their OS for reduced motion. */
.spinner {
  animation: spin 1s linear infinite;
}`,
    craft: `/* Scale the duration by one variable that flips to 1
   under prefers-reduced-motion (set once, globally),
   so nothing here has to opt in. */
.spinner {
  animation: spin calc(1s * (1 - var(--rm))) linear infinite;
}`,
  },

  // Mirrors TargetsDemo — .targets-fc-fill vs .targets-fc-border.
  targets: {
    language: 'CSS',
    mistake: `/* Background alone marks this button. In forced-colors
   mode the fill is replaced and its edges vanish. */
.button {
  border: none;
  background-color: var(--color-primary);
}`,
    craft: `/* A border does load-bearing work, so the button keeps
   a visible edge when the background is stripped. */
.button {
  border: 2px solid var(--color-primary-hover);
  background-color: var(--color-primary);
}`,
  },

  // Mirrors DefensiveCssDemo — the two guards that contain runaway content.
  defensive: {
    language: 'CSS',
    mistake: `/* A grid item's automatic minimum is its min-content
   size, so one unbreakable URL forces the column past
   the viewport — a 1.4.10 Reflow failure. */
.card-body {
  display: grid;
}`,
    craft: `/* Two guards: let the column shrink below its content,
   and give the unbreakable line a local scroll. */
.card-body {
  display: grid;
  min-inline-size: 0;
}
.url {
  overflow-x: auto;
}`,
  },

  // Mirrors ContentStressDemo — logical properties that follow dir/lang.
  contentStress: {
    language: 'CSS',
    mistake: `/* Physical edges don't follow writing direction — in
   an RTL layout the accent lands on the wrong side. */
.card {
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
}`,
    craft: `/* Logical properties flow with dir/lang, so one rule
   mirrors correctly for LTR and RTL alike. */
.card {
  border-inline-start: 4px solid var(--color-primary);
  padding-inline-start: 1rem;
}`,
  },

  // Mirrors LoadingStateDemo — aria-busy + one hidden line.
  loading: {
    language: 'HTML',
    mistake: `<!-- Skeleton divs only: a screen reader finds an empty
     region with no hint that anything is loading. -->
<div class="card">
  <div class="skeleton-row"></div>
  <div class="skeleton-row"></div>
</div>`,
    craft: `<!-- aria-busy flags the loading state (cleared when the
     content lands); the skeleton is aria-hidden, so this
     hidden line is what a screen reader actually reads. -->
<div class="card" aria-busy="true">
  <span class="visually-hidden">Loading recent activity…</span>
  <div class="skeleton-row" aria-hidden="true"></div>
</div>`,
  },
} satisfies Record<string, CraftCompareSnippet>
