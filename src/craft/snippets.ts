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

  // Mirrors TruncationDemo — the clamp that is also the disclosure.
  truncation: {
    language: 'CSS',
    mistake: `/* Three lines survive; the rest of the content is gone
   for sighted users, with nothing to open. (A screen
   reader still gets all of it — the two audiences now
   read different documents.) */
.teaser {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}`,
    craft: `/* Clamp the closed state of a real <details>: the preview
   is the collapsed disclosure itself — expanded state
   announced natively, nothing duplicated. */
details:not([open])::details-content {
  content-visibility: visible;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}`,
  },

  // Mirrors ScrollbarDemo — reserve the gutter, leave the rest alone.
  scrollbar: {
    language: 'CSS',
    mistake: `/* Restyled scrollbars: invisible in Firefox (different
   syntax), often low-contrast, thinner than any touch
   target — and overlay-scrollbar users see none of it. */
.panel::-webkit-scrollbar { width: 4px; }
.panel::-webkit-scrollbar-thumb { background: #ddd; }`,
    craft: `/* Reserve the scrollbar's lane so content doesn't reflow
   when it appears, and keep the native bar. (The region
   itself gets tabindex="0" and a label for keyboard use.) */
.panel {
  overflow-y: auto;
  scrollbar-gutter: stable;
}`,
  },

  // The display:contents trap — layout wins, list semantics lose.
  displayContents: {
    language: 'CSS',
    mistake: `/* Flattening a list into the parent grid. For years this
   stripped list semantics from assistive tech (Safari
   still relapses) — the layout wins, the <ul> vanishes. */
ul.cards {
  display: contents;
}`,
    craft: `/* Subgrid aligns the items to the page grid while the
   list keeps its box and its semantics. If you must use
   display:contents, re-test with a screen reader. */
ul.cards {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
}`,
  },

  // Mirrors HidingMatrixDemo — hide for the right audience.
  hiding: {
    language: 'CSS',
    mistake: `/* "Hidden" by eye only: invisible, but still announced
   by screen readers and still a tab stop — keyboard
   users land on nothing. */
.menu {
  opacity: 0;
}`,
    craft: `/* Pick the technique by audience, not by looks:
   gone for everyone      → display: none
   screen readers only    → .visually-hidden
   visible but inactive   → the inert attribute */
.menu[data-closed] {
  display: none;
}`,
  },

  // Mirrors TextSpacingDemo — boxes that survive the 1.4.12 overrides.
  textSpacing: {
    language: 'CSS',
    mistake: `/* A pixel-perfect text box. The moment a reader raises
   line height or letter spacing (WCAG 1.4.12 says they
   may), the last sentences are clipped away. */
.card {
  height: 176px;
  overflow: hidden;
}`,
    craft: `/* Set a floor, never a ceiling — the box grows with the
   reader's spacing instead of eating their text. */
.card {
  min-block-size: 176px;
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
