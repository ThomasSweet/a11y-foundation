<template>
  <div class="shape-demo">
    <article class="shape-card">
      <!-- Decorative: the band carries no text, so losing it in forced-colors loses nothing. -->
      <div class="shape-banner" aria-hidden="true">
        <span class="shape-banner-glyph">◗</span>
      </div>
      <div class="shape-body">
        <p class="shape-title">Curved by shape()</p>
        <p class="shape-text">
          The band's curved bottom edge is one <code>clip-path: shape()</code>
          — keyword commands (<code>line</code>, <code>curve</code>) in
          %/units, so it scales fluidly, unlike <code>path()</code>'s frozen
          SVG coordinates. Text lives in the rectangular body, clear of the
          clipped area.
        </p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
// No logic — the whole demo is CSS.
</script>

<style scoped lang="scss">
@layer components {
  .shape-demo {
    display: grid;
    justify-items: start;
  }

  .shape-card {
    max-inline-size: 26rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .shape-banner {
    display: grid;
    place-items: center;
    min-block-size: 7rem;
    background: var(--gradient-accent);
    color: #fff;

    /* Curved bottom edge; falls back to a plain band without shape(). The
       @supports test needs a command — `shape(from 0 0)` alone is invalid. */
    @supports (clip-path: shape(from 0 0, line to 100% 0)) {
      clip-path: shape(
        from 0 0,
        line to 100% 0,
        line to 100% 72%,
        curve to 0% 72% with 50% 100%,
        close
      );
    }

    @include forced-colors {
      background: Highlight;
      color: HighlightText;
    }
  }

  .shape-banner-glyph {
    font-size: var(--text-4xl);
    /* Sit in the flat upper area, away from the curved edge. */
    margin-block-end: var(--space-6);
  }

  .shape-body {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-4);
  }

  .shape-title {
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .shape-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
