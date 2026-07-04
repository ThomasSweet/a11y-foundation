<template>
  <div class="text-wrap-demo">
    <!-- The SAME text twice so the wrapping difference shows side by side; narrow on purpose. -->
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
</template>

<script setup lang="ts">
const heading = 'A well-balanced headline never leaves its last word stranded'
const body =
  'Typography reads better when the browser, not the viewport, decides ' +
  'where lines break. pretty keeps the last line from becoming a single ' +
  'orphaned word.'
</script>

<style scoped lang="scss">
@layer components {
  .text-wrap-demo {
    /* Capped columns (not 1fr) so headings stay narrow enough to wrap on wide
       screens, where the balance/pretty difference shows. No media query. */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 18rem));
    justify-content: start;
    gap: var(--space-4);
  }

  .text-wrap-col {
    display: grid;
    gap: var(--space-2);
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
    font-size: var(--text-sm);
    color: var(--color-text-subtle);

    /* pretty targets the last line (orphans) — cheap enough for body copy. */
    &--pretty {
      text-wrap: pretty;
    }
  }
}
</style>
