<template>
  <SiteFrame home>
    <h1 class="hub-title"><span class="hub-title-accent">Built in, not</span> <span class="hub-strike">bolted&nbsp;on<svg class="hub-strike-scribble" viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"><path class="hub-strike-scribble-primer hub-strike-scribble-first" d="M 1 25 C 66 26.2, 134 28.2, 200 30.5" stroke-dasharray="200" stroke-dashoffset="200" /><path class="hub-strike-scribble-primer hub-strike-scribble-second" d="M 201 26 C 136 28.6, 66 32.4, 0 36" stroke-dasharray="202" stroke-dashoffset="202" /><path class="hub-strike-scribble-primer hub-strike-scribble-third" d="M 2 33 C 70 35.6, 136 38, 199 40" stroke-dasharray="198" stroke-dashoffset="198" /><path class="hub-strike-scribble-ink hub-strike-scribble-first" d="M 1 25 C 66 26.2, 134 28.2, 200 30.5" stroke-dasharray="200" stroke-dashoffset="200" /><path class="hub-strike-scribble-ink hub-strike-scribble-second" d="M 201 26 C 136 28.6, 66 32.4, 0 36" stroke-dasharray="202" stroke-dashoffset="202" /><path class="hub-strike-scribble-ink hub-strike-scribble-third" d="M 2 33 C 70 35.6, 136 38, 199 40" stroke-dasharray="198" stroke-dashoffset="198" /></svg></span></h1>
    <p class="hub-lede">
      How much of accessibility the modern web platform handles
      <strong>natively</strong> — with little to no JavaScript. One argument, in
      four parts. Start anywhere; the thread runs through all of them.
    </p>

    <nav class="hub-plates" aria-label="Chapters">
      <a
        v-for="p in plates"
        :key="p.href"
        class="hub-plate"
        :href="p.href"
      >
        <span class="hub-plate-top">
          <span class="hub-plate-no">{{ p.no }}</span>
          <!-- eslint-disable-next-line vue/no-v-html -- build-time icon map, never user input -->
          <span class="hub-plate-icon" aria-hidden="true" v-html="pillarIcons[p.icon]"></span>
        </span>
        <span class="hub-plate-title">{{ p.title }}</span>
        <span class="hub-plate-sub">{{ p.sub }}</span>
        <span class="hub-plate-desc">{{ p.desc }}</span>
        <span class="hub-plate-enter">{{ p.cta }} →</span>
      </a>
    </nav>

    <nav id="practice" class="hub-sheets" aria-labelledby="hub-practice-title">
      <h2 id="hub-practice-title" class="hub-sheets-title">Practice</h2>
      <p class="hub-sheets-lede">
        Where the tools the chapters taught get used in anger.
      </p>
      <ul class="hub-sheets-list" role="list">
        <li>
          <a class="hub-sheet" href="/audit-room.html">
            <span class="hub-sheet-no">P·01</span>
            <span class="hub-sheet-name">Audit room</span>
            <span class="hub-sheet-desc">A page broken on purpose: twelve barriers, your tools, answers included.</span>
          </a>
        </li>
      </ul>
    </nav>

    <nav id="reference-sheets" class="hub-sheets" aria-labelledby="hub-sheets-title">
      <h2 id="hub-sheets-title" class="hub-sheets-title">Reference sheets</h2>
      <p class="hub-sheets-lede">
        The appendix to the four chapters — standalone pages for looking
        things up and taking along.
      </p>
      <ul class="hub-sheets-list" role="list">
        <li v-for="s in sheets" :key="s.href">
          <a class="hub-sheet" :href="s.href">
            <span class="hub-sheet-no">{{ s.no }}</span>
            <span class="hub-sheet-name">{{ s.name }}</span>
            <span class="hub-sheet-desc">{{ s.desc }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <template #footer-extra>
      <section class="hub-statement" aria-labelledby="a11y-statement">
        <h2 id="a11y-statement" class="hub-statement-title">Accessibility</h2>
        <p class="hub-statement-lede">
          This site practises what it shows. It targets
          <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2 AA</a>, works with a
          keyboard and a screen reader, and honours your motion, contrast, and
          colour-scheme preferences — and it never leans on colour alone to carry
          meaning.
        </p>
        <p class="hub-statement-lede">
          It also leans on genuinely new platform features — anchor positioning,
          scroll-driven animation, container queries, <code>contrast-color()</code>.
          Each is a <GlossaryRef id="progressive-enhancement">progressive
          enhancement</GlossaryRef>: where your browser supports it you get
          the richer version; where it doesn't you get an accessible fallback, not a
          broken page. New features extend the baseline here — they never replace it.
        </p>
        <details class="hub-statement-details">
          <summary class="hub-statement-summary">What that means in practice</summary>
          <div class="hub-statement-body">
            <p>
              <strong>It's a demo, not a dependency.</strong> This is a
              playground for showing how the modern web platform answers
              accessibility natively, with little to no JavaScript — made to be
              explored and learned from, not installed into a production app.
            </p>
            <p>
              <strong>Some showcases want a recent browser.</strong> The
              “arriving next” demos use features still landing across engines. On an
              older browser they quietly fall back to a simpler, still-usable form —
              that degradation is the design, not a defect.
            </p>
            <p>
              <strong>Tested where it counts.</strong> Verified against current
              Chrome, Firefox, and Safari, with a keyboard, forced-colours mode, and
              the reduced-motion and reduced-transparency preferences.
            </p>
            <p>
              <strong>Found a barrier?</strong> Accessibility work is never
              finished. If something gets in your way,
              <a href="https://github.com/ThomasSweet/a11y-foundation/issues">open an
              issue</a> — that feedback is welcome and acted on.
            </p>
          </div>
        </details>
      </section>

      <div class="hub-author">
        <span class="hub-author-avatar" aria-hidden="true"></span>
        <div class="hub-author-body">
          <p class="hub-author-bio">
            Built by <strong>Thomas Sweet</strong> — a front-end developer
            sharpening an accessibility-first craft in the open, one experiment at
            a time. This whole site is the sketchbook. ☕
          </p>
          <ul class="hub-author-social" role="list">
            <li>
              <a class="hub-social-link" href="https://github.com/ThomasSweet" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                <span class="visually-hidden">GitHub (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a class="hub-social-link" href="https://www.linkedin.com/in/thomas-w-sweet" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                <span class="visually-hidden">LinkedIn (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a class="hub-social-link" href="https://x.com/thomas_sweet" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                <span class="visually-hidden">X (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import GlossaryRef from '../../glossary/GlossaryRef.vue'
import { pillarIcons, type PillarIconName } from '../../icons/pillarIcons'

interface Plate {
  no: string
  href: string
  icon: PillarIconName
  title: string
  sub: string
  desc: string
  cta: string
}

const plates: Plate[] = [
  { no: '01', href: '/standard.html', icon: 'standard', title: 'The standard', sub: 'The requirement', desc: 'What WCAG asks for, arranged along the timeline it grew on.', cta: 'Open the standard' },
  { no: '02', href: '/craft.html', icon: 'craft', title: 'The craft', sub: 'Shipping today', desc: 'Meeting the bar with modern CSS and native HTML.', cta: 'Open the craft' },
  { no: '03', href: '/showcase.html', icon: 'next', title: 'CSS showcase', sub: 'Arriving next', desc: 'Modern CSS worth knowing, grouped by Baseline support.', cta: 'Open the showcase' },
  { no: '04', href: '/proof.html', icon: 'proof', title: 'The proof', sub: 'Testing the claim', desc: 'How it holds up — a layered job, not a scanner.', cta: 'Open the proof' },
]

const sheets = [
  { no: 'A·01', href: '/glossary.html', name: 'Glossary', desc: 'Short, honest definitions of the vocabulary the site leans on — every term linkable.' },
  { no: 'A·02', href: '/agent-skill.html', name: 'Agent skill', desc: 'The whole argument, packaged so a coding agent can load it.' },
  { no: 'A·03', href: '/screen-reader.html', name: 'Screen reader', desc: 'The first fifteen minutes: the keystrokes that matter and a plan for hearing your own page.' },
  { no: 'A·04', href: '/devtools.html', name: 'DevTools', desc: 'The audit tooling already in the browser — and the three add-ons that earn their place.' },
  { no: 'S·01', href: '/styleguide.html', name: 'Style guide', desc: 'The tokens, type, and components this site is drawn with.' },
]
</script>

<style scoped lang="scss" src="./HubView.scss"></style>
