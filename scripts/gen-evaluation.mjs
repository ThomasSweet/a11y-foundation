import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import {
  commissioner,
  commit,
  criteria,
  evaluatedAt,
  evaluator,
  exploration,
  outcomeLabel,
  processes,
  reportFile,
  requirements,
  scope,
  tally,
  views,
} from '../src/site/EvaluationView/evaluation.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const site = 'https://accessible-by-default.dev'
const date = `${evaluatedAt}T00:00:00.000Z`

const detail = (facts, term) => facts.find((fact) => fact.term === term).detail

const context = {
  reporter: 'http://github.com/w3c/wai-wcag-em-report-tool/',
  wcagem: 'http://www.w3.org/TR/WCAG-EM/#',
  Evaluation: 'wcagem:procedure',
  defineScope: 'wcagem:step1',
  scope: 'wcagem:step1a',
  step1b: { '@id': 'wcagem:step1b', '@type': '@id' },
  conformanceTarget: 'step1b',
  accessibilitySupportBaseline: 'wcagem:step1c',
  additionalEvaluationRequirements: 'wcagem:step1d',
  exploreTarget: 'wcagem:step2',
  essentialFunctionality: 'wcagem:step2b',
  pageTypeVariety: 'wcagem:step2c',
  technologiesReliedUpon: 'wcagem:step2d',
  selectSample: 'wcagem:step3',
  structuredSample: 'wcagem:step3a',
  randomSample: 'wcagem:step3b',
  Website: 'wcagem:website',
  Webpage: 'wcagem:webpage',
  auditSample: 'wcagem:step4',
  reportFindings: 'wcagem:step5',
  documentSteps: 'wcagem:step5a',
  commissioner: 'wcagem:commissioner',
  evaluator: 'wcagem:evaluator',
  evaluationSpecifics: 'wcagem:step5b',
  WCAG: 'http://www.w3.org/TR/WCAG/#',
  WCAG20: 'http://www.w3.org/TR/WCAG20/#',
  WCAG21: 'http://www.w3.org/TR/WCAG21/#',
  WAI: 'http://www.w3.org/WAI/',
  A: 'WAI:WCAG2A-Conformance',
  AA: 'WAI:WCAG2AA-Conformance',
  AAA: 'WAI:WCAG2AAA-Conformance',
  wcagVersion: 'WAI:standards-guidelines/wcag/#versions',
  reportToolVersion: 'wcagem:reportToolVersion',
  earl: 'http://www.w3.org/ns/earl#',
  Assertion: 'earl:Assertion',
  TestMode: 'earl:TestMode',
  TestCriterion: 'earl:TestCriterion',
  TestCase: 'earl:TestCase',
  TestRequirement: 'earl:TestRequirement',
  TestSubject: 'earl:TestSubject',
  TestResult: 'earl:TestResult',
  OutcomeValue: 'earl:OutcomeValue',
  Pass: 'earl:Pass',
  Fail: 'earl:Fail',
  CannotTell: 'earl:CannotTell',
  NotApplicable: 'earl:NotApplicable',
  NotTested: 'earl:NotTested',
  assertedBy: 'earl:assertedBy',
  mode: 'earl:mode',
  result: 'earl:result',
  subject: 'earl:subject',
  test: 'earl:test',
  outcome: 'earl:outcome',
  dcterms: 'http://purl.org/dc/terms/',
  title: 'dcterms:title',
  description: 'dcterms:description',
  summary: 'dcterms:summary',
  date: 'dcterms:date',
  hasPart: 'dcterms:hasPart',
  isPartOf: 'dcterms:isPartOf',
  id: '@id',
  type: '@type',
  language: '@language',
}

const outcomes = {
  passed: { id: 'earl:passed', type: ['OutcomeValue', 'Pass'] },
  failed: { id: 'earl:failed', type: ['OutcomeValue', 'Fail'] },
  cannotTell: { id: 'earl:cantTell', type: ['OutcomeValue', 'CannotTell'] },
  notPresent: { id: 'earl:inapplicable', type: ['OutcomeValue', 'NotApplicable'] },
  notChecked: { id: 'earl:untested', type: ['OutcomeValue', 'NotTested'] },
}

const website = {
  id: '_:subject_1',
  type: ['TestSubject', 'Website'],
  date,
  title: 'Accessible by default',
  description: detail(scope, 'Product'),
}

const totals = tally()

const report = {
  '@context': context,
  type: 'Evaluation',
  language: 'en',
  reportToolVersion: '4.1.0',
  defineScope: {
    id: '_:defineScope',
    scope: website,
    wcagVersion: '2.2',
    conformanceTarget: 'AA',
    accessibilitySupportBaseline: detail(scope, 'Accessibility support baseline'),
    additionalEvaluationRequirements: detail(scope, 'Additional requirements'),
  },
  exploreTarget: {
    id: '_:exploreTarget',
    technologiesReliedUpon: [
      { title: 'HTML', id: 'https://html.spec.whatwg.org/' },
      { title: 'CSS', id: 'https://www.w3.org/Style/CSS/specs.en.html' },
      { title: 'JavaScript', id: 'https://tc39.es/ecma262/' },
      { title: 'WAI-ARIA', id: 'https://www.w3.org/TR/wai-aria/' },
      { title: 'SVG', id: 'https://www.w3.org/TR/SVG/' },
    ],
    essentialFunctionality: detail(exploration, 'Essential functionality'),
    pageTypeVariety: detail(exploration, 'Types of page'),
  },
  selectSample: {
    id: '_:selectSample',
    randomSample: [],
    structuredSample: views.map((view) => ({
      id: site + view.href,
      type: ['TestSubject', 'Webpage'],
      date,
      title: view.planted ? `${view.name} (planted)` : view.name,
      description: site + view.href,
    })),
  },
  auditSample: criteria.map((criterion) => ({
    type: 'Assertion',
    mode: 'earl:semiAuto',
    subject: website,
    test: { id: `WCAG22:${criterion.id}`, type: ['TestCriterion', 'TestRequirement'] },
    result: {
      type: 'TestResult',
      date,
      outcome: outcomes[criterion.outcome],
      description: `${outcomeLabel(criterion)}. ${criterion.note}`,
    },
  })),
  reportFindings: {
    documentSteps: [
      { id: '_:about' },
      { id: '_:defineScope' },
      { id: '_:exploreTarget' },
      { id: '_:selectSample' },
    ],
    commissioner,
    date: { '@type': 'http://www.w3.org/TR/NOTE-datetime', '@value': evaluatedAt },
    evaluator,
    evaluationSpecifics: [
      `Commit ${commit}, identical to production on the day.`,
      ...requirements.map((fact) => `${fact.term}: ${fact.detail}`),
      processes,
      'Method: WCAG-EM 2.0, W3C Group Note of 23 July 2026. The whole site was the sample, so there is no random sample.',
    ].join('\n\n'),
    summary:
      `Does not meet WCAG 2.2 Level AA. ${totals.passed} passed, ${totals.failed} failed on ordinary pages, ` +
      `${totals.plantedOnly} failed only on the two planted pages, ${totals.notPresent} not present.`,
    title: 'Accessible by default: evaluation report',
  },
}

writeFileSync(resolve(root, `public${reportFile}`), `${JSON.stringify(report, null, 2)}\n`)
