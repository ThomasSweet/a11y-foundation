<template>
  <fieldset class="theme-toggle">
    <legend class="theme-legend">Theme</legend>
    <label v-for="option in options" :key="option" class="theme-option">
      <input v-model="theme" type="radio" name="theme" :value="option" />
      {{ option }}
    </label>
  </fieldset>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

// Setting data-theme flips color-scheme (see tokens.css); every
// light-dark() token then resolves automatically.
const theme = ref('system')
const options = ['system', 'light', 'dark']

watchEffect(() => {
  if (theme.value === 'system') {
    delete document.documentElement.dataset.theme
  } else {
    document.documentElement.dataset.theme = theme.value
  }
})
</script>

<style scoped lang="scss">
@layer components {
  .theme-toggle {
    display: flex;
    gap: var(--space-4);
    align-items: center;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
  }

  .theme-legend {
    float: inline-start;
    padding-inline-end: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .theme-option {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-sm);
    text-transform: capitalize;
  }
}
</style>
