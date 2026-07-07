<template>
  <div class="text-wrap-demo">
    <label class="text-wrap-control">
      Column width
      <input v-model="width" type="range" min="40" max="100" step="1" />
      <span aria-hidden="true">{{ width }}%</span>
    </label>

    <div class="text-wrap-stage" :style="{ inlineSize: `${width}%` }">
      <figure class="text-wrap-col">
        <figcaption class="text-wrap-label">Default wrapping</figcaption>
        <h5 class="text-wrap-heading">{{ heading }}</h5>
        <p class="text-wrap-body">{{ body }}</p>
      </figure>

      <figure class="text-wrap-col">
        <figcaption class="text-wrap-label">
          <code>balance</code> + <code>pretty</code>
        </figcaption>
        <h5 class="text-wrap-heading text-wrap-heading--balance">{{ heading }}</h5>
        <p class="text-wrap-body text-wrap-body--pretty">{{ body }}</p>
      </figure>
    </div>

    <p class="text-wrap-note">
      The same text, two ways, at a width you control. Drag narrower and watch
      the default column strand a word on its own line while the
      <code>balance</code> column keeps its lines even — the browser choosing
      the breaks, no markup, no JS.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const width = ref(100)

const heading = 'A well-balanced headline never leaves its last word stranded'
const body =
  'Typography reads better when the browser, not the viewport, decides ' +
  'where lines break. pretty keeps the last line from becoming a single ' +
  'orphaned word.'
</script>

<style scoped lang="scss">
@layer components {
  .text-wrap-demo {
    display: grid;
    gap: var(--space-4);
  }

  .text-wrap-control {
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

  .text-wrap-stage {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
    gap: var(--space-3);
  }

  .text-wrap-col {
    min-inline-size: 0;
    margin: 0;
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .text-wrap-label {
    margin-block-end: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
  }

  .text-wrap-heading {
    font-size: var(--text-lg);
    line-height: var(--leading-tight);

    /* balance evens line lengths across a short block (headings) — its sweet spot. */
    &--balance {
      text-wrap: balance;
    }
  }

  .text-wrap-body {
    margin-block-start: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);

    /* pretty targets the last line (orphans) — cheap enough for body copy. */
    &--pretty {
      text-wrap: pretty;
    }
  }

  .text-wrap-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
