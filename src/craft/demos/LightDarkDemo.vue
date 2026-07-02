<template>
  <div class="light-dark-demo">
    <p class="light-dark-caption">
      Two ways to give one swatch a light and a dark value. They look identical
      at rest — until you <strong>flip the theme toggle in the header</strong>.
      The <code>light-dark()</code> swatch follows your choice; the
      <code>@media</code> swatch doesn't budge. That's the trap:
      <code>@media (prefers-color-scheme)</code> only listens to the
      <em>operating system</em>, so it silently ignores any in-app theme switch,
      while <code>light-dark()</code> resolves against <code>color-scheme</code>
      — the thing a theme toggle actually changes.
    </p>

    <div class="light-dark-grid">
      <article class="light-dark-card">
        <h4 class="light-dark-card-title">
          <code>light-dark()</code> — follows the toggle
        </h4>
        <div class="light-dark-swatch light-dark-swatch-modern" aria-hidden="true"></div>
        <pre class="light-dark-code"><code>background-color: light-dark(#e6e6fa, #1a1a2e);</code></pre>
        <p class="light-dark-note">
          One line, both values together so they can’t drift — and because it
          resolves against <code>color-scheme</code>, it honours the user’s
          in-app theme choice <em>and</em> their OS preference. The foundation
          sets <code>color-scheme</code> once on <code>:root</code>.
        </p>
      </article>

      <article class="light-dark-card">
        <h4 class="light-dark-card-title">
          <code>@media</code> — only hears the OS
        </h4>
        <div class="light-dark-swatch light-dark-swatch-legacy" aria-hidden="true"></div>
        <pre class="light-dark-code"><code>background-color: #e6e6fa;

@media (prefers-color-scheme: dark) {
  background-color: #1a1a2e;
}</code></pre>
        <p class="light-dark-note">
          The values are split across two declarations (easy to update one and
          forget the other) — and the query tracks the <em>OS</em> setting, so
          this swatch ignores the header toggle entirely. With a manual theme
          switcher, that’s not just verbose: it’s wrong.
        </p>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed — the whole point is that the theming is pure CSS.
</script>

<style scoped lang="scss">
@layer components {
  .light-dark-demo {
    display: grid;
    gap: var(--space-4);
  }

  .light-dark-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .light-dark-grid {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  }

  .light-dark-card {
    display: grid;
    gap: var(--space-3);
    align-content: start;
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .light-dark-card-title {
    font-size: var(--text-base);
    font-weight: 600;
  }

  .light-dark-swatch {
    block-size: var(--space-12);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
  }

  /* The modern swatch: one declaration, both modes. */
  .light-dark-swatch-modern {
    background-color: light-dark(#e6e6fa, #1a1a2e);
  }

  /* The legacy swatch: base value + media-query override — two declarations to keep in sync. */
  .light-dark-swatch-legacy {
    background-color: #e6e6fa;

    @include dark-mode {
      background-color: #1a1a2e;
    }
  }

  .light-dark-code {
    overflow-x: auto;
    min-inline-size: 0;
    padding: var(--space-3);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-subtle);
    font-size: var(--text-sm);
    white-space: pre;
  }

  .light-dark-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
