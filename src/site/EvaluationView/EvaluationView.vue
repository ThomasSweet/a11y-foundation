<template>
  <SiteFrame sheet="S·03" sheet-title="Evaluation report">
    <h1 class="evaluation-title">Evaluation report</h1>
    <p class="evaluation-lede">
      A self-evaluation of this site against WCAG 2.2 Level AA, following W3C’s
      WCAG-EM 2.0. Carried out on {{ evaluatedOn }}.
    </p>

    <section class="evaluation-section">
      <h2 class="evaluation-h2">The result</h2>
      <p class="evaluation-p">
        The site does not meet WCAG 2.2 AA. Of the {{ criteria.length }} Level A
        and AA success criteria:
      </p>
      <ul class="evaluation-list">
        <li>{{ totals.passed }} passed.</li>
        <li>{{ totals.failed }} failed on ordinary pages.</li>
        <li>
          {{ totals.plantedOnly }} failed only on the two planted pages, which
          exist to fail.
        </li>
        <li>{{ totals.notPresent }} have nothing on the site to apply to.</li>
        <li v-if="totals.cannotTell">{{ totals.cannotTell }} could not be decided.</li>
      </ul>
      <p class="evaluation-p">
        These counts are not a score: WCAG has none, and one failure can block
        someone completely. This is the record of one evaluation, not a
        conformance claim. It covers the site as it stood at commit
        <a :href="commitHref"><code>{{ commit }}</code></a
        >, and <a href="/accessibility.html">the accessibility statement</a>
        says what has changed since.
      </p>
      <p class="evaluation-p">{{ limit }}</p>
    </section>

    <section class="evaluation-section">
      <h2 class="evaluation-h2">Scope</h2>
      <dl class="evaluation-facts">
        <div v-for="fact in scope" :key="fact.term" class="evaluation-fact">
          <dt class="evaluation-term">{{ fact.term }}</dt>
          <dd class="evaluation-detail">{{ fact.detail }}</dd>
        </div>
      </dl>
    </section>

    <section class="evaluation-section">
      <h2 class="evaluation-h2">What the site is made of</h2>
      <dl class="evaluation-facts">
        <div v-for="fact in exploration" :key="fact.term" class="evaluation-fact">
          <dt class="evaluation-term">{{ fact.term }}</dt>
          <dd class="evaluation-detail">{{ fact.detail }}</dd>
        </div>
      </dl>
    </section>

    <section class="evaluation-section">
      <h2 class="evaluation-h2">The sample</h2>
      <p class="evaluation-p">
        Every page was evaluated, so there was nothing to sample and no random
        sample to compare, as WCAG-EM allows for a site this small.
      </p>
      <ul class="evaluation-list">
        <li v-for="view in views" :key="view.href">
          <a :href="view.href">{{ view.name }}</a
          ><template v-if="view.planted">, planted, fails on purpose</template>
        </li>
      </ul>
      <p class="evaluation-p">{{ processes }}</p>
    </section>

    <section class="evaluation-section">
      <h2 class="evaluation-h2">Results by criterion</h2>
      <p class="evaluation-p">
        A result is the worst found on any page in any of the ten colour schemes.
        Each failure names one example at least, and “planted” marks one found
        only on the two planted pages.
      </p>
      <template v-for="principle in principles" :key="principle.name">
        <h3 class="evaluation-h3">{{ principle.name }}</h3>
        <dl class="evaluation-results">
          <div v-for="criterion in principle.criteria" :key="criterion.num" class="evaluation-result">
            <dt class="evaluation-criterion">
              <a :href="understanding(criterion.id)">{{ criterion.num }} {{ criterion.name }}</a>
              (Level {{ criterion.level }})
            </dt>
            <dd class="evaluation-outcome">
              <strong>{{ outcomeLabel(criterion) }}.</strong> {{ criterion.note }}
            </dd>
          </div>
        </dl>
      </template>
    </section>

    <section class="evaluation-section">
      <h2 class="evaluation-h2">Conformance requirements</h2>
      <dl class="evaluation-facts">
        <div v-for="fact in requirements" :key="fact.term" class="evaluation-fact">
          <dt class="evaluation-term">{{ fact.term }}</dt>
          <dd class="evaluation-detail">{{ fact.detail }}</dd>
        </div>
      </dl>
    </section>

    <section class="evaluation-section">
      <h2 class="evaluation-h2">How it was done</h2>
      <dl class="evaluation-facts">
        <div v-for="fact in method" :key="fact.term" class="evaluation-fact">
          <dt class="evaluation-term">{{ fact.term }}</dt>
          <dd class="evaluation-detail">{{ fact.detail }}</dd>
        </div>
      </dl>
    </section>

    <section class="evaluation-section">
      <h2 class="evaluation-h2">Check it yourself</h2>
      <p class="evaluation-p">
        <a :href="reportFile">The same report as JSON</a> opens in W3C’s
        <a :href="reportTool">WCAG-EM Report Tool</a>, and its results use the
        EARL vocabulary, so other tools can read them. Disagree with a result?
        <a :href="barrierReport">File a barrier report</a>.
      </p>
    </section>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import {
  commit,
  criteria,
  evaluatedOn,
  exploration,
  limit,
  method,
  outcomeLabel,
  processes,
  reportFile,
  requirements,
  scope,
  tally,
  views,
} from './evaluation'

const repository = 'https://github.com/ThomasSweet/a11y-foundation'
const commitHref = `${repository}/tree/${commit}`
const reportTool = 'https://www.w3.org/WAI/eval/report-tool/'
const barrierReport = `${repository}/issues/new?template=barrier-report.yml`
const totals = tally()

const understanding = (id: string) => `https://www.w3.org/WAI/WCAG22/Understanding/${id}.html`

const principles = [
  { name: 'Perceivable', prefix: '1.' },
  { name: 'Operable', prefix: '2.' },
  { name: 'Understandable', prefix: '3.' },
  { name: 'Robust', prefix: '4.' },
].map(({ name, prefix }) => ({
  name,
  criteria: criteria.filter((criterion) => criterion.num.startsWith(prefix)),
}))
</script>

<style scoped lang="scss">
@layer components {
  .evaluation-title {
    margin: 0;
    font-size: var(--text-display-sm);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--bp-ink);
  }

  .evaluation-lede {
    max-inline-size: 58ch;
    margin-block: var(--space-4) 0;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .evaluation-section {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
    margin-block-start: var(--space-16);
    max-inline-size: 68ch;
  }

  .evaluation-h2 {
    margin: 0;
    font-size: var(--text-2xl);
    letter-spacing: -0.01em;
    color: var(--bp-ink);
  }

  .evaluation-h3 {
    margin-block: var(--space-6) 0;
    font-size: var(--text-xl);
    letter-spacing: -0.01em;
    color: var(--bp-ink);
  }

  .evaluation-p {
    margin: 0;
    max-inline-size: 62ch;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .evaluation-list {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding-inline-start: var(--space-6);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .evaluation-facts,
  .evaluation-results {
    display: grid;
    gap: var(--space-4);
    margin: 0;
  }

  .evaluation-fact,
  .evaluation-result {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-1);
  }

  .evaluation-term,
  .evaluation-criterion {
    font-weight: 600;
    color: var(--bp-ink);
  }

  .evaluation-detail,
  .evaluation-outcome {
    margin: 0;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .evaluation-outcome strong {
    color: var(--bp-ink);
  }
}
</style>
