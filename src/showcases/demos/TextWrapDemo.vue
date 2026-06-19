<template>
  <div class="text-wrap-demo">
    <!-- Two columns of the SAME text so the wrapping difference is
         visible side by side. The width is deliberately narrow to force
         ragged line breaks. -->
    <figure class="text-wrap-col">
      <figcaption class="text-wrap-label">Default wrapping</figcaption>
      <h4 class="text-wrap-heading">{{ heading }}</h4>
      <p class="text-wrap-body">{{ body }}</p>
    </figure>

    <figure class="text-wrap-col">
      <figcaption class="text-wrap-label">
        <code>balance</code> + <code>pretty</code>
      </figcaption>
      <h4 class="text-wrap-heading text-wrap-heading--balance">{{ heading }}</h4>
      <p class="text-wrap-body text-wrap-body--pretty">{{ body }}</p>
    </figure>
  </div>
</template>

<script setup>
const heading = 'A well-balanced headline never leaves its last word stranded'
const body =
  'Typography reads better when the browser, not the viewport, decides ' +
  'where lines break. pretty keeps the last line from becoming a single ' +
  'orphaned word.'
</script>

<style scoped lang="scss">
@layer components {
  .text-wrap-demo {
    /* Two columns when there's room, stacked when not — no media query.
       The columns are capped (not 1fr) so the headings stay narrow enough to
       wrap on wide screens, where the balance/pretty difference is visible. */
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

    /* balance evens out line lengths across a short block (headings,
       captions) — best kept to a few lines, which is its sweet spot. */
    &--balance {
      text-wrap: balance;
    }
  }

  .text-wrap-body {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);

    /* pretty targets the LAST line, preventing orphans — cheap enough to
       use on body copy where balance would be too costly. */
    &--pretty {
      text-wrap: pretty;
    }
  }
}
</style>
