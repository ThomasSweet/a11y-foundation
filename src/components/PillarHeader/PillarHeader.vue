<template>
  <header class="pillar-header">
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

  .pillar-header-top {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .pillar-header-eyebrow + .pillar-header-top {
    margin-block-start: calc(var(--space-4) * -1 + var(--space-2));
  }

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

  /* Bleeds off the right edge of the .pillar (App.vue gives it position +
     isolation); overflow-x: clip on the shell hides the overspill. z-index -1,
     behind the chapter's content. */
  .pillar-header-watermark {
    position: absolute;
    z-index: -1;
    inset-block-start: -2rem;
    inset-inline-end: 0;
    /* Mobile: smaller and pushed further off — the narrow layout has no gutter,
       so a big mark would sit under the text. */
    inline-size: 16rem;
    block-size: 16rem;
    color: var(--color-primary);
    opacity: 0.09;
    transform: translateX(52%) rotate(-12deg);
    pointer-events: none;

    @include from('md') {
      inline-size: 36rem;
      block-size: 36rem;
      transform: translateX(46%) rotate(-12deg);
    }

    /* Animates `translate` only, so the parallax stays composited — no paint
       cost on scroll. Static where motion or view-timelines aren't available. */
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        animation: pillar-watermark-parallax linear both;
        animation-timeline: view();
        animation-range: cover;
      }
    }

    @include forced-colors {
      display: none;
    }
  }

  .pillar-header-watermark :deep(svg) {
    inline-size: 100%;
    block-size: 100%;
    stroke-width: 1;
  }

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
