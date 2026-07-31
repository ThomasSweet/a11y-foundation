<template>
  <div class="content-visibility-demo">
    <p class="content-visibility-invite">
      Open find-in-page (<kbd>⌘F</kbd> / <kbd>Ctrl+F</kbd>). Search
      <strong>cardamom</strong>: the browser finds it inside a section it
      hasn't rendered and scrolls the pane to it. Now search
      <strong>saffron</strong>: nothing — it sits in a
      <code>display:&nbsp;none</code> appendix, gone from search, the tab
      order, and the accessibility tree alike.
    </p>

    <div class="content-visibility-panes">
      <div
        class="content-visibility-pane content-visibility-pane-auto"
        role="region"
        aria-label="A long article, sections skipped with content-visibility: auto"
        tabindex="0"
      >
        <p class="content-visibility-pane-tag"><code>content-visibility: auto</code></p>
        <section class="content-visibility-section">
          <p><strong>The slow bakery, chapter one.</strong> The ovens wake at
          four. Nothing on this shelf is rushed, and nothing below this
          paragraph has been painted yet — the browser is saving that work
          until you scroll toward it.</p>
        </section>
        <section class="content-visibility-section">
          <p><strong>Chapter two.</strong> The rye starter is older than the
          shop. Every loaf that leaves the counter carries a little of the
          first one ever baked here.</p>
        </section>
        <section class="content-visibility-section">
          <p><strong>Chapter three.</strong> Winter mornings mean spiced
          buns: cinnamon mostly, a little clove, and the secret the head
          baker will only confirm if you ask directly — cardamom, freshly
          cracked, never ground ahead of time.</p>
        </section>
        <section class="content-visibility-section">
          <p><strong>Chapter four.</strong> Closing time is quiet. Whatever
          is left goes to the shelter around the corner, still warm if the
          timing is right.</p>
        </section>
      </div>

      <div
        class="content-visibility-pane"
        role="region"
        aria-label="The same article with its appendix removed via display: none"
        tabindex="0"
      >
        <p class="content-visibility-pane-tag"><code>display: none</code></p>
        <section class="content-visibility-section">
          <p><strong>The same article, different hiding.</strong> This pane
          keeps its appendix in the markup but removes it with
          <code>display: none</code>. It isn't rendered — and it also isn't
          searchable, focusable, or in the accessibility tree. As far as
          your browser is concerned, the spice named there does not exist
          on this page.</p>
        </section>
        <section class="content-visibility-section content-visibility-appendix">
          <p><strong>Appendix.</strong> The summer buns swap the winter
          spice for saffron, steeped in warm milk.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .content-visibility-demo {
    display: grid;
    gap: var(--space-3);
  }

  .content-visibility-invite {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);

    kbd {
      padding: 0 var(--space-1);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-family: var(--bp-mono);
      font-size: 0.85em;
    }
  }

  .content-visibility-panes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
    gap: var(--space-3);
  }

  .content-visibility-pane {
    max-block-size: 14rem;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    overflow-y: auto;
    scrollbar-gutter: stable;

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .content-visibility-pane-tag {
    margin-block-end: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .content-visibility-section {
    margin-block-start: var(--space-3);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);

    p {
      margin: 0;
    }
  }

  @supports (content-visibility: auto) {
    .content-visibility-pane-auto .content-visibility-section {
      content-visibility: auto;
      contain-intrinsic-block-size: auto 6rem;
    }
  }

  .content-visibility-appendix {
    display: none;
  }
}
</style>
