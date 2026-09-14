import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { revisions } from '../src/site/HubRevisions/revisions.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const site = 'https://accessible-by-default.dev'

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const absolute = (href) => (href.startsWith('http') ? href : site + href)
const stamp = (date) => `${date}T00:00:00Z`

const sorted = [...revisions].sort((a, b) => b.date.localeCompare(a.date))

const entries = sorted
  .map(
    (r) => `  <entry>
    <id>tag:accessible-by-default.dev,${r.date}:${r.id}</id>
    <title>${escape(r.area)}: ${escape(r.title)}</title>
    <link rel="alternate" href="${escape(absolute(r.href))}"/>
    <published>${stamp(r.date)}</published>
    <updated>${stamp(r.date)}</updated>
    <summary>${escape(r.lead + r.linkText + r.tail)}</summary>
  </entry>`,
  )
  .join('\n')

const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Accessible by default: what changed</title>
  <subtitle>What moved in the platform and the standards, and what it changed on accessible-by-default.dev. Newest first.</subtitle>
  <id>${site}/feed.xml</id>
  <link rel="self" type="application/atom+xml" href="${site}/feed.xml"/>
  <link rel="alternate" type="text/html" href="${site}/#what-changed"/>
  <updated>${stamp(sorted[0].date)}</updated>
  <author><name>Thomas Sweet</name></author>
${entries}
</feed>
`

writeFileSync(resolve(root, 'public/feed.xml'), feed)
console.log(`gen-feed: ${sorted.length} entries → public/feed.xml`)
