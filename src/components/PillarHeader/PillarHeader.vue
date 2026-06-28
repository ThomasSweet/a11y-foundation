<template>
  <!-- Opens a pillar like a chapter: a per-pillar mark, the numbered eyebrow,
       the pillar title (the real <h2> for this region), and an optional lead.
       The icon is decorative; the heading carries the accessible name. -->
  <header class="pillar-header">
    <!-- Oversized echo of this pillar's mark, bleeding off the right edge as a
         faint watermark. Purely decorative; static (no animation), so it costs
         nothing at runtime. -->
    <span
      class="pillar-header-watermark"
      aria-hidden="true"
      v-html="icons[icon]"
    ></span>
    <p class="pillar-header-eyebrow">{{ eyebrow }}</p>
    <div class="pillar-header-top">
      <span class="pillar-header-icon" aria-hidden="true" v-html="icons[icon]"></span>
      <h2 :id="titleId" class="pillar-header-title">{{ title }}</h2>
    </div>
    <p v-if="$slots.default" class="pillar-header-lead"><slot /></p>
  </header>
</template>

<script setup lang="ts">
import { pillarIcons as icons, type PillarIconName } from '../../icons/pillarIcons'

defineProps<{
  icon: PillarIconName
  eyebrow: string
  title: string
  titleId: string
}>()
</script>

<style scoped lang="scss">
@layer components {
  .pillar-header {
    display: grid;
    gap: var(--space-4);
    justify-items: start;
    max-inline-size: 60ch;
  }

  /* Icon and title ride on one line, centred on each other, so the mark
     anchors the heading instead of floating above it. The eyebrow sits on its
     own line above. */
  .pillar-header-top {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  /* Pull the eyebrow close to the icon/title row it labels. */
  .pillar-header-eyebrow + .pillar-header-top {
    margin-block-start: calc(var(--space-4) * -1 + var(--space-2));
  }

  /* App-icon style tile, echoing the favicon: the mark sits in a soft rounded
     square so each pillar opens with a clear visual anchor. */
  .pillar-header-icon {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    inline-size: 3.5rem;
    block-size: 3.5rem;
    color: var(--color-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .pillar-header-icon :deep(svg) {
    inline-size: 2rem;
    block-size: 2rem;
  }

  /* The giant watermark: positioned against the .pillar (App.vue gives it
     position: relative + isolation), bleeding off the right edge where
     overflow-x: clip on the app shell hides the overspill — no scrollbar. Sits
     at z-index -1, behind the chapter's content. Faint, so it never competes
     with text; opaque demo cards paint over it entirely. */
  .pillar-header-watermark {
    position: absolute;
    z-index: -1;
    inset-block-start: -2rem;
    inset-inline-end: 0;
    /* Mobile-first: smaller and pushed further off the edge. The narrow layout
       has no side gutter, so a big mark would sit right under the text — this
       keeps it a corner sliver and protects the contrast ratio. */
    inline-size: 16rem;
    block-size: 16rem;
    color: var(--color-primary);
    opacity: 0.09;
    transform: translateX(52%) rotate(-12deg);
    pointer-events: none;

    /* Desktop: much larger, and bled further past the edge (the app shell's
       overflow-x: clip hides the overspill, so there's still no scrollbar). */
    @include from('md') {
      inline-size: 36rem;
      block-size: 36rem;
      transform: translateX(46%) rotate(-12deg);
    }

    /* Parallax: the mark drifts slower than the content for a sense of depth.
       It animates the `translate` property only (composited, off the main
       thread via the element's own view-timeline), so it adds no paint cost
       while scrolling — unlike colour/gradient animation. Support + motion
       gated; without either, the mark is simply static. */
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        animation: pillar-watermark-parallax linear both;
        animation-timeline: view();
        animation-range: cover;
      }
    }

    /* Decorative flourish — drop it where the OS flattens the palette. */
    @include forced-colors {
      display: none;
    }
  }

  .pillar-header-watermark :deep(svg) {
    inline-size: 100%;
    block-size: 100%;
    /* Thinner stroke reads better blown up to poster scale. */
    stroke-width: 1;
  }

  /* Lag the mark behind the scroll — the `translate` runs opposite the travel,
     so the watermark appears to move slower than the foreground. */
  @keyframes pillar-watermark-parallax {
    from {
      translate: 0 -30%;
    }

    to {
      translate: 0 30%;
    }
  }

  .pillar-header-eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    letter-spacing: 0.02em;
    color: var(--color-primary);
  }

  .pillar-header-title {
    /* A mini-poster scale — smaller than the hero, larger than a section. */
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
  }

  .pillar-header-lead {
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--color-text-subtle);
  }
}
</style>
