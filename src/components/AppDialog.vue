<template>
  <dialog ref="dialog" class="dialog" :aria-labelledby="titleId">
    <header class="dialog-header">
      <h2 :id="titleId" class="dialog-title">
        <slot name="title" />
      </h2>
      <button
        type="button"
        class="dialog-close"
        @click="dialog?.close()"
      >
        <span aria-hidden="true">&times;</span>
        <span class="visually-hidden">Close dialog</span>
      </button>
    </header>
    <div class="dialog-body">
      <slot />
    </div>
  </dialog>
</template>

<script setup>
import { ref, useId } from 'vue'

const dialog = ref(null)
const titleId = useId()

// Native <dialog> + showModal() gives focus trapping, Esc-to-close,
// inert background, and top-layer rendering for free.
defineExpose({
  open: () => dialog.value?.showModal(),
  close: () => dialog.value?.close(),
})
</script>

<style scoped lang="scss">
@layer components {
  .dialog {
    max-inline-size: min(60ch, calc(100% - var(--space-8)));
    margin: auto;
    padding: var(--space-6);
    border: none;
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-lg);

    &[open] {
      /* Uses motion tokens, so reduced-motion handling is automatic. */
      animation: dialog-in var(--duration-normal) var(--easing-enter);
    }

    &::backdrop {
      background-color: rgb(0 0 0 / 50%);
    }

    /* Shadow and backdrop dimming are stripped in forced-colors mode —
       a border restores the dialog's visible boundary. */
    @include forced-colors {
      border: 2px solid CanvasText;
    }
  }

  .dialog-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: var(--space-4);
    margin-block-end: var(--space-4);
  }

  .dialog-title {
    font-size: var(--text-xl);
    line-height: var(--leading-tight);
  }

  .dialog-close {
    display: grid;
    place-items: center;
    inline-size: 44px;
    block-size: 44px;
    border: 2px solid transparent;
    border-radius: var(--radius-md);
    background-color: transparent;
    color: var(--color-text);
    font-size: var(--text-xl);
    cursor: pointer;

    @include can-hover {
      &:hover {
        background-color: var(--color-bg-subtle);
      }
    }

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  @keyframes dialog-in {
    from {
      opacity: 0;
      translate: 0 var(--space-4);
    }
  }
}
</style>
