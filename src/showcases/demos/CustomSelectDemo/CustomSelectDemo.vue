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

      <!-- The button + <selectedcontent> is the styleable face in base-select
           mode; legacy browsers ignore them and render the plain control. -->
      <select id="custom-select-status" name="status" class="custom-select">
        <button type="button" class="custom-select-trigger">
          <selectedcontent class="custom-select-value"></selectedcontent>
          <span class="custom-select-arrow" aria-hidden="true"></span>
        </button>

        <optgroup label="Open">
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
        </optgroup>
        <optgroup label="Closed">
          <option value="done">
            <span class="custom-select-dot" data-tone="success" aria-hidden="true"></span>
            <span class="custom-select-text">
              <span class="custom-select-name">Done</span>
              <span class="custom-select-desc">Shipped and verified</span>
            </span>
          </option>
          <option value="archived" disabled>
            <span class="custom-select-dot" data-tone="neutral" aria-hidden="true"></span>
            <span class="custom-select-text">
              <span class="custom-select-name">Archived</span>
              <span class="custom-select-desc">Read-only after 90 days</span>
            </span>
          </option>
        </optgroup>
      </select>
    </label>

    <p class="custom-select-hint">
      The coloured dot is decorative (<code>aria-hidden</code>); the status name
      carries the meaning, so nothing depends on colour alone. One honest
      detail: keyboard and screen-reader navigation skip
      <strong>disabled</strong> options, so their text can't be the only home
      of anything important — which is why the thing “Archived” wants you to
      know lives out here instead: archived tasks are read-only after 90 days.
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

  /* Baseline styling for both modes — even the native fallback gets a tidy border. */
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

  /* The enhancement: opt the control and its picker popup into full styling,
     only where base-select is supported (degrades to a native select). */
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

    /* Trigger fully covers the <select> box (full width, ≥44px) so it's ONE
       target — no select sliver peeking past a smaller button (target size). */
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

    /* Selected content is mirrored into <selectedcontent>; lay it out like an
       option row (flex blockifies the dot span — inline-size doesn't apply to
       inline elements, so without this the cloned dot renders 0×0). Hide the
       long description so the closed control stays compact. */
    .custom-select-value {
      display: flex;
      flex: 1;
      align-items: center;
      gap: var(--space-3);

      .custom-select-desc {
        display: none;
      }
    }

    /* Hide the UA's ::picker-icon; use our own arrow inside the trigger. */
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

    /* The popup — base-select auto-anchors it, so no manual anchor wiring. */
    .custom-select::picker(select) {
      margin-block-start: var(--space-1);
      /* Generous floor before the popup shrinks/flips — gives way only when there's no room. */
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

    .custom-select optgroup {
      display: block;
      font-size: var(--text-sm);
      font-weight: 700;
      color: var(--color-text-subtle);
    }

    .custom-select optgroup + optgroup {
      margin-block-start: var(--space-1);
      padding-block-start: var(--space-1);
      border-block-start: 1px solid var(--color-border);
    }

    .custom-select option {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-sm);
      /* Undo the group-label typography inherited from <optgroup>. */
      font-size: var(--text-base);
      font-weight: 400;
      color: var(--color-text);

      @include can-hover {
        &:hover {
          background-color: var(--color-bg-subtle);
        }
      }
    }

    .custom-select option:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    /* Tint the active option so it reads at a glance (never colour alone — the ✓ carries it). */
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
      transition:
        opacity var(--duration-fast) var(--easing-standard),
        scale var(--duration-fast) var(--easing-standard);

      @include forced-colors {
        color: currentcolor;
      }
    }

    /* Tint is reinforcement only — the mirrored dot and name carry the
       meaning (WCAG 1.4.1). */
    .custom-select:has(option[value='in-progress']:checked) .custom-select-trigger {
      border-color: color-mix(in oklab, var(--color-info) 55%, var(--color-border));
    }

    .custom-select:has(option[value='in-review']:checked) .custom-select-trigger {
      border-color: color-mix(in oklab, var(--color-warning) 55%, var(--color-border));
    }

    .custom-select:has(option[value='done']:checked) .custom-select-trigger {
      border-color: color-mix(in oklab, var(--color-success) 55%, var(--color-border));
    }

    @include high-contrast {
      .custom-select:has(option:checked) .custom-select-trigger {
        border-color: currentcolor;
      }
    }

    /* Open/close transitions ride the motion tokens (zeroed under reduced motion). */
    .custom-select::picker(select) {
      opacity: 0;
      translate: 0 -0.25rem;
      scale: 0.97;
      transform-origin: top;
      transition:
        opacity var(--duration-fast) var(--easing-standard),
        translate var(--duration-fast) var(--easing-standard),
        scale var(--duration-fast) var(--easing-standard),
        display var(--duration-fast) allow-discrete,
        overlay var(--duration-fast) allow-discrete;
    }

    .custom-select:open::picker(select) {
      opacity: 1;
      translate: 0 0;
      scale: 1;
    }

    @starting-style {
      .custom-select:open::picker(select) {
        opacity: 0;
        translate: 0 -0.25rem;
        scale: 0.97;
      }

      .custom-select option:checked::checkmark {
        opacity: 0;
        scale: 0.4;
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
