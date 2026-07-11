import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      // Multi-page: the SPA home plus standalone static pages (legal + guide).
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        standard: fileURLToPath(new URL('./standard.html', import.meta.url)),
        craft: fileURLToPath(new URL('./craft.html', import.meta.url)),
        proof: fileURLToPath(new URL('./proof.html', import.meta.url)),
        impressum: fileURLToPath(new URL('./impressum.html', import.meta.url)),
        privacy: fileURLToPath(new URL('./privacy.html', import.meta.url)),
        styleguide: fileURLToPath(new URL('./styleguide.html', import.meta.url)),
      },
    },
  },
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
