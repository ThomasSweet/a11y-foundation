<template>
  <div class="lmap">
    <div class="lmap-core">
      <p class="lmap-core-label">WCAG</p>
      <p class="lmap-core-sub">the technical core every law below points to</p>
    </div>

    <ul class="lmap-laws">
      <li v-for="law in laws" :key="law.region" class="lmap-law">
        <p class="lmap-region">{{ law.region }}</p>
        <p class="lmap-name">{{ law.name }}</p>
        <p class="lmap-ref">→ {{ law.references }}</p>
        <p class="lmap-status">{{ law.status }}</p>
      </li>
    </ul>

    <p class="lmap-caption">
      Accessibility law is global and converging: different jurisdictions wrap
      their own legal force around the <em>same</em> technical standard. Get
      WCAG right and you're most of the way to compliance everywhere.
      <span class="lmap-disclaimer">(A simplified snapshot — exact versions,
      levels, and dates vary and keep evolving; check the current text for
      your jurisdiction.)</span>
    </p>
  </div>
</template>

<script setup lang="ts">
interface Law {
  region: string
  name: string
  references: string
  status: string
}

const laws: Law[] = [
  {
    region: 'European Union',
    name: 'European Accessibility Act → EN 301 549',
    references: 'WCAG 2.1 AA',
    status: 'In force since 28 Jun 2025',
  },
  {
    region: 'United States · federal',
    name: 'Section 508',
    references: 'WCAG 2.0 AA',
    status: 'Required for federal ICT',
  },
  {
    region: 'United States · public sector',
    name: 'ADA Title II (DOJ 2024 rule)',
    references: 'WCAG 2.1 AA',
    status: 'Phasing in 2026–2027',
  },
  {
    region: 'Canada',
    name: 'Accessible Canada Act · AODA (Ontario)',
    references: 'WCAG 2.0 AA',
    status: 'In force; scope expanding',
  },
]
</script>

<style scoped lang="scss" src="./LegalMap.scss"></style>
