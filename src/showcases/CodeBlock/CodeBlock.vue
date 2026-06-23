<template>
  <figure class="code-block">
    <figcaption class="code-block-bar">
      <span class="code-block-lang">{{ label }}</span>
      <button
        type="button"
        class="code-block-copy"
        :aria-label="`Copy ${label} snippet to clipboard`"
        @click="copy"
      >
        <span aria-hidden="true">{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
    </figcaption>

    <!-- tabindex makes the code keyboard-scrollable when a line overflows.
         v-html is safe here: the source is our own escaped snippet text, with
         only <span>s added around comments so they can be visually muted. -->
    <pre class="code-block-pre" tabindex="0"><code v-html="highlighted" /></pre>

    <!-- Announces the copy result to screen readers without moving focus. -->
    <span role="status" class="visually-hidden">{{ status }}</span>
  </figure>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  /** Raw snippet text, rendered verbatim. */
  code: string
  /** Short language label shown in the bar and used for announcements. */
  label: string
}>()

const trimmed = computed(() => props.code.replace(/\s+$/, ''))

/**
 * Escape the snippet, then wrap comments so the stylesheet can mute them and
 * let the actual code carry the emphasis. Not a syntax highlighter: comments
 * only, and the pattern is per-language so we never mistake `//` inside an
 * HTML URL (or a CSS value) for a comment.
 */
const commentPattern = computed(() => {
  if (props.label === 'JS') return /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)/g
  if (props.label === 'HTML') return /(&lt;!--[\s\S]*?--&gt;)/g
  return /(\/\*[\s\S]*?\*\/)/g // CSS
})

const highlighted = computed(() =>
  trimmed.value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(commentPattern.value, '<span class="code-comment">$1</span>'),
)

const copied = ref(false)
const status = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(trimmed.value)
    copied.value = true
    status.value = `${props.label} snippet copied to clipboard`
  } catch {
    status.value = 'Copy failed — select the code and copy it manually'
  }
  clearTimeout(timer)
  timer = setTimeout(() => {
    copied.value = false
    status.value = ''
  }, 2000)
}
</script>

<style scoped lang="scss" src="./CodeBlock.scss"></style>
