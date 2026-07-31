<template>
  <ChapterLayout id="proof">
    <p class="chapter-intro">
      A standard and a clever platform answer are only claims until something
      checks them. Accessibility testing is where many teams get lost — they
      run an automated scanner, see green, and call it accessible. The honest
      picture is layered, and most of it isn't a scanner's job. (Writing these
      very tests turned up two real barriers on this site — proof the layers
      earn their place.)
    </p>

    <ChapterSection id="testing-layers" title="A layered job, not a button">
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
        The slow human layer starts with a screen reader you already own.
        If you have never heard a page read aloud,
        <a href="/screen-reader.html">a screen reader's first fifteen
        minutes</a> (sheet A·03) has the keystrokes that matter and a plan
        for hearing your own page.
      </p>
      <p>
        One more layer costs nothing and isn't in the diagram: reader mode.
        It rebuilds the page from semantics alone — headings, lists, article
        structure — so a page that survives the trip probably has its bones
        right, and a page reader mode can't parse is one a screen reader is
        likely fighting too. Thirty seconds, no tooling.
      </p>
    </ChapterSection>

    <ChapterSection
      id="testing-tree"
      title="Reading the accessibility tree"
      rail-label="The accessibility tree"
    >
      <p>
        A screen reader doesn't read your HTML, and it doesn't see your
        pixels. The browser distils every element into a parallel structure —
        the <GlossaryRef id="accessibility-tree">accessibility
        tree</GlossaryRef> — and that is what gets spoken: for each node a
        role (what is this?), a name (what is it called?), and, for controls,
        a value or state (what is it right now?). WCAG 4.1.2 is literally
        titled <em>Name, Role, Value</em>; it asks that this tree end up
        complete. What you hear in a screen reader's first fifteen minutes
        is this tree, read aloud.
      </p>
      <p>
        You can read it directly. In Chrome or Edge, select an element in the
        Elements panel and open the <strong>Accessibility</strong> pane; in
        Firefox it's the Accessibility tab in the inspector; Safari shows the
        same under the Node sidebar in Web Inspector. Try it on the four
        specimens below — none of the captions ask to be believed. Select the
        element and read what the browser actually computed. The pane is one
        of eight built-in tools — <a href="/devtools.html">the DevTools
        sheet</a> inventories the rest.
      </p>
      <AccessibilityTree />
      <p>
        When several naming mechanisms collide, the
        <a href="https://www.w3.org/TR/accname-1.2/">name computation</a>
        settles it in strict order: <code>aria-labelledby</code> beats
        <code>aria-label</code>, which beats the native sources — the
        <code>&lt;label&gt;</code>, an image's <code>alt</code>, the
        element's own content — with <code>title</code> as a last resort.
        The practical rule hiding in that order: prefer the native source,
        because it stays visible, translated, and true; and when you must
        layer ARIA on top, start with the visible words. The tree is the
        contract between your markup and every assistive technology — the
        rest of this chapter is ways of checking the contract held.
      </p>
    </ChapterSection>

    <ChapterSection id="testing-coverage" title="What automation can and can't see">
      <p>
        This is the part that's rarely spelled out. An automated pass like
        <code>axe</code> is excellent at a specific slice of
        <GlossaryRef id="wcag">WCAG</GlossaryRef> and misses
        the rest entirely. Here's a sample of real defects against the methods that
        catch them — read the <code>axe</code> column top to bottom and watch
        it run out.
      </p>
      <CoverageMatrix />
    </ChapterSection>

    <ChapterSection id="testing-audit-css" title="CSS that audits">
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
    </ChapterSection>

    <ChapterSection id="testing-filing" title="Filing what you find">
      <p>
        Most audit findings die in a backlog, and it's usually the report's
        fault. A ticket titled "fails WCAG 1.3.1" competes against feature
        work and loses — and copying severity from the conformance level
        grades how foundational the <em>rule</em> is, not how much this
        instance hurts. Grade each finding by user impact instead, with
        three questions:
        is the task blocked, or just harder? how often does someone hit it —
        critical path or corner? and is there a workaround a non-expert
        would actually find? A silent div-button on checkout and a redundant
        alt text can fail at the same level; they are not the same bug.
      </p>
      <p>
        The report itself has one job: let a teammate who wasn't in the
        audit act on it. So the headline names the barrier — what a person
        cannot do — not the criterion. The setup names the assistive tech
        and browser together, because bugs live in pairs. The criterion
        appears once, as a reference, so nobody has to become a WCAG lawyer
        to close the ticket. And it's one barrier per ticket, sized like any
        other bug — never one mega-ticket called "accessibility audit".
        Filled in the way an audit of a fictional checkout might:
      </p>
      <CodeBlock :code="bugTemplate" label="md" />
      <p>
        The last line is where this site's whole argument cashes out: most
        accessibility bugs are a native element that got rebuilt by hand, so
        most suspected fixes are swaps — the same swaps
        <a href="/agent-skill.html">the agent skill</a> teaches. And when a
        finding has no obvious fix line, that's fine. Naming the barrier
        precisely is the report's real work.
      </p>
    </ChapterSection>

    <ChapterSection id="testing-performance" title="Performance is accessibility">
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
    </ChapterSection>

    <ChapterSection id="testing-edge" title="Where this argument stops">
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
    </ChapterSection>
  </ChapterLayout>
</template>

<script setup lang="ts">
import ChapterLayout from '../site/ChapterLayout/ChapterLayout.vue'
import ChapterSection from '../site/ChapterSection/ChapterSection.vue'
import GlossaryRef from '../glossary/GlossaryRef.vue'
import TestingLayers from '../testing/TestingLayers/TestingLayers.vue'
import AccessibilityTree from '../testing/AccessibilityTree/AccessibilityTree.vue'
import AuditStylesheet from '../testing/AuditStylesheet/AuditStylesheet.vue'
import CoverageMatrix from '../testing/CoverageMatrix/CoverageMatrix.vue'
import CodeBlock from '../showcases/CodeBlock/CodeBlock.vue'

const bugTemplate = `## Barrier: payment method can't be chosen with a keyboard

**Impact**: Blocker — checkout cannot be completed
**Where**: /checkout, the payment method cards
**Setup**: VoiceOver + Safari 26 (also reproduced: NVDA + Firefox)

**Steps**
1. Tab through the checkout form
2. Focus jumps from the address field straight to "Pay now"
3. The payment cards are never reachable

**Heard**: "Pay now, button" — no mention a choice was expected
**Expected**: each card focusable, announcing name, role, checked state

**Reference**: WCAG 2.1.1 Keyboard
**Suspected fix**: the cards are divs with click handlers —
a native radio group does all of this for free`
</script>
