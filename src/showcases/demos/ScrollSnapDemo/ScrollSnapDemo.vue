<template>
  <div class="snap-demo">
    <p class="snap-caption">
      A horizontal strip where each card locks to centre as you scroll —
      <code>scroll-snap-type: x mandatory</code> on the track,
      <code>scroll-snap-align</code> on the cards. The strip is a focusable
      <code>region</code>, so arrow keys, Page Up/Down and Home/End scroll it
      from the keyboard, and snapping respects reduced motion (the foundation
      forces <code>scroll-behavior: auto</code> there).
    </p>

    <!-- Scroller is the focusable region; the cards stay a list inside it (role
         on the <ul> would strip "list, 5 items"). -->
    <div
      class="snap-track"
      tabindex="0"
      role="region"
      aria-label="Featured cards, scrollable"
    >
      <ul class="snap-list" role="list">
        <li v-for="card in cards" :key="card.n" class="snap-card">
          <span class="snap-card-n">{{ card.n }}</span>
          <span class="snap-card-label">{{ card.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = [
  { n: '01', label: 'Snaps to centre' },
  { n: '02', label: 'Keyboard scrollable' },
  { n: '03', label: 'No JS, no listeners' },
  { n: '04', label: 'Off the main thread' },
  { n: '05', label: 'Respects reduced motion' },
]
</script>

<style scoped lang="scss">
@layer components {
  .snap-demo {
    display: grid;
    gap: var(--space-4);
  }

  .snap-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .snap-track {
    padding: var(--space-2);
    overflow-x: auto;
    min-inline-size: 0;
    /* The whole point: each card lands on a snap position, never mid-scroll. */
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;

    /* Focusable scroll container — give it the standard focus ring. */
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }

    @include high-contrast {
      outline: 1px solid currentcolor;
    }
  }

  .snap-list {
    display: flex;
    gap: var(--space-4);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .snap-card {
    display: grid;
    flex: 0 0 min(70%, 16rem);
    gap: var(--space-2);
    align-content: center;
    block-size: 9rem;
    padding: var(--space-4) var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--gradient-accent);
    color: #fff;
    /* Centre each card under the viewport of the track. */
    scroll-snap-align: center;

    @include high-contrast {
      border-color: currentcolor;
    }

    @include forced-colors {
      background: Highlight;
      color: HighlightText;
      border-color: CanvasText;
    }
  }

  .snap-card-n {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    opacity: 0.85;
  }

  .snap-card-label {
    font-size: var(--text-lg);
    font-weight: 700;
  }
}
</style>
