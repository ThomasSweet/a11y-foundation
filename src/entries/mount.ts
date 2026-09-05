import { createSSRApp, type Component } from 'vue'

import '../styles/index.css'

export function mount(view: Component) {
  createSSRApp(view).mount('#app')
}
