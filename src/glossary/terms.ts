/**
 * Glossary — single source for the legend page (glossary.html) and the inline
 * GlossaryRef previews, so a definition can never drift between the two.
 *
 * Voice: two sentences max, written for someone new to a11y or new CSS.
 * WCAG 3.1.3/3.1.4 name a glossary as the mechanism for unusual words and
 * abbreviations — this is that mechanism, and the site gets to demo it.
 */

export interface GlossaryEntry {
  /** Anchor id on glossary.html — stable, kebab-case. */
  id: string
  term: string
  def: string
}

export const glossaryTerms: GlossaryEntry[] = [
  {
    id: 'a11y',
    term: 'a11y',
    def:
      'Numeronym for “accessibility”: a, eleven letters, y. Making the web ' +
      'usable by people with disabilities — the whole point of this site.',
  },
  {
    id: 'aria',
    term: 'ARIA',
    def:
      'Accessible Rich Internet Applications: attributes that add semantics ' +
      'for assistive technology when native HTML can’t express them. The ' +
      'first rule of ARIA: prefer native HTML, which needs none.',
  },
  {
    id: 'accessibility-tree',
    term: 'Accessibility tree',
    def:
      'The browser’s distilled version of the page that assistive technology ' +
      'actually reads: for every element that matters, a role, a name, and ' +
      'its current state. DevTools can show it to you.',
  },
  {
    id: 'assistive-technology',
    term: 'Assistive technology (AT)',
    def:
      'Software or hardware people use to perceive and operate the web — ' +
      'screen readers, switch devices, magnifiers, voice control.',
  },
  {
    id: 'baseline',
    term: 'Baseline',
    def:
      'The web platform’s shared support signal: “widely available” (stable ' +
      'in all engines for ~30 months), “newly available” (everywhere, but ' +
      'recent), “limited availability” (not yet in every engine). The ' +
      'showcase tiers borrow its exact vocabulary.',
  },
  {
    id: 'cascade-layers',
    term: 'Cascade layers',
    def:
      '@layer — named priority bands for CSS, so user-preference styles can ' +
      'beat component styles without !important. This site’s entire ' +
      'stylesheet is layered; that is the one hard rule here.',
  },
  {
    id: 'cvd',
    term: 'Color-vision deficiency (CVD)',
    def:
      'Reduced ability to tell certain hues apart — “color blindness”. Why ' +
      'meaning never rides on color alone here, and why the theme picker ' +
      'ships CVD-friendly presets.',
  },
  {
    id: 'conformance-level',
    term: 'Conformance level (A / AA / AAA)',
    def:
      'WCAG’s three strictness grades. AA is the common legal and ' +
      'contractual target; this site aims at WCAG 2.2 AA and demos a few ' +
      'AAA criteria on top.',
  },
  {
    id: 'design-tokens',
    term: 'Design tokens',
    def:
      'Named values — colors, spacing, type sizes — declared once and used ' +
      'everywhere, so themes and user preferences re-skin the site by ' +
      'swapping values, not rewriting rules.',
  },
  {
    id: 'forced-colors',
    term: 'Forced colors',
    def:
      'An OS accessibility mode (like Windows High Contrast) that replaces ' +
      'site colors with the user’s own palette. CSS meets it through the ' +
      'forced-colors media query; component boundaries must survive it.',
  },
  {
    id: 'interop',
    term: 'Interop',
    def:
      'The yearly joint project where the Chrome, Firefox, and Safari teams ' +
      'pick platform features and make them behave identically across all ' +
      'three engines — the reason “works everywhere” keeps expanding.',
  },
  {
    id: 'landmark',
    term: 'Landmark',
    def:
      'A labeled page region — header, nav, main, footer — that assistive ' +
      'technology can list and jump between. Free structure, straight from ' +
      'semantic HTML.',
  },
  {
    id: 'pour',
    term: 'POUR',
    def:
      'WCAG’s four principles: Perceivable, Operable, Understandable, ' +
      'Robust. Every criterion in the standard hangs off one of them.',
  },
  {
    id: 'progressive-enhancement',
    term: 'Progressive enhancement',
    def:
      'Build the accessible baseline first, then layer richer behavior on ' +
      'top where the browser supports it — so missing support means a ' +
      'plainer page, never a broken one.',
  },
  {
    id: 'reduced-motion',
    term: 'Reduced motion',
    def:
      'A system preference (prefers-reduced-motion) asking for less ' +
      'animation — for people with vestibular disorders, motion is ' +
      'physically sickening. Here, animation is an enhancement that bows ' +
      'out on request.',
  },
  {
    id: 'screen-reader',
    term: 'Screen reader',
    def:
      'Assistive technology that speaks the page aloud (VoiceOver, NVDA, ' +
      'JAWS), navigating by the semantics in the markup — the reason markup ' +
      'quality is something you can hear.',
  },
  {
    id: 'semantic-html',
    term: 'Semantic HTML',
    def:
      'Elements that say what they are — button, nav, details, h1 — and ' +
      'bring keyboard behavior and assistive-tech meaning with them for ' +
      'free. The site’s little-to-no-JavaScript thesis rests on this.',
  },
  {
    id: 'skip-link',
    term: 'Skip link',
    def:
      'A link, first tab stop on the page, that jumps straight past ' +
      'repeated navigation to the content (WCAG 2.4.1). Press Tab once on ' +
      'any page here to meet one.',
  },
  {
    id: 'wcag',
    term: 'WCAG',
    def:
      'The Web Content Accessibility Guidelines — the W3C standard (2.2 is ' +
      'current) that most accessibility law worldwide points at. Chapter 01 ' +
      'walks its timeline.',
  },
]
