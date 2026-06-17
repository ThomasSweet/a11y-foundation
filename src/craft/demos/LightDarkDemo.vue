<template>
  <div class="ld-demo">
    <p class="ld-caption">
      Two ways to give one swatch a light and a dark value. They look identical
      at rest — until you <strong>flip the theme toggle in the header</strong>.
      The <code>light-dark()</code> swatch follows your choice; the
      <code>@media</code> swatch doesn't budge. That's the trap:
      <code>@media (prefers-color-scheme)</code> only listens to the
      <em>operating system</em>, so it silently ignores any in-app theme switch,
      while <code>light-dark()</code> resolves against <code>color-scheme</code>
      — the thing a theme toggle actually changes.
    </p>

    <div class="ld-grid">
      <article class="ld-card">
        <h3 class="ld-card-title">
          <code>light-dark()</code> — follows the toggle
        </h3>
        <div class="ld-swatch ld-swatch-modern" aria-hidden="true"></div>
        <pre class="ld-code"><code>color: light-dark(#1a1a2e, #e6e6fa);</code></pre>
        <p class="ld-note">
          One line, both values together so they can’t drift — and because it
          resolves against <code>color-scheme</code>, it honours the user’s
          in-app theme choice <em>and</em> their OS preference. The foundation
          sets <code>color-scheme</code> once on <code>:root</code>.
        </p>
      </article>

      <article class="ld-card">
        <h3 class="ld-card-title">
          <code>@media</code> — only hears the OS
        </h3>
        <div class="ld-swatch ld-swatch-legacy" aria-hidden="true"></div>
        <pre class="ld-code"><code>color: #1a1a2e;

@media (prefers-color-scheme: dark) {
  color: #e6e6fa;
}</code></pre>
        <p class="ld-note">
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
  .ld-demo {
    display: grid;
    gap: var(--space-4);
  }

  .ld-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .ld-grid {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  }

  .ld-card {
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

  .ld-card-title {
    font-size: var(--text-base);
    font-weight: 600;
  }

  .ld-swatch {
    block-size: var(--space-12);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
  }

  /* The modern swatch: one declaration, both modes. */
  .ld-swatch-modern {
    background-color: light-dark(#1a1a2e, #e6e6fa);
  }

  /* The legacy swatch: base value + a media-query override. Identical result,
     authored as two separate declarations that have to be kept in sync. */
  .ld-swatch-legacy {
    background-color: #1a1a2e;

    @include dark-mode {
      background-color: #e6e6fa;
    }
  }

  .ld-code {
    overflow-x: auto;
    padding: var(--space-3);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-subtle);
    font-size: var(--text-sm);
    white-space: pre;
  }

  .ld-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
