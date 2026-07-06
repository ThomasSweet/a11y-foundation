import { ref, watchEffect } from 'vue'

export const modes = ['system', 'light', 'dark'] as const
export const presets = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'sunset', label: 'Sunset' },
] as const
export const cvdPresets = [
  { value: 'cobalt', label: 'Cobalt' },
  { value: 'teal', label: 'Teal' },
  { value: 'amber', label: 'Amber' },
] as const
export const contrastPresets = [
  { value: 'contrast-light', label: 'Contrast light' },
  { value: 'contrast-dark', label: 'Contrast dark' },
] as const

type Mode = (typeof modes)[number]
type Preset =
  | (typeof presets)[number]['value']
  | (typeof cvdPresets)[number]['value']
  | (typeof contrastPresets)[number]['value']
export type Theme = Mode | Preset

const PRESET_VALUES: readonly string[] = [...presets, ...cvdPresets, ...contrastPresets].map(
  (p) => p.value,
)
const STORAGE_KEY = 'abd-theme'

// The inline script in index.html already applied the saved value pre-paint;
// state starts from the DOM so UI and document never disagree.
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

// Module scope: one theme, however many controls bind to it.
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

export function useSiteTheme() {
  return theme
}
