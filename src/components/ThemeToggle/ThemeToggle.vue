<template>
  <fieldset class="theme-toggle">
    <legend class="theme-legend">Theme</legend>
    <label v-for="option in options" :key="option" class="theme-option">
      <input v-model="theme" type="radio" name="theme" :value="option" />
      {{ option }}
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

// Setting data-theme flips color-scheme (see tokens.css); every
// light-dark() token then resolves automatically.
const theme = ref<'system' | 'light' | 'dark'>('system')
const options = ['system', 'light', 'dark'] as const

watchEffect(() => {
  if (theme.value === 'system') {
    delete document.documentElement.dataset.theme
  } else {
    document.documentElement.dataset.theme = theme.value
  }
})
</script>

<style scoped lang="scss" src="./ThemeToggle.scss"></style>
