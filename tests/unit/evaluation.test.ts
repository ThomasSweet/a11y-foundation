import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import {
  criteria,
  evaluatedOn,
  outcomeLabel,
  reportFile,
  tally,
  views,
} from '../../src/site/EvaluationView/evaluation'

const root = fileURLToPath(new URL('../../', import.meta.url))
const statement = readFileSync(`${root}src/site/StatementView/StatementView.vue`, 'utf8')
const report = JSON.parse(readFileSync(`${root}public${reportFile}`, 'utf8'))

describe('evaluation report', () => {
  it('judges all 55 Level A and AA criteria of WCAG 2.2, once each', () => {
    expect(new Set(criteria.map((criterion) => criterion.num)).size).toBe(55)
    expect(criteria).toHaveLength(55)
  })

  it('counts every criterion once', () => {
    const { passed, failed, plantedOnly, notPresent, cannotTell } = tally()
    expect(passed + failed + plantedOnly + notPresent + cannotTell).toBe(criteria.length)
  })

  it('keeps planted only for failures', () => {
    const misplaced = criteria.filter((c) => c.plantedOnly && c.outcome !== 'failed')
    expect(misplaced).toEqual([])
  })

  it('lists every view once', () => {
    expect(new Set(views.map((view) => view.href)).size).toBe(views.length)
  })

  it('matches the JSON report that opens in the WCAG-EM Report Tool', () => {
    expect(report.auditSample).toHaveLength(criteria.length)
    expect(report.selectSample.structuredSample).toHaveLength(views.length)
    criteria.forEach((criterion, index) => {
      const assertion = report.auditSample[index]
      expect(assertion.test.id).toBe(`WCAG22:${criterion.id}`)
      expect(assertion.result.description).toBe(`${outcomeLabel(criterion)}. ${criterion.note}`)
    })
  })

  it('stays openable in the report tool', () => {
    expect(report['@context']).not.toHaveProperty('WCAG22')
    expect(report.reportFindings.date).toHaveProperty('@value')
  })

  it('gives the statement the same date and the same count', () => {
    const { failed } = tally()
    const sentence = statement.replace(/\s+/g, ' ')
    expect(sentence).toContain(`evaluation on ${evaluatedOn}`)
    expect(sentence).toContain(`${failed} of the ${criteria.length} criteria failed`)
  })
})
