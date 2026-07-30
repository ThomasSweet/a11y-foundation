<template>
  <section
    class="demo"
    :aria-labelledby="id"
    :style="n ? { viewTimelineName: `--chapter-sec-${n}` } : undefined"
  >
    <h3 :id="id">{{ title }}</h3>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { chapterSectionsKey } from '../ChapterLayout/chapterSections'

const props = defineProps<{
  id: string
  title: string
  railLabel?: string
}>()

const registry = inject(chapterSectionsKey, null)
const n = registry
  ? registry.register({ id: props.id, title: props.title, railLabel: props.railLabel })
  : 0
</script>
