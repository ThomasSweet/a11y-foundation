import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // Respect an externally assigned port (e.g. preview tooling);
    // fall back to Vite's default.
    port: Number(process.env.PORT) || 5173,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Make the library mixins available in every SCSS block without
        // a per-file @use. Don't @use the barrel again in components.
        additionalData: `@use "@/styles/scss/mixins" as *;\n`,
      },
    },
  },
})
