<template>
  <ChapterLayout id="standard" :sections="sections">
    <p class="chapter-intro">
      Accessibility begins as a requirement, not a feature. WCAG is the
      standard the rest of the web is measured against — and it has grown
      right alongside the platform.
    </p>

    <section class="demo" aria-labelledby="demo-criteria" style="view-timeline-name: --chapter-sec-1">
      <h3 id="demo-criteria">Guidelines, alive</h3>
      <p>
        These aren't definitions of accessibility — they're the standard,
        running. The criteria are arranged along WCAG's timeline, so you can
        watch the standard grow as the web changed. Each card is a real
        working piece of this foundation; flip <strong>break this rule</strong>
        to switch the compliant behavior off and feel what the criterion
        actually prevents. Accessibility isn't a feature added on top; it's
        the baseline these guidelines keep formalizing — and they keep
        POUR at the core: Perceivable, Operable, Understandable, Robust.
      </p>
      <CriteriaTimeline />
    </section>

    <section class="demo" aria-labelledby="demo-conformance" style="view-timeline-name: --chapter-sec-2">
      <h3 id="demo-conformance">From pass / fail to outcomes</h3>
      <p>
        The timeline's next stop is the biggest change of all — not new
        criteria, but a new <em>way of measuring</em>. Drag the slider to see
        how the same result reads under today's binary model versus WCAG 3.0's
        draft graded scoring.
      </p>
      <ConformanceShift />
    </section>

    <section class="demo" aria-labelledby="demo-legal" style="view-timeline-name: --chapter-sec-3">
      <h3 id="demo-legal">One standard, many laws</h3>
      <p>
        WCAG isn't just guidance — it's the technical core that accessibility
        law around the world points to. The map below shows how different
        jurisdictions wrap legal force around the same standard.
      </p>
      <LegalMap />
    </section>
  </ChapterLayout>
</template>

<script setup lang="ts">
import ChapterLayout from '../site/ChapterLayout/ChapterLayout.vue'
import CriteriaTimeline from '../criteria/CriteriaTimeline/CriteriaTimeline.vue'
import ConformanceShift from '../criteria/ConformanceShift/ConformanceShift.vue'
import LegalMap from '../criteria/LegalMap/LegalMap.vue'

const sections = [
  { id: 'demo-criteria', label: 'Guidelines, alive' },
  { id: 'demo-conformance', label: 'From pass / fail to outcomes' },
  { id: 'demo-legal', label: 'One standard, many laws' },
]
</script>
