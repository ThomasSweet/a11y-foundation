<template>
  <!-- <ol>: the era order is chronological and meaningful. Spine/markers are decorative. -->
  <ol class="timeline">
    <li
      v-for="era in eras"
      :key="era.id"
      class="timeline-era"
      :class="{ 'is-open': !era.items.length }"
    >
      <span class="timeline-era-marker" aria-hidden="true"></span>
      <div class="timeline-era-body">
        <header class="timeline-era-header">
          <h4 class="timeline-era-title">
            {{ era.label }} <span class="timeline-era-year">{{ era.year }}</span>
          </h4>
          <p class="timeline-era-summary">{{ era.summary }}</p>
        </header>

        <div v-if="era.items.length" class="timeline-era-criteria">
          <CriterionFrame
            v-for="c in era.items"
            :key="c.id"
            :id="c.id"
            :name="c.name"
            :level="c.level"
            :version="c.version"
            :principle="c.principle"
            :requirement="c.requirement"
            :break-label="c.breakLabel"
            :restore-label="c.restoreLabel"
            :pass-text="c.passText"
            :fail-text="c.failText"
            :links="c.links"
            :heading-level="5"
            v-slot="{ broken }"
          >
            <component :is="c.component" :broken="broken" />
          </CriterionFrame>
        </div>
        <p v-else class="timeline-era-note">{{ era.note }}</p>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import CriterionFrame from '../CriterionFrame/CriterionFrame.vue'
import { criteria, wcagTimeline } from '../registry'

// Group criteria by WCAG version; version-less eras stay empty and show their note.
const eras = wcagTimeline.map((era) => ({
  ...era,
  items: era.version ? criteria.filter((c) => c.version === era.version) : [],
}))
</script>

<style scoped lang="scss" src="./CriteriaTimeline.scss"></style>
