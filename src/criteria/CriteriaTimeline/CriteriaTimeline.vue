<template>
  <!-- Ordered list: the eras are chronological, and that sequence is the
       point. The spine and markers are decorative (CSS only). -->
  <ol class="timeline">
    <li
      v-for="era in eras"
      :key="era.id"
      class="era"
      :class="{ 'is-open': !era.items.length }"
    >
      <span class="era-marker" aria-hidden="true"></span>
      <div class="era-body">
        <header class="era-header">
          <h3 class="era-title">
            {{ era.label }} <span class="era-year">{{ era.year }}</span>
          </h3>
          <p class="era-summary">{{ era.summary }}</p>
        </header>

        <div v-if="era.items.length" class="era-criteria">
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
            :heading-level="4"
            v-slot="{ broken }"
          >
            <component :is="c.component" :broken="broken" />
          </CriterionFrame>
        </div>
        <p v-else class="era-note">{{ era.note }}</p>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import CriterionFrame from '../CriterionFrame/CriterionFrame.vue'
import { criteria, wcagTimeline } from '../registry'

// Group the criteria under their WCAG version; eras with no version stay
// empty and render their note instead.
const eras = wcagTimeline.map((era) => ({
  ...era,
  items: era.version ? criteria.filter((c) => c.version === era.version) : [],
}))
</script>

<style scoped lang="scss" src="./CriteriaTimeline.scss"></style>
