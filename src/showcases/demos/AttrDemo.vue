<template>
  <div class="attr-demo">
    <p class="attr-caption">
      Each bar's width comes straight from a <code>data-value</code> attribute
      via typed <code>attr()</code> — no JS, no inline width. It's not shipped
      yet, so today the demo falls back to a CSS variable mirroring the same
      value; when <code>attr()</code> lands, the attribute alone drives it.
      The percentages are real text, so the data stays accessible regardless.
    </p>

    <ul class="attr-bars">
      <li v-for="m in metrics" :key="m.label" class="attr-row">
        <span class="attr-label">{{ m.label }}</span>
        <span class="attr-track" aria-hidden="true">
          <span
            class="attr-fill"
            :data-value="m.value"
            :style="{ '--v': m.value }"
          ></span>
        </span>
        <span class="attr-value">{{ m.value }}%</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const metrics = [
  { label: 'Performance', value: 92 },
  { label: 'Accessibility', value: 100 },
  { label: 'Best practices', value: 43 },
  { label: 'SEO', value: 85 },
]
</script>

<style scoped lang="scss">
@layer components {
  .attr-demo {
    display: grid;
    gap: var(--space-4);
  }

  .attr-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .attr-bars {
    display: grid;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .attr-row {
    display: grid;
    grid-template-columns: minmax(6rem, 10rem) 1fr 3rem;
    align-items: center;
    gap: var(--space-3);
  }

  .attr-label {
    font-size: var(--text-sm);
  }

  .attr-track {
    block-size: 0.75rem;
    border-radius: var(--radius-full);
    background-color: var(--color-bg-subtle);
    overflow: hidden;

    @include high-contrast {
      border: 1px solid currentcolor;
    }
  }

  .attr-fill {
    display: block;
    block-size: 100%;
    border-radius: inherit;
    background: var(--gradient-accent);
    /* Fallback today: a custom property mirrors the data value. */
    inline-size: calc(var(--v, 0) * 1%);

    /* The point of the feature: read it straight from the attribute, with
       no inline style or JS at all. (Sass reads the <number> type as
       comparison operators, so its operator rule is silenced here.) */
    /* stylelint-disable scss/operator-no-unspaced */
    @supports (width: calc(attr(data-value type(<number>), 0) * 1%)) {
      inline-size: calc(attr(data-value type(<number>), 0) * 1%);
    }
    /* stylelint-enable scss/operator-no-unspaced */

    @include forced-colors {
      background: Highlight;
    }
  }

  .attr-value {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    text-align: end;
    color: var(--color-text-subtle);
  }
}
</style>
