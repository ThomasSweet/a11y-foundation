<template>
  <div class="quantity-demo">
    <p class="quantity-caption">
      The photo bundle every chat app ships — and everyone assumes needs JS.
      One photo renders big; two split the bubble; three compose a lead with a
      stacked pair; four make a quad; five or more fall into a mosaic. The
      grid asks itself <em>exactly how many children do I hold?</em> with
      quantity queries like <code>:has(&gt; :nth-child(3):last-child)</code>
      and re-maps its <code>grid-template-areas</code>. The buttons stand in
      for attaching photos — every composition decision is CSS.
    </p>

    <div class="quantity-controls">
      <button
        type="button"
        class="quantity-button"
        :disabled="count >= 14"
        @click="count++"
      >
        Attach a photo
      </button>
      <button
        type="button"
        class="quantity-button"
        :disabled="count <= 1"
        @click="count--"
      >
        Remove one
      </button>
      <span class="quantity-count" role="status">
        {{ count }} {{ count === 1 ? 'photo' : 'photos' }}
      </span>
    </div>

    <ul class="quantity-gallery" role="list">
      <li
        v-for="n in count"
        :key="n"
        class="quantity-photo"
        :style="{ '--photo-hue': 210 + n * 42 }"
      >
        <span class="visually-hidden">Photo {{ n }} of {{ count }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(1)
</script>

<style scoped lang="scss">
@layer components {
  .quantity-demo {
    display: grid;
    gap: var(--space-4);
  }

  .quantity-caption {
    max-inline-size: 60ch;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .quantity-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }

  .quantity-button {
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);
    color: var(--color-text);
    font-weight: 600;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @include can-hover {
      &:not(:disabled):hover {
        background-color: var(--color-surface);
        border-color: var(--color-text-subtle);
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

  .quantity-count {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
    font-variant-numeric: tabular-nums;
  }

  /* The message bubble: compositions below re-map this grid per EXACT count.
     :nth-child(n):last-child inside :has() reads "the nth child is also the
     last" — i.e. exactly n children. */
  .quantity-gallery {
    display: grid;
    gap: var(--space-1);
    grid-auto-rows: 7rem;
    max-inline-size: 24rem;
    margin: 0;
    padding: 0;
    border-radius: var(--radius-lg);
    overflow: clip;
    list-style: none;
  }

  /* Exactly 1 — one big photo. */
  .quantity-gallery:has(> :first-child:last-child) {
    grid-auto-rows: 15rem;
  }

  /* Exactly 2 — split the bubble. */
  .quantity-gallery:has(> :nth-child(2):last-child) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 11rem;
  }

  /* Exactly 3 — a lead photo with a stacked pair. */
  .quantity-gallery:has(> :nth-child(3):last-child) {
    grid-template-columns: 3fr 2fr;
    grid-template-areas:
      'lead top'
      'lead bottom';

    > :nth-child(1) { grid-area: lead; }
    > :nth-child(2) { grid-area: top; }
    > :nth-child(3) { grid-area: bottom; }
  }

  /* Exactly 4 — the quad. */
  .quantity-gallery:has(> :nth-child(4):last-child) {
    grid-template-columns: 1fr 1fr;
  }

  /* 5 or more — mosaic: the first photo leads, the rest flow densely. */
  .quantity-gallery:has(> :nth-child(5)) {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 5.5rem;
    grid-auto-flow: dense;

    > :first-child {
      grid-column: span 2;
      grid-row: span 2;
    }

    /* Keep the bubble gapless. The lead uses 4 cells, so n photos fill n+3;
       any remainder shows up as short rows at the tail. Give each short row
       one wide photo: count ≡ 2 (mod 3) → one, count ≡ 1 (mod 3) → two. */
    &:has(> :nth-child(3n + 2):last-child) > :nth-last-child(2),
    &:has(> :nth-child(3n + 1):last-child) > :nth-last-child(2),
    &:has(> :nth-child(3n + 1):last-child) > :nth-last-child(3) {
      grid-column: span 2;
    }
  }

  /* Stand-in photos — a gradient per item, hue set inline per index. */
  .quantity-photo {
    background: linear-gradient(
      135deg,
      oklch(75% 0.12 var(--photo-hue)),
      oklch(50% 0.16 calc(var(--photo-hue) + 50))
    );

    @include forced-colors {
      border: 1px solid CanvasText;
      background: Canvas;
    }
  }
}
</style>
