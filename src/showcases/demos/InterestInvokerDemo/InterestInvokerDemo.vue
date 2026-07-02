<template>
  <div class="interest-demo">
    <p class="interest-caption">
      One HTML attribute — <code>interestfor</code> — wires “showing interest”
      (hover, keyboard focus, or touch long-press) to a popover. The delays,
      the <kbd>Esc</kbd> dismissal, and the accessibility mapping all come from
      the browser, not a tooltip library. Without support the links below are
      simply links — nothing breaks.
    </p>

    <section class="interest-block">
      <h5 class="interest-h">Link previews</h5>
      <p class="interest-copy">
        This foundation is measured against
        <a
          href="https://www.w3.org/TR/WCAG22/"
          target="_blank"
          rel="noreferrer"
          interestfor="interest-preview-wcag"
        >WCAG 2.2<span class="visually-hidden"> (opens in a new tab)</span></a>
        and tracks the
        <a
          href="https://wpt.fyi/interop-2026"
          target="_blank"
          rel="noreferrer"
          interestfor="interest-preview-interop"
        >Interop 2026<span class="visually-hidden"> (opens in a new tab)</span></a>
        focus areas — show interest in either link for a preview.
      </p>

      <div id="interest-preview-wcag" popover="hint" class="interest-card">
        <strong class="interest-card-title">WCAG 2.2</strong>
        The W3C accessibility standard this site is tested against — level AA,
        with the 2.1/2.2 criteria demoed in “Guidelines, alive”.
      </div>
      <div id="interest-preview-interop" popover="hint" class="interest-card">
        <strong class="interest-card-title">Interop 2026</strong>
        The cross-engine effort deciding which platform features Chrome,
        Firefox, and Safari all ship next — the source of the “Emerging” badges.
      </div>
    </section>

    <section class="interest-block">
      <h5 class="interest-h">Toolbar hints, delay-tuned</h5>
      <div class="interest-toolbar" role="group" aria-label="Demo actions with hints">
        <button type="button" class="interest-toolbar-button" interestfor="interest-hint-copy">
          Copy
        </button>
        <button type="button" class="interest-toolbar-button" interestfor="interest-hint-share">
          Share
        </button>
        <button type="button" class="interest-toolbar-button" interestfor="interest-hint-export">
          Export
        </button>
      </div>

      <div id="interest-hint-copy" popover="hint" class="interest-card">
        Copies a share-ready link to this section.
      </div>
      <div id="interest-hint-share" popover="hint" class="interest-card">
        Opens your device’s share sheet.
      </div>
      <div id="interest-hint-export" popover="hint" class="interest-card">
        Downloads the demo as a standalone file.
      </div>

      <p class="interest-note">
        The first hint waits a polite beat; once one is open,
        <code>interest-delay-start: 0s</code> inside the bar makes its
        neighbours instant — browse the toolbar without re-waiting.
      </p>
    </section>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .interest-demo {
    display: grid;
    gap: var(--space-4);
  }

  .interest-caption,
  .interest-copy,
  .interest-note {
    max-inline-size: 60ch;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .interest-block {
    display: grid;
    gap: var(--space-2);
  }

  .interest-h {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
  }

  .interest-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .interest-toolbar-button {
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);
    color: var(--color-text);
    font-weight: 600;
    cursor: pointer;

    @include can-hover {
      &:hover {
        background-color: var(--color-surface);
        border-color: var(--color-text-subtle);
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

  .interest-card {
    max-inline-size: 18rem;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-lg);
    color: var(--color-text-subtle);
    font-size: var(--text-sm);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .interest-card-title {
    display: block;
    margin-block-end: var(--space-1);
    color: var(--color-text);
  }

  /* Entry/exit ride the motion tokens — instant under reduced motion. */
  /* stylelint-disable-next-line property-no-unknown -- transition of display/overlay */
  .interest-card {
    opacity: 0;
    translate: 0 4px;
    transition:
      opacity var(--duration-fast) var(--easing-standard),
      translate var(--duration-fast) var(--easing-standard),
      display var(--duration-fast) allow-discrete,
      overlay var(--duration-fast) allow-discrete;

    &:popover-open {
      opacity: 1;
      translate: 0 0;
    }

    @starting-style {
      &:popover-open {
        opacity: 0;
        translate: 0 4px;
      }
    }
  }

  /* stylelint-disable property-no-unknown -- interest invokers + anchor positioning */

  /* Politeness dial: wait a beat before showing, linger a beat before hiding. */
  [interestfor] {
    interest-delay: 0.4s 0.2s;
  }

  /* Una Kravets' toolbar trick: once any hint in the bar is open, drop the
     start delay so browsing the neighbours feels instant. */
  /* stylelint-disable-next-line selector-pseudo-class-no-unknown -- :interest-source */
  .interest-toolbar:has(:interest-source) .interest-toolbar-button {
    interest-delay-start: 0s;
  }

  /* Tether each hint to its invoker; flip to stay on-screen. Chrome (the only
     engine with interestfor today) also ships anchor positioning. */
  [interestfor='interest-preview-wcag'] { anchor-name: --interest-wcag; }
  #interest-preview-wcag { position-anchor: --interest-wcag; }
  [interestfor='interest-preview-interop'] { anchor-name: --interest-interop; }
  #interest-preview-interop { position-anchor: --interest-interop; }
  [interestfor='interest-hint-copy'] { anchor-name: --interest-copy; }
  #interest-hint-copy { position-anchor: --interest-copy; }
  [interestfor='interest-hint-share'] { anchor-name: --interest-share; }
  #interest-hint-share { position-anchor: --interest-share; }
  [interestfor='interest-hint-export'] { anchor-name: --interest-export; }
  #interest-hint-export { position-anchor: --interest-export; }

  .interest-card {
    margin: 0;
    inset: auto;
    position-area: top;
    margin-block-end: var(--space-2);
    position-try-fallbacks: flip-block;
  }

  /* stylelint-enable property-no-unknown */
}
</style>
