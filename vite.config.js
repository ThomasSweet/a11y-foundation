import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/** Vite drops unknown attributes when rewriting entry <script> tags;
 *  blocking="render" is load-bearing (see src/entries/mount.ts). */
const keepRenderBlocking = () => ({
  name: 'keep-render-blocking',
  transformIndexHtml: {
    order: 'post',
    handler: (html) =>
      html.replace(/<script type="module" crossorigin/g, '<script type="module" blocking="render" crossorigin'),
  },
})

/** STAGING=1 builds carry noindex so the staging subdomain never gets crawled. */
const stagingNoindex = () => ({
  name: 'staging-noindex',
  transformIndexHtml: {
    order: 'post',
    handler: (html) =>
      process.env.STAGING
        ? { html, tags: [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex' }, injectTo: 'head' }] }
        : html,
  },
})

export default defineConfig({
  plugins: [vue(), keepRenderBlocking(), stagingNoindex()],
  build: {
    rollupOptions: {
      // Multi-page: the SPA home plus standalone static pages (legal + guide).
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        standard: fileURLToPath(new URL('./standard.html', import.meta.url)),
        craft: fileURLToPath(new URL('./craft.html', import.meta.url)),
        showcase: fileURLToPath(new URL('./showcase.html', import.meta.url)),
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
