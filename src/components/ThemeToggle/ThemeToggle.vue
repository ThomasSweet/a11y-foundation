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
import { ref, watchEffect } from 'vue'

const modes = ['system', 'light', 'dark'] as const
const presets = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'sunset', label: 'Sunset' },
] as const
const cvdPresets = [
  { value: 'cobalt', label: 'Cobalt' },
  { value: 'teal', label: 'Teal' },
  { value: 'amber', label: 'Amber' },
] as const
const contrastPresets = [
  { value: 'contrast-light', label: 'Contrast light' },
  { value: 'contrast-dark', label: 'Contrast dark' },
] as const

type Mode = (typeof modes)[number]
type Preset =
  | (typeof presets)[number]['value']
  | (typeof cvdPresets)[number]['value']
  | (typeof contrastPresets)[number]['value']
type Theme = Mode | Preset

const PRESET_VALUES: readonly string[] = [...presets, ...cvdPresets, ...contrastPresets].map(
  (p) => p.value,
)
const STORAGE_KEY = 'abd-theme'

// The inline script in index.html already applied the saved value pre-paint;
// the ref starts from the DOM so UI and document never disagree.
const initial = (): Theme => {
  const root = document.documentElement
  if (root.dataset.preset && PRESET_VALUES.includes(root.dataset.preset)) {
    return root.dataset.preset as Theme
  }
  if (root.dataset.theme === 'light' || root.dataset.theme === 'dark') {
    return root.dataset.theme
  }
  return 'system'
}

const theme = ref<Theme>(initial())

watchEffect(() => {
  const root = document.documentElement
  if (PRESET_VALUES.includes(theme.value)) {
    root.dataset.preset = theme.value
    delete root.dataset.theme
  } else if (theme.value === 'light' || theme.value === 'dark') {
    root.dataset.theme = theme.value
    delete root.dataset.preset
  } else {
    delete root.dataset.theme
    delete root.dataset.preset
  }
  try {
    if (theme.value === 'system') {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, theme.value)
    }
  } catch {
    /* storage unavailable (private mode) — theme still applies for the session */
  }
})
</script>

<style scoped lang="scss" src="./ThemeToggle.scss"></style>
