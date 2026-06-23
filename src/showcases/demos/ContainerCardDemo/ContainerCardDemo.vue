<template>
  <div class="container-query">
    <label class="container-query-control">
      Container width
      <input
        v-model="width"
        type="range"
        min="35"
        max="100"
        step="1"
      />
      <span aria-hidden="true">{{ width }}%</span>
    </label>

    <!-- The container under test. Width is driven by the slider above
         (keyboard-accessible, unlike a CSS resize handle), so you can
         watch the cards respond to their container — the viewport never
         changes. -->
    <div class="container-query-stage" :style="{ inlineSize: `${width}%` }">
      <!-- The wrapper is the container, the card inside responds to it.
           A container can't query itself — only its descendants can. -->
      <div v-for="card in cards" :key="card.title" class="card-cell">
        <article class="card">
          <div class="card-swatch" aria-hidden="true"></div>
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text">{{ card.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const width = ref(100)

const cards = [
  {
    title: 'No media queries',
    text: 'This grid is repeat(auto-fit, minmax(min(100%, 14rem), 1fr)) — it reflows on its own.',
  },
  {
    title: 'Self-aware cards',
    text: 'Each card goes horizontal when IT has room — via cq-from(), not the viewport.',
  },
  {
    title: 'Em-based sizes',
    text: 'Container sizes are in em, so layouts also adapt to the user’s font size setting.',
  },
]
</script>

<style scoped lang="scss">
@layer components {
  .container-query {
    display: grid;
    gap: var(--space-4);
  }

  .container-query-control {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-sm);

    input {
      flex: 1;
      min-inline-size: 8rem;
    }
  }

  .container-query-stage {
    /* The intrinsic half of the pattern: columns appear and disappear
       based on available space — no breakpoints involved. */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
    gap: var(--space-3);
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
  }

  .card-cell {
    container-type: inline-size;
  }

  .card {
    display: grid;
    gap: var(--space-3);
    block-size: 100%;
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    /* Stacked by default; side-by-side once THIS card has room. */
    @include cq-from('xs') {
      grid-template-columns: var(--space-12) 1fr;
    }
  }

  .card-swatch {
    min-block-size: var(--space-8);
    background-color: var(--color-primary);
    border-radius: var(--radius-sm);

    @include cq-from('xs') {
      min-block-size: 100%;
    }
  }

  .card-body {
    display: grid;
    gap: var(--space-1);
    align-content: start;
  }

  .card-title {
    font-size: var(--text-base);
  }

  .card-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
