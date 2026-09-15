<template>
  <PracticeRoom
    sheet="P·02"
    sheet-title="Listening room"
    title="The listening room"
    broken-href="/broken-press-kit.html"
    broken-tag="Broken on purpose · barriers 1–11 · preview at 1:2"
    preview-title="Preview of the broken press kit"
    :prev="{ href: '/audit-room.html', kicker: '← Previous', title: 'P·01 · Audit room' }"
    :next="{ href: '/#reference-sheets', kicker: 'Next →', title: 'A · Reference sheets' }"
  >
    <template #lede>
      A page a scanner passes. Below sits the band’s press kit, the document a
      venue or a journalist gets sent, and planted in it are
      <strong>eleven accessibility barriers you hear before you see</strong>.
      The instrument changes here: the hunt is a screen reader, running
      <a href="/screen-reader.html">A·03’s fifteen-minute plan</a> first and
      DevTools second, to confirm in the tree what your ears already caught.
      Under the WCAG rule set a scanner reports nothing on this page at all.
      This site’s own suite measured that.
    </template>

    <template #contract>
      The contract: every barrier lives inside the framed page below, nothing
      outside the frame is broken, none of its links or buttons do anything
      real, and the answers wait at the end. The broken page is a page of its
      own, deliberately outside this site’s styles and safety nets, so what you
      catch behaves the way it would in the wild. What sits below is only a
      half-scale preview; the hunt happens at full scale in its own tab. Two of
      the eleven leave no visual trace whatsoever: the page looks right, the
      voice is wrong, and no amount of looking will find them. Your tools will
      tell you the page is fine, which is the lesson: zero WCAG violations, two
      best-practice hits that both trace back to a single barrier. If you would
      rather read than hunt,
      <a href="#listening-room-answers">skip past the broken page, straight to
      the answers.</a>
    </template>

    <template #note>
      Open it at 1:1, start your screen reader, then run the plan. The tree pane
      is for afterwards.
    </template>

    <PracticeAnswers id="listening-room-answers" :answers="barriers">
      <p>
        Each barrier below opens to a hint first; the answer hides one level
        deeper. Every reveal carries what a screen reader announces at that
        spot and what the fix makes it say instead, so the room is learnable
        without a screen reader on hand. The announcements are read from the
        accessibility tree this page builds, in VoiceOver’s phrasing; your own
        engine will differ in wording, and where engines differ in substance
        the answer says so rather than averaging them.
      </p>
    </PracticeAnswers>

    <PracticeSection id="listening-room-about" title="About this page">
      <p>
        The band is real; the press kit is not. Fitis exists, and the actual
        site, which is not broken on purpose, lives at
        <a href="https://fitis-band.de">fitis-band.de</a>. The line-up, the
        sound, the EP and its tracks are accurate. The quotes, the review, the
        photo captions and every date in the frame are invented for the
        exercise, as are the barriers.
      </p>
      <p>
        The plan this room is built around is
        <a href="/screen-reader.html">sheet A·03</a>, fifteen minutes with a
        screen reader, and the matrix this page sits in the far corner of is
        the proof chapter’s
        <a href="/proof.html#testing-coverage">what automation can and can’t
        see</a>. A whole page that passes the scanner column is what that
        section is describing.
      </p>
    </PracticeSection>
  </PracticeRoom>
</template>

<script setup lang="ts">
import PracticeAnswers from '../PracticeRoom/PracticeAnswers.vue'
import PracticeRoom from '../PracticeRoom/PracticeRoom.vue'
import PracticeSection from '../PracticeRoom/PracticeSection.vue'
import type { Answer } from '../PracticeRoom/practiceAnswers'

const barriers: Answer[] = [
  {
    n: 1,
    hint: 'pull the heading list and read the first row',
    what: 'The h1 is an inline SVG wordmark with no title element and no role, so the level-one heading has no accessible name: the outline opens with a blank row. The next heading is an h4, because h4 happened to be the right size in the design, so the outline also skips two levels at the first step.',
    heard: '"heading level 1", and then nothing. The rotor’s heading list opens with an empty row, and the row under it reads "Biography, heading level 4".',
    shouldSay: '"Fitis, heading level 1", then "Biography, heading level 2".',
    criterion: '1.3.1 Info and Relationships',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html',
    caught: 'the heading list, and the tree; this is the one barrier a scanner half-sees, as two best-practice hits',
    fix: 'Put the band name in the h1 as text and let CSS draw the wordmark, or give the SVG a title element and role="img". Then size the headings with CSS and let the levels run 1, 2, 2,',
    fixLink: { label: 'the fifteen-minute plan, step two.', href: '/screen-reader.html' },
  },
  {
    n: 2,
    hint: 'listen to the gap between two sections',
    what: 'The ornament between sections is an img with alt="divider ornament". It is pure decoration and it is announced eight times, once after the intro and once between every pair of body sections.',
    heard: '"image, divider ornament", eight times over: it lands between the biography and "Press quotes, heading level 2", and again before every heading after that.',
    shouldSay: 'Nothing at all. The biography ends and "Press quotes, heading level 2" follows it directly.',
    criterion: '1.1.1 Non-text Content',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
    caught: 'continuous reading, and the tree; a scanner sees an alt attribute and passes',
    fix: 'alt="" removes a decorative image from the tree entirely. Writing alt text is not always the accessible choice: deciding there is nothing to say is,',
    fixLink: { label: 'as craft’s hiding matrix sets out.', href: '/craft.html#craft-hiding' },
  },
  {
    n: 3,
    hint: 'read the page top to bottom without looking at it',
    what: 'The facts sidebar sits first in the DOM and is moved to the right column with CSS order. The eye reads the biography first and the facts second; continuous reading gets line-up, label, release date and press contact before the page has said who the band is.',
    heard: '"Facts, heading level 2. Line-up, Richard Boden, vocals and guitar. Thomas Sweet, keys and vocals. Phillip Daduna, drums. Sebastian Hartwig, guitar. Sound, postpunk, alternative records…", and only after all of it, "Biography, heading level 4".',
    shouldSay: '"Biography, heading level 2. Fitis sind vier Musiker aus Berlin…", with the facts panel read after the band has been introduced, in the order the eye takes them.',
    criterion: '1.3.2 Meaningful Sequence',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html',
    caught: 'continuous reading, and the source-order viewer in the accessibility pane; a scanner cannot read intent, so it stays silent',
    fix: 'Put the DOM in the order the content means and let grid or flex place it visually. Reordering is a layout tool, not a sequencing one.',
  },
  {
    n: 4,
    hint: 'something in the biography sounds wrong',
    what: 'The four German biography sentences carry no lang attribute, so they inherit lang="en" from the document and the synthesizer applies English phonemes to German. Nothing is invalid, so every language rule passes. The EP title in the intro is tagged lang="de" correctly, on purpose, as the control.',
    heard: 'The intro says "Alles auf Anfang" in a German voice, and then the biography arrives as "Fitis ist ain trio ows Berlin, guh-GROON-det zwei-thousand-twenty-three", English phonemes all the way through.',
    shouldSay: 'The same four sentences in the German voice, the way the EP title already sounds.',
    criterion: '3.1.2 Language of Parts',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html',
    caught: 'the ear, and only the ear. Nothing here is visible and nothing here is invalid',
    fix: 'lang="de" on the element that holds the German. One attribute, and the voice switches.',
  },
  {
    n: 5,
    hint: 'the press quotes have an accent that is not theirs',
    what: 'The quotes wrapper carries lang="fr", copied in from a template. The code is perfectly valid and the text is English, which is exactly why no rule fires: valid-lang checks the code, not whether it is true.',
    heard: '"Fore peupl, ouanne roum, no sayftee net", the French voice working its way through "Four people, one room, no safety net", and the same for the other two quotes.',
    shouldSay: 'The quotes in the page voice, English, with no language switch at all.',
    criterion: '3.1.2 Language of Parts',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html',
    caught: 'the ear; the tree shows the inherited language if you go looking, and a scanner passes a valid code',
    fix: 'Delete the attribute. A wrong language declaration is worse than none, because it overrides a document language that was right.',
  },
  {
    n: 6,
    hint: 'the press photo announces itself twice',
    what: 'The hero photo’s alt begins "Image of the band Fitis standing…". The role already says image, so the words are doubled: alt text describes what is shown, it never says what the element is.',
    heard: '"image, Image of the band Fitis, four members, one reaching toward the camera". The word image, twice, half a second apart.',
    shouldSay: '"image, The band Fitis, four members, one reaching toward the camera".',
    criterion: '1.1.1 Non-text Content',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
    caught: 'the ear; axe’s rule for this ships as best-practice and needs the alt to equal its surrounding text, which it does not here, so nothing fires',
    fix: 'Drop the prefix. The six thumbnails under it are the control: their alt text is distinct, specific and says nothing about being pictures,',
    fixLink: { label: 'the swaps the agent skill makes first.', href: '/agent-skill.html' },
  },
  {
    n: 7,
    hint: 'try to navigate the technical rider by row and column',
    what: 'The rider is a real table with th scope="col" and th scope="row" underneath, and role="presentation" on top, added once to lose the default borders. The role wins: the semantics are stripped and the cells arrive as loose text.',
    heard: 'One flat run: "Position Requirement Provided by Vocals Two dynamic vocal microphones with boom stands Venue Guitar One combo amplifier…". No "table, seven rows, three columns", and table navigation with Control Option and the arrow keys does nothing.',
    shouldSay: '"table, seven rows, three columns", then, on entering a cell, "Vocals, row 2 of 7. Provided by, column 3 of 3: Venue."',
    criterion: '1.3.1 Info and Relationships',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html',
    caught: 'table navigation going dead, and the tree; presentation-role-conflict only fires on a focusable or ARIA-carrying element, so a scanner passes this',
    fix: 'Remove the role and style the borders away in CSS. A table that looks plain is still a table.',
  },
  {
    n: 8,
    hint: 'ask the rotor to jump you to the setlist',
    what: 'The eight songs are one paragraph of br elements and typed dashes. It looks like a list and carries none of the semantics, so there is no item count, no per-item position and nothing for the rotor’s list menu to land on.',
    heard: '"01 - Im Radio 02 - Lauf 03 - Schatten der Vergangenheit 04 - Fallen…", one long paragraph, and the rotor’s list menu never offers the setlist at all.',
    shouldSay: '"list, 6 items", then "01, Im Radio, 1 of 6", with the arrow keys walking the songs.',
    criterion: '1.3.1 Info and Relationships',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html',
    caught: 'the ear, and the tree; a scanner is silent because nothing here claims to be a list',
    fix: 'An ol with eight li elements. The count and the position come free, and the numbering is the list’s job rather than typed text.',
  },
  {
    n: 9,
    hint: 'four dates are on the screen; count how many you hear',
    what: 'The tour dates section was left aria-hidden="true" after a demo where it "cluttered VoiceOver". Sighted visitors see a heading and four dates; screen reader users get silence. Nothing inside is focusable, so the rule that catches aria-hidden over a focusable element has nothing to fire on.',
    heard: 'Nothing. Continuous reading goes from "The last two can be dropped for a short slot" straight into "Press review, heading level 2". The heading and all four dates are simply not there.',
    shouldSay: '"Tour dates, heading level 2. list, 4 items. 12.09.2026, Berlin, Kellerklub Anfang, sold out."',
    criterion: '1.3.1 Info and Relationships',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html',
    caught: 'the ear, as silence where the eye sees content, and the tree, where the whole subtree is missing; a scanner sees nothing wrong',
    fix: 'Delete the attribute. aria-hidden hides from assistive technology only and leaves the pixels in place, which is the one hiding method that always desynchronises the two,',
    fixLink: { label: 'craft’s hiding matrix has the other three.', href: '/craft.html#craft-hiding' },
  },
  {
    n: 10,
    hint: 'the press review scored the EP; how well?',
    what: 'The star rating is drawn entirely in CSS, as ::after { content: "★★★★☆" } on an empty span. The element’s text content is the empty string. Whether the rating exists for a screen reader user depends on whether the engine exposes generated content, and engines disagree.',
    heard: '"Kellerpost, August 2025: black star black star black star black star white star". Chromium folds the generated glyphs into the paragraph, so this is what the tree shows and roughly what you hear; engines that drop generated content leave the sentence ending on the colon and say nothing more.',
    shouldSay: '"Kellerpost, August 2025: 4 out of 5 stars." Say the rating, not the glyphs.',
    criterion: '1.1.1 Non-text Content',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
    caught: 'the ear, and inconsistently, which is the lesson; the tree shows the generated text in Chromium, and no scanner rule covers it',
    fix: 'Put the rating in the markup as text and let CSS draw the stars beside it. Content that carries meaning does not belong in a stylesheet.',
  },
  {
    n: 11,
    hint: 'pull the links list and listen for a stutter',
    what: 'Each social link holds an icon SVG carrying its own aria-label plus the visible word next to it. The name computation concatenates both, so the accessible name is the word twice over. A name exists, so link-name passes.',
    heard: '"Instagram Instagram, link", then "Bandcamp Bandcamp, link", then "Spotify Spotify, link", three stutters in a row in the links list.',
    shouldSay: '"Instagram, link".',
    criterion: '4.1.2 Name, Role, Value',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html',
    caught: 'the links list, and the name-computation chain in the tree; a scanner checks that a name exists, not that it reads well',
    fix: 'The icon is decoration next to its own label: aria-hidden="true" on the SVG and let the visible word name the link,',
    fixLink: { label: 'as the tree section showed.', href: '/proof.html#testing-tree' },
  },
]
</script>
