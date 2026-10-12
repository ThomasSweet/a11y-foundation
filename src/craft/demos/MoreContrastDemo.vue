<template>
  <div class="more-contrast-demo">
    <label class="more-contrast-demo-toggle">
      <input class="more-contrast-demo-simulate" type="checkbox" />
      <span>Simulate: I prefer more contrast</span>
    </label>

    <article class="more-contrast-demo-card">
      <p class="more-contrast-demo-title">Order 1042</p>
      <p class="more-contrast-demo-meta">Packed this morning. Leaves the warehouse at noon.</p>
      <label class="more-contrast-demo-field">
        <span class="more-contrast-demo-field-label">Note for the courier</span>
        <input class="more-contrast-demo-input" type="text" name="courier-note" autocomplete="off" />
      </label>
    </article>

    <p class="more-contrast-demo-status more-contrast-demo-status-default">
      Showing the default: a faint card border, a softer second line and a
      shadow. The field's edge is already strong, because a field is found by
      its edge.
    </p>
    <p class="more-contrast-demo-status more-contrast-demo-status-more">
      Showing more contrast: the card border takes the system text colour, the
      second line reads at full strength, the shadow is gone and the focus
      ring is four pixels wide. Increase Contrast on macOS and iOS switches
      this on without the checkbox.
    </p>
    <p class="more-contrast-demo-status more-contrast-demo-status-forced">
      Forced colours are active. Your system has replaced the whole palette,
      so the checkbox has no colours left to change.
    </p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .more-contrast-demo {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);

    &:has(.more-contrast-demo-simulate:checked) {
      --color-border: CanvasText;
      --color-text-subtle: var(--color-text);
      --shadow-md: none;
      --focus-ring-width: 4px;
    }
  }

  .more-contrast-demo-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: start;
    min-block-size: 24px;
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;
  }

  .more-contrast-demo-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-2);
    max-inline-size: 26rem;
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-md);
  }

  .more-contrast-demo-title {
    font-weight: 600;
  }

  .more-contrast-demo-meta {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .more-contrast-demo-field {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-1);
    margin-block-start: var(--space-2);
  }

  .more-contrast-demo-field-label {
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .more-contrast-demo-input {
    min-block-size: 44px;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-text-subtle);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  .more-contrast-demo-status {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .more-contrast-demo-status-more,
  .more-contrast-demo-status-forced {
    display: none;
  }

  .more-contrast-demo:has(.more-contrast-demo-simulate:checked) {
    .more-contrast-demo-status-default {
      display: none;
    }

    .more-contrast-demo-status-more {
      display: block;
    }
  }

  @include high-contrast {
    .more-contrast-demo-status-default {
      display: none;
    }

    .more-contrast-demo-status-more {
      display: block;
    }
  }

  @include forced-colors {
    .more-contrast-demo-status-default,
    .more-contrast-demo-status-more,
    .more-contrast-demo:has(.more-contrast-demo-simulate:checked) .more-contrast-demo-status-more {
      display: none;
    }

    .more-contrast-demo-status-forced {
      display: block;
    }
  }
}
</style>
