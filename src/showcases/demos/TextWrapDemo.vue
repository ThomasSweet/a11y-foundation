<template>
  <div class="tw-demo">
    <!-- Two columns of the SAME text so the wrapping difference is
         visible side by side. The width is deliberately narrow to force
         ragged line breaks. -->
    <figure class="tw-col">
      <figcaption class="tw-label">Default wrapping</figcaption>
      <h4 class="tw-heading">A balanced headline avoids lonely last words</h4>
      <p class="tw-body">{{ body }}</p>
    </figure>

    <figure class="tw-col">
      <figcaption class="tw-label">
        <code>balance</code> + <code>pretty</code>
      </figcaption>
      <h4 class="tw-heading tw-heading--balance">
        A balanced headline avoids lonely last words
      </h4>
      <p class="tw-body tw-body--pretty">{{ body }}</p>
    </figure>
  </div>
</template>

<script setup>
const body =
  'Typography reads better when the browser, not the viewport, decides ' +
  'where lines break. pretty keeps the last line from becoming a single ' +
  'orphaned word.'
</script>

<style scoped lang="scss">
@layer components {
  .tw-demo {
    /* Container queries territory: two columns when there's room, stacked
       when there isn't — no media query. */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: var(--space-4);
  }

  .tw-col {
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

  .tw-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
  }

  .tw-heading {
    font-size: var(--text-lg);
    line-height: var(--leading-tight);

    /* balance evens out line lengths across a short block (headings,
       captions) — best kept to a few lines, which is its sweet spot. */
    &--balance {
      text-wrap: balance;
    }
  }

  .tw-body {
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
