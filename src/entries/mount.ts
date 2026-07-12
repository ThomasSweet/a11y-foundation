import { createApp, type Component } from 'vue'

import '../styles/index.css'

/** Shared by every page entry. Mounting happens synchronously during module
 *  evaluation: the entry scripts are `blocking="render"`, so the browser's
 *  first paint — and the cross-document view-transition snapshot — sees the
 *  full page, not an empty #app. */
export function mount(view: Component) {
  createApp(view).mount('#app')
}
