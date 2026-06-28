<template>
  <div class="contrast-color-demo">
    <label class="contrast-color-control">
      Pick a background
      <input v-model="bg" type="color" />
    </label>

    <p class="contrast-color-swatch" :style="{ '--swatch-bg': bg }">
      The browser picks this text color for contrast.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bg = ref('#2563eb')
</script>

<style scoped lang="scss">
@layer components {
  .contrast-color-demo {
    display: grid;
    gap: var(--space-3);
    justify-items: start;
  }

  .contrast-color-control {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-sm);

    input {
      inline-size: var(--space-12);
      block-size: var(--space-8);
      padding: 0;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      cursor: pointer;
    }
  }

  .contrast-color-swatch {
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    background-color: var(--swatch-bg);
    font-weight: 600;

    /* Fallback: fixed light text + shadow — readable on most picks, but the
       user can defeat it. contrast-color() guarantees a contrasting colour. */
    color: var(--color-primary-text);
    text-shadow: 0 1px 2px rgb(0 0 0 / 60%);

    @supports (color: contrast-color(red)) {
      color: contrast-color(var(--swatch-bg));
      text-shadow: none;
    }
  }
}
</style>
