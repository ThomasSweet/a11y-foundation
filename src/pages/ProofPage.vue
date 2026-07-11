<template>
  <ChapterLayout id="proof" :sections="sections">
    <p class="chapter-intro">
      A standard and a clever platform answer are only claims until something
      checks them. Accessibility testing is where many teams get lost — they
      run an automated scanner, see green, and call it accessible. The honest
      picture is layered, and most of it isn't a scanner's job. (Writing these
      very tests turned up two real barriers on this site — proof the layers
      earn their place.)
    </p>

    <section class="demo" aria-labelledby="testing-layers">
      <h3 id="testing-layers">A layered job, not a button</h3>
      <p>
        Each layer is cheaper and broader than the one above it, so it clears
        the easy ground and frees the slow, human layer for what only a person
        can judge. None replaces the next. Every layer below points at the
        real artifact in this repo — the suite you can open and run.
      </p>
      <TestingLayers />
    </section>

    <section class="demo" aria-labelledby="testing-coverage">
      <h3 id="testing-coverage">What automation can and can't see</h3>
      <p>
        This is the part that's rarely spelled out. An automated pass like
        <code>axe</code> is excellent at a specific slice of WCAG and misses
        the rest entirely. Here's a sample of real defects against the methods that
        catch them — read the <code>axe</code> column top to bottom and watch
        it run out.
      </p>
      <CoverageMatrix />
    </section>

    <section class="demo" aria-labelledby="testing-audit-css">
      <h3 id="testing-audit-css">CSS that audits</h3>
      <p>
        The selector engine itself can be a testing layer. A handful of
        modern selectors — <code>:not()</code>, <code>:has()</code>,
        attribute checks — describe accessibility smells precisely enough
        to paint them on screen: no build step, no extension, just a
        stylesheet you drop into DevTools on any page. Flip the toggle and
        watch four planted defects light up while their healthy twins stay
        quiet.
      </p>
      <AuditStylesheet />
    </section>

    <section class="demo" aria-labelledby="testing-performance">
      <h3 id="testing-performance">Performance is accessibility</h3>
      <p>
        Performance work usually files under "nice to have." For assistive
        tech it's load-bearing. A screen reader walks the accessibility
        tree through the same main thread your JavaScript blocks — every
        long task is a stretch of silence between a keypress and hearing
        where you landed. Motion that stutters is harder on vestibular
        disorders than motion that glides, which is why this site animates
        only <code>transform</code> and <code>opacity</code>: honoring
        <code>prefers-reduced-motion</code> is step one, keeping the
        remaining motion off the main thread is step two. And input
        latency is felt hardest by the people who type through switch
        devices or sticky keys — for them, a sluggish keystroke isn't an
        annoyance but the interface going unresponsive mid-word. Less
        JavaScript isn't just this site's aesthetic; it's why the
        assistive-tech experience stays quick.
      </p>
    </section>
  </ChapterLayout>
</template>

<script setup lang="ts">
import ChapterLayout from '../site/ChapterLayout/ChapterLayout.vue'
import TestingLayers from '../testing/TestingLayers/TestingLayers.vue'
import AuditStylesheet from '../testing/AuditStylesheet/AuditStylesheet.vue'
import CoverageMatrix from '../testing/CoverageMatrix/CoverageMatrix.vue'

const sections = [
  { id: 'testing-layers', label: 'A layered job, not a button' },
  { id: 'testing-coverage', label: "What automation can and can't see" },
  { id: 'testing-audit-css', label: 'CSS that audits' },
  { id: 'testing-performance', label: 'Performance is accessibility' },
]
</script>
