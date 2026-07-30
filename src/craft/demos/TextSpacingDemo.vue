<template>
  <div class="text-spacing-demo">
    <label class="text-spacing-toggle">
      <input class="text-spacing-input" type="checkbox" />
      Apply the 1.4.12 spacing overrides
    </label>

    <div class="text-spacing-pair">
      <article class="text-spacing-card">
        <p class="text-spacing-tag">lets the text grow</p>
        <div class="text-spacing-content">
          <p class="text-spacing-heading">Shipping update</p>
          <p>
            Orders placed before noon leave the same day, and every parcel
            gets a tracking link the moment the label prints.
          </p>
          <p>
            During launch weeks the cut-off moves an hour earlier, and the
            status page carries the current one.
          </p>
          <p>
            Returns ride the same tracking link, and a refund starts the
            moment the carrier scans the parcel back in.
          </p>
        </div>
      </article>

      <article class="text-spacing-card text-spacing-card-frozen">
        <p class="text-spacing-tag">a fixed block-size, clipped</p>
        <div class="text-spacing-content">
          <p class="text-spacing-heading">Shipping update</p>
          <p>
            Orders placed before noon leave the same day, and every parcel
            gets a tracking link the moment the label prints.
          </p>
          <p>
            During launch weeks the cut-off moves an hour earlier, and the
            status page carries the current one.
          </p>
          <p>
            Returns ride the same tracking link, and a refund starts the
            moment the carrier scans the parcel back in.
          </p>
        </div>
      </article>
    </div>

    <p class="text-spacing-note">
      The toggle applies what a reader's browser extension or user stylesheet
      applies for real: line height 1.5, letter spacing 0.12em, word spacing
      0.16em, paragraph spacing 2em. The flexible card grows; the
      pixel-perfect one starts eating sentences.
    </p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .text-spacing-demo {
    display: grid;
    gap: var(--space-4);
  }

  .text-spacing-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: start;
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .text-spacing-pair {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    align-items: start;
  }

  .text-spacing-card {
    min-inline-size: 0;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .text-spacing-card-frozen {
    block-size: 15rem;
    overflow: clip;
  }

  .text-spacing-tag {
    margin-block-end: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .text-spacing-content {
    font-size: var(--text-sm);

    p {
      margin: 0;
    }

    p + p {
      margin-block-start: var(--space-2);
    }
  }

  .text-spacing-heading {
    font-weight: 600;
  }

  .text-spacing-demo:has(.text-spacing-input:checked) .text-spacing-content {
    line-height: 1.5;
    letter-spacing: 0.12em;
    word-spacing: 0.16em;

    p + p {
      margin-block-start: 2em;
    }
  }

  .text-spacing-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
