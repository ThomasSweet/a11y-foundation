<template>
  <div class="css-carousel-demo">
    <div
      class="css-carousel"
      tabindex="0"
      role="region"
      aria-label="Example carousel: five ways this site says accessible"
    >
      <ul class="css-carousel-track" role="list">
        <li
          v-for="(slide, i) in slides"
          :key="slide.title"
          class="css-carousel-slide"
          :style="{ '--slide-hue': slide.hue }"
          :data-marker-label="`Go to slide ${i + 1} of ${slides.length}`"
        >
          <p class="css-carousel-kicker">{{ i + 1 }} / {{ slides.length }}</p>
          <p class="css-carousel-title">{{ slide.title }}</p>
        </li>
      </ul>
    </div>

    <p class="css-carousel-note">
      In Chromium the arrows and dots above are real, focusable, named
      controls — generated entirely by CSS. Everywhere else this is "just" a
      scroll-snap region, which is the point: it stays swipeable, wheelable,
      and keyboard-scrollable with zero support. The honest caveat: how
      screen readers announce the generated controls and the current slide
      still varies, so treat this as an enhancement on a working scroller —
      not yet a replacement for a tested carousel pattern.
    </p>
  </div>
</template>

<script setup lang="ts">
const slides = [
  { title: 'Built in, not bolted on', hue: '260' },
  { title: 'Use what the platform ships', hue: '220' },
  { title: 'Guards are part of the craft', hue: '190' },
  { title: 'Break it to understand it', hue: '25' },
  { title: 'Prove it, layer by layer', hue: '150' },
]
</script>

<style scoped lang="scss">
@layer components {
  .css-carousel-demo {
    display: grid;
    gap: var(--space-3);
  }

  .css-carousel {
    /* Baseline experience everywhere: a keyboard-focusable snap scroller. */
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-block-end: var(--space-2);
    border-radius: var(--radius-md);
    anchor-name: --css-carousel;
    /* stylelint-disable-next-line property-no-unknown */
    scroll-marker-group: after;

    @media (prefers-reduced-motion: no-preference) {
      scroll-behavior: smooth;
    }
  }

  .css-carousel-track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: min(100%, 22rem);
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .css-carousel-slide {
    display: grid;
    gap: var(--space-1);
    align-content: end;
    min-block-size: 10rem;
    padding: var(--space-4);
    border-radius: var(--radius-md);
    background:
      linear-gradient(
        160deg,
        oklch(90% 0.06 var(--slide-hue)),
        oklch(72% 0.12 var(--slide-hue))
      );
    color: oklch(22% 0.06 var(--slide-hue));
    scroll-snap-align: center;

    @include dark-mode {
      background:
        linear-gradient(
          160deg,
          oklch(38% 0.08 var(--slide-hue)),
          oklch(24% 0.06 var(--slide-hue))
        );
      color: oklch(92% 0.04 var(--slide-hue));
    }
  }

  .css-carousel-kicker {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    opacity: 0.75;
  }

  .css-carousel-title {
    font-size: var(--text-lg);
    font-weight: 700;
    text-wrap: balance;
  }

  /* The generated controls — Chromium-only for now; elsewhere these rules
     are ignored and the scroller above is the whole (working) story. */
  /* stylelint-disable selector-pseudo-element-no-unknown, selector-pseudo-class-no-unknown, property-no-unknown */
  .css-carousel::scroll-button(inline-start),
  .css-carousel::scroll-button(inline-end) {
    position: fixed;
    position-anchor: --css-carousel;
    align-self: anchor-center;
    inline-size: var(--space-8);
    block-size: var(--space-8);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-surface-glass);
    color: var(--color-text);
    font-size: var(--text-base);
    cursor: pointer;

    &:disabled {
      opacity: 0.35;
      cursor: default;
    }

    &:hover:not(:disabled) {
      border-color: var(--color-text-subtle);
    }
  }

  .css-carousel::scroll-button(inline-start) {
    content: '‹' / 'Previous slides';
    position-area: inline-start center;
    margin-inline-end: calc(-1 * var(--space-4));
  }

  .css-carousel::scroll-button(inline-end) {
    content: '›' / 'Next slides';
    position-area: inline-end center;
    margin-inline-start: calc(-1 * var(--space-4));
  }

  .css-carousel::scroll-marker-group {
    display: flex;
    justify-content: center;
    gap: var(--space-2);
    margin-block-start: var(--space-2);
  }

  .css-carousel-slide::scroll-marker {
    content: ' ' / attr(data-marker-label);
    inline-size: var(--space-3);
    block-size: var(--space-3);
    border: 1px solid var(--color-text-subtle);
    border-radius: var(--radius-full);
    cursor: pointer;
  }

  .css-carousel-slide::scroll-marker:target-current {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
  /* stylelint-enable selector-pseudo-element-no-unknown, selector-pseudo-class-no-unknown, property-no-unknown */

  .css-carousel-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
