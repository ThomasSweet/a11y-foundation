<template>
  <div class="custom-select-demo">
    <p class="custom-select-caption">
      This is a real native <code>&lt;select&gt;</code> —
      <code>appearance: base-select</code> just unlocks its styling, including
      the dropdown and rich option content. Keyboard arrows, type-ahead, the
      screen-reader “combobox”, and form submission all keep working with
      <strong>zero JavaScript</strong>. The usual alternative — a
      <code>&lt;div role="combobox"&gt;</code> wired up with hundreds of lines of
      ARIA and key handling — is exactly what this lets you stop writing. Without
      support, you get a plain native select: styled less, just as usable.
    </p>

    <label class="custom-select-field">
      <span class="custom-select-label">Task status</span>

      <!-- A button + <selectedcontent> is the styleable display face in
           base-select mode; legacy browsers ignore them and render the plain
           native control instead. -->
      <select id="custom-select-status" name="status" class="custom-select">
        <button type="button" class="custom-select-trigger">
          <selectedcontent class="custom-select-value"></selectedcontent>
          <span class="custom-select-arrow" aria-hidden="true"></span>
        </button>

        <option value="backlog">
          <span class="custom-select-dot" data-tone="neutral" aria-hidden="true"></span>
          <span class="custom-select-text">
            <span class="custom-select-name">Backlog</span>
            <span class="custom-select-desc">Captured, not scheduled</span>
          </span>
        </option>
        <option value="in-progress" selected>
          <span class="custom-select-dot" data-tone="info" aria-hidden="true"></span>
          <span class="custom-select-text">
            <span class="custom-select-name">In progress</span>
            <span class="custom-select-desc">Someone is on it now</span>
          </span>
        </option>
        <option value="in-review">
          <span class="custom-select-dot" data-tone="warn" aria-hidden="true"></span>
          <span class="custom-select-text">
            <span class="custom-select-name">In review</span>
            <span class="custom-select-desc">Waiting on a second pair of eyes</span>
          </span>
        </option>
        <option value="done">
          <span class="custom-select-dot" data-tone="success" aria-hidden="true"></span>
          <span class="custom-select-text">
            <span class="custom-select-name">Done</span>
            <span class="custom-select-desc">Shipped and verified</span>
          </span>
        </option>
      </select>
    </label>

    <p class="custom-select-hint">
      The coloured dot is decorative (<code>aria-hidden</code>); the status name
      carries the meaning, so nothing depends on colour alone.
    </p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .custom-select-demo {
    display: grid;
    gap: var(--space-3);
  }

  .custom-select-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .custom-select-field {
    display: grid;
    gap: var(--space-2);
    max-inline-size: 22rem;
  }

  .custom-select-label {
    font-size: var(--text-sm);
    font-weight: 600;
  }

  /* Baseline styling that applies in BOTH modes — even the native fallback
     gets a tidy border, padding, and the theme's colours. */
  .custom-select {
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font: inherit;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  /* The enhancement: opt the control AND its picker popup into full styling.
     Everything below only takes effect where base-select is supported; the
     markup degrades to a normal native select otherwise. */
  @supports (appearance: base-select) {
    /* stylelint-disable property-no-unknown -- emerging customizable-select syntax */
    .custom-select,
    .custom-select::picker(select) {
      appearance: base-select;
    }

    .custom-select {
      display: block;
      inline-size: 100%;
      padding: 0; // the trigger button owns the padding now
      border: none;
      background: none;
      cursor: pointer;
    }

    /* The trigger fully coincides with the <select> box (same width, ≥44px
       tall) so the control reads as ONE target — not a sliver of select
       peeking past a smaller button, which trips target-size checks. */
    .custom-select-trigger {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      box-sizing: border-box;
      inline-size: 100%;
      min-block-size: 44px;
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: var(--color-surface);
      color: var(--color-text);
      font: inherit;
      text-align: start;
      cursor: pointer;

      @include can-hover {
        &:hover {
          background-color: var(--color-bg-subtle);
        }
      }

      @include high-contrast {
        border-color: currentcolor;
      }
    }

    /* The selected option's content is mirrored into <selectedcontent>; hide
       the long description there so the closed control stays compact. */
    .custom-select-value {
      flex: 1;

      .custom-select-desc {
        display: none;
      }
    }

    /* The UA renders its own ::picker-icon (outside our button, on its own
       line) — hide it and use one custom arrow inside the trigger instead. */
    .custom-select::picker-icon {
      display: none;
    }

    .custom-select-arrow {
      inline-size: 0.6em;
      block-size: 0.6em;
      border-inline-end: 2px solid currentcolor;
      border-block-end: 2px solid currentcolor;
      rotate: 45deg;
      transition: rotate var(--duration-fast) var(--easing-standard);
    }

    .custom-select:open .custom-select-arrow {
      rotate: 225deg;
    }

    /* The dropdown popup. base-select auto-anchors it to the control, so no
       manual anchor wiring — just style it like any surface. */
    .custom-select::picker(select) {
      margin-block-start: var(--space-1);
      /* Keep a generous floor before the popup shrinks-and-scrolls or flips to
         the other side — it only gives way when there's genuinely no room. */
      min-block-size: 12rem;
      padding: var(--space-1);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: var(--color-surface);
      box-shadow: var(--shadow-lg);

      @include high-contrast {
        border-color: currentcolor;
      }
    }

    .custom-select option {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-sm);

      @include can-hover {
        &:hover {
          background-color: var(--color-bg-subtle);
        }
      }
    }

    /* The active option already shows a checkmark; tint it so the current
       value reads at a glance (never colour alone — the ✓ carries it too). */
    .custom-select option:checked {
      background-color: color-mix(in oklch, var(--color-primary) 14%, transparent);

      @include forced-colors {
        background-color: Highlight;
        color: HighlightText;
      }
    }

    /* The built-in checkmark column — keep it, just align it with our text. */
    .custom-select option::checkmark {
      order: 1; // push it to the end, opposite the dot
      margin-inline-start: auto;
      color: var(--color-primary);

      @include forced-colors {
        color: currentcolor;
      }
    }

    /* A soft open/close fade on the popup. It rides the motion tokens, which
       are zeroed under reduced-motion globally — so no override needed here. */
    .custom-select::picker(select) {
      opacity: 0;
      transition:
        opacity var(--duration-fast) var(--easing-standard),
        display var(--duration-fast) allow-discrete,
        overlay var(--duration-fast) allow-discrete;
    }

    .custom-select:open::picker(select) {
      opacity: 1;
    }

    @starting-style {
      .custom-select:open::picker(select) {
        opacity: 0;
      }
    }
    /* stylelint-enable property-no-unknown */
  }

  .custom-select-dot {
    inline-size: 0.7em;
    block-size: 0.7em;
    border-radius: var(--radius-full);
    background-color: var(--dot-color, var(--color-text-subtle));

    &[data-tone='neutral'] {
      --dot-color: var(--color-text-subtle);
    }

    &[data-tone='info'] {
      --dot-color: var(--color-info);
    }

    &[data-tone='warn'] {
      --dot-color: var(--color-warning);
    }

    &[data-tone='success'] {
      --dot-color: var(--color-success);
    }

    @include forced-colors {
      background-color: currentcolor;
    }
  }

  .custom-select-text {
    display: grid;
  }

  .custom-select-name {
    font-weight: 600;
  }

  .custom-select-desc {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .custom-select-hint {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
