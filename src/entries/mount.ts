import { createApp, type Component } from 'vue'

import '../styles/index.css'

/** Mounting is synchronous on purpose: the entry scripts are blocking="render",
 *  so first paint — and the view-transition snapshot — sees a full page, not an
 *  empty #app. */
export function mount(view: Component) {
  createApp(view).mount('#app')
}
