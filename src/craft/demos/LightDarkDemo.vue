<template>
  <div class="light-dark-demo">
    <p class="light-dark-caption">
      Two ways to give one swatch a light and a dark value. They look identical
      at rest — until you <strong>flip the theme</strong>, right here. The
      <code>light-dark()</code> swatch follows your choice; the
      <code>@media</code> swatch doesn't budge. That's the trap:
      <code>@media (prefers-color-scheme)</code> only listens to the
      <em>operating system</em>, so it silently ignores any in-app theme switch,
      while <code>light-dark()</code> resolves against <code>color-scheme</code>
      — the thing a theme toggle actually changes.
    </p>

    <fieldset class="light-dark-switch">
      <legend class="light-dark-switch-legend">Theme</legend>
      <label v-for="mode in modes" :key="mode" class="light-dark-switch-option">
        <input v-model="theme" type="radio" name="light-dark-theme" :value="mode" />
        {{ mode }}
      </label>
    </fieldset>

    <div class="light-dark-grid">
      <article class="light-dark-card">
        <h4 class="light-dark-card-title">
          <code>light-dark()</code> — follows the toggle
        </h4>
        <div class="light-dark-swatch light-dark-swatch-modern" aria-hidden="true"></div>
        <pre class="light-dark-code" tabindex="0"><code>background-color: light-dark(#e6e6fa, #1a1a2e);</code></pre>
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
        <pre class="light-dark-code" tabindex="0"><code>background-color: #e6e6fa;

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

      <article class="light-dark-card">
        <h4 class="light-dark-card-title">
          Beyond color — the style-query trick
        </h4>
        <div class="light-dark-swatch light-dark-swatch-probe" aria-hidden="true"></div>
        <pre class="light-dark-code" tabindex="0"><code>@property --scheme-probe {
  syntax: '&lt;color&gt;';
  inherits: true;
  initial-value: white;
}

.card { --scheme-probe: light-dark(white, black); }

@container style(--scheme-probe: black) {
  .swatch { border-style: dashed; /* any property */ }
}</code></pre>
        <p class="light-dark-note">
          <code>light-dark()</code> only returns colors — but a registered
          custom property resolves it to one, and a style query can read that
          answer back and switch <em>any</em> property on it: this swatch
          changes its border style and glyph per scheme, still zero JS. Flip
          the header toggle to watch it.
        </p>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
// The switcher is the same site-chrome control as the header's — the
// mechanism being taught (light-dark() resolving color-scheme) stays pure CSS.
import { modes, useSiteTheme } from '../../components/ThemeToggle/useSiteTheme'

const theme = useSiteTheme()
</script>

<style scoped lang="scss">
@property --scheme-probe {
  syntax: '<color>';
  inherits: true;
  initial-value: white;
}

@layer components {
  .light-dark-demo {
    display: grid;
    gap: var(--space-4);
  }

  .light-dark-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .light-dark-switch {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-4);
    align-items: center;
    justify-self: start;
    margin: 0;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
  }

  .light-dark-switch-legend {
    float: inline-start;
    padding-inline-end: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .light-dark-switch-option {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-sm);
    text-transform: capitalize;
  }

  .light-dark-grid {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  }

  .light-dark-card {
    --scheme-probe: light-dark(white, black);

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

  .light-dark-swatch-probe {
    display: grid;
    place-items: center;
    background-color: var(--color-bg-subtle);
    border-width: 2px;
    font-size: var(--text-xl);

    &::after {
      content: '☀' / '';
    }
  }

  @container style(--scheme-probe: black) {
    .light-dark-swatch-probe {
      border-style: dashed;

      &::after {
        content: '☾' / '';
      }
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
