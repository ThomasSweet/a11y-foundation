import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Pure logic only (colour maths, the Baseline manifest) — no DOM needed,
    // so the fast node environment. Component/interaction behaviour is covered
    // by the Playwright e2e suite in tests/e2e, which this scope excludes.
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
  },
})
