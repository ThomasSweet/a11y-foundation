<template>
  <div class="popover-demo">
    <p class="popover-caption">
      A real actions menu built on the <code>popover</code> attribute. The
      trigger and panel are wired by id alone — and the platform hands you
      <strong>Esc-to-close</strong>, <strong>click-outside (light)
      dismiss</strong>, <strong>top-layer rendering</strong> (never clipped by
      <code>overflow</code>), and <code>aria-expanded</code> toggling on the
      button. A <code>&lt;div&gt;</code> dropdown reimplements all of that in JS;
      here it's two attributes. Each item closes the menu declaratively with
      <code>popovertargetaction="hide"</code>.
    </p>

    <div class="popover-bar">
      <button
        type="button"
        class="popover-trigger"
        :popovertarget="menuId"
      >
        Actions
        <span class="popover-chevron" aria-hidden="true">▾</span>
      </button>

      <div :id="menuId" popover class="popover-menu" role="menu">
        <button
          v-for="item in items"
          :key="item.label"
          type="button"
          class="popover-item"
          role="menuitem"
          :popovertarget="menuId"
          popovertargetaction="hide"
          @click="chosen = item.label"
        >
          <span class="popover-item-icon" aria-hidden="true">{{ item.icon }}</span>
          {{ item.label }}
        </button>
      </div>
    </div>

    <p class="popover-status" role="status">
      {{ chosen ? `You chose: ${chosen}` : 'No action chosen yet.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'

const menuId = useId()
const chosen = ref('')

const items = [
  { label: 'Duplicate', icon: '⧉' },
  { label: 'Rename', icon: '✎' },
  { label: 'Move to…', icon: '→' },
  { label: 'Delete', icon: '🗑' },
]
</script>

<style scoped lang="scss">
@layer components {
  .popover-demo {
    display: grid;
    gap: var(--space-3);
  }

  .popover-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .popover-trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    /* The element the menu tethers to (see .popover-menu). */
    anchor-name: --popover-menu-anchor;

    @include can-hover {
      &:hover {
        background-color: var(--color-bg-subtle);
      }
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .popover-chevron {
    font-size: var(--text-sm);
  }

  .popover-menu {
    min-inline-size: 12rem;
    padding: var(--space-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-lg);

    /* Tether the menu to its trigger. Without anchor support it falls back
       to the UA popover placement (top-layer, centered) — still usable. */
    @supports (anchor-name: --a) {
      /* Stay `position: fixed` (the UA popover default). With absolute, the
         containing block would be the full-height .app-shell (position:
         relative), so the menu never overflows the viewport edge and the
         flip fallbacks never fire. Fixed resolves against the viewport. */
      position: fixed;
      position-anchor: --popover-menu-anchor;
      /* Drop below the trigger, aligned to its inline-start edge. */
      position-area: block-end span-inline-end;
      /* Clear the UA centering (inset: 0; margin: auto) so the anchor wins. */
      inset: auto;
      margin-block-start: var(--space-1);
      /* Flip across any edge it would overflow — no JS, no scroll listeners. */
      position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
    }

    /* Open state styling for the entry transition below. */
    opacity: 0;
    transform: translateY(-0.25rem);
    transition:
      opacity var(--duration-fast) var(--easing-standard),
      transform var(--duration-fast) var(--easing-standard),
      overlay var(--duration-fast) allow-discrete,
      display var(--duration-fast) allow-discrete;

    &:popover-open {
      display: grid;
      gap: 2px;
      opacity: 1;
      transform: translateY(0);

      /* Fade/slide in from display:none the first time it opens. */
      @starting-style {
        opacity: 0;
        transform: translateY(-0.25rem);
      }
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .popover-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    inline-size: 100%;
    padding: var(--space-2) var(--space-3);
    border: 0;
    border-radius: var(--radius-sm);
    background-color: transparent;
    color: var(--color-text);
    font: inherit;
    text-align: start;
    cursor: pointer;

    @include can-hover {
      &:hover {
        background-color: var(--color-bg-subtle);
      }
    }
  }

  .popover-item-icon {
    inline-size: 1.25rem;
    text-align: center;
  }

  .popover-status {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
