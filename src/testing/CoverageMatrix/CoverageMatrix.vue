<template>
  <div class="coverage-matrix">
    <!-- A real data table (row/col headers), so a screen reader reads any cell
         as "<issue>, <method>: <verdict>". The wrapper is a focusable scroll
         region so it can overflow on narrow viewports without trapping keys. -->
    <div
      class="coverage-matrix-scroll"
      tabindex="0"
      role="region"
      aria-label="Coverage matrix, scrollable"
    >
    <table class="coverage-matrix-table">
      <caption class="coverage-matrix-caption">
        A sample of accessibility defects and which test method actually
        catches each. <strong>Caught</strong>, <strong>partial</strong> (flagged
        but not fully judged), or <strong>missed</strong>.
      </caption>
      <thead>
        <tr>
          <th scope="col" class="coverage-matrix-issue-head">Defect</th>
          <th scope="col" class="coverage-matrix-method">
            Automated <span class="coverage-matrix-method-sub">(axe)</span>
          </th>
          <th scope="col" class="coverage-matrix-method">
            Keyboard <span class="coverage-matrix-method-sub">(by hand)</span>
          </th>
          <th scope="col" class="coverage-matrix-method">
            Screen reader <span class="coverage-matrix-method-sub">/ judgment</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in issues" :key="row.issue">
          <th scope="row" class="coverage-matrix-issue">
            <span class="coverage-matrix-issue-name">{{ row.issue }}</span>
            <span class="coverage-matrix-sc">WCAG {{ row.sc }}</span>
          </th>
          <td v-for="m in methods" :key="m" :class="cellClass(row[m])">
            <span aria-hidden="true" class="coverage-matrix-glyph">{{ glyph(row[m]) }}</span>
            <span class="visually-hidden">{{ verdictLabel(row[m]) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <p class="coverage-matrix-takeaway">
      Read down the <strong>axe</strong> column: it clusters at the top, then
      falls away. Automated tools verify the machine-checkable part of WCAG —
      perhaps a third of it — and that part is genuinely worth automating so a
      human never has to re-check it. But focus order, operability, meaning that
      survives without colour, whether a change is announced — that's most of
      the standard, and it lives in the columns a machine can't fill in.
      <strong>A green axe run means “no known violations,” never “accessible.”</strong>
    </p>
  </div>
</template>

<script setup lang="ts">
type Verdict = 'caught' | 'partial' | 'missed'
const methods = ['axe', 'kb', 'human'] as const

interface Issue {
  issue: string
  sc: string
  axe: Verdict
  kb: Verdict
  human: Verdict
}

// Ordered so the axe column reads top-to-bottom as a slope (machine-checkable first).
const issues: Issue[] = [
  { issue: 'Text contrast below 4.5:1', sc: '1.4.3', axe: 'caught', kb: 'missed', human: 'caught' },
  { issue: 'Control has no accessible name', sc: '4.1.2', axe: 'caught', kb: 'missed', human: 'caught' },
  { issue: 'Form field not tied to a label', sc: '1.3.1', axe: 'caught', kb: 'missed', human: 'caught' },
  { issue: 'Skipped heading level', sc: '1.3.1', axe: 'partial', kb: 'missed', human: 'caught' },
  { issue: 'Custom control not keyboard-operable', sc: '2.1.1', axe: 'partial', kb: 'caught', human: 'caught' },
  { issue: 'Focus order fights reading order', sc: '2.4.3', axe: 'missed', kb: 'caught', human: 'caught' },
  { issue: 'Focus indicator too faint to see', sc: '2.4.11', axe: 'missed', kb: 'caught', human: 'caught' },
  { issue: 'Icon / border contrast (non-text)', sc: '1.4.11', axe: 'missed', kb: 'missed', human: 'caught' },
  { issue: 'Meaning carried by colour alone', sc: '1.4.1', axe: 'missed', kb: 'missed', human: 'caught' },
  { issue: 'Status change not announced', sc: '4.1.3', axe: 'missed', kb: 'missed', human: 'caught' },
]

// Verdict is never colour alone — a glyph and an SR label carry it too.
const GLYPHS: Record<Verdict, string> = { caught: '●', partial: '◐', missed: '○' }
const LABELS: Record<Verdict, string> = { caught: 'Caught', partial: 'Partial', missed: 'Missed' }

function glyph(v: Verdict) {
  return GLYPHS[v]
}
function verdictLabel(v: Verdict) {
  return LABELS[v]
}
function cellClass(v: Verdict) {
  return ['coverage-matrix-cell', `is-${v}`]
}
</script>

<style scoped lang="scss" src="./CoverageMatrix.scss"></style>
