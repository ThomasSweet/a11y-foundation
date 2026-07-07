<template>
  <div class="shape-demo">
    <label class="shape-control">
      Card width
      <input v-model="width" type="range" min="45" max="100" step="1" />
      <span aria-hidden="true">{{ width }}%</span>
    </label>

    <div class="shape-stage" :style="{ inlineSize: `${width}%` }">
      <article class="shape-card">
        <div class="shape-banner shape-banner-fluid" aria-hidden="true">
          <span class="shape-banner-tag">shape()</span>
        </div>
        <div class="shape-body">
          <p class="shape-title">Percentages — scales</p>
          <p class="shape-text">
            <code>shape()</code> draws its curve in %/units, so the edge
            stays glued to the corners at any width.
          </p>
        </div>
      </article>

      <article class="shape-card">
        <div class="shape-banner shape-banner-frozen" aria-hidden="true">
          <span class="shape-banner-tag">path()</span>
        </div>
        <div class="shape-body">
          <p class="shape-title">Frozen SVG coords — breaks</p>
          <p class="shape-text">
            <code>path()</code>'s coordinates are absolute pixels tuned for
            one size. Narrow the card and the curve detaches from the edge.
          </p>
        </div>
      </article>
    </div>

    <p class="shape-note">
      Same curve, two functions. Drag the slider: the <code>path()</code>
      card's clip only lines up at its original width, while
      <code>shape()</code> reflows with the layout — the reason
      responsive clipping used to need JS or an SVG viewBox.
    </p>

    <div class="shape-morph">
      <label class="shape-morph-toggle">
        <input class="shape-morph-input" type="checkbox" />
        Deepen the wave
      </label>

      <article class="shape-card shape-card-morph">
        <div class="shape-banner shape-banner-morph" aria-hidden="true">
          <span class="shape-banner-tag">shape() + @property</span>
        </div>
        <div class="shape-body">
          <p class="shape-title">One curve, animated</p>
          <p class="shape-text">
            The edge is a <code>shape()</code> whose depth is a registered
            <code>@property</code>. Because it's a real custom property, it
            <em>interpolates</em> — so the whole silhouette morphs on a
            transition. <code>path()</code> can do neither: it can't read a
            variable, and only tweens between identical command lists.
          </p>
        </div>
      </article>

      <p class="shape-note">
        Two things unique to <code>shape()</code>: it reads custom properties,
        and it animates. Toggle the wave — under reduced-motion it simply
        snaps, no morph.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const width = ref(100)
</script>

<style scoped lang="scss">
/* Registered so the depth can interpolate — an unregistered custom property
   is a plain string and would jump, not morph. */
@property --shape-wave {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 78%;
}

@layer components {
  .shape-demo {
    display: grid;
    gap: var(--space-4);
  }

  .shape-control {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-sm);

    input {
      flex: 1;
      min-inline-size: 8rem;
    }
  }

  .shape-stage {
    display: grid;
    gap: var(--space-3);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr));
  }

  .shape-card {
    min-inline-size: 0;
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
    align-content: start;
    justify-items: start;
    min-block-size: 6rem;
    padding: var(--space-3);
    background: var(--gradient-accent);
    color: #fff;

    @include forced-colors {
      background: Highlight;
      color: HighlightText;
    }
  }

  .shape-banner-tag {
    padding: 2px var(--space-2);
    border-radius: var(--radius-full);
    background-color: rgb(0 0 0 / 25%);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
  }

  /* The fluid version: percentage commands, so the curve tracks any width. */
  @supports (clip-path: shape(from 0 0, line to 100% 0)) {
    .shape-banner-fluid {
      clip-path: shape(
        from 0 0,
        line to 100% 0,
        line to 100% 60%,
        curve to 0% 60% with 50% 100%,
        close
      );
    }
  }

  /* The frozen version: absolute px coordinates sized for a ~360px-wide banner.
     They don't scale, so the curve only meets the edges at that one width. */
  .shape-banner-frozen {
    clip-path: path('M0 0 L360 0 L360 58 C240 96 120 96 0 58 Z');
  }

  .shape-body {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-3);
  }

  .shape-title {
    font-size: var(--text-base);
    font-weight: 600;
  }

  .shape-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .shape-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .shape-morph {
    display: grid;
    gap: var(--space-3);
    padding-block-start: var(--space-2);
  }

  .shape-morph-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: start;
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .shape-card-morph {
    max-inline-size: 24rem;
  }

  /* The morphing edge: two curve control points ride --shape-wave. Checking the
     box raises the depth; @property lets it interpolate to a smooth morph. */
  @supports (clip-path: shape(from 0 0, line to 100% 0)) {
    .shape-banner-morph {
      min-block-size: 8rem;
      clip-path: shape(
        from 0 0,
        line to 100% 0,
        line to 100% 55%,
        curve to 50% 55% with 75% var(--shape-wave),
        curve to 0% 55% with 25% calc(110% - var(--shape-wave)),
        close
      );
    }

    .shape-morph:has(.shape-morph-input:checked) {
      --shape-wave: 100%;
    }

    @media (prefers-reduced-motion: no-preference) {
      .shape-banner-morph {
        transition: --shape-wave var(--duration-slow) var(--easing-standard);
      }
    }
  }
}
</style>
