<template>
  <div class="glass-contrast">
    <fieldset class="glass-contrast-tints">
      <legend class="glass-contrast-legend">Tint behind the bar text</legend>
      <label class="glass-contrast-option">
        <input
          class="glass-contrast-decorative"
          type="radio"
          name="glass-contrast-tint"
          value="decorative"
        />
        Decorative tint, 40%
      </label>
      <label class="glass-contrast-option">
        <input type="radio" name="glass-contrast-tint" value="token" checked />
        Token tint, 90%
      </label>
    </fieldset>

    <label class="glass-contrast-option">
      <input class="glass-contrast-reduce" type="checkbox" />
      Simulate: I prefer reduced transparency
    </label>

    <p class="glass-contrast-note glass-contrast-note-reduced">
      Your system already asks for reduced transparency, so the bar is opaque
      and these controls change nothing.
    </p>
    <p class="glass-contrast-note glass-contrast-note-forced">
      Forced colours are active. Your system paints the bar in its own opaque
      colours, so these controls change nothing.
    </p>

    <div
      class="glass-contrast-stage"
      tabindex="0"
      role="region"
      aria-label="Page scrolling under a glass bar"
    >
      <div class="glass-contrast-bar">
        <p class="glass-contrast-bar-title">Reading list</p>
        <p class="glass-contrast-bar-meta">3 of 12 articles, updated today</p>
      </div>
      <div class="glass-contrast-page">
        <div class="glass-contrast-photo" aria-hidden="true"></div>
        <p class="glass-contrast-text">
          Scroll this panel. The block at the top stands in for a photo in the
          opposite scheme. The bar does not choose what passes beneath it: a
          photo, a code block or a banner each becomes its background for a
          moment.
        </p>
        <p class="glass-contrast-text">
          Blur softens the shapes behind the text. It only averages what is
          there, so a large dark area stays dark under the bar.
        </p>
      </div>
    </div>

    <ul class="glass-contrast-readout">
      <li>
        Tint at 40%, with black behind the bar in light and white in dark:
        text 3.29:1 and subtle text 1.30:1 in light, 2.27:1 and about 1:1 in
        dark. All four fail 4.5:1.
      </li>
      <li>
        Tint at 90%, same backdrops: text 15.13:1 and subtle text 5.97:1 in
        light, 12.40:1 and 5.40:1 in dark. All four pass 4.5:1.
      </li>
      <li>
        The preference switch makes the bar opaque. Only Chromium reads the
        real setting today, so the 90% has to pass without it.
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .glass-contrast {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
  }

  .glass-contrast-tints {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-6);
    margin: 0;
    padding: 0;
    border: none;
  }

  .glass-contrast-legend {
    margin-block-end: var(--space-1);
    padding: 0;
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .glass-contrast-option {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: start;
    min-block-size: 24px;
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;
  }

  .glass-contrast-note {
    display: none;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .glass-contrast-stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    block-size: 18rem;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
  }

  .glass-contrast-bar {
    --glass-contrast-tint: var(--color-surface-glass);

    position: sticky;
    inset-block-start: 0;
    z-index: 1;
    display: grid;
    grid-area: 1 / 1;
    grid-template-columns: minmax(0, 1fr);
    align-self: start;
    padding: var(--space-3) var(--space-4);
    border-block-end: 1px solid var(--color-border);
    background-color: var(--glass-contrast-tint);
    backdrop-filter: blur(8px);
  }

  .glass-contrast:has(.glass-contrast-decorative:checked) .glass-contrast-bar {
    --glass-contrast-tint: rgb(from var(--color-surface-glass) r g b / 40%);
  }

  .glass-contrast:has(.glass-contrast-reduce:checked) .glass-contrast-bar {
    background-color: var(--color-surface);
    backdrop-filter: none;
  }

  .glass-contrast-bar-title {
    font-weight: 600;
  }

  .glass-contrast-bar-meta {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .glass-contrast-page {
    display: grid;
    grid-area: 1 / 1;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
    align-content: start;
    min-block-size: 31rem;
    padding-block-end: var(--space-4);
  }

  .glass-contrast-photo {
    min-block-size: 13rem;
    background-color: light-dark(#000, #fff);
  }

  .glass-contrast-text {
    padding-inline: var(--space-4);
    font-size: var(--text-sm);
  }

  .glass-contrast-readout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-2);
    margin: 0;
    padding-inline-start: var(--space-4);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  @include reduced-transparency {
    .glass-contrast-bar,
    .glass-contrast:has(.glass-contrast-decorative:checked) .glass-contrast-bar {
      background-color: var(--color-surface);
      backdrop-filter: none;
    }

    .glass-contrast-note-reduced {
      display: block;
    }
  }

  @include forced-colors {
    .glass-contrast-bar,
    .glass-contrast:has(.glass-contrast-decorative:checked) .glass-contrast-bar {
      border-block-end-color: CanvasText;
      background-color: Canvas;
      backdrop-filter: none;
    }

    .glass-contrast-photo {
      border-block-end: 1px solid CanvasText;
    }

    .glass-contrast-note-reduced {
      display: none;
    }

    .glass-contrast-note-forced {
      display: block;
    }
  }
}
</style>
