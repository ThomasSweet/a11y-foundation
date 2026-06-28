<template>
  <div class="anchor-tooltip-demo">
    <p class="anchor-tooltip-caption">
      Each hint is anchored to its <code>?</code> button with
      <code>anchor-name</code> / <code>position-anchor</code> — no measuring, no
      positioning JS. <code>position-try-fallbacks</code> flips it to the other
      side when it would collide with an edge (scroll the page with one open to
      see it flip). It opens on <strong>hover and keyboard focus</strong>, and
      you can move the pointer onto the hint without it vanishing — the parts of
      <abbr title="WCAG 2.1 Success Criterion 1.4.13">1.4.13</abbr> most tooltips
      get wrong.
    </p>

    <ul class="anchor-tooltip-list" role="list">
      <li class="anchor-tooltip-row">
        <span class="anchor-tooltip-term">Display name</span>
        <span class="anchor-tooltip-anchor">
          <button
            type="button"
            class="anchor-tooltip-trigger"
            aria-describedby="anchor-tooltip-name"
            aria-label="About display name"
          >
            <span aria-hidden="true">?</span>
          </button>
          <span id="anchor-tooltip-name" role="tooltip" class="anchor-tooltip-bubble">
            Shown publicly beside your comments. Change it anytime.
          </span>
        </span>
      </li>

      <li class="anchor-tooltip-row">
        <span class="anchor-tooltip-term">Backup codes</span>
        <span class="anchor-tooltip-anchor">
          <button
            type="button"
            class="anchor-tooltip-trigger"
            aria-describedby="anchor-tooltip-codes"
            aria-label="About backup codes"
          >
            <span aria-hidden="true">?</span>
          </button>
          <span id="anchor-tooltip-codes" role="tooltip" class="anchor-tooltip-bubble">
            One-time codes to sign in if you lose your authenticator. Store them
            somewhere safe — each works once.
          </span>
        </span>
      </li>

      <li class="anchor-tooltip-row">
        <span class="anchor-tooltip-term">API token</span>
        <span class="anchor-tooltip-anchor">
          <button
            type="button"
            class="anchor-tooltip-trigger"
            aria-describedby="anchor-tooltip-token"
            aria-label="About the API token"
          >
            <span aria-hidden="true">?</span>
          </button>
          <span id="anchor-tooltip-token" role="tooltip" class="anchor-tooltip-bubble">
            Grants programmatic access to your account. Treat it like a password
            and rotate it if it leaks.
          </span>
        </span>
      </li>
    </ul>

    <p class="anchor-tooltip-note">
      <strong>The honest limit:</strong> 1.4.13 also asks that a hint be
      <em>dismissible</em> without moving the pointer (an <kbd>Esc</kbd> press) —
      the one leg pure CSS can’t reach. The no-JS answer arriving for that is the
      <code>interestfor</code> attribute; until it lands widely, full compliance
      wants either that or a few lines of script. CSS gets you the rest.
    </p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .anchor-tooltip-demo {
    display: grid;
    gap: var(--space-4);
  }

  .anchor-tooltip-caption,
  .anchor-tooltip-note {
    max-inline-size: 60ch;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .anchor-tooltip-note {
    padding: var(--space-3) var(--space-4);
    border-inline-start: 3px solid var(--color-primary);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-subtle);

    strong {
      color: var(--color-text);
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .anchor-tooltip-list {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
    max-inline-size: 24rem;
  }

  .anchor-tooltip-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .anchor-tooltip-term {
    font-weight: 600;
  }

  /* The positioning context for the fallback (non-anchor) placement. */
  .anchor-tooltip-anchor {
    position: relative;
    display: inline-flex;
  }

  .anchor-tooltip-trigger {
    display: grid;
    place-items: center;
    inline-size: 1.75rem;
    block-size: 1.75rem;
    padding: 0;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-bg-subtle);
    color: var(--color-text);
    font-size: var(--text-sm);
    font-weight: 700;
    cursor: help;

    @include can-hover {
      &:hover {
        background-color: var(--color-primary);
        color: var(--color-primary-text);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .anchor-tooltip-bubble {
    /* Fallback placement (no anchor positioning): centered above the trigger,
       relative to .anchor-tooltip-anchor. */
    position: absolute;
    inset-block-end: calc(100% + var(--space-2));
    inset-inline-start: 50%;
    translate: -50% 0;
    z-index: 10;

    inline-size: max-content;
    max-inline-size: 16rem;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-lg);
    color: var(--color-text);
    font-size: var(--text-sm);
    font-weight: 400;
    text-align: start;

    /* Hidden until hover/focus; rides the motion tokens so it's instant under
       reduced motion with no extra override. */
    opacity: 0;
    visibility: hidden;
    transition:
      opacity var(--duration-fast) var(--easing-standard),
      visibility var(--duration-fast) var(--easing-standard);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  /* A transparent bridge across the gap so moving the pointer from the trigger
     to the hint keeps it open — the "hoverable" half of 1.4.13. */
  .anchor-tooltip-bubble::before {
    content: '';
    position: absolute;
    inset-block-start: 100%;
    inset-inline: 0;
    block-size: var(--space-2);
  }

  /* Reveal on hover, on keyboard focus, AND while the hint itself is hovered
     (so it stays put when you move onto it). */
  .anchor-tooltip-trigger:hover ~ .anchor-tooltip-bubble,
  .anchor-tooltip-trigger:focus-visible ~ .anchor-tooltip-bubble,
  .anchor-tooltip-bubble:hover {
    opacity: 1;
    visibility: visible;
  }

  /* The enhancement: real anchor positioning, so the hint tracks its button and
     flips to stay on-screen instead of being clipped or going off-edge. */
  @supports (anchor-name: --a) {
    /* stylelint-disable property-no-unknown -- anchor positioning */
    .anchor-tooltip-row:nth-child(1) .anchor-tooltip-trigger { anchor-name: --anchor-tooltip-1; }
    .anchor-tooltip-row:nth-child(1) .anchor-tooltip-bubble { position-anchor: --anchor-tooltip-1; }
    .anchor-tooltip-row:nth-child(2) .anchor-tooltip-trigger { anchor-name: --anchor-tooltip-2; }
    .anchor-tooltip-row:nth-child(2) .anchor-tooltip-bubble { position-anchor: --anchor-tooltip-2; }
    .anchor-tooltip-row:nth-child(3) .anchor-tooltip-trigger { anchor-name: --anchor-tooltip-3; }
    .anchor-tooltip-row:nth-child(3) .anchor-tooltip-bubble { position-anchor: --anchor-tooltip-3; }

    .anchor-tooltip-bubble {
      /* Fixed + anchor positions against the trigger in the viewport, so the
         hint follows on scroll and can't be clipped by the card's overflow. */
      position: fixed;
      inset: auto;
      translate: none;
      position-area: top center;
      margin-block-end: var(--space-2);
      /* No room above? flip below; then nudge inline to stay on-screen. */
      position-try-fallbacks: flip-block, flip-inline;
    }
    /* stylelint-enable property-no-unknown */
  }
}
</style>
