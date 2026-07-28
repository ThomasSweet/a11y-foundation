<template>
  <div class="legal-map">
    <div class="legal-map-core">
      <p class="legal-map-core-label">WCAG</p>
      <p class="legal-map-core-sub">the technical core every law below points to</p>
    </div>

    <ul class="legal-map-laws">
      <li v-for="law in laws" :key="law.region" class="legal-map-law">
        <p class="legal-map-region">{{ law.region }}</p>
        <p class="legal-map-name"><a :href="law.href">{{ law.name }}</a></p>
        <p class="legal-map-ref">→ {{ law.references }}</p>
        <p class="legal-map-status">{{ law.status }}</p>
      </li>
    </ul>

    <p class="legal-map-caption">
      Accessibility law is global and converging: different jurisdictions wrap
      their own legal force around the <em>same</em> technical standard. Get
      WCAG right and you're most of the way to compliance everywhere.
      <span class="legal-map-disclaimer">(Orientation, not legal advice. Exact
      versions, levels, and dates vary and keep evolving — every law above links
      to its official text, last read {{ sourcesRead }}.)</span>
    </p>
  </div>
</template>

<script setup lang="ts">
interface Law {
  region: string
  name: string
  references: string
  status: string
  /** Official text, so a reader can verify the row instead of trusting it. */
  href: string
}

/* Deliberately hand-set, never derived from the build date: a stamp that moved
   on every deploy would claim a check nobody performed. Bump it only when the
   rows below have actually been re-read against their sources. Law is
   time-driven, not change-driven — it goes stale while the repo sits still. */
const sourcesRead = '28 July 2026'

const laws: Law[] = [
  {
    region: 'European Union',
    name: 'European Accessibility Act → EN 301 549',
    references: 'WCAG 2.1 AA',
    status: 'In force since 28 Jun 2025',
    href: 'https://eur-lex.europa.eu/eli/dir/2019/882/oj',
  },
  {
    region: 'United States · federal',
    name: 'Section 508',
    references: 'WCAG 2.0 AA',
    status: 'Required for federal ICT',
    href: 'https://www.section508.gov/',
  },
  {
    region: 'United States · public sector',
    name: 'ADA Title II (DOJ 2024 rule)',
    references: 'WCAG 2.1 AA',
    status: 'Phasing in 2027–2028',
    href: 'https://www.ada.gov/resources/2024-03-08-web-rule/',
  },
  {
    region: 'Canada',
    name: 'Accessible Canada Act · AODA (Ontario)',
    references: 'WCAG 2.0 AA',
    status: 'In force; scope expanding',
    href: 'https://laws-lois.justice.gc.ca/eng/acts/A-0.6/',
  },
]
</script>

<style scoped lang="scss" src="./LegalMap.scss"></style>
