<template>
  <div class="standards-map">
    <p class="standards-map-lede">
      Every law on this map ends at the same technical core. What differs is
      how many layers of wrapping sit between the law and the criterion you
      test against. Open a law to see its chain. Rows are the WCAG version
      each law points at, so the empty row at the bottom is the lag.
    </p>

    <ol class="standards-map-rows">
      <li v-for="row in rows" :key="row.id" class="standards-map-row">
        <div class="standards-map-version">
          <h4 class="standards-map-version-title">
            <span class="visually-hidden">WCAG </span>
            <span class="standards-map-version-number">{{ row.number }}</span>
            <span class="standards-map-version-year">{{ row.year }}</span>
          </h4>
          <p class="standards-map-version-note">{{ row.note }}</p>
        </div>

        <ul v-if="row.laws.length" class="standards-map-wrappers">
          <li v-for="law in row.laws" :key="law.id" class="standards-map-wrapper">
            <details class="standards-map-law" name="standards-map">
              <summary class="standards-map-summary">
                <span class="standards-map-region">{{ law.region }}</span>
                <strong class="standards-map-name">{{ law.name }}</strong>
                <span class="standards-map-stamp">{{ law.stamp }}</span>
              </summary>
              <div class="standards-map-chain">
                <StandardsMapChain :layers="law.layers" :href="law.href" :law-name="law.name" />
              </div>
            </details>
          </li>
          <li v-if="row.arriving" class="standards-map-wrapper standards-map-arriving">
            <p>{{ row.arriving }}</p>
          </li>
        </ul>
        <p v-else class="standards-map-empty">{{ emptyRow }}</p>
      </li>
    </ol>

    <p class="standards-map-caption">
      Accessibility law is global and converging: different jurisdictions wrap
      their own legal force around the <em>same</em> technical standard. Get
      WCAG right and you're most of the way to compliance everywhere.
      <span class="standards-map-disclaimer">(Orientation, not legal advice. Exact
      versions, levels, and dates vary and keep evolving — every law above links
      to its official text, last read {{ sourcesRead }}.)</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import StandardsMapChain from './StandardsMapChain.vue'
import { wcagTimeline } from '../registry'
import { arriving, emptyRow, laws, rowNotes, sourcesRead } from './standardsMapData'

const rows = wcagTimeline.map((era) => ({
  id: era.id,
  number: era.label.replace('WCAG ', ''),
  year: era.year === 'draft' ? 'Working draft' : era.year,
  note: rowNotes[era.id] ?? '',
  laws: era.version ? laws.filter((law) => law.version === era.version) : [],
  arriving: arriving[era.id],
}))
</script>

<style scoped lang="scss" src="./StandardsMap.scss"></style>
