<template>
  <div class="truncation-demo">
    <article class="truncation-card" aria-labelledby="truncation-dead-end">
      <p id="truncation-dead-end" class="truncation-card-label">Clamped, with no way in</p>
      <p class="truncation-clamped">{{ description }}</p>
    </article>

    <article class="truncation-card" aria-labelledby="truncation-disclosure">
      <p id="truncation-disclosure" class="truncation-card-label">
        Clamped, and the clamp is a disclosure
      </p>
      <details class="truncation-details">
        <summary class="truncation-summary">Full description</summary>
        <p class="truncation-full">{{ description }}</p>
      </details>
    </article>
  </div>
</template>

<script setup lang="ts">
const description =
  'Version 4.2 rebuilds the export pipeline around streamed rendering, so a ' +
  'report that used to assemble in memory now starts downloading on the first ' +
  'row. Scheduled exports pick up the same engine, along with per-column ' +
  'formatting, a duplicate-header fix for merged sheets, and clearer error ' +
  'messages when a data source goes away mid-run. Anyone on the legacy ' +
  'formatter keeps it until the end of the quarter, and both engines write ' +
  'identical files for every format except the retired binary one.'
</script>

<style scoped lang="scss">
@layer components {
  .truncation-demo {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  }

  .truncation-card {
    min-inline-size: 0;
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .truncation-card-label {
    margin-block-end: var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .truncation-clamped,
  .truncation-full {
    margin: 0;
    font-size: var(--text-sm);
    line-height: 1.55;
  }

  /* stylelint-disable value-no-vendor-prefix, property-no-vendor-prefix */
  .truncation-clamped {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  @supports selector(::details-content) {
    .truncation-details:not([open])::details-content {
      content-visibility: visible;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
  /* stylelint-enable value-no-vendor-prefix, property-no-vendor-prefix */

  .truncation-details {
    display: grid;
    gap: var(--space-2);
  }

  .truncation-summary {
    inline-size: fit-content;
    min-block-size: 24px;
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  @supports selector(::details-content) {
    .truncation-details:not([open]) .truncation-summary {
      order: 1;
    }
  }
}
</style>
