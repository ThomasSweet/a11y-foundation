import { test, expect } from '@playwright/test'

import { revisions } from '../../src/site/HubRevisions/revisions'

const newest = [...revisions].sort((a, b) => b.date.localeCompare(a.date))[0]

test.describe('the Atom feed', () => {
  test('is served and carries one entry per revision', async ({ request }) => {
    const response = await request.get('/feed.xml')
    expect(response.status()).toBe(200)

    const xml = await response.text()
    expect(xml).toContain('<feed xmlns="http://www.w3.org/2005/Atom">')

    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? []
    expect(entries).toHaveLength(revisions.length)

    for (const entry of entries) {
      const href = entry.match(/<link rel="alternate" href="([^"]+)"\/>/)?.[1]
      expect(href, `entry without an alternate link:\n${entry}`).toBeDefined()
      expect(href).toMatch(/^https:\/\//)
    }

    const firstId = entries[0].match(/<id>([^<]+)<\/id>/)?.[1] ?? ''
    expect(firstId).toContain(newest.id)
  })
})
