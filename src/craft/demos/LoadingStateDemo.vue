<template>
  <div class="loading-demo">
    <label class="loading-toggle">
      <input v-model="loading" type="checkbox" />
      <span>Show the loading state</span>
    </label>

    <div class="loading-frames">
      <figure class="loading-frame">
        <figcaption class="loading-frame-label">Visual-only — the trap</figcaption>
        <div class="loading-card">
          <template v-if="loading">
            <div v-for="n in 2" :key="n" class="loading-row">
              <span class="loading-shape loading-shape-avatar"></span>
              <span class="loading-lines">
                <span class="loading-shape loading-shape-line"></span>
                <span class="loading-shape loading-shape-line is-short"></span>
              </span>
            </div>
          </template>
          <template v-else>
            <div v-for="item in feed" :key="item.name" class="loading-row">
              <span class="loading-avatar" aria-hidden="true"></span>
              <span class="loading-lines">
                <span class="loading-name">{{ item.name }}</span>
                <span class="loading-action">{{ item.action }}</span>
              </span>
            </div>
          </template>
        </div>
        <p class="loading-readout">
          {{ loading
            ? 'A screen reader finds: an empty region. Nothing says it’s busy.'
            : 'Loaded — fine now, but the wait was invisible.' }}
        </p>
      </figure>

      <figure class="loading-frame">
        <figcaption class="loading-frame-label">Announced</figcaption>
        <div class="loading-card" :aria-busy="loading || undefined">
          <template v-if="loading">
            <span class="visually-hidden">Loading recent activity…</span>
            <div class="loading-skeleton-group" aria-hidden="true">
              <div v-for="n in 2" :key="n" class="loading-row">
                <span class="loading-shape loading-shape-avatar"></span>
                <span class="loading-lines">
                  <span class="loading-shape loading-shape-line"></span>
                  <span class="loading-shape loading-shape-line is-short"></span>
                </span>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="item in feed" :key="item.name" class="loading-row">
              <span class="loading-avatar" aria-hidden="true"></span>
              <span class="loading-lines">
                <span class="loading-name">{{ item.name }}</span>
                <span class="loading-action">{{ item.action }}</span>
              </span>
            </div>
          </template>
        </div>
        <p class="loading-readout">
          {{ loading
            ? 'A screen reader finds: aria-busy="true" and “Loading recent activity…”'
            : 'aria-busy is gone — the content is simply there.' }}
        </p>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const feed = [
  { name: 'Maya', action: 'merged “defensive-css” into main' },
  { name: 'Ben', action: 'starred the repository' },
]
</script>

<style scoped lang="scss">
@layer components {
  .loading-demo {
    display: grid;
    gap: var(--space-3);
  }

  .loading-toggle {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    inline-size: fit-content;
    font-weight: 600;
    cursor: pointer;
  }

  .loading-frames {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: var(--space-4);
  }

  .loading-frame {
    display: grid;
    gap: var(--space-2);
    align-content: start;
    margin: 0;
    min-inline-size: 0;
  }

  .loading-frame-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
  }

  .loading-card {
    display: grid;
    gap: var(--space-3);
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .loading-row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-3);
    align-items: center;
  }

  .loading-lines {
    display: grid;
    gap: var(--space-1);
    min-inline-size: 0;
  }

  .loading-avatar {
    inline-size: 2rem;
    block-size: 2rem;
    border-radius: var(--radius-full);
    background: var(--gradient-accent);

    @include forced-colors {
      background: CanvasText;
    }
  }

  .loading-name {
    font-weight: 600;
    font-size: var(--text-sm);
  }

  .loading-action {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  /* Skeleton shapes: decorative shimmer, static under reduced motion. */
  .loading-shape {
    border-radius: var(--radius-sm);
    background: linear-gradient(
      100deg,
      var(--color-bg-subtle) 40%,
      var(--color-border) 50%,
      var(--color-bg-subtle) 60%
    );
    background-size: 200% 100%;
    animation: loading-shimmer 1.4s linear infinite;

    @include reduced-motion {
      animation: none;
    }

    @include forced-colors {
      border: 1px solid GrayText;
      background: Canvas;
    }
  }

  .loading-shape-avatar {
    inline-size: 2rem;
    block-size: 2rem;
    border-radius: var(--radius-full);
  }

  /* Placeholder lines occupy the same line box as the text they stand in
     for (same font-size, 1lh tall) — so nothing shifts when content lands. */
  .loading-shape-line {
    block-size: 1lh;
    font-size: var(--text-sm);
    inline-size: 70%;

    &.is-short {
      inline-size: 45%;
    }
  }

  /* The aria-hidden wrapper must not swallow the card's row gap. */
  .loading-skeleton-group {
    display: contents;
  }

  @keyframes loading-shimmer {
    to {
      background-position: -200% 0;
    }
  }

  .loading-readout {
    /* Reserve two lines so the state swap can't shift the page — the demo
       practises the stability it preaches. */
    min-block-size: 2lh;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
