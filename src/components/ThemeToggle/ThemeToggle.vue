<template>
  <div class="theme-toggle">
    <button
      class="theme-toggle-trigger"
      popovertarget="theme-panel"
      aria-label="Theme settings"
    >
      <span class="theme-toggle-swatch" aria-hidden="true"></span>
      Theme
    </button>

    <div id="theme-panel" popover class="theme-panel">
      <fieldset class="theme-panel-group">
        <legend class="theme-panel-legend">Mode</legend>
        <label v-for="mode in modes" :key="mode" class="theme-panel-option">
          <input v-model="theme" type="radio" name="site-theme" :value="mode" />
          {{ mode }}
        </label>
      </fieldset>

      <fieldset class="theme-panel-group">
        <legend class="theme-panel-legend">Themes</legend>
        <label v-for="preset in presets" :key="preset.value" class="theme-panel-option">
          <input v-model="theme" type="radio" name="site-theme" :value="preset.value" />
          <span class="theme-panel-swatch" :class="`theme-${preset.value}`" aria-hidden="true"></span>
          {{ preset.label }}
        </label>
      </fieldset>

      <fieldset class="theme-panel-group">
        <legend class="theme-panel-legend">Color-vision friendly</legend>
        <label v-for="preset in cvdPresets" :key="preset.value" class="theme-panel-option">
          <input v-model="theme" type="radio" name="site-theme" :value="preset.value" />
          <span class="theme-panel-swatch" :class="`theme-${preset.value}`" aria-hidden="true"></span>
          {{ preset.label }}
        </label>
      </fieldset>

      <fieldset class="theme-panel-group">
        <legend class="theme-panel-legend">High contrast</legend>
        <label v-for="preset in contrastPresets" :key="preset.value" class="theme-panel-option">
          <input v-model="theme" type="radio" name="site-theme" :value="preset.value" />
          <span class="theme-panel-swatch" :class="`theme-${preset.value}`" aria-hidden="true"></span>
          {{ preset.label }}
        </label>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
import { contrastPresets, cvdPresets, modes, presets, useSiteTheme } from './useSiteTheme'

const theme = useSiteTheme()
</script>

<style scoped lang="scss" src="./ThemeToggle.scss"></style>
