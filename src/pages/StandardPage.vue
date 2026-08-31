<template>
  <ChapterLayout id="standard">
    <p class="chapter-intro">
      Accessibility begins as a requirement, not a feature.
      <GlossaryRef id="wcag">WCAG</GlossaryRef> is the
      standard the rest of the web is measured against — and it has grown
      right alongside the platform.
    </p>

    <ChapterSection
      id="demo-criteria"
      title="Guidelines, alive"
      rail-label="The break-it criteria"
      data-reveal="off"
    >
      <p>
        These aren't definitions of accessibility — they're the standard,
        running. The criteria are arranged along WCAG's timeline, so you can
        watch the standard grow as the web changed. Each card is a real
        working piece of this foundation; flip <strong>break this rule</strong>
        to switch the compliant behavior off and feel what the criterion
        actually prevents. Eleven criteria are demoed here — a deliberate
        sample of recent ones this foundation itself implements, not the
        full standard; the complete set lives in
        <a href="https://www.w3.org/WAI/WCAG22/quickref/">W3C's quick
        reference</a>. Accessibility isn't a feature added on top; it's
        the baseline these guidelines keep formalizing — and they keep
        POUR at the core: Perceivable, Operable, Understandable, Robust.
      </p>
      <CriteriaTimeline />
    </ChapterSection>

    <ChapterSection id="demo-legal" title="One standard, many laws">
      <p>
        WCAG isn't just guidance — it's the technical core that accessibility
        law around the world points to. The map below shows how different
        jurisdictions wrap legal force around the same standard.
      </p>
      <LegalMap />
      <p>
        The bar, set. <a href="/craft.html">Chapter 02</a> is how the
        platform clears it.
      </p>
    </ChapterSection>
  </ChapterLayout>
</template>

<script setup lang="ts">
import ChapterLayout from '../site/ChapterLayout/ChapterLayout.vue'
import ChapterSection from '../site/ChapterSection/ChapterSection.vue'
import GlossaryRef from '../glossary/GlossaryRef.vue'
import CriteriaTimeline from '../criteria/CriteriaTimeline/CriteriaTimeline.vue'
import LegalMap from '../criteria/LegalMap/LegalMap.vue'
</script>
