<template>
  <div class="defensive-demo">
    <p class="defensive-caption">
      Two phone-narrow frames, one layout, the same CSS. The left card holds
      the tidy placeholder copy designs are composed with; the right one holds
      production content — a deploy URL that can't wrap. Two guards keep it in
      check: <code>min-inline-size: 0</code> on the grid column and a scroller
      on the line itself.
    </p>

    <label class="defensive-toggle">
      <input type="checkbox" class="defensive-toggle-input" />
      <span>Remove the guards</span>
    </label>

    <div class="defensive-frames">
      <figure class="defensive-frame">
        <figcaption class="defensive-frame-label">The mockup</figcaption>
        <div class="defensive-stage">
          <article class="defensive-card">
            <span class="defensive-avatar" aria-hidden="true"></span>
            <div class="defensive-content">
              <p class="defensive-title">Deploy finished</p>
              <pre class="defensive-code">v2.4.1 · live</pre>
              <p class="defensive-note">Everything fits nicely.</p>
            </div>
          </article>
        </div>
      </figure>

      <figure class="defensive-frame">
        <figcaption class="defensive-frame-label">Reality</figcaption>
        <div class="defensive-stage">
          <article class="defensive-card">
            <span class="defensive-avatar" aria-hidden="true"></span>
            <div class="defensive-content">
              <p class="defensive-title">Deploy finished</p>
              <!-- tabindex keeps the scrolling line keyboard-reachable (guards on = it scrolls). -->
              <pre class="defensive-code" tabindex="0">https://accessible-by-default.dev/deploys/2026-07-02/a1b2c3d4e5f6a7b8c9d0</pre>
              <p class="defensive-note">Production is live. The build took 42 seconds.</p>
            </div>
          </article>
        </div>
      </figure>
    </div>

    <p class="defensive-status" role="status">
      <span class="defensive-status-fixed">
        Guards on — both frames contain their content; the URL scrolls inside
        its card.
      </span>
      <span class="defensive-status-broken">
        ⚠ Guards off — the mockup still looks flawless, but the real content
        forces its column wider than the frame and gets cut off. A review done
        with placeholder copy would never catch it.
      </span>
    </p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .defensive-demo {
    display: grid;
    gap: var(--space-3);
  }

  .defensive-caption,
  .defensive-status {
    max-inline-size: 60ch;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .defensive-toggle {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    inline-size: fit-content;
    font-weight: 600;
    cursor: pointer;
  }

  .defensive-frames {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: var(--space-4);
  }

  .defensive-frame {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    min-inline-size: 0;
  }

  .defensive-frame-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
  }

  .defensive-stage {
    min-inline-size: 0;
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: clip;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .defensive-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-3);
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .defensive-avatar {
    inline-size: 2.5rem;
    block-size: 2.5rem;
    border-radius: var(--radius-full);
    background: var(--gradient-accent);

    @include forced-colors {
      background: CanvasText;
    }
  }

  .defensive-content {
    display: grid;
    gap: var(--space-2);
    min-inline-size: 0;
  }

  .defensive-title {
    font-weight: 600;
  }

  .defensive-code {
    min-inline-size: 0;
    padding: var(--space-2);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-subtle);
    font-size: var(--text-sm);
    white-space: nowrap;
    overflow-x: auto;

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .defensive-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .defensive-demo:has(.defensive-toggle-input:checked) {
    .defensive-content {
      min-inline-size: auto;
    }

    .defensive-code {
      min-inline-size: auto;
      overflow-x: visible;
    }
  }

  .defensive-status-broken {
    display: none;
  }

  .defensive-demo:has(.defensive-toggle-input:checked) {
    .defensive-status-fixed {
      display: none;
    }

    .defensive-status-broken {
      display: inline;
    }
  }
}
</style>
