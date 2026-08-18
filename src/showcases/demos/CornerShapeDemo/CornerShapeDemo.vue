<template>
  <div class="corner-shape-demo">
    <p class="corner-shape-invite">
      Press <kbd>Tab</kbd> and walk the row. The first three buttons take
      their corners from <code>corner-shape</code> — real border geometry,
      so the border, the shadow, and the default focus ring all trace the
      squircle, the scoop, and the notch exactly. The fourth mixes
      per-corner longhands: two full-height bevels on one side meet in a
      point, and the pointer tag this site cuts elsewhere with
      <code>polygon()</code> appears with its border and ring intact. The
      fifth animates: hover or focus it and the corners ease from squircle
      to scoop — the keywords are <code>superellipse()</code> curves
      underneath, so the shape sweeps through bevel on its way and the
      ring rides along the whole time. The last fakes its notches with
      <code>clip-path</code>: clipping runs after the outline paints, and
      the ring arrives sliced off at every cut corner.
    </p>

    <div class="corner-shape-row">
      <button type="button" class="corner-shape-button corner-shape-button-squircle">
        Squircle
      </button>
      <button type="button" class="corner-shape-button corner-shape-button-scoop">
        Scoop
      </button>
      <button type="button" class="corner-shape-button corner-shape-button-notch">
        Notch
      </button>
      <button type="button" class="corner-shape-button corner-shape-button-tag">
        You are here
      </button>
      <button type="button" class="corner-shape-button corner-shape-button-morph">
        Morph
      </button>
      <button type="button" class="corner-shape-button corner-shape-button-clipped">
        Clipped
      </button>
    </div>

    <p class="corner-shape-tag">
      <code>corner-shape</code> ships in Chrome and Edge 139+ only for now.
      Without support the shaped buttons are plain rounded ones — fully
      focusable, and the lesson still holds. The split with the rounded
      <code>polygon()</code> showcase: when the shape is really a corner
      treatment, <code>corner-shape</code> cuts it with nothing clipped and
      nothing to rescue; arbitrary geometry — and every engine today — is
      still <code>polygon()</code> and <code>shape()</code> territory, with
      the drop-shadow rescue for the ring.
    </p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .corner-shape-demo {
    display: grid;
    gap: var(--space-4);
  }

  .corner-shape-invite {
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

  .corner-shape-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }

  .corner-shape-button {
    padding: var(--space-3) var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-sm);
    color: var(--color-text);
    font: inherit;
    font-weight: 600;
    cursor: pointer;

    @include can-hover {
      &:hover {
        background-color: var(--color-bg-subtle);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .corner-shape-button-tag {
    border-radius: 0 1.5rem 1.5rem 0 / 0 50% 50% 0;
  }

  @supports (corner-shape: squircle) {
    .corner-shape-button-squircle {
      corner-shape: squircle;
    }

    .corner-shape-button-scoop {
      corner-shape: scoop;
    }

    .corner-shape-button-notch {
      corner-shape: notch;
    }

    .corner-shape-button-tag {
      corner-top-right-shape: bevel;
      corner-bottom-right-shape: bevel;
    }

    .corner-shape-button-morph {
      corner-shape: squircle;
      transition: corner-shape var(--duration-slow) var(--easing-standard);

      &:focus-visible {
        corner-shape: scoop;
      }

      @include can-hover {
        &:hover {
          corner-shape: scoop;
        }
      }
    }
  }

  .corner-shape-button-clipped {
    border-radius: 0;
    clip-path: polygon(
      -8px 16px,
      16px 16px,
      16px -8px,
      calc(100% - 16px) -8px,
      calc(100% - 16px) 16px,
      calc(100% + 8px) 16px,
      calc(100% + 8px) calc(100% - 16px),
      calc(100% - 16px) calc(100% - 16px),
      calc(100% - 16px) calc(100% + 8px),
      16px calc(100% + 8px),
      16px calc(100% - 16px),
      -8px calc(100% - 16px)
    );
  }

  .corner-shape-tag {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
