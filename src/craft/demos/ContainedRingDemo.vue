<template>
  <figure class="contained-ring">
    <figcaption class="contained-ring-caption">
      Tab into each button. Both boxes set <code>contain: paint</code> and both
      buttons get the site's own focus ring. The first box has no padding, so
      the ring is cut at the box's padding edge and only its top line is left.
      The second box pads by ring width plus offset, and the ring is whole.
    </figcaption>

    <div class="contained-ring-cases">
      <div class="contained-ring-case">
        <p class="contained-ring-label">No padding</p>
        <div class="contained-ring-box">
          <p class="contained-ring-tag">padding: 0</p>
          <button class="contained-ring-button" type="button">Save draft</button>
        </div>
      </div>

      <div class="contained-ring-case">
        <p class="contained-ring-label">Padded for the ring</p>
        <div class="contained-ring-box contained-ring-box-padded">
          <p class="contained-ring-tag">padding: ring width + offset</p>
          <button class="contained-ring-button" type="button">Publish</button>
        </div>
      </div>
    </div>
  </figure>
</template>

<style scoped lang="scss">
@layer components {
  .contained-ring {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-3);
    margin: 0;
  }

  .contained-ring-caption {
    max-inline-size: 60ch;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .contained-ring-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
    gap: var(--space-4);
    align-items: start;
  }

  .contained-ring-case {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-2);
    min-inline-size: 0;
  }

  .contained-ring-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
  }

  .contained-ring-box {
    contain: paint;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    min-inline-size: 0;
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
  }

  .contained-ring-box-padded {
    padding: calc(var(--focus-ring-width) + var(--focus-ring-offset));
  }

  .contained-ring-tag {
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
    overflow-wrap: anywhere;
  }

  .contained-ring-button {
    min-block-size: 44px;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    background-color: var(--color-bg-subtle);
    color: var(--color-text);
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
