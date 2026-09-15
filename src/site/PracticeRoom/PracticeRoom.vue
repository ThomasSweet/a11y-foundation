<template>
  <SiteFrame :sheet="sheet" :sheet-title="sheetTitle">
    <h1 class="practice-room-title">{{ title }}</h1>
    <p class="practice-room-lede">
      <slot name="lede" />
    </p>
    <p class="practice-room-contract">
      <slot name="contract" />
    </p>

    <section id="broken-page" class="practice-room-broken-page" :aria-label="previewLabel">
      <p class="practice-room-broken-page-tag">{{ brokenTag }}</p>
      <a class="practice-room-preview" :href="brokenHref" target="_blank" rel="noopener">
        <iframe
          class="practice-room-preview-frame"
          :src="brokenHref"
          :title="previewTitle"
          aria-hidden="true"
          tabindex="-1"
          inert
          loading="lazy"
        ></iframe>
        <span class="practice-room-preview-open">Open the broken page at 1:1<span class="visually-hidden"> (opens in a new tab)</span> →</span>
      </a>
      <p class="practice-room-broken-page-note">
        <slot name="note" />
      </p>
    </section>

    <p class="practice-room-end">
      {{ endText }}
    </p>

    <slot />

    <template #prevnext>
      <nav class="practice-room-prevnext" aria-label="Adjacent pages">
        <a class="practice-room-nav" :href="prev.href">
          <span class="practice-room-nav-k">{{ prev.kicker }}</span>
          <span class="practice-room-nav-t">{{ prev.title }}</span>
        </a>
        <a class="practice-room-nav practice-room-nav-next" :href="next.href">
          <span class="practice-room-nav-k">{{ next.kicker }}</span>
          <span class="practice-room-nav-t">{{ next.title }}</span>
        </a>
      </nav>
    </template>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'

interface PagerLink {
  href: string
  kicker: string
  title: string
}

withDefaults(
  defineProps<{
    sheet: string
    sheetTitle: string
    title: string
    brokenHref: string
    brokenTag: string
    previewTitle: string
    previewLabel?: string
    endText?: string
    prev: PagerLink
    next: PagerLink
  }>(),
  {
    previewLabel: 'The broken page, previewed at half scale',
    endText: 'End of the broken page. Everything from here on is compliant again.',
  },
)
</script>

<style scoped lang="scss">
@layer components {
  .practice-room-title {
    margin: 0;
    max-inline-size: 24ch;
    font-size: var(--text-display-sm);
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-wrap: balance;
    color: var(--bp-ink);
  }

  .practice-room-lede {
    max-inline-size: 58ch;
    margin-block: var(--space-4) 0;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);

    :slotted(strong) {
      color: var(--bp-ink);
    }
  }

  .practice-room-contract {
    max-inline-size: 62ch;
    margin-block: var(--space-4) 0;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .practice-room-broken-page {
    max-inline-size: 68ch;
    margin-block-start: var(--space-8);
    padding: var(--space-4);
    border: 2px dashed var(--bp-redline);
    border-radius: var(--radius-md);
    scroll-margin-block-start: var(--space-8);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .practice-room-broken-page-tag {
    margin: 0 0 var(--space-3);
    font-family: var(--bp-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--bp-redline);
  }

  .practice-room-preview {
    position: relative;
    display: block;
    block-size: 24rem;
    overflow: hidden;
    border-radius: var(--radius-sm);
    background-color: #fff;

    &::after {
      content: '';
      position: absolute;
      inset-inline: 0;
      inset-block-end: 0;
      block-size: 7rem;
      background: linear-gradient(transparent, #fff 80%);
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .practice-room-preview-frame {
    inline-size: 200%;
    block-size: 48rem;
    border: 0;
    transform: scale(0.5);
    transform-origin: top left;
    pointer-events: none;
  }

  .practice-room-preview-open {
    position: absolute;
    inset-block-end: var(--space-4);
    inset-inline-start: 50%;
    translate: -50% 0;
    z-index: 1;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--bp-line-strong);
    border-radius: var(--radius-md);
    background-color: var(--bp-sheet);
    font-family: var(--bp-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--bp-accent);
    white-space: nowrap;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .practice-room-preview:hover .practice-room-preview-open {
    border-color: var(--bp-accent);
  }

  .practice-room-broken-page-note {
    margin: var(--space-3) 0 0;
    font-size: var(--text-sm);
    color: var(--bp-ink-2);
  }

  .practice-room-end {
    max-inline-size: 62ch;
    margin-block: var(--space-4) 0;
    font-family: var(--bp-mono);
    font-size: var(--text-sm);
    color: var(--bp-ink-2);
  }

  .practice-room-prevnext {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
    margin-block-start: clamp(var(--space-8), 5vw, var(--space-16));
  }

  @media (width <= 40rem) {
    .practice-room-prevnext {
      grid-template-columns: 1fr;
    }
  }

  .practice-room-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-6);
    border: 1px solid var(--bp-line-strong);
    color: var(--bp-ink-2);
    text-decoration: none;
    transition:
      border-color var(--duration-fast) var(--easing-standard),
      background-color var(--duration-fast) var(--easing-standard);

    @include can-hover {
      &:hover {
        border-color: var(--bp-accent);
        background: var(--bp-accent-soft);
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

  .practice-room-nav-next {
    grid-column: -2 / -1;
    text-align: end;
  }

  .practice-room-nav-k {
    font-family: var(--bp-mono);
    font-size: 0.625rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--bp-ink-2);
  }

  .practice-room-nav-t {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--bp-ink);
    transition: color var(--duration-fast) var(--easing-standard);
  }

  .practice-room-nav:hover .practice-room-nav-t,
  .practice-room-nav:focus-visible .practice-room-nav-t {
    color: var(--bp-accent);
  }
}
</style>
