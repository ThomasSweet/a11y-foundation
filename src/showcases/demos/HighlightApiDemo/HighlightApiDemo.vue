<template>
  <div class="highlight-demo">
    <p class="highlight-caption">
      The <strong>CSS Custom Highlight API</strong> paints ranges of text from
      JavaScript — <code>::highlight()</code> styled in CSS, no wrapper
      <code>&lt;span&gt;</code>s injected. Type below to highlight live matches:
      the DOM and the accessibility tree stay untouched (so this is presentation
      only — never the sole way meaning is conveyed).
    </p>

    <label class="highlight-field">
      <span class="highlight-label">Find in text</span>
      <input
        v-model="query"
        class="highlight-input"
        type="search"
        placeholder="Try “access”…"
        :disabled="!supported"
      />
    </label>

    <p ref="prose" class="highlight-prose">
      Accessibility is the practice of making content usable by the widest
      possible range of people. An accessible interface does not depend on one
      sense or one input device: it stays operable by keyboard, readable by
      assistive technology, and perceivable across contrast and motion
      preferences. Building accessibility in from the start is cheaper, more
      robust, and simply more accessible than bolting it on at the end.
    </p>

    <p class="highlight-status" role="status">
      <template v-if="!supported">
        Your browser doesn’t support the Custom Highlight API yet — the text
        above is unchanged and fully readable.
      </template>
      <template v-else-if="query.trim()">{{ count }} match{{ count === 1 ? '' : 'es' }}</template>
      <template v-else>Type to highlight.</template>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const HIGHLIGHT = 'a11y-search'
const query = ref('access')
const prose = ref<HTMLElement | null>(null)
const count = ref(0)
const supported = typeof CSS !== 'undefined' && 'highlights' in CSS

function update() {
  if (!supported || !prose.value) return
  CSS.highlights.delete(HIGHLIGHT)

  const needle = query.value.trim().toLowerCase()
  if (!needle) {
    count.value = 0
    return
  }

  const ranges: Range[] = []
  const walker = document.createTreeWalker(prose.value, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node) {
    const haystack = (node.nodeValue ?? '').toLowerCase()
    let from = haystack.indexOf(needle)
    while (from !== -1) {
      const range = new Range()
      range.setStart(node, from)
      range.setEnd(node, from + needle.length)
      ranges.push(range)
      from = haystack.indexOf(needle, from + needle.length)
    }
    node = walker.nextNode()
  }

  count.value = ranges.length
  if (ranges.length) CSS.highlights.set(HIGHLIGHT, new Highlight(...ranges))
}

onMounted(update)
watch(query, update)
</script>

<style scoped lang="scss">
@layer components {
  .highlight-demo {
    display: grid;
    gap: var(--space-3);
  }

  .highlight-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .highlight-field {
    display: grid;
    gap: var(--space-2);
  }

  .highlight-label {
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .highlight-input {
    inline-size: 100%;
    max-inline-size: 22rem;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font: inherit;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .highlight-prose {
    max-inline-size: 65ch;
    line-height: var(--leading-normal);
  }

  .highlight-status {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>

<!-- ::highlight() is a global pseudo-element (not scoped), so this rule lives
     in an unscoped block; the name is unique to avoid collisions. -->
<style lang="scss">
@layer components {
  ::highlight(a11y-search) {
    background-color: var(--color-primary);
    color: var(--color-primary-text, #fff);
  }
}
</style>
