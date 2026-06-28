<template>
  <ol class="testing-layers" role="list">
    <li v-for="(layer, i) in layers" :key="layer.kind" class="testing-layers-item">
      <article class="testing-layers-card" :aria-labelledby="headingIds[i]">
        <p class="testing-layers-kind">{{ layer.n }} · {{ layer.kind }}</p>
        <h4 :id="headingIds[i]" class="testing-layers-name">{{ layer.name }}</h4>

        <dl class="testing-layers-detail">
          <dt class="visually-hidden">Catches</dt>
          <dd class="testing-layers-catches">
            <span class="testing-layers-tag testing-layers-tag-catches">Catches</span>
            {{ layer.catches }}
          </dd>
          <dt class="visually-hidden">Blind spot</dt>
          <dd class="testing-layers-blind">
            <span class="testing-layers-tag testing-layers-tag-blind">Blind spot</span>
            {{ layer.blind }}
          </dd>
        </dl>

        <p class="testing-layers-tool">{{ layer.tool }}</p>
        <ul class="testing-layers-here" role="list">
          <li v-for="artifact in layer.here" :key="artifact">
            <code>{{ artifact }}</code>
          </li>
        </ul>
      </article>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { useId } from 'vue'

interface Layer {
  n: string
  kind: string
  name: string
  catches: string
  blind: string
  tool: string
  here: string[]
}

// Bottom of the pyramid first (cheap and broad → slow but irreplaceable). Each
// layer's `here` points at the real artifact in this repo.
const layers: Layer[] = [
  {
    n: '01',
    kind: 'Static',
    name: 'Lint & types',
    catches:
      'Mechanical mistakes before the app even runs — unlayered CSS, mixin order, a mistyped token, a type error.',
    blind: 'Knows nothing about the rendered page or a real user.',
    tool: 'Stylelint · vue-tsc',
    here: ['npm run lint:css', 'npm run typecheck'],
  },
  {
    n: '02',
    kind: 'Unit',
    name: 'Pure logic',
    catches:
      'A rule you wrote, proven in isolation — here, that the theme picker’s clamp can’t be dragged into a label that fails AA at any hue.',
    blind: 'Tests the maths you extracted, not whether it’s wired into the DOM.',
    tool: 'Vitest',
    here: ['tests/unit/themePickerMath.test.ts', 'tests/unit/baseline.test.ts'],
  },
  {
    n: '03',
    kind: 'Automated DOM',
    name: 'axe sweep',
    catches:
      'The machine-checkable slice: text contrast, missing names and labels, broken ARIA, landmark and heading structure.',
    blind: 'Roughly two-thirds of WCAG is invisible to it — a clean run is necessary, never sufficient.',
    tool: 'Playwright · axe-core',
    here: ['tests/e2e/a11y.spec.ts'],
  },
  {
    n: '04',
    kind: 'Behavioural & human',
    name: 'Keyboard · screen reader · judgment',
    catches:
      'What automation can’t reason about: focus order, whether a custom control actually operates, whether meaning survives without colour, whether a change is announced.',
    blind: 'Slower, and ultimately needs a person — which is why the layers below clear the easy ground first.',
    tool: 'Playwright keyboard specs · a human with a screen reader',
    here: ['tests/e2e/keyboard.spec.ts', 'tests/e2e/inversion.spec.ts', 'manual passes'],
  },
]

const headingIds = layers.map(() => useId())
</script>

<style scoped lang="scss" src="./TestingLayers.scss"></style>
