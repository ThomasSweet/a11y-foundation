<template>
  <dialog
    ref="dialog"
    class="dialog"
    closedby="any"
    :aria-labelledby="titleId"
  >
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

<script setup lang="ts">
import { ref, useId } from 'vue'

const dialog = ref<HTMLDialogElement | null>(null)
const titleId = useId()

// Native <dialog> + showModal() gives focus trapping, Esc-to-close,
// inert background, and top-layer rendering for free. The closedby="any"
// attribute adds light-dismiss (outside-click) natively too — no JS handler.
// On browsers without closedby support the dialog still closes via Esc and
// the close button; only outside-click degrades, which is harmless.
defineExpose({
  open: () => dialog.value?.showModal(),
  close: () => dialog.value?.close(),
})
</script>

<style scoped lang="scss" src="./AppDialog.scss"></style>
