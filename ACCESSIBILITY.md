# Accessibility

accessible-by-default.dev targets [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/).
That is a target, not a conformance claim: the whole site has not been
evaluated against it, and known gaps remain. Last reviewed on 1 November 2026.

The [full statement](https://accessible-by-default.dev/accessibility.html)
names each known gap, with the date it was measured.

## What runs on every change

A change goes live only after these pass in the engines behind Chrome, Firefox
and Safari: axe on every content page, the keyboard specs, the
[checks package](https://accessible-by-default.dev/checks/), layout at 320 CSS
pixels with text spacing and 200% text, contrast and focus-ring contracts, and
emulated forced colours and reduced motion. The
[workflow](.github/workflows/ci.yml) and the [tests](tests/) are here to read.

## What is checked by hand

VoiceOver on the Mac, an iPhone and Safari itself are checked by hand from time
to time, not before every change. NVDA, JAWS, TalkBack, voice control and switch
access are not part of that.

## Barriers on purpose

The audit room and the listening room frame pages with planted barriers:
`public/broken-page.html`, `public/broken-press-kit.html` and their styles fail
on purpose. A few demos break one thing as their lesson, such as the takeover
dialog that Escape does not close. Please leave those as they are.

## Found a barrier?

[File a barrier report](https://github.com/ThomasSweet/a11y-foundation/issues/new?template=barrier-report.yml),
or email [hello@accessible-by-default.dev](mailto:hello@accessible-by-default.dev)
if you would rather not use GitHub. No report is too small.
