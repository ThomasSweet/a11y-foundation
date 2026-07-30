<template>
  <div class="scrollbar-demo">
    <label class="scrollbar-demo-toggle">
      <input class="scrollbar-demo-input" type="checkbox" />
      Give the panes more text than fits
    </label>

    <div class="scrollbar-demo-panes">
      <section class="scrollbar-demo-pane" tabindex="0" aria-label="Pane without a reserved gutter">
        <p class="scrollbar-demo-tag">default</p>
        <p class="scrollbar-demo-text">{{ opening }}</p>
        <p class="scrollbar-demo-text scrollbar-demo-extra">{{ overflow }}</p>
      </section>

      <section
        class="scrollbar-demo-pane scrollbar-demo-pane-stable"
        tabindex="0"
        aria-label="Pane with scrollbar-gutter: stable"
      >
        <p class="scrollbar-demo-tag">scrollbar-gutter: stable</p>
        <p class="scrollbar-demo-text">{{ opening }}</p>
        <p class="scrollbar-demo-text scrollbar-demo-extra">{{ overflow }}</p>
      </section>
    </div>

    <p class="scrollbar-demo-note">
      What you see depends on your OS: classic scrollbars (Windows, or macOS
      with "always show") take layout space, so the left pane's text reflows
      the moment the scrollbar arrives — the right pane reserved the space
      up front. Overlay scrollbars occupy no space, and no CSS can change
      which kind your visitor has. Both panes are keyboard-scrollable via
      <code>tabindex="0"</code> and a label.
    </p>
  </div>
</template>

<script setup lang="ts">
const opening =
  'A settings page holds a scrollable list of integrations. On one OS the ' +
  'scrollbar floats above the content; on another it takes twelve pixels of ' +
  'layout. The same stylesheet serves both.'

const overflow =
  'The moment the list grows past its box, a classic scrollbar claims its ' +
  'lane and every line of text re-wraps a few pixels narrower — unless the ' +
  'lane was reserved before it was needed.'
</script>

<style scoped lang="scss">
@layer components {
  .scrollbar-demo {
    display: grid;
    gap: var(--space-4);
  }

  .scrollbar-demo-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: start;
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .scrollbar-demo-panes {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  }

  .scrollbar-demo-pane {
    min-inline-size: 0;
    block-size: 11rem;
    overflow-y: auto;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .scrollbar-demo-pane-stable {
    scrollbar-gutter: stable;
  }

  .scrollbar-demo-tag {
    margin-block-end: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .scrollbar-demo-text {
    margin: 0;
    font-size: var(--text-sm);
    line-height: 1.55;
  }

  .scrollbar-demo-text + .scrollbar-demo-text {
    margin-block-start: var(--space-2);
  }

  .scrollbar-demo-extra {
    display: none;
  }

  .scrollbar-demo:has(.scrollbar-demo-input:checked) .scrollbar-demo-extra {
    display: block;
  }

  .scrollbar-demo-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
