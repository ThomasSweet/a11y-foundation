import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { revisions, revisionsShown } from '../../src/site/HubRevisions/revisions'

const registrySource = readFileSync(
  fileURLToPath(new URL('../../src/showcases/registry.ts', import.meta.url)),
  'utf8',
)
const showcaseIds = [...registrySource.matchAll(/^ {4}id: '([^']+)',$/gm)].map((m) => m[1])
const now = new Date()
const today = new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
const showcaseAnchor = /^\/showcase\.html#showcase-(.+)$/

describe('revisions registry', () => {
  it('finds the showcase ids', () => {
    expect(showcaseIds.length).toBeGreaterThan(0)
  })

  it('keeps ids unique', () => {
    const ids = revisions.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('shows no more entries than it has', () => {
    expect(revisions.length).toBeGreaterThanOrEqual(revisionsShown)
  })

  it.each(revisions.map((r) => [r.id, r] as const))('%s is well formed', (_id, r) => {
    expect(r.date, `${r.id}: date must be YYYY-MM-DD`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(
      new Date(`${r.date}T00:00:00Z`).toISOString().slice(0, 10),
      `${r.id}: date must be a real calendar date`,
    ).toBe(r.date)
    expect(r.date <= today, `${r.id}: date ${r.date} is after today (${today})`).toBe(true)

    expect(r.linkText.trim(), `${r.id}: linkText is empty`).not.toBe('')
    expect(r.lead, `${r.id}: lead must hold no markup`).not.toContain('<')
    expect(r.tail, `${r.id}: tail must hold no markup`).not.toContain('<')
    expect(r.href, `${r.id}: href must be site-relative or https`).toMatch(/^(\/|https:\/\/)/)

    const anchor = r.href.match(showcaseAnchor)
    if (anchor) {
      expect(showcaseIds, `${r.id}: no showcase with id "${anchor[1]}"`).toContain(anchor[1])
    }
  })
})
