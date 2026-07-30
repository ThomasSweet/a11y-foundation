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

    <section class="demo" aria-labelledby="testing-layers" style="view-timeline-name: --chapter-sec-1">
      <h3 id="testing-layers">A layered job, not a button</h3>
      <p>
        Each layer is cheaper and broader than the one above it, so it clears
        the easy ground and frees the slow, human layer for what only a person
        can judge. None replaces the next. Every layer below points at the
        real artifact in this repo — the suite you can open and run.
      </p>
      <p>
        The layers also answer a fair question: tested for <em>whom</em>? In
        <a href="https://webaim.org/projects/screenreadersurvey10/">WebAIM's
        tenth screen-reader survey</a> (1,539 respondents, early 2024),
        91.3% reported using a screen reader on a mobile device — while most
        testing happens at a desktop. And the frustrations they ranked
        highest — CAPTCHA, interactive elements behaving unexpectedly,
        unclear links and buttons — are judgment calls no scanner flags.
        Only about a third felt the web had become more accessible. The
        layered model exists because the failures that matter most live
        where automation isn't looking.
      </p>
      <TestingLayers />
      <p>
        One more layer costs nothing and isn't in the diagram: reader mode.
        It rebuilds the page from semantics alone — headings, lists, article
        structure — so a page that survives the trip probably has its bones
        right, and a page reader mode can't parse is one a screen reader is
        likely fighting too. Thirty seconds, no tooling.
      </p>
    </section>

    <section class="demo" aria-labelledby="testing-coverage" style="view-timeline-name: --chapter-sec-2">
      <h3 id="testing-coverage">What automation can and can't see</h3>
      <p>
        This is the part that's rarely spelled out. An automated pass like
        <code>axe</code> is excellent at a specific slice of
        <GlossaryRef id="wcag">WCAG</GlossaryRef> and misses
        the rest entirely. Here's a sample of real defects against the methods that
        catch them — read the <code>axe</code> column top to bottom and watch
        it run out.
      </p>
      <CoverageMatrix />
    </section>

    <section class="demo" aria-labelledby="testing-audit-css" style="view-timeline-name: --chapter-sec-3">
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

    <section class="demo" aria-labelledby="testing-performance" style="view-timeline-name: --chapter-sec-4">
      <h3 id="testing-performance">Performance is accessibility</h3>
      <p>
        Performance work usually files under "nice to have." For assistive
        tech it's load-bearing. A
        <GlossaryRef id="screen-reader">screen reader</GlossaryRef> walks the accessibility
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

    <section class="demo" aria-labelledby="testing-edge" style="view-timeline-name: --chapter-sec-5">
      <h3 id="testing-edge">Where this argument stops</h3>
      <p>
        Everything on this site stays on one side of a line: what HTML and
        CSS guarantee before any JavaScript arrives. The other side is real,
        and application work lands on it daily — ARIA widget patterns, live
        regions that announce what just changed, focus management after a
        route change or a deletion. Those are JavaScript's territory,
        harder to get right than anything shown here, and claiming CSS
        covers them would be exactly the kind of overclaim this site
        argues against. When you cross the line, the
        <a href="https://www.w3.org/WAI/ARIA/apg/">ARIA Authoring Practices
        Guide</a> is the map — and the habit from this chapter still
        applies: test what you build, in layers, with the people and tools
        the layers stand in for.
      </p>
    </section>
  </ChapterLayout>
</template>

<script setup lang="ts">
import ChapterLayout from '../site/ChapterLayout/ChapterLayout.vue'
import GlossaryRef from '../glossary/GlossaryRef.vue'
import TestingLayers from '../testing/TestingLayers/TestingLayers.vue'
import AuditStylesheet from '../testing/AuditStylesheet/AuditStylesheet.vue'
import CoverageMatrix from '../testing/CoverageMatrix/CoverageMatrix.vue'

const sections = [
  { id: 'testing-layers', label: 'A layered job, not a button' },
  { id: 'testing-coverage', label: "What automation can and can't see" },
  { id: 'testing-audit-css', label: 'CSS that audits' },
  { id: 'testing-performance', label: 'Performance is accessibility' },
  { id: 'testing-edge', label: 'Where this argument stops' },
]
</script>
