<template>
  <ol class="timeline">
    <template v-for="era in eras" :key="era.id">
      <li class="timeline-era" :class="{ 'is-new-model': era.newModel }">
        <span class="timeline-era-ghost" :data-year="era.ghost" aria-hidden="true"></span>
        <div class="timeline-era-body">
          <header class="timeline-era-header">
            <span class="timeline-era-strata" aria-hidden="true">
              <span v-for="n in era.depth" :key="n" class="timeline-strata-layer"></span>
            </span>
            <div class="timeline-era-heading">
              <h4 class="timeline-era-title">
                {{ era.label }} <span class="timeline-era-year">{{ era.year }}</span>
              </h4>
              <p class="timeline-era-summary">{{ era.summary }}</p>
            </div>
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
      <li v-if="era.id === 'wcag22'" class="timeline-now">
        <p class="timeline-now-label">
          You are here <span class="timeline-now-year">2026</span>
        </p>
      </li>
    </template>
  </ol>
</template>

<script setup lang="ts">
import CriterionFrame from '../CriterionFrame/CriterionFrame.vue'
import { criteria, wcagTimeline } from '../registry'

const eras = wcagTimeline.map((era, index) => {
  const newModel = era.id === 'wcag30'
  return {
    ...era,
    items: era.version ? criteria.filter((c) => c.version === era.version) : [],
    depth: newModel ? 2 : index + 1,
    newModel,
    ghost: newModel ? '3.0' : era.year,
  }
})
</script>

<style scoped lang="scss" src="./CriteriaTimeline.scss"></style>
