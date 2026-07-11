<template>
  <a class="skip-link visually-hidden-focusable" href="#main">Skip to main content</a>

  <div class="site-stage">
    <div class="site-sheet">
      <span class="site-reg site-reg-tl" aria-hidden="true"></span>
      <span class="site-reg site-reg-tr" aria-hidden="true"></span>
      <span class="site-reg site-reg-bl" aria-hidden="true"></span>
      <span class="site-reg site-reg-br" aria-hidden="true"></span>

      <header class="site-head">
        <a class="site-brand" href="/">
          <img class="site-brand-mark" src="/favicon.svg" alt="" />
          <span>Accessible <span class="site-brand-dim">by default</span></span>
        </a>
        <div class="site-tools">
          <a
            class="site-github"
            href="https://github.com/ThomasSweet/a11y-foundation"
            target="_blank"
            rel="noreferrer"
          >
            <svg class="site-github-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            <span>GitHub</span>
            <span class="visually-hidden"> (opens in a new tab)</span>
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main id="main" tabindex="-1" class="site-content">
        <slot />
      </main>

      <footer class="site-titleblock">
        <slot name="footer-extra" />
        <div class="site-tb-row">
          <span class="site-tb-drawn">Drawn by <b>Thomas Sweet</b></span>
          <nav class="site-tb-legal" aria-label="Site information">
            <a href="/styleguide.html">Style guide</a>
            <a href="/impressum.html">Impressum</a>
            <a href="/privacy.html">Privacy</a>
          </nav>
          <span class="site-tb-copy">© 2026 Accessible by default</span>
        </div>
        <slot name="prevnext" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle.vue'
</script>

<style scoped lang="scss" src="./SiteFrame.scss"></style>
