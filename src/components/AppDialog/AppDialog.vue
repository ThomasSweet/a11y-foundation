<template>
  <dialog
    ref="dialog"
    class="dialog"
    :aria-labelledby="titleId"
    @click="onDialogClick"
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
// inert background, and top-layer rendering for free.
defineExpose({
  open: () => dialog.value?.showModal(),
  close: () => dialog.value?.close(),
})

// Light dismiss: the ::backdrop registers clicks on the <dialog> element
// itself, so a click whose coordinates fall outside the dialog's box is a
// backdrop click. Clicks on the content (and padding) land inside the box
// and are ignored. Esc and focus trapping stay fully native.
function onDialogClick(e: MouseEvent) {
  if (!dialog.value) return
  const r = dialog.value.getBoundingClientRect()
  const inside =
    e.clientX >= r.left && e.clientX <= r.right &&
    e.clientY >= r.top && e.clientY <= r.bottom
  if (!inside) dialog.value.close()
}
</script>

<style scoped lang="scss" src="./AppDialog.scss"></style>
