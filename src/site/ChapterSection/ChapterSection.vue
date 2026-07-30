<template>
  <section class="demo" :aria-labelledby="id" :style="{ viewTimelineName: `--chapter-sec-${n}` }">
    <h3 :id="id">{{ title }}</h3>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  /** Anchor id — must match the entry in ChapterLayout's sections list. */
  id: string
  /** 1-based position, feeding the rail's --chapter-sec-N view timeline. */
  n: number
  title: string
}>()
</script>
