<template>
  <div class="audit-css">
    <label class="audit-css-toggle">
      <input class="audit-css-toggle-input" type="checkbox" />
      Apply the debug stylesheet
    </label>

    <div class="audit-css-frame">
      <p class="audit-css-frame-label">
        Specimen — four planted defects, two healthy controls. Behind glass
        (<code>inert</code> and hidden from assistive tech): even broken
        examples must never harm a real visitor.
      </p>

      <div class="audit-css-specimen" inert aria-hidden="true">
        <img class="audit-css-image" src="/favicon.svg" width="48" height="48" />
        <img class="audit-css-image" src="/favicon.svg" width="48" height="48" alt="Site logo" />
        <div class="audit-css-field">
          <input class="audit-css-input" type="text" placeholder="Search…" />
          <button class="audit-css-icon-button"></button>
        </div>
        <label class="audit-css-field-labeled">
          Email
          <input class="audit-css-input" type="email" />
        </label>
        <p class="audit-css-line">
          Prices include VAT — <a href="#audit-noop" target="_blank">see the full terms</a>.
        </p>
        <button class="audit-css-button">Save changes</button>
      </div>
    </div>

    <pre class="audit-css-code" tabindex="0"><code>img:not([alt]),
button:empty,
input:not(label input, [aria-label], [aria-labelledby]),
a[target="_blank"]:not(:has(.visually-hidden)) {
  outline: 3px dashed red;
  outline-offset: 2px;
}</code></pre>

    <p class="audit-css-note">
      Four selectors, four catches: the alt-less image, the empty icon
      button, the label-less search field, and the new-tab link with no
      warning — while their healthy twins stay untouched. axe would flag the
      first three; the new-tab hint is invisible to it. A debug stylesheet
      isn't a test suite, but it runs everywhere CSS runs: in the browser,
      on any page, with zero tooling.
    </p>
  </div>
</template>

<style scoped lang="scss" src="./AuditStylesheet.scss"></style>
