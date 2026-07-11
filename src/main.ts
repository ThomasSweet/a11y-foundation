import { createApp, type Component } from 'vue'

import './styles/index.css'

// Each MPA entry sets `data-view` on #app; the matching root is loaded on
// demand so a page ships only its own view. No `data-view` (or an unknown one)
// falls back to the original single-page App.
const el = document.getElementById('app')!

const views: Record<string, () => Promise<{ default: Component }>> = {
  hub: () => import('./site/HubView/HubView.vue'),
  craft: () => import('./pages/CraftPage.vue'),
}

const load = views[el.dataset.view ?? ''] ?? (() => import('./App.vue'))
load().then((mod) => createApp(mod.default).mount('#app'))
