import { test, expect } from '@playwright/test'

const pages = [
  { path: '/', text: 'Built in, not' },
  { path: '/standard.html', text: 'Guidelines, alive' },
  { path: '/craft.html', text: 'Validation that waits its turn' },
  { path: '/showcase.html', text: 'Widely available' },
  { path: '/proof.html', text: 'A layered job, not a button' },
  { path: '/glossary.html', text: 'Accessibility tree' },
  { path: '/agent-skill.html', text: 'skills/accessible-by-default' },
  { path: '/screen-reader.html', text: 'The phone in your pocket' },
  { path: '/devtools.html', text: 'Emulate a focused page' },
  { path: '/audit-room.html', text: 'Broken on purpose' },
]

test.describe('prerendered HTML', () => {
  for (const p of pages) {
    test(`${p.path} ships its content without JavaScript`, async ({ request }) => {
      const html = await (await request.get(p.path)).text()
      expect(html).toContain(p.text)
      expect(html).not.toContain('<div id="app"></div>')
    })
  }
})
