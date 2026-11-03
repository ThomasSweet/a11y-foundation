export type Outcome = 'passed' | 'failed' | 'cannotTell' | 'notPresent' | 'notChecked'

export interface Criterion {
  num: string
  id: string
  name: string
  level: 'A' | 'AA'
  outcome: Outcome
  plantedOnly?: boolean
  note: string
}

export interface Fact {
  term: string
  detail: string
}

export interface View {
  name: string
  href: string
  planted?: boolean
}

export const evaluatedOn = '2 November 2026'
export const evaluatedAt = '2026-11-02'
export const commit = '1724f83'
export const reportFile = '/evaluation-2026-11.json'
export const evaluator = 'Claude, an AI model made by Anthropic'
export const commissioner = 'Thomas Sweet'

export const limit =
  'WCAG-EM allows a formal evaluation statement only when every page meets ' +
  'the target, and partial conformance only for third-party content or ' +
  'unsupported languages. The planted pages fail on purpose and are neither, ' +
  'so this site can publish a report like this one, but not that statement.'

export const processes =
  'No series of pages forms a process that has to be completed, so that step ' +
  'of the method added nothing. The form, the demos and the rooms were still ' +
  'operated, under the criteria below.'

export const views: View[] = [
  { name: 'Home', href: '/' },
  { name: 'The standard', href: '/standard.html' },
  { name: 'The craft', href: '/craft.html' },
  { name: 'CSS showcase', href: '/showcase.html' },
  { name: 'The proof', href: '/proof.html' },
  { name: 'Glossary', href: '/glossary.html' },
  { name: 'Agent skill', href: '/agent-skill.html' },
  { name: 'Checks package', href: '/checks/' },
  { name: 'Accessibility statement', href: '/accessibility.html' },
  { name: 'Screen reader', href: '/screen-reader.html' },
  { name: 'DevTools', href: '/devtools.html' },
  { name: 'Audit room', href: '/audit-room.html' },
  { name: 'Listening room', href: '/listening-room.html' },
  { name: 'Style guide', href: '/styleguide.html' },
  { name: 'Impressum', href: '/impressum.html' },
  { name: 'Privacy', href: '/privacy.html' },
  { name: 'Page not found', href: '/404.html' },
  { name: 'Broken page', href: '/broken-page.html', planted: true },
  { name: 'Broken press kit', href: '/broken-press-kit.html', planted: true },
]

export const scope: Fact[] = [
  {
    term: 'Product',
    detail:
      'All content on accessible-by-default.dev: 19 pages with their dialogs, ' +
      'popovers, open details and demo states. There is no third-party ' +
      'content. Machine-readable files such as the feed and the llms text ' +
      'files were not evaluated.',
  },
  { term: 'Conformance target', detail: 'WCAG 2.2 Level AA.' },
  {
    term: 'Accessibility support baseline',
    detail:
      'Current Chrome, Firefox and Safari on macOS, Safari on iOS, and ' +
      'VoiceOver on the Mac.',
  },
  {
    term: 'Additional requirements',
    detail:
      'Every page rather than a sample, in all ten colour schemes of the ' +
      'theme picker. Failures on the planted pages are reported and marked ' +
      'as planted.',
  },
]

export const exploration: Fact[] = [
  {
    term: 'Technologies relied upon',
    detail:
      'HTML, CSS, JavaScript, WAI-ARIA and SVG. Pages are prerendered from ' +
      'Vue 3 at build time, and their text is the same with JavaScript off.',
  },
  {
    term: 'Essential functionality',
    detail:
      'Reading the chapters, choosing a colour scheme that persists, trying ' +
      'the demos and their “Break this rule” toggles, working through the ' +
      'practice rooms, copying code, and reporting a barrier.',
  },
  {
    term: 'Types of page',
    detail:
      'The home page, chapters with live demos, reference sheets, practice ' +
      'rooms that frame a planted page, tool pages, the style guide and ' +
      'legal pages on their own frame, a static 404, and the two planted ' +
      'pages.',
  },
]

export const requirements: Fact[] = [
  {
    term: 'Conformance level',
    detail: 'Not reached: see the results by criterion.',
  },
  {
    term: 'Full pages',
    detail:
      'Failed. Every part of every page was evaluated. The audit room and ' +
      'the listening room show a planted page in a preview, and a page ' +
      'cannot leave part of itself out, so those two cannot conform while ' +
      'the previews stay.',
  },
  {
    term: 'Complete processes',
    detail: 'Not present. No series of pages forms a process.',
  },
  {
    term: 'Accessibility-supported ways of using technologies',
    detail:
      'Cannot tell. The features relied on are long-established native HTML, ' +
      'and newer ones have working fallbacks, but no assistive technology ' +
      'was run, so this rests on code and accessibility trees.',
  },
  {
    term: 'Non-interference',
    detail:
      'Failed through planted content only: the audit room’s preview runs ' +
      'the bouncing badge with no way to stop it, and 2.2.2 applies to all ' +
      'of a page.',
  },
]

export const method: Fact[] = [
  {
    term: 'Evaluator',
    detail:
      `${evaluator}, working in Claude Code. A separate pass by other agents ` +
      'then judged every criterion without seeing the first, and a skeptic ' +
      'challenged each result. That pass found failures the first had ' +
      'missed and reversed some of its calls.',
  },
  { term: 'Commissioner and owner', detail: commissioner },
  { term: 'Date', detail: evaluatedOn },
  { term: 'Method', detail: 'WCAG-EM 2.0, the W3C Group Note of 23 July 2026.' },
  {
    term: 'Tools',
    detail:
      'Playwright 1.64.1 driving Chromium 156, Firefox 157 and WebKit 27.2 on ' +
      'macOS, axe-core 4.14.0, pixel sampling for text on gradients, and ' +
      'reading the source and every page’s text.',
  },
  {
    term: 'What was not done',
    detail:
      'No assistive technology was run, and neither Safari nor a real iPhone ' +
      'was used: WebKit is not Safari. No people with disabilities took part, ' +
      'which WCAG-EM strongly recommends. A pass here means no failure was ' +
      'found, not that nobody will meet a barrier.',
  },
]

export const criteria: Criterion[] = [
  {
    num: '1.1.1',
    id: 'non-text-content',
    name: 'Non-text Content',
    level: 'A',
    outcome: 'failed',
    plantedOnly: true,
    note:
      'A photo with no alt text, another named by its filename, and a logo ' +
      'heading with no name. On the other 17 pages, about 550 graphics are ' +
      'named, or hidden beside text that says the same thing.',
  },
  {
    num: '1.2.1',
    id: 'audio-only-and-video-only-prerecorded',
    name: 'Audio-only and Video-only (Prerecorded)',
    level: 'A',
    outcome: 'notPresent',
    note: 'No audio or video on any page.',
  },
  {
    num: '1.2.2',
    id: 'captions-prerecorded',
    name: 'Captions (Prerecorded)',
    level: 'A',
    outcome: 'notPresent',
    note: 'No audio or video on any page.',
  },
  {
    num: '1.2.3',
    id: 'audio-description-or-media-alternative-prerecorded',
    name: 'Audio Description or Media Alternative (Prerecorded)',
    level: 'A',
    outcome: 'notPresent',
    note: 'No audio or video on any page.',
  },
  {
    num: '1.2.4',
    id: 'captions-live',
    name: 'Captions (Live)',
    level: 'AA',
    outcome: 'notPresent',
    note: 'No audio or video on any page.',
  },
  {
    num: '1.2.5',
    id: 'audio-description-prerecorded',
    name: 'Audio Description (Prerecorded)',
    level: 'AA',
    outcome: 'notPresent',
    note: 'No audio or video on any page.',
  },
  {
    num: '1.3.1',
    id: 'info-and-relationships',
    name: 'Info and Relationships',
    level: 'A',
    outcome: 'failed',
    note:
      'Each slider’s label on the showcase’s theme picker wraps an output ' +
      'element and binds to that, so neither slider is tied to its label, ' +
      'in all three engines (failure F111). Headings, tables, lists and ' +
      'groups elsewhere are marked up properly. Whether Safari keeps list ' +
      'semantics on lists without markers was not measured.',
  },
  {
    num: '1.3.2',
    id: 'meaningful-sequence',
    name: 'Meaningful Sequence',
    level: 'A',
    outcome: 'passed',
    note: 'Reading order keeps its meaning on every page at 390, 768 and 1280 pixels wide.',
  },
  {
    num: '1.3.3',
    id: 'sensory-characteristics',
    name: 'Sensory Characteristics',
    level: 'A',
    outcome: 'passed',
    note:
      'Instructions were searched on every page with all details open. Any ' +
      'that mention position, colour or shape also name the thing itself.',
  },
  {
    num: '1.3.4',
    id: 'orientation',
    name: 'Orientation',
    level: 'AA',
    outcome: 'passed',
    note:
      'Every page works in portrait and landscape in Chromium and WebKit, and ' +
      'nothing locks orientation in the CSS or the web app manifest.',
  },
  {
    num: '1.3.5',
    id: 'identify-input-purpose',
    name: 'Identify Input Purpose',
    level: 'AA',
    outcome: 'failed',
    note:
      'The craft form asks for a display name and an email address with no ' +
      'autocomplete tokens, although the site’s own 1.3.5 demo has them. The ' +
      'form sends nothing, but the criterion has no exception for that.',
  },
  {
    num: '1.4.1',
    id: 'use-of-color',
    name: 'Use of Color',
    level: 'A',
    outcome: 'failed',
    note:
      'Two showcase demos: the service status dots differ only by colour ' +
      'until a checkbox adds cues, and the email fields show valid and ' +
      'invalid only by border colour (red against green is 1.08:1). Links in ' +
      'running text are all underlined.',
  },
  {
    num: '1.4.2',
    id: 'audio-control',
    name: 'Audio Control',
    level: 'A',
    outcome: 'notPresent',
    note: 'Nothing on the site plays sound.',
  },
  {
    num: '1.4.3',
    id: 'contrast-minimum',
    name: 'Contrast (Minimum)',
    level: 'AA',
    outcome: 'failed',
    note:
      'Measured across about 33,000 text nodes in ten colour schemes. In the ' +
      'default schemes: the current chapter’s number in the contents and the ' +
      'hover tint on chapter and home page links (4.36:1 light, 3.93:1 dark), ' +
      'white text on the scroll-snap cards in dark (3.3:1), the top row of ' +
      'What changed in dark (4.19:1), one dimmed sentence in the hiding ' +
      'matrix (4.17:1 light), and placeholders on styled fields (3.62:1 in ' +
      'Chromium dark, 4.06:1 in Firefox light, 2.35:1 in WebKit light). In ' +
      'presets: the code language tag (down to 4.01:1) and the tag above the ' +
      'room previews (down to 3.72:1). The CI axe sweep missed all of this: ' +
      'the sheet’s grid is a gradient, so axe could not decide most text.',
  },
  {
    num: '1.4.4',
    id: 'resize-text',
    name: 'Resize Text',
    level: 'AA',
    outcome: 'failed',
    note:
      'The theme panel cannot scroll. At 200% zoom in a 1280 by 900 window, 3 ' +
      'of its 11 options sit below the screen and the page moves behind the ' +
      'panel instead, on 13 pages in all three engines. Page text itself ' +
      'reaches 200% with nothing lost.',
  },
  {
    num: '1.4.5',
    id: 'images-of-text',
    name: 'Images of Text',
    level: 'AA',
    outcome: 'passed',
    note:
      'The one image of text compares an exported label with real text. Being ' +
      'an image is the point of that comparison, so the essential exception ' +
      'applies.',
  },
  {
    num: '1.4.10',
    id: 'reflow',
    name: 'Reflow',
    level: 'AA',
    outcome: 'failed',
    note:
      'The same panel: at 320 by 256 pixels, 8 of 11 options are out of reach, ' +
      'and at 320 by 568, one is. Everything else reflows on every page. Code ' +
      'blocks and the coverage table scroll in their own regions, which the ' +
      'criterion allows.',
  },
  {
    num: '1.4.11',
    id: 'non-text-contrast',
    name: 'Non-text Contrast',
    level: 'AA',
    outcome: 'failed',
    note:
      'The service status dots (Degraded is 2.92:1 in default light, with no ' +
      'other cue) and the coverage table’s glyphs in six presets (down to ' +
      '2.29:1). Text fields, selects and focus rings pass in all ten schemes.',
  },
  {
    num: '1.4.12',
    id: 'text-spacing',
    name: 'Text Spacing',
    level: 'AA',
    outcome: 'passed',
    note:
      'With WCAG’s four spacing overrides, no text was lost at 320 pixels wide ' +
      'in three engines, or at 1280 in Chromium.',
  },
  {
    num: '1.4.13',
    id: 'content-on-hover-or-focus',
    name: 'Content on Hover or Focus',
    level: 'AA',
    outcome: 'failed',
    note:
      'The showcase’s tooltip demo opens on hover and focus, covers ' +
      'neighbouring content and ignores Esc in all three engines, as its own ' +
      'note admits. Glossary cards and the interestfor demo can be dismissed.',
  },
  {
    num: '2.1.1',
    id: 'keyboard',
    name: 'Keyboard',
    level: 'A',
    outcome: 'failed',
    note:
      'Every control works by keyboard, but the style guide’s three motion ' +
      'swatches respond only to hover. The spelling demo’s resize handle ' +
      'takes no keyboard either, but keyboard zoom reaches the same result ' +
      'and the demo says so.',
  },
  {
    num: '2.1.2',
    id: 'no-keyboard-trap',
    name: 'No Keyboard Trap',
    level: 'A',
    outcome: 'passed',
    note:
      'Tab walks left every page, forward and backward: about 11,000 stops ' +
      'across three engines at two widths.',
  },
  {
    num: '2.1.4',
    id: 'character-key-shortcuts',
    name: 'Character Key Shortcuts',
    level: 'A',
    outcome: 'notPresent',
    note: 'The site has no keyboard shortcuts.',
  },
  {
    num: '2.2.1',
    id: 'timing-adjustable',
    name: 'Timing Adjustable',
    level: 'A',
    outcome: 'passed',
    note:
      'The only timer resets a Copied message after two seconds, which limits ' +
      'nothing: pressing Copy again gives the same information.',
  },
  {
    num: '2.2.2',
    id: 'pause-stop-hide',
    name: 'Pause, Stop, Hide',
    level: 'A',
    outcome: 'failed',
    plantedOnly: true,
    note:
      'A badge bounces for ever on the broken page and in its preview on the ' +
      'audit room, even under reduced motion, with no way to stop it. The ' +
      'room warns about it and links past it. The loops on the craft page ' +
      'have working stop controls.',
  },
  {
    num: '2.3.1',
    id: 'three-flashes-or-below-threshold',
    name: 'Three Flashes or Below Threshold',
    level: 'A',
    outcome: 'passed',
    note: 'Every looping animation runs at 900 milliseconds or slower, on small boxes.',
  },
  {
    num: '2.4.1',
    id: 'bypass-blocks',
    name: 'Bypass Blocks',
    level: 'A',
    outcome: 'passed',
    note:
      'The 13 pages on the main frame start with a working skip link. The ' +
      'legal pages, style guide and 404 have two links or fewer before main, ' +
      'and rely on landmarks and headings.',
  },
  {
    num: '2.4.2',
    id: 'page-titled',
    name: 'Page Titled',
    level: 'A',
    outcome: 'passed',
    note: 'All 19 titles are unique and describe their page.',
  },
  {
    num: '2.4.3',
    id: 'focus-order',
    name: 'Focus Order',
    level: 'A',
    outcome: 'passed',
    note:
      'No positive tabindex anywhere. Dialogs and popovers take focus and give ' +
      'it back, and focus follows the reading order.',
  },
  {
    num: '2.4.4',
    id: 'link-purpose-in-context',
    name: 'Link Purpose (In Context)',
    level: 'A',
    outcome: 'passed',
    note:
      'Repeated names such as View source on GitHub are told apart by the ' +
      'heading above them. The only “click here” links are planted.',
  },
  {
    num: '2.4.5',
    id: 'multiple-ways',
    name: 'Multiple Ways',
    level: 'AA',
    outcome: 'passed',
    note:
      'The home page links to every page, and each has a further route through ' +
      'the footer or the chapter navigation. A judgement call: the two planted ' +
      'pages have one inbound link each, and count here as specimens outside ' +
      'the site’s set of pages.',
  },
  {
    num: '2.4.6',
    id: 'headings-and-labels',
    name: 'Headings and Labels',
    level: 'AA',
    outcome: 'passed',
    note:
      'All 186 unique headings and 169 unique control labels were read, and ' +
      'each describes its topic or purpose. Skipped heading levels are a ' +
      'separate gap, not a failure of this criterion.',
  },
  {
    num: '2.4.7',
    id: 'focus-visible',
    name: 'Focus Visible',
    level: 'AA',
    outcome: 'failed',
    plantedOnly: true,
    note:
      'One button removes its outline. On every other page, pixels changed at ' +
      'each of about 5,400 focus stops in three engines.',
  },
  {
    num: '2.4.11',
    id: 'focus-not-obscured-minimum',
    name: 'Focus Not Obscured (Minimum)',
    level: 'AA',
    outcome: 'passed',
    note: 'No focused element was entirely hidden, over about 11,000 stops at two widths.',
  },
  {
    num: '2.5.1',
    id: 'pointer-gestures',
    name: 'Pointer Gestures',
    level: 'A',
    outcome: 'notPresent',
    note: 'No multipoint or path gestures: the only swiping is native scrolling.',
  },
  {
    num: '2.5.2',
    id: 'pointer-cancellation',
    name: 'Pointer Cancellation',
    level: 'A',
    outcome: 'passed',
    note: 'Actions run on click, so they finish on release, and no code listens for pointer down.',
  },
  {
    num: '2.5.3',
    id: 'label-in-name',
    name: 'Label in Name',
    level: 'A',
    outcome: 'failed',
    note:
      'The theme picker’s two sliders show labels and have no name at all. ' +
      'Two narrower cases: chapter bar links show 01 Standard but are named ' +
      'Standard, and a code block’s button shows Copied while still named ' +
      'Copy.',
  },
  {
    num: '2.5.4',
    id: 'motion-actuation',
    name: 'Motion Actuation',
    level: 'A',
    outcome: 'notPresent',
    note: 'Nothing responds to device motion.',
  },
  {
    num: '2.5.7',
    id: 'dragging-movements',
    name: 'Dragging Movements',
    level: 'AA',
    outcome: 'passed',
    note:
      'Sliders also respond to a click on the track. The one CSS resize handle ' +
      'is the browser’s own, which the criterion exempts.',
  },
  {
    num: '2.5.8',
    id: 'target-size-minimum',
    name: 'Target Size (Minimum)',
    level: 'AA',
    outcome: 'passed',
    note:
      'About 2,000 targets were measured at two widths. Small ones sit in ' +
      'sentences or have room around them, and the carousel’s dots pass ' +
      'because its next arrow does the same job.',
  },
  {
    num: '3.1.1',
    id: 'language-of-page',
    name: 'Language of Page',
    level: 'A',
    outcome: 'passed',
    note: 'All 19 pages set lang to en, and English is their main language.',
  },
  {
    num: '3.1.2',
    id: 'language-of-parts',
    name: 'Language of Parts',
    level: 'AA',
    outcome: 'failed',
    note:
      'German phrases in the answers on both rooms have no lang attribute: ' +
      '“sind vier Musiker”, “roh und direkt” and “ausverkauft”.',
  },
  {
    num: '3.2.1',
    id: 'on-focus',
    name: 'On Focus',
    level: 'A',
    outcome: 'passed',
    note:
      'Walking every page by keyboard changed no context. Glossary cards open ' +
      'on focus in Chromium, but move nothing.',
  },
  {
    num: '3.2.2',
    id: 'on-input',
    name: 'On Input',
    level: 'A',
    outcome: 'passed',
    note: 'About 90 inputs were operated in each engine, with no change of context.',
  },
  {
    num: '3.2.3',
    id: 'consistent-navigation',
    name: 'Consistent Navigation',
    level: 'AA',
    outcome: 'failed',
    note:
      'The legal pages and style guide differ from the rest: the back link and ' +
      'the brand link swap places, and Home comes first in the style guide’s ' +
      'footer but last on the legal pages. The 13 pages on the main frame are ' +
      'consistent.',
  },
  {
    num: '3.2.4',
    id: 'consistent-identification',
    name: 'Consistent Identification',
    level: 'AA',
    outcome: 'failed',
    note:
      'One destination has several names: Index on the main frame, then Back ' +
      'to the site and Home on the legal pages and style guide.',
  },
  {
    num: '3.2.6',
    id: 'consistent-help',
    name: 'Consistent Help',
    level: 'A',
    outcome: 'failed',
    note:
      'A judgement call, from the same cause as 3.2.3: the footer links to the ' +
      'pages with contact details move relative to Home. They count as help ' +
      'through the criterion’s note on direct links.',
  },
  {
    num: '3.3.1',
    id: 'error-identification',
    name: 'Error Identification',
    level: 'A',
    outcome: 'failed',
    note:
      'The craft form is fine: the browser moves focus to the field and says ' +
      'what is wrong. The showcase’s two validation fields sit outside any ' +
      'form, so a wrong entry only turns a border red, with no text.',
  },
  {
    num: '3.3.2',
    id: 'labels-or-instructions',
    name: 'Labels or Instructions',
    level: 'A',
    outcome: 'passed',
    note: 'Every input has a visible label or instructions, and radio groups have legends.',
  },
  {
    num: '3.3.3',
    id: 'error-suggestion',
    name: 'Error Suggestion',
    level: 'AA',
    outcome: 'passed',
    note:
      'The craft form’s messages and its permanent hint say what to enter, and ' +
      'the showcase’s caption says the field needs an email address.',
  },
  {
    num: '3.3.4',
    id: 'error-prevention-legal-financial-data',
    name: 'Error Prevention (Legal, Financial, Data)',
    level: 'AA',
    outcome: 'notPresent',
    note: 'No legal or financial data is taken, and the one form sends nothing.',
  },
  {
    num: '3.3.7',
    id: 'redundant-entry',
    name: 'Redundant Entry',
    level: 'A',
    outcome: 'passed',
    note: 'There is no real multi-step process, and the one mock keeps its reuse option available.',
  },
  {
    num: '3.3.8',
    id: 'accessible-authentication-minimum',
    name: 'Accessible Authentication (Minimum)',
    level: 'AA',
    outcome: 'notPresent',
    note: 'There is no sign-in anywhere.',
  },
  {
    num: '4.1.2',
    id: 'name-role-value',
    name: 'Name, Role, Value',
    level: 'A',
    outcome: 'failed',
    note:
      'Judged from code and accessibility trees. The theme picker’s two ' +
      'sliders have no name. Two showcase dialogs have none either, a weaker ' +
      'case: ARIA requires one, but WCAG’s wording is less clear.',
  },
  {
    num: '4.1.3',
    id: 'status-messages',
    name: 'Status Messages',
    level: 'AA',
    outcome: 'failed',
    note:
      'Judged from code and accessibility trees, and a judgement call on one ' +
      'case: ticking the more contrast simulation rewrites a line reporting ' +
      'the result, outside any live region. Copy, Save and the other readouts ' +
      'use role status.',
  },
]

export function outcomeLabel(criterion: Criterion): string {
  if (criterion.outcome === 'failed') {
    return criterion.plantedOnly ? 'Failed, on the planted pages only' : 'Failed'
  }
  return {
    passed: 'Passed',
    cannotTell: 'Cannot tell',
    notPresent: 'Not present',
    notChecked: 'Not checked',
  }[criterion.outcome]
}

export function tally() {
  const count = (test: (criterion: Criterion) => boolean) => criteria.filter(test).length
  return {
    passed: count((c) => c.outcome === 'passed'),
    failed: count((c) => c.outcome === 'failed' && !c.plantedOnly),
    plantedOnly: count((c) => c.outcome === 'failed' && c.plantedOnly === true),
    notPresent: count((c) => c.outcome === 'notPresent'),
    cannotTell: count((c) => c.outcome === 'cannotTell'),
  }
}
