<template>
  <div class="reading-flow-demo">
    <p class="reading-flow-caption">
      The gallery is chronological in the DOM, but <code>order: -1</code>
      promotes the featured card to the front — the classic focus-order trap.
      <kbd>Tab</kbd> through the cards: without the fix, focus walks the DOM
      (1, 2, 3, then a jump back to 4). Toggle it and focus follows the layout
      you actually see.
    </p>

    <label class="reading-flow-toggle">
      <input type="checkbox" />
      Fix the order with <code>reading-flow: flex-visual</code>
    </label>

    <ul class="reading-flow-gallery">
      <li v-for="n in 4" :key="n" class="reading-flow-item">
        <button type="button" class="reading-flow-card">
          <span class="reading-flow-card-num" aria-hidden="true">{{ n }}</span>
          Update {{ n }}
          <span v-if="n === 4" class="reading-flow-card-chip">featured</span>
        </button>
      </li>
    </ul>

    <p class="reading-flow-note">
      <strong>Why it matters:</strong> visual reordering with
      <code>order</code>, <code>row-reverse</code>, or grid placement leaves
      keyboard focus and screen-reader order stuck on the DOM — a Focus Order
      (2.4.3) and Meaningful Sequence (1.3.2) failure that used to mean
      restructuring your markup. <code>reading-flow</code> re-syncs them in one
      declaration; <code>reading-order</code> handles per-item exceptions.
    </p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .reading-flow-demo {
    display: grid;
    gap: var(--space-4);
  }

  .reading-flow-caption,
  .reading-flow-note {
    max-inline-size: 65ch;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .reading-flow-note {
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

  .reading-flow-toggle {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .reading-flow-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .reading-flow-item:last-child {
    order: -1;

    .reading-flow-card {
      border-color: var(--color-primary);
    }
  }

  @supports (reading-flow: flex-visual) {
    .reading-flow-demo:has(.reading-flow-toggle input:checked) .reading-flow-gallery {
      /* stylelint-disable-next-line property-no-unknown -- Chrome-only, linter lags */
      reading-flow: flex-visual;
    }
  }

  .reading-flow-card {
    display: grid;
    justify-items: start;
    gap: var(--space-1);
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    font: inherit;
    font-size: var(--text-sm);
    color: var(--color-text);
    cursor: pointer;

    &:focus-visible {
      background-color: var(--color-bg-subtle);
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .reading-flow-card-num {
    font-size: var(--text-xl);
    font-weight: 800;
    color: var(--color-primary);
  }

  .reading-flow-card-chip {
    padding: 0 var(--space-2);
    border-radius: var(--radius-sm);
    background-color: var(--color-primary);
    font-weight: 700;
    color: var(--color-primary-text);
  }
}
</style>
