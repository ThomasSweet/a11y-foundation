<template>
  <div class="field-sizing-demo">
    <p class="field-sizing-caption">
      <code>field-sizing: content</code> lets a textarea grow and shrink with
      what you type — no <code>scrollHeight</code> measuring, no resize
      listeners, no JS at all. Type a few lines: it tracks the content between
      a min and max height. Without support it falls back to a fixed
      <code>rows</code> box you can drag to resize.
    </p>

    <label class="field-sizing-field">
      <span class="field-sizing-label">Your note</span>
      <textarea
        v-model="text"
        class="field-sizing-input"
        rows="2"
        placeholder="Start typing — the box follows along…"
      ></textarea>
    </label>

    <p class="field-sizing-hint">
      {{ text.length }} characters · grows to a max of about 8 lines, then
      scrolls.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
</script>

<style scoped lang="scss">
@layer components {
  .field-sizing-demo {
    display: grid;
    gap: var(--space-3);
  }

  .field-sizing-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .field-sizing-field {
    display: grid;
    gap: var(--space-2);
  }

  .field-sizing-label {
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .field-sizing-input {
    inline-size: 100%;
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    /* Fallback: a draggable fixed-height box (rows="2" sets the start). */
    resize: vertical;

    @supports (field-sizing: content) {
      /* The enhancement: size to content, bounded so it can't run away. */
      /* stylelint-disable-next-line property-no-unknown -- emerging feature */
      field-sizing: content;
      min-block-size: 2lh;
      max-block-size: 8lh;
      resize: none;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .field-sizing-hint {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
