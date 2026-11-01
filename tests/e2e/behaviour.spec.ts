import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { test } from '@playwright/test'
import { expect, walkModal } from '@accessible-by-default/checks'

const root = fileURLToPath(new URL('../../', import.meta.url))
const pages = [...readdirSync(root), ...readdirSync(`${root}public`)]
  .filter((name) => name.endsWith('.html'))
  .map((name) => `/${name}`)
  .concat('/checks/')

test.use({ contextOptions: { reducedMotion: 'reduce' } })

test('the page list covers every page', () => {
  expect(pages.length).toBeGreaterThanOrEqual(18)
})

for (const path of pages) {
  test(`${path} has no false expanded state and no untied error`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' })
    await expect(page).toHaveTruthfulExpandedState({ warnings: 'fail' })
    await expect(page).toHaveErrorsTiedToFields({ warnings: 'fail' })
  })
}

for (const [path, name] of [
  ['/craft.html', 'Open dialog'],
  ['/showcase.html', 'Open the dialog'],
] as const) {
  test(`the "${name}" dialog on ${path} holds focus and gives it back`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' })
    const opener = page.getByRole('button', { name, exact: true })
    await opener.scrollIntoViewIfNeeded()
    await expect(opener).toOpenADialogThatHoldsFocus({ warnings: 'fail' })
  })
}

test('the takeover dialog warns only that Escape does not close it, by design', async ({ page }) => {
  await page.goto('/showcase.html', { waitUntil: 'networkidle' })
  const opener = page.getByRole('button', { name: 'Open takeover dialog', exact: true })
  await opener.scrollIntoViewIfNeeded()
  const findings = await walkModal(opener, { close: page.getByRole('button', { name: 'Got it', exact: true }) })
  expect(findings.map(({ code }) => code)).toEqual(['modal-walk/escape-does-not-close'])
})

test('the craft form shows no untied error after an empty submit', async ({ page }) => {
  await page.goto('/craft.html', { waitUntil: 'networkidle' })
  const form = page.locator('form.demo-stack')
  await form.getByRole('button', { name: 'Save' }).click()
  await expect(form).toHaveErrorsTiedToFields({ warnings: 'fail' })
})
