<template>
  <section id="what-changed" class="hub-revisions" aria-labelledby="hub-revisions-title">
    <h2 id="hub-revisions-title" class="hub-revisions-title">What changed</h2>
    <p class="hub-revisions-lede">
      The platform and the standards keep moving. This is what moved lately
      and what it changed here, newest first.
    </p>

    <ol class="hub-revisions-list">
      <li v-for="revision in shown" :key="revision.id" class="hub-revision">
        <time class="hub-revision-date" :datetime="revision.date">{{ formatDate(revision.date) }}</time>
        <span class="hub-revision-area">{{ revision.area }}</span>
        <p class="hub-revision-text">{{ revision.lead }}<a :href="revision.href">{{ revision.linkText }}</a>{{ revision.tail }}</p>
      </li>
    </ol>

    <p class="hub-revisions-foot">
      <a href="/feed.xml" type="application/atom+xml">
        <svg class="hub-revisions-feed-glyph" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="3" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <path d="M2 8a6 6 0 0 1 6 6M2 3a11 11 0 0 1 11 11" />
        </svg>
        Subscribe to the feed
      </a>
      <a href="https://github.com/ThomasSweet/a11y-foundation/commits/main">Every commit on GitHub</a>
    </p>
  </section>
</template>

<script setup lang="ts">
import { revisions, revisionsShown } from './revisions'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split('-')
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`
}

const shown = [...revisions]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, revisionsShown)
</script>

<style scoped lang="scss" src="./HubRevisions.scss"></style>
