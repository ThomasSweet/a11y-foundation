<template>
  <div class="zoom-compare">
    <p class="zoom-compare-caption">
      <code>zoom</code> magnifies an element <em>and</em> reflows the layout
      around it — the way your browser's own zoom works. <code>transform:
      scale()</code> only repaints it larger, so it spills over its neighbours.
      Pick a magnification and watch the block <em>below</em> each card.
    </p>

    <!-- Pure-CSS: the checked radio drives a custom property via :has(). -->
    <fieldset class="zoom-compare-controls">
      <legend class="zoom-compare-legend">Magnify the card</legend>
      <label class="zoom-compare-opt">
        <input type="radio" name="zoom-factor" value="1" checked /> 1×
      </label>
      <label class="zoom-compare-opt">
        <input type="radio" name="zoom-factor" value="1.5" /> 1.5×
      </label>
      <label class="zoom-compare-opt">
        <input type="radio" name="zoom-factor" value="2" /> 2×
      </label>
    </fieldset>

    <div class="zoom-compare-panels">
      <section class="zoom-compare-panel" aria-labelledby="zoom-via-zoom">
        <h5 id="zoom-via-zoom" class="zoom-compare-title">
          <code>zoom</code> — reflows
        </h5>
        <div class="zoom-compare-stage">
          <p class="zoom-compare-context">Heading above</p>
          <article class="zoom-compare-card zoom-compare-card-zoom">Magnified card</article>
          <p class="zoom-compare-context">Content below — the layout makes room</p>
        </div>
      </section>

      <section class="zoom-compare-panel" aria-labelledby="zoom-via-scale">
        <h5 id="zoom-via-scale" class="zoom-compare-title">
          <code>transform: scale()</code> — overlaps
        </h5>
        <div class="zoom-compare-stage">
          <p class="zoom-compare-context">Heading above</p>
          <article class="zoom-compare-card zoom-compare-card-scale">Magnified card</article>
          <p class="zoom-compare-context">Content below — gets covered up</p>
        </div>
      </section>
    </div>

    <p class="zoom-compare-note">
      <strong>Why it matters:</strong> magnification that <em>reflows</em> is the
      accessible kind — it's what WCAG 1.4.10 (Reflow) and browser zoom depend
      on. <code>zoom</code> brings that to a single component (a “make this
      bigger” control), where <code>transform</code> would break the layout
      around it.
    </p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .zoom-compare {
    /* The checked radio sets the factor for both cards. */
    --factor: 1;
    display: grid;
    gap: var(--space-4);

    &:has(input[value='1.5']:checked) {
      --factor: 1.5;
    }

    &:has(input[value='2']:checked) {
      --factor: 2;
    }
  }

  .zoom-compare-caption,
  .zoom-compare-note {
    max-inline-size: 65ch;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .zoom-compare-note {
    padding: var(--space-3) var(--space-4);
    border-inline-start: 3px solid var(--color-primary);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-subtle);

    strong {
      color: var(--color-text);
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .zoom-compare-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    border: 0;
  }

  .zoom-compare-legend {
    padding: 0;
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .zoom-compare-opt {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-sm);
  }

  .zoom-compare-panels {
    display: grid;
    gap: var(--space-4);

    @include from('sm') {
      grid-template-columns: 1fr 1fr;
    }
  }

  .zoom-compare-panel {
    display: grid;
    gap: var(--space-2);
    align-content: start;
  }

  .zoom-compare-title {
    font-size: var(--text-sm);
    font-weight: 700;
  }

  .zoom-compare-stage {
    display: grid;
    justify-items: start;
    gap: var(--space-2);
    block-size: 13rem;
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    /* Keep each demo's spillover inside its own box. */
    overflow: clip;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .zoom-compare-context {
    margin: 0;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-subtle);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .zoom-compare-card {
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    background-color: var(--color-primary);
    color: var(--color-primary-text);
    font-weight: 700;
    white-space: nowrap;
  }

  /* The enhancement: real layout magnification. Where unsupported, the card just
     stays 1× (the comparison still reads via the scale panel). */
  .zoom-compare-card-zoom {
    @supports (zoom: 2) {
      /* stylelint-disable-next-line property-no-unknown -- interoperable, linter lags */
      zoom: var(--factor);
    }
  }

  /* The contrast: a paint-only transform. Grows from the top-left so it visibly
     covers the block beneath it. */
  .zoom-compare-card-scale {
    transform: scale(var(--factor));
    transform-origin: top left;
  }
}
</style>
