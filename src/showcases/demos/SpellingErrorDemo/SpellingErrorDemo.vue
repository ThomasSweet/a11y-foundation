<template>
  <div class="spelling-error-demo">
    <p class="spelling-error-invite">
      Drag the handle in the frame's bottom corner and watch the prose rewrap.
      The native squiggles follow every line they mark; the painted one stays
      pinned to the bottom of its box and lets wrapped lines go bare. Browser
      zoom (<kbd>⌘+</kbd> / <kbd>Ctrl++</kbd>) rewraps the text the same way
      — worth trying too.
    </p>

    <div class="spelling-error-editors">
      <div class="spelling-error-card spelling-error-card-native">
        <p class="spelling-error-card-tag">
          <code>text-decoration-line: spelling-error</code> — the platform's
          own squiggle, the same marking the browser's spell checker draws.
          Where unsupported it falls back to a dotted underline: meaning
          preserved, convention lost.
        </p>
        <p class="spelling-error-card-text">
          We <span class="spelling-error-misspelling">definately</span> plan
          to keep the drafts in two
          <span class="spelling-error-misspelling">seperate</span> folders.
          That way
          <span class="spelling-error-grammar">the notes and the finished copy is</span>
          never mixed up, even when the deadline is close.
        </p>
      </div>

      <div class="spelling-error-card spelling-error-card-hack">
        <p class="spelling-error-card-tag">
          The hack — a <code>repeating-linear-gradient</code> painted along
          the bottom of an <code>inline-block</code> box. It marks the box,
          not the text: convincing on one line, and it comes apart as soon as
          the words wrap.
        </p>
        <p class="spelling-error-card-text">
          We <span class="spelling-error-misspelling">definately</span> plan
          to keep the drafts in two
          <span class="spelling-error-misspelling">seperate</span> folders.
          That way
          <span class="spelling-error-grammar">the notes and the finished copy is</span>
          never mixed up, even when the deadline is close.
        </p>
      </div>
    </div>

    <p class="spelling-error-note">
      One last comparison: emulate <code>forced-colors</code> from the
      DevTools Rendering panel. The native decoration survives the
      recolouring; painted backgrounds are erased, and the hack vanishes
      entirely.
    </p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .spelling-error-demo {
    display: grid;
    gap: var(--space-3);
  }

  .spelling-error-invite {
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

  .spelling-error-editors {
    display: grid;
    gap: var(--space-3);
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    resize: horizontal;
    overflow: auto;
    min-inline-size: min(16rem, 100%);
    max-inline-size: 100%;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .spelling-error-card {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .spelling-error-card-tag {
    margin-block-end: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .spelling-error-card-text {
    margin: 0;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
  }

  .spelling-error-card-native {
    .spelling-error-misspelling {
      text-decoration-line: underline;
      text-decoration-style: dotted;
      text-decoration-color: var(--color-error);

      @supports (text-decoration-line: spelling-error) {
        text-decoration-line: spelling-error;
      }
    }

    .spelling-error-grammar {
      text-decoration-line: underline;
      text-decoration-style: dotted;
      text-decoration-color: var(--color-success);

      @supports (text-decoration-line: grammar-error) {
        text-decoration-line: grammar-error;
      }
    }
  }

  .spelling-error-card-hack {
    .spelling-error-misspelling,
    .spelling-error-grammar {
      display: inline-block;
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: 100% 4px;
    }

    .spelling-error-misspelling {
      background-image: repeating-linear-gradient(
        -45deg,
        var(--color-error) 0 2px,
        transparent 2px 5px
      );
    }

    .spelling-error-grammar {
      background-image: repeating-linear-gradient(
        -45deg,
        var(--color-success) 0 2px,
        transparent 2px 5px
      );
    }
  }
}
</style>
