import { test, expect } from '@playwright/test'

const site = 'https://accessible-by-default.dev'

test.describe('the files for agents', () => {
  test('every file llms.txt lists is served', async ({ request }) => {
    const index = await request.get('/llms.txt')
    expect(index.status()).toBe(200)

    const paths = [...(await index.text()).matchAll(/\]\((https:\/\/[^)]+)\)/g)]
      .map((match) => match[1])
      .filter((href) => href.startsWith(site))
      .map((href) => href.slice(site.length))
    expect(paths.filter((path) => path.startsWith('/llms/')).length).toBeGreaterThanOrEqual(4)

    for (const path of paths) {
      expect((await request.get(path)).status(), path).toBe(200)
    }
  })

  for (const path of ['/standard.html', '/showcase.html', '/agent-skill.html']) {
    test(`${path} points to its markdown twin`, async ({ page, request }) => {
      await page.goto(path)
      const hrefs = await page
        .locator('link[rel="alternate"][type="text/markdown"]')
        .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''))
      expect(hrefs.length).toBeGreaterThan(0)

      for (const href of hrefs) {
        const response = await request.get(href)
        expect(response.status(), href).toBe(200)
        expect(await response.text(), href).toMatch(/^# /m)
      }
    })
  }

  test('the agent-skill page links llms.txt for people too', async ({ page }) => {
    await page.goto('/agent-skill.html')
    await expect(page.getByRole('link', { name: 'llms.txt' })).toHaveAttribute('href', '/llms.txt')
  })
})
