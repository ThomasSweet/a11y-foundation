<template>
  <div class="details-demo">
    <p class="details-demo-caption">
      A native <code>&lt;details&gt;</code> accordion with the one thing it
      always lacked: a smooth open. <code>::details-content</code> styles the
      browser's own content region; <code>interpolate-size</code> lets it glide
      to its real <code>auto</code> height. Open one — the answers explain
      themselves.
    </p>

    <div class="details-demo-list">
      <details class="details-demo-item">
        <summary class="details-demo-summary">Does an accordion need JavaScript?</summary>
        <p class="details-demo-body">
          Not anymore. This is a native <code>&lt;details&gt;</code> element:
          the summary is a real disclosure button, screen readers announce
          expanded and collapsed, and the keyboard works — all before a single
          line of script.
        </p>
      </details>

      <details class="details-demo-item">
        <summary class="details-demo-summary">How does the smooth opening work?</summary>
        <p class="details-demo-body">
          <code>::details-content</code> targets the content region the browser
          already renders, so it can transition opacity and block-size — with
          <code>allow-discrete</code> holding <code>content-visibility</code>
          until the close finishes. <code>interpolate-size: allow-keywords</code>
          makes <code>auto</code> a real animation target. Browsers without it
          fade; browsers without either simply open instantly. Never broken.
        </p>
      </details>

      <details class="details-demo-item">
        <summary class="details-demo-summary">And under reduced motion?</summary>
        <p class="details-demo-body">
          No animation at all — the transition is removed behind the
          preference's media query, and the disclosure works exactly the same.
          Motion is the enhancement here, never the mechanism.
        </p>
      </details>
    </div>

    <p class="details-demo-note">
      <strong>Why it matters:</strong> a JS accordion has to re-implement what
      <code>&lt;details&gt;</code> gives away free — button semantics, the
      announced expanded state, keyboard support. The animation was the last
      excuse to rebuild it, and this removes the excuse.
    </p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .details-demo {
    display: grid;
    gap: var(--space-4);
  }

  .details-demo-caption,
  .details-demo-note {
    max-inline-size: 65ch;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .details-demo-note {
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

  .details-demo-list {
    display: grid;
    gap: var(--space-2);

    /* Inherited — lets every item's block-size animate to auto (Chrome). */
    @supports (interpolate-size: allow-keywords) {
      interpolate-size: allow-keywords;
    }
  }

  .details-demo-item {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .details-demo-summary {
    padding: var(--space-3) var(--space-4);
    font-weight: 600;
    cursor: pointer;

    &::marker {
      color: var(--color-primary);
    }
  }

  /* allow-discrete holds content-visibility until the closing fade finishes.
     The global reduced-motion kill switch only reaches *::before/::after, so
     this pseudo-element gates itself. */
  .details-demo-item::details-content {
    opacity: 0;
    block-size: 0;
    overflow-y: clip;
    transition:
      content-visibility var(--duration-normal) allow-discrete,
      opacity var(--duration-normal),
      block-size var(--duration-normal);

    @include reduced-motion {
      transition: none;
    }
  }

  .details-demo-item[open]::details-content {
    opacity: 1;
    block-size: auto;
  }

  .details-demo-body {
    max-inline-size: 65ch;
    margin: 0;
    padding: 0 var(--space-4) var(--space-3);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
