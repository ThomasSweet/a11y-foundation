<template>
  <div class="dialog-demo">
    <p class="dialog-caption">
      Two newer platform niceties for overlays. A <code>popover="hint"</code>
      <strong>toggletip</strong> — click the “?”, and showing, dismissing, and
      top-layer rendering are free. And a <code>&lt;dialog closedby="none"&gt;</code>
      <strong>takeover</strong> that Esc and outside-clicks can’t close, for the
      rare must-decide moment (use sparingly — trapping people is normally a
      trap to avoid). Styling reacts to the new <code>:open</code> pseudo-class.
    </p>

    <div class="dialog-row">
      <span class="dialog-tip-wrap">
        <button
          type="button"
          class="dialog-tip-btn"
          :popovertarget="tipId"
          aria-label="What does closedby do?"
        >
          ?
        </button>
        <div :id="tipId" popover="hint" role="status" class="dialog-tip">
          <code>closedby</code> sets how a dialog can be dismissed:
          <code>any</code> (click-outside + Esc), <code>closerequest</code>
          (Esc only), or <code>none</code> (neither — code must close it).
        </div>
      </span>

      <AppButton variant="secondary" @click="dlg?.showModal()">
        Open takeover dialog
      </AppButton>
    </div>

    <dialog ref="dlg" closedby="none" class="dialog-dialog">
      <h4 class="dialog-dialog-title">One quick decision</h4>
      <p class="dialog-dialog-text">
        This dialog uses <code>closedby="none"</code>, so <kbd>Esc</kbd> and
        clicking the backdrop do nothing — you have to choose. Reserve this for
        moments where a choice is genuinely required; normally let people out.
      </p>
      <div class="dialog-dialog-actions">
        <AppButton variant="secondary" @click="dlg?.close()">Not now</AppButton>
        <AppButton variant="primary" @click="dlg?.close()">Got it</AppButton>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'

import AppButton from '../../../components/AppButton/AppButton.vue'

const tipId = useId()
const dlg = ref<HTMLDialogElement | null>(null)
</script>

<style scoped lang="scss">
@layer components {
  .dialog-demo {
    display: grid;
    gap: var(--space-3);
  }

  .dialog-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .dialog-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }

  .dialog-tip-wrap {
    display: inline-flex;
  }

  .dialog-tip-btn {
    inline-size: 2rem;
    block-size: 2rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    anchor-name: --dialog-tip-anchor;

    @include can-hover {
      &:hover {
        background-color: var(--color-bg-subtle);
      }
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .dialog-tip {
    max-inline-size: 30ch;
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-md);
    font-size: var(--text-sm);

    /* Tether the toggletip to the "?" button. Without support it falls back
       to the UA-centered popover (margin: auto, restored in the reset). */
    @supports (anchor-name: --a) {
      position: fixed;
      position-anchor: --dialog-tip-anchor;
      position-area: block-end span-inline-end;
      inset: auto;
      position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
      margin: var(--space-2) 0 0;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .dialog-dialog {
    max-inline-size: 38ch;
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-lg);

    /* Style only while open via the new :open pseudo-class. The entry uses
       motion tokens, so it's instant under reduced motion. */
    &:open {
      opacity: 1;
      scale: 1;
      transition:
        opacity var(--duration-normal) var(--easing-standard),
        scale var(--duration-normal) var(--easing-standard);

      @starting-style {
        opacity: 0;
        scale: 0.96;
      }
    }

    &::backdrop {
      background-color: rgb(0 0 0 / 45%);
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .dialog-dialog-title {
    margin-block-end: var(--space-2);
    font-size: var(--text-lg);
    font-weight: 700;
  }

  .dialog-dialog-text {
    margin-block-end: var(--space-4);
    color: var(--color-text-subtle);
  }

  .dialog-dialog-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2);
  }
}
</style>
