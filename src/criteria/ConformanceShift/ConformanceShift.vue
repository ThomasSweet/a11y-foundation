<template>
  <div class="conformance-shift">
    <div class="conformance-shift-control">
      <label :for="sliderId">
        Failing checks <span class="conformance-shift-count">{{ failing }} / {{ total }}</span>
      </label>
      <input
        :id="sliderId"
        v-model.number="failing"
        type="range"
        min="0"
        :max="total"
        step="1"
      />
    </div>

    <div class="conformance-shift-panels">
      <article class="conformance-shift-panel" aria-labelledby="conformance-shift-binary">
        <h4 id="conformance-shift-binary" class="conformance-shift-panel-title">
          WCAG 2.x — pass / fail
        </h4>
        <p class="conformance-shift-verdict" :class="`is-${binary.tone}`">
          {{ binary.label }}
        </p>
        <p class="conformance-shift-note">
          A single failure fails the whole level. All-or-nothing, however
          close you got.
        </p>
      </article>

      <article class="conformance-shift-panel" aria-labelledby="conformance-shift-graded">
        <h4 id="conformance-shift-graded" class="conformance-shift-panel-title">
          WCAG 3.0 (draft) — scored
        </h4>
        <p class="conformance-shift-score">
          {{ score }}<span class="conformance-shift-pct">%</span>
          <span class="conformance-shift-rating">{{ rating }}</span>
        </p>
        <div
          class="conformance-shift-meter"
          role="meter"
          :aria-valuenow="score"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="`Outcome score ${score} percent`"
        >
          <span class="conformance-shift-meter-fill" :style="{ inlineSize: score + '%' }"></span>
        </div>
        <p class="conformance-shift-note">
          Partial credit; the score degrades gradually toward a rating
          instead of flipping to a hard fail.
        </p>
      </article>
    </div>

    <p class="conformance-shift-caption">
      The biggest change coming in <strong>WCAG 3.0</strong> isn't more
      criteria — it's the <em>model</em>: away from binary A / AA / AAA toward
      graded, outcome-based scoring that rewards how well you actually serve
      people. <span class="conformance-shift-disclaimer">(Illustrative — 3.0's exact
      scoring is still a working draft.)</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'

const total = 5
const sliderId = useId()
const failing = ref(0)

const score = computed(() => Math.round(((total - failing.value) / total) * 100))

const binary = computed(() =>
  failing.value === 0
    ? { label: 'AA · Pass', tone: 'pass' }
    : { label: 'AA · Fail', tone: 'fail' },
)

const rating = computed(() => {
  const s = score.value
  if (s >= 100) return 'Gold'
  if (s >= 80) return 'Silver'
  if (s >= 50) return 'Bronze'
  return 'Not yet'
})
</script>

<style scoped lang="scss" src="./ConformanceShift.scss"></style>
