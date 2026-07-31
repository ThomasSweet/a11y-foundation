<template>
  <div class="hiding-demo">
    <article class="hiding-card" aria-labelledby="hiding-display-none">
      <p id="hiding-display-none" class="hiding-card-label">display: none</p>
      <div class="hiding-example">
        <div class="hiding-gone">
          <p>This paragraph and its button render nowhere.</p>
          <button type="button" class="hiding-control">Example control</button>
        </div>
      </div>
      <ul class="hiding-readout">
        <li><span aria-hidden="true">✕</span> not visible</li>
        <li><span aria-hidden="true">✕</span> not in the accessibility tree</li>
        <li><span aria-hidden="true">✕</span> not in the tab order</li>
      </ul>
      <p class="hiding-use">For content that is gone for everyone: closed panels, inactive views.</p>
    </article>

    <article class="hiding-card" aria-labelledby="hiding-visually-hidden">
      <p id="hiding-visually-hidden" class="hiding-card-label">.visually-hidden</p>
      <div class="hiding-example">
        <p class="visually-hidden">
          A screen reader reads this sentence even though the box looks empty.
        </p>
      </div>
      <ul class="hiding-readout">
        <li><span aria-hidden="true">✕</span> not visible</li>
        <li><span aria-hidden="true">✓</span> in the accessibility tree</li>
        <li>
          <span aria-hidden="true">✓</span> controls stay in the tab order — an
          invisible focus stop, unless you use a focusable variant that appears
          on focus (this site's skip link)
        </li>
      </ul>
      <p class="hiding-use">For screen-reader-only context: labels, hints, state announcements.</p>
    </article>

    <article class="hiding-card" aria-labelledby="hiding-aria-hidden">
      <p id="hiding-aria-hidden" class="hiding-card-label">aria-hidden="true"</p>
      <div class="hiding-example" aria-hidden="true">
        <p>Fully visible, and a screen reader will never mention it.</p>
        <button type="button" class="hiding-control" tabindex="-1">Example control</button>
      </div>
      <ul class="hiding-readout">
        <li><span aria-hidden="true">✓</span> visible</li>
        <li><span aria-hidden="true">✕</span> not in the accessibility tree</li>
        <li>
          <span aria-hidden="true">✓</span> controls stay in the tab order
          unless you also remove them (the button here carries
          <code>tabindex="-1"</code>)
        </li>
      </ul>
      <p class="hiding-use">For decorative or duplicated visuals — never for anything interactive.</p>
    </article>

    <article class="hiding-card" aria-labelledby="hiding-inert">
      <p id="hiding-inert" class="hiding-card-label">inert</p>
      <div class="hiding-example hiding-example-inert" inert>
        <p>Visible but switched off — try clicking or tabbing to the button.</p>
        <button type="button" class="hiding-control">Example control</button>
      </div>
      <ul class="hiding-readout">
        <li><span aria-hidden="true">✓</span> visible</li>
        <li><span aria-hidden="true">✕</span> not in the accessibility tree</li>
        <li><span aria-hidden="true">✕</span> not in the tab order, not clickable</li>
      </ul>
      <p class="hiding-use">For visible-but-inactive regions: the page behind a modal, a disabled step.</p>
    </article>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .hiding-demo {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  }

  .hiding-card {
    display: grid;
    gap: var(--space-3);
    align-content: start;
    min-inline-size: 0;
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .hiding-card-label {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .hiding-example {
    display: grid;
    gap: var(--space-2);
    justify-items: start;
    min-block-size: 5.5rem;
    padding: var(--space-3);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);

    p {
      margin: 0;
    }
  }

  .hiding-example-inert {
    opacity: 0.55;
  }

  .hiding-gone {
    display: none;
  }

  .hiding-control {
    min-block-size: 24px;
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);
    font: inherit;
    font-size: var(--text-sm);
    cursor: pointer;

    &:active {
      translate: 0 1px;
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .hiding-readout {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--text-sm);

    li {
      padding-inline-start: var(--space-4);
      text-indent: calc(var(--space-4) * -1);
    }
  }

  .hiding-use {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
