import { test, expect } from '@playwright/test'

const pages = [
  { path: '/', texts: ['Built in, not', 'What changed'] },
  { path: '/standard.html', texts: ['Guidelines, alive', 'One standard, many laws'] },
  { path: '/craft.html', texts: ['Validation that waits its turn'] },
  { path: '/showcase.html', texts: ['Widely available'] },
  { path: '/proof.html', texts: ['A layered job, not a button'] },
  { path: '/glossary.html', texts: ['Accessibility tree'] },
  { path: '/agent-skill.html', texts: ['skills/accessible-by-default'] },
  { path: '/screen-reader.html', texts: ['The phone in your pocket'] },
  { path: '/devtools.html', texts: ['Emulate a focused page'] },
  { path: '/audit-room.html', texts: ['Broken on purpose'] },
  { path: '/listening-room.html', texts: ['The listening room', 'Answers'] },
]

test.describe('prerendered HTML', () => {
  for (const p of pages) {
    test(`${p.path} ships its content without JavaScript`, async ({ request }) => {
      const html = await (await request.get(p.path)).text()
      for (const text of p.texts) expect(html).toContain(text)
      expect(html).not.toContain('<div id="app"></div>')
    })
  }
})
