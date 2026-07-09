<template>
  <a class="skip-link visually-hidden-focusable" href="#main">
    Skip to main content
  </a>

  <!-- Baseline icon sprite — official assets defined once; every badge
       references them with <use> instead of duplicating heavy logos. -->
  <div class="baseline-sprite" aria-hidden="true" v-html="baselineSprite"></div>

  <div class="app-shell">
    <header class="hero">
      <span
        class="hero-watermark hero-watermark-lead"
        aria-hidden="true"
        v-html="pillarIcons.craft"
      ></span>
      <span
        class="hero-watermark hero-watermark-trail"
        aria-hidden="true"
        v-html="pillarIcons.next"
      ></span>

      <div class="hero-top">
        <p class="hero-brand">
          <img class="hero-brand-mark" src="/favicon.svg" alt="" />
          <span>Accessible <span class="hero-brand-dim">by default</span></span>
        </p>
        <div class="hero-actions">
          <a
            class="hero-github"
            href="https://github.com/ThomasSweet/a11y-foundation"
            target="_blank"
            rel="noreferrer"
          >
            <svg class="hero-github-icon" viewBox="0 0 16 16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            GitHub
            <span class="visually-hidden">(opens in a new tab)</span>
          </a>
          <ThemeToggle />
        </div>
      </div>

      <div class="hero-body">
        <div class="hero-icons" aria-hidden="true">
          <span
            v-for="(icon, i) in heroIcons"
            :key="icon.name"
            class="hero-icon"
            :data-kind="icon.kind"
            :style="{ '--i': i }"
          >
            <svg class="hero-icon-svg" viewBox="0 -960 960 960">
              <path :d="icon.d" />
            </svg>
          </span>
        </div>

        <h1 class="hero-title">Built in, not <span class="hero-strike">bolted on</span></h1>
        <p class="hero-lede">
          A hands-on look at how much of accessibility the modern web platform
          handles <em>natively</em> — with little to no JavaScript. It runs as
          one argument in four parts: what <strong>the standard</strong> (WCAG)
          asks for, <strong>the craft</strong> of meeting it, what cutting-edge
          <strong>CSS</strong> now makes possible, and <strong>the proof</strong>
          that it holds up.
        </p>
      </div>

      <a class="hero-scroll" href="#standard">
        <span class="hero-scroll-label">Start reading</span>
        <svg class="hero-scroll-icon" viewBox="0 -960 960 960" aria-hidden="true">
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </a>
    </header>

    <div class="app-body">
      <nav id="sections-nav" class="toc" tabindex="-1" aria-label="Sections">
        <p class="toc-heading">On this page</p>
        <ol class="toc-groups" role="list">
          <li v-for="group in toc" :key="group.id" class="toc-group">
            <a
              class="toc-group-link"
              :href="`#${group.id}`"
              :style="{ animationTimeline: `--vt-${group.id}` }"
            >
              <span class="toc-group-icon" aria-hidden="true" v-html="pillarIcons[group.icon]"></span>
              <span class="toc-group-n">{{ group.n }}</span>
              <span class="toc-group-label">{{ group.label }}</span>
              <span class="toc-group-short">{{ group.short }}</span>
            </a>
            <ul class="toc-sections" role="list">
              <li v-for="s in group.sections" :key="s.id">
                <a class="toc-section-link" :href="`#${s.id}`">
                  {{ s.label }}
                </a>
              </li>
              <!-- Long lists collapse into native <details> clusters — disclosure
                   semantics and keyboard support come from the platform. -->
              <li v-for="sub in group.subgroups ?? []" :key="sub.label">
                <details class="toc-subgroup">
                  <summary class="toc-subgroup-summary">
                    {{ sub.label }}
                    <span class="toc-subgroup-count" aria-hidden="true">· {{ sub.sections.length }}</span>
                  </summary>
                  <ul class="toc-subgroup-sections" role="list">
                    <li v-for="s in sub.sections" :key="s.id">
                      <a
                        class="toc-section-link"
                        :href="`#${s.id}`"
                        :interestfor="s.summary ? `toc-preview-${s.id}` : undefined"
                        :style="s.summary ? { anchorName: `--toc-${s.id}` } : undefined"
                      >
                        {{ s.label }}
                      </a>
                      <div
                        v-if="s.summary"
                        :id="`toc-preview-${s.id}`"
                        popover="hint"
                        class="toc-preview"
                        :style="{ positionAnchor: `--toc-${s.id}` }"
                      >
                        {{ s.summary }}
                      </div>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </li>
        </ol>
      </nav>

      <main id="main" tabindex="-1" class="site-main">
      <section id="standard" class="pillar scrollspy-region" aria-labelledby="standard-title">
        <PillarHeader
          icon="standard"
          eyebrow="01 · The requirement"
          title="The standard"
          title-id="standard-title"
        >
          Accessibility begins as a requirement, not a feature. WCAG is the
          standard the rest of the web is measured against — and it has grown
          right alongside the platform.
        </PillarHeader>

        <section class="demo" aria-labelledby="demo-criteria">
          <h3 id="demo-criteria">Guidelines, alive</h3>
          <p>
            These aren't definitions of accessibility — they're the standard,
            running. The criteria are arranged along WCAG's timeline, so you can
            watch the standard grow as the web changed. Each card is a real
            working piece of this foundation; flip <strong>break this rule</strong>
            to switch the compliant behavior off and feel what the criterion
            actually prevents. Accessibility isn't a feature added on top; it's
            the baseline these guidelines keep formalizing — and they keep
            POUR at the core: Perceivable, Operable, Understandable, Robust.
          </p>

          <CriteriaTimeline />
        </section>

        <section class="demo" aria-labelledby="demo-conformance">
          <h3 id="demo-conformance">From pass / fail to outcomes</h3>
          <p>
            The timeline's next stop is the biggest change of all — not new
            criteria, but a new <em>way of measuring</em>. Drag the slider to see
            how the same result reads under today's binary model versus WCAG 3.0's
            draft graded scoring.
          </p>
          <ConformanceShift />
        </section>

        <section class="demo" aria-labelledby="demo-legal">
          <h3 id="demo-legal">One standard, many laws</h3>
          <p>
            WCAG isn't just guidance — it's the technical core that accessibility
            law around the world points to. The map below shows how different
            jurisdictions wrap legal force around the same standard.
          </p>
          <LegalMap />
        </section>

        <a class="skip-link visually-hidden-focusable" href="#sections-nav">Back to navigation</a>
      </section>

      <section id="craft" class="pillar scrollspy-region" aria-labelledby="craft-title">
        <PillarHeader
          icon="craft"
          eyebrow="02 · The platform's answer · shipping today"
          title="The craft"
          title-id="craft-title"
        >
          The standard sets the bar; modern CSS and HTML clear most of it with no
          JavaScript at all. Not a component catalog — the deliberate,
          low-drama <em>craft decisions</em> this foundation is built on, and why
          each one is the accessible default.
        </PillarHeader>

        <section class="demo" aria-labelledby="craft-validation">
          <h3 id="craft-validation">Validation that waits its turn</h3>
          <p>
            Validation leans on the platform: native constraints
            (<code>required</code>, <code>type="email"</code>) drive the styling
            through <code>:user-invalid</code> / <code>:user-valid</code> — the
            craft detail is the <em>user-</em> prefix, which only matches
            <em>after</em> someone has interacted, so a pristine field never
            flags. The display name is required; the email is optional, so leaving
            it empty stays neutral. The email also uses a <code>pattern</code> to
            require a dotted domain (<code>type="email"</code> alone accepts
            <code>a@b</code>) — still pure HTML, still in the native pipeline.
            Hints and errors are linked via <code>aria-describedby</code> and
            never rely on color alone (the invalid border also thickens).
          </p>
          <div class="demo-stack">
            <TextField
              v-model="name"
              label="Display name"
              required
              hint="Required. Shown publicly next to your comments."
            />
            <TextField
              v-model="email"
              label="Email"
              type="email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              title="Enter an address with a domain, e.g. name@example.com"
              hint="Optional — include a domain, e.g. name@example.com."
            />
          </div>
          <CodeCompare v-bind="craftSnippets.validation" />
        </section>

        <section class="demo" aria-labelledby="craft-light-dark">
          <h3 id="craft-light-dark">Dark mode from one source of truth</h3>
          <p>
            Theming is a place craft pays off quietly. Declaring each colour once
            with <code>light-dark()</code> keeps the light and dark values
            together so they can't drift apart — the alternative scatters them
            across <code>@media (prefers-color-scheme)</code> blocks that someone
            eventually edits half of. Same result, half the surface area for bugs.
          </p>
          <LightDarkDemo />
        </section>

        <section class="demo" aria-labelledby="craft-dialog">
          <h3 id="craft-dialog">Native dialog, zero trapping code</h3>
          <p>
            A native <code>&lt;dialog&gt;</code> with <code>showModal()</code>
            gives you focus trapping, Esc-to-close, and an inert background from
            the platform — the things hand-rolled modals get wrong. The entry
            animation uses motion tokens, so it disappears automatically under
            reduced motion.
          </p>
          <div class="demo-row">
            <AppButton variant="secondary" @click="dialog?.open()">
              Open dialog
            </AppButton>
          </div>
          <AppDialog ref="dialog">
            <template #title>An accessible dialog</template>
            <p>
              Press <kbd>Esc</kbd> or use the close button. Tab around — focus
              stays inside while the dialog is open.
            </p>
          </AppDialog>
          <CodeCompare v-bind="craftSnippets.dialog" />
        </section>

        <section class="demo" aria-labelledby="craft-motion">
          <h3 id="craft-motion">Motion that bows out on request</h3>
          <p>
            Three independent animations, one preference. When the OS asks for
            reduced motion, all of them still — handled globally in
            <code>preferences.css</code> from a single source of truth, so no
            component has to remember to opt in. Flip the switch to simulate the
            preference (your real OS setting works too) and watch every one stop
            at once.
          </p>
          <MotionDemo />
          <CodeCompare v-bind="craftSnippets.motion" />
        </section>

        <section class="demo" aria-labelledby="craft-targets">
          <h3 id="craft-targets">Targets that survive touch and forced colors</h3>
          <p>
            Hover styles only apply on devices that can actually hover; touch
            devices get larger targets via <code>touch-primary()</code>. In
            forced-colors mode the border keeps the button visible when the
            background is replaced — a failure mode most buttons never account
            for.
          </p>
          <TargetsDemo />
          <CodeCompare v-bind="craftSnippets.targets" />
        </section>

        <section class="demo" aria-labelledby="craft-defensive">
          <h3 id="craft-defensive">Layouts that expect the worst</h3>
          <p>
            Defensive CSS is the habit of assuming real content will be longer,
            wider, and weirder than the mockup. Designs are composed with tidy
            placeholder copy; CSS has to survive user names, tokens, and URLs.
            The classic trap: a grid item's automatic minimum size is its
            <em>min-content</em> size, not zero — the first unbreakable string
            forces its column wider than the container and pushes the layout
            past the viewport, a
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/reflow.html">WCAG
            1.4.10 Reflow</a> failure that low-vision users at high zoom hit
            first. The guard is boring and load-bearing:
            <code>min-inline-size: 0</code> at every grid hop, plus a scroll or
            wrap strategy for content that can't break. (This codebase learned
            it the hard way during QA, courtesy of an iOS WebKit quirk.)
          </p>
          <DefensiveCssDemo />
          <CodeCompare v-bind="craftSnippets.defensive" />
        </section>

        <section class="demo" aria-labelledby="craft-content-stress">
          <h3 id="craft-content-stress">Break it with content</h3>
          <p>
            Layouts don't break in design reviews; they break the day the CMS
            delivers a title nobody planned for. The habit that catches it
            early is feeding a component hostile content on purpose: the
            longest plausible headline, German compound words that refuse to
            wrap, a right-to-left language. One card survives all four feeds
            below because the guards were built in — logical properties
            instead of left and right, <code>min-inline-size: 0</code> where
            grids meet text, <code>hyphens: auto</code> riding on an honest
            <code>lang</code> attribute, and a button sized by its label
            instead of a designer's optimism.
          </p>
          <ContentStressDemo />
          <CodeCompare v-bind="craftSnippets.contentStress" />
        </section>

        <section class="demo" aria-labelledby="craft-loading">
          <h3 id="craft-loading">Loading states the accessibility tree can see</h3>
          <p>
            Skeleton screens are a perceived-performance trick for the eyes:
            grey shapes promise that content is on its way. But placeholders
            are semantic-free <code>div</code>s — a screen reader finds an
            empty region with no hint that anything is happening. The craft
            move costs two attributes: <code>aria-busy="true"</code> marks the
            region as loading (a state you clear once it settles), and one
            visually-hidden line says what's coming — the part a screen reader
            actually reads. A live region is usually the <em>wrong</em> tool here — on
            a fast connection the "loading" announcement lands after the
            content it was warning about. And size placeholders to the content
            they stand in for: a skeleton that shifts the page when real
            content lands trades one jank for another — that shift is what
            CLS (Cumulative Layout Shift) measures.
          </p>
          <LoadingStateDemo />
          <CodeCompare v-bind="craftSnippets.loading" />
        </section>

        <a class="skip-link visually-hidden-focusable" href="#sections-nav">Back to navigation</a>
      </section>

      <section id="showcase" class="pillar scrollspy-region" aria-labelledby="showcase-title">
        <PillarHeader
          icon="next"
          eyebrow="03 · The platform's answer · arriving next"
          title="CSS showcase"
          title-id="showcase-title"
        >
          The same idea, looking forward: modern CSS worth knowing, grouped by
          where it stands across the current versions of Chrome, Firefox, and
          Safari — based on
          <a href="https://wpt.fyi/interop-2026">Interop</a> and Baseline.
          Everything is written as a progressive enhancement, so unsupported
          demos degrade instead of breaking.
        </PillarHeader>

        <div class="demo">
          <fieldset class="showcase-filter">
            <legend class="showcase-filter-legend">Filter by topic</legend>
            <label class="showcase-filter-chip">
              <input type="radio" name="showcase-filter" value="all" checked />
              All
            </label>
            <label v-for="tag in showcaseTags" :key="tag" class="showcase-filter-chip">
              <input type="radio" name="showcase-filter" :value="tag" />
              {{ tag }}
            </label>
          </fieldset>

          <template v-for="group in groups" :key="group.tier">
            <div v-if="group.items.length" class="showcase-group">
              <h3>{{ group.label }}</h3>
              <p>{{ group.blurb }}</p>
              <div class="showcase-list">
                <ShowcaseFrame
                  v-for="item in group.items"
                  :key="item.id"
                  :id="`showcase-${item.id}`"
                  :data-tags="item.tags.join(' ')"
                  :title="item.title"
                  :summary="item.summary"
                  :payoff="item.payoff"
                  :supports="item.supports"
                  :detect="item.detect"
                  :baseline="baselineData[item.id]"
                  :links="item.links"
                  :snippet-html="item.snippetHtml"
                  :snippet-css="item.snippetCss"
                  :snippet-js="item.snippetJs"
                  :source-href="item.sourceHref"
                >
                  <component :is="item.component" v-bind="item.props" />
                </ShowcaseFrame>
              </div>
            </div>
          </template>
        </div>

        <a class="skip-link visually-hidden-focusable" href="#sections-nav">Back to navigation</a>
      </section>

      <section id="testing" class="pillar scrollspy-region" aria-labelledby="testing-title">
        <PillarHeader
          icon="proof"
          eyebrow="04 · The proof"
          title="The proof"
          title-id="testing-title"
        >
          A standard and a clever platform answer are only claims until something
          checks them. Accessibility testing is where many teams get lost — they
          run an automated scanner, see green, and call it accessible. The honest
          picture is layered, and most of it isn't a scanner's job. (Writing these
          very tests turned up two real barriers on this site — proof the layers
          earn their place.)
        </PillarHeader>

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

        <a class="skip-link visually-hidden-focusable" href="#sections-nav">Back to navigation</a>
      </section>
    </main>
    </div>

    <footer class="site-footer" aria-labelledby="a11y-statement">
      <h2 id="a11y-statement" class="footer-title">Accessibility</h2>
      <p class="footer-lede">
        This site practises what it shows. It targets
        <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2 AA</a>, works with a
        keyboard and a screen reader, and honours your motion, contrast, and
        colour-scheme preferences — and it never leans on colour alone to carry
        meaning.
      </p>
      <p class="footer-lede">
        It also leans on genuinely new platform features — anchor positioning,
        scroll-driven animation, container queries, <code>contrast-color()</code>.
        Each is a progressive enhancement: where your browser supports it you get
        the richer version; where it doesn't you get an accessible fallback, not a
        broken page. New features extend the baseline here — they never replace it.
      </p>

      <details class="footer-details">
        <summary class="footer-summary">What that means in practice</summary>
        <div class="footer-details-body">
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

      <div class="footer-author">
        <span class="footer-author-avatar" aria-hidden="true"></span>
        <div class="footer-author-body">
          <p class="footer-author-bio">
            Built by <strong>Thomas Sweet</strong> — a front-end developer
            sharpening an accessibility-first craft in the open, one experiment
            at a time. This whole site is the sketchbook. ☕
          </p>
          <ul class="footer-author-social" role="list">
            <li>
              <a class="footer-social-link" href="https://github.com/ThomasSweet" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                <span class="visually-hidden">GitHub (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a class="footer-social-link" href="https://www.linkedin.com/in/thomas-w-sweet" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                <span class="visually-hidden">LinkedIn (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a class="footer-social-link" href="https://x.com/thomas_sweet" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                <span class="visually-hidden">X (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <nav class="footer-meta" aria-label="Site information">
        <a href="/styleguide.html">Style guide</a>
        <a href="/impressum.html">Impressum</a>
        <a href="/privacy.html">Privacy</a>
        <a href="https://github.com/ThomasSweet/a11y-foundation">GitHub</a>
        <span class="footer-copy">© 2026 Accessible by default</span>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import AppButton from './components/AppButton/AppButton.vue'
import AppDialog from './components/AppDialog/AppDialog.vue'
import TextField from './components/TextField/TextField.vue'
import ThemeToggle from './components/ThemeToggle/ThemeToggle.vue'
import PillarHeader from './components/PillarHeader/PillarHeader.vue'
import ShowcaseFrame from './showcases/ShowcaseFrame/ShowcaseFrame.vue'
import { showcases, type BaselineInfo } from './showcases/registry'
import baselineDataJson from './showcases/baseline-data.json'
import baselineSprite from './showcases/BaselineBadge/baseline-sprite.svg?raw'
import CriteriaTimeline from './criteria/CriteriaTimeline/CriteriaTimeline.vue'
import ConformanceShift from './criteria/ConformanceShift/ConformanceShift.vue'
import LegalMap from './criteria/LegalMap/LegalMap.vue'
import LightDarkDemo from './craft/demos/LightDarkDemo.vue'
import MotionDemo from './craft/demos/MotionDemo.vue'
import TargetsDemo from './craft/demos/TargetsDemo.vue'
import DefensiveCssDemo from './craft/demos/DefensiveCssDemo.vue'
import ContentStressDemo from './craft/demos/ContentStressDemo.vue'
import LoadingStateDemo from './craft/demos/LoadingStateDemo.vue'
import CodeCompare from './craft/CodeCompare/CodeCompare.vue'
import { craftSnippets } from './craft/snippets'
import TestingLayers from './testing/TestingLayers/TestingLayers.vue'
import AuditStylesheet from './testing/AuditStylesheet/AuditStylesheet.vue'
import CoverageMatrix from './testing/CoverageMatrix/CoverageMatrix.vue'
import { heroIcons } from './icons/heroIcons'
import { pillarIcons, type PillarIconName } from './icons/pillarIcons'

const dialog = ref<InstanceType<typeof AppDialog> | null>(null)
const name = ref('')
const email = ref('')

// JSON widens `baseline` to string|boolean; the generator guarantees the union.
const baselineData = baselineDataJson as unknown as Record<string, BaselineInfo>

// Tiers come straight from Baseline data (see registry.ts) — Baseline's own
// vocabulary, so promotions happen at build time, not by hand.
// Values must exist in the $showcase-tags list in this file's styles — the
// pure-CSS filter rules are generated from that list.
const showcaseTags = ['layout', 'scroll', 'forms', 'theming', 'typography', 'interaction', 'motion']

const groups = computed(() => [
  {
    tier: 'widely-available',
    label: 'Widely available',
    blurb:
      'Baseline widely available — in every engine for 30+ months. The foundation itself leans on these.',
    items: showcases.filter((s) => s.tier === 'widely-available'),
  },
  {
    tier: 'newly-available',
    label: 'Newly available',
    blurb:
      'Baseline newly available — interoperable everywhere, recently. Used with cheap fallbacks where it matters.',
    items: showcases.filter((s) => s.tier === 'newly-available'),
  },
  {
    tier: 'limited-availability',
    label: 'Limited availability — Interop focus areas',
    blurb:
      'Not yet in every engine. Demos only, always behind @supports — they degrade instead of breaking.',
    items: showcases.filter((s) => s.tier === 'limited-availability'),
  },
])

// ids must match the in-template section ids — anchor + scroll-spy targets.
interface TocSection {
  id: string
  label: string
  summary?: string
}

interface TocGroup {
  id: string
  n: string
  label: string
  short: string
  icon: PillarIconName
  sections: TocSection[]
  /** Collapsible clusters for long section lists (rendered as <details>). */
  subgroups?: { label: string; sections: TocSection[] }[]
}

const toc: TocGroup[] = [
  {
    id: 'standard',
    n: '01',
    label: 'The standard',
    short: 'Standard',
    icon: 'standard',
    sections: [
      { id: 'demo-criteria', label: 'Guidelines, alive' },
      { id: 'demo-conformance', label: 'From pass / fail to outcomes' },
      { id: 'demo-legal', label: 'One standard, many laws' },
    ],
  },
  {
    id: 'craft',
    n: '02',
    label: 'The craft',
    short: 'Craft',
    icon: 'craft',
    sections: [
      { id: 'craft-validation', label: 'Validation that waits its turn' },
      { id: 'craft-light-dark', label: 'Dark mode from one source' },
      { id: 'craft-dialog', label: 'Native dialog, zero trapping code' },
      { id: 'craft-motion', label: 'Motion that bows out on request' },
      { id: 'craft-targets', label: 'Targets for touch & forced colors' },
      { id: 'craft-defensive', label: 'Layouts that expect the worst' },
      { id: 'craft-content-stress', label: 'Break it with content' },
      { id: 'craft-loading', label: 'Loading states AT can see' },
    ],
  },
  {
    id: 'showcase',
    n: '03',
    label: 'CSS showcase',
    short: 'Showcase',
    icon: 'next',
    sections: [],
    // Collapsed clusters mirroring the page's own grouping; ids match the
    // anchor ids stamped on each ShowcaseFrame above.
    subgroups: [
      {
        label: 'Widely available',
        sections: showcases
          .filter((s) => s.tier === 'widely-available')
          .map((s) => ({ id: `showcase-${s.id}`, label: s.title, summary: s.summary })),
      },
      {
        label: 'Newly available',
        sections: showcases
          .filter((s) => s.tier === 'newly-available')
          .map((s) => ({ id: `showcase-${s.id}`, label: s.title, summary: s.summary })),
      },
      {
        label: 'Limited availability',
        sections: showcases
          .filter((s) => s.tier === 'limited-availability')
          .map((s) => ({ id: `showcase-${s.id}`, label: s.title, summary: s.summary })),
      },
    ],
  },
  {
    id: 'testing',
    n: '04',
    label: 'The proof',
    short: 'Proof',
    icon: 'proof',
    sections: [
      { id: 'testing-layers', label: 'A layered job, not a button' },
      { id: 'testing-coverage', label: 'What automation can’t see' },
      { id: 'testing-audit-css', label: 'CSS that audits' },
      { id: 'testing-performance', label: 'Performance is accessibility' },
    ],
  },
]
</script>

<style scoped lang="scss">
/* Registered so the avatar ring's conic angle can interpolate (an unregistered
   custom property would jump, not spin). */
@property --ring-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@layer layout {
  /* Visually gone but renderable — display:none would break the gradient
     defs the <use> references resolve against in some engines. */
  .baseline-sprite {
    position: absolute;
    inline-size: 0;
    block-size: 0;
    overflow: hidden;
  }

  .app-shell {
    position: relative;
    min-block-size: 100dvh;
    /* `clip` (not `hidden`) hides the timeline cards' off-screen entry without
       a scrollbar, and doesn't establish a scroll container (sticky sidebar). */
    overflow-x: clip;
  }

  .app-shell::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background: var(--page-glow);
    pointer-events: none;

    @include reduced-transparency {
      display: none;
    }
  }

  .hero {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: var(--space-8);
    min-block-size: 100dvh;
    max-inline-size: 80rem;
    margin-inline: auto;
    padding: var(--space-6) var(--space-4) var(--space-8);
    position: relative;
    isolation: isolate;
  }

  .hero-top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }

  .hero-github {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-block-size: 44px;
    padding-inline: var(--space-2);
    border-radius: var(--radius-md);
    color: var(--color-text-subtle);
    font-size: var(--text-sm);
    font-weight: 600;
    text-decoration: none;

    @include can-hover {
      &:hover {
        color: var(--color-text);
      }
    }
  }

  .hero-github-icon {
    inline-size: 1.25rem;
    block-size: 1.25rem;
  }

  .hero-body {
    display: grid;
    align-content: center;
    gap: var(--space-8);

    @include from('md') {
      gap: var(--space-12);
    }
  }

  .app-body {
    max-inline-size: 72rem;
    margin-inline: auto;
    padding-inline: var(--space-4);

    @include from('lg') {
      display: grid;
      grid-template-columns: 14rem minmax(0, 1fr);
      gap: var(--space-12);
      align-items: start;
    }
  }

  .site-main {
    display: grid;
    gap: var(--space-24);
    min-inline-size: 0;
    padding-block-end: var(--space-16);

    @include from('md') {
      gap: var(--space-40);
    }
  }

  .pillar {
    display: grid;
    gap: var(--space-16);
    scroll-margin-block-start: var(--space-16);
    position: relative;
    isolation: isolate;
    min-inline-size: 0;

    @include from('md') {
      gap: var(--space-24);
    }
  }

  .demo {
    display: grid;
    gap: var(--space-6);
    min-inline-size: 0;
  }

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .demo-stack {
    display: grid;
    gap: var(--space-6);
  }

  .showcase-list {
    display: grid;
    gap: var(--space-6);
  }

  .showcase-group {
    display: grid;
    gap: var(--space-6);
  }

  .showcase-filter {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    align-items: center;
    margin: 0;
    padding: 0;
    border: none;
  }

  .showcase-filter-legend {
    float: inline-start;
    padding: 0;
    padding-inline-end: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .showcase-filter-chip {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    text-transform: capitalize;
    cursor: pointer;

    &:has(input:checked) {
      border-color: var(--color-primary);
      background-color: color-mix(in oklab, var(--color-primary) 10%, transparent);
      font-weight: 600;
    }

    @include can-hover {
      &:hover {
        border-color: var(--color-text-subtle);
      }
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .site-footer {
    display: grid;
    gap: var(--space-4);
    max-inline-size: 72rem;
    margin-inline: auto;
    padding: var(--space-12) var(--space-4) var(--space-16);
    /* Extra bottom room on mobile so the fixed nav pill never covers the footer. */
    padding-block-end: calc(var(--space-20) + env(safe-area-inset-bottom, 0px));
    border-block-start: 1px solid var(--color-border);

    @include from('lg') {
      padding-block-end: var(--space-16);
    }
  }
}

@layer components {
  /* The page scroller becomes a scroll-state container so the mobile nav can
     react to scroll position in pure CSS — no scroll listeners (see the reveal
     rules under .toc). Harmless where unused (desktop) or unsupported. */
  :global(html) {
    container-type: scroll-state;
  }

  /* Pure-CSS catalog filter — keep in sync with showcaseTags in the script.
     Must live in `components`, not `layout`: the hide has to beat the cards'
     own display in the same layer. */
  $showcase-tags: layout, scroll, forms, theming, typography, interaction, motion;

  @each $tag in $showcase-tags {
    .demo:has(.showcase-filter input[value='#{$tag}']:checked) {
      .showcase[data-tags]:not([data-tags~='#{$tag}']) {
        display: none;
      }

      .showcase-group:not(:has(.showcase[data-tags~='#{$tag}'])) {
        display: none;
      }
    }
  }

  .toc {
    /* Mobile: a floating glass pill pinned to the bottom, clear of the content. */
    position: fixed;
    inset-block-end: calc(var(--space-3) + env(safe-area-inset-bottom, 0px));
    inset-inline: var(--space-4);
    /* Cap and centre so it stays a tidy pill on tablets, not a stretched bar. */
    max-inline-size: 30rem;
    margin-inline: auto;
    z-index: 20;
    padding: var(--space-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-surface-glass);
    backdrop-filter: blur(12px);
    box-shadow: var(--shadow-lg);

    @include from('lg') {
      /* Desktop: a static sidebar in normal flow. */
      position: sticky;
      inset-block: var(--space-6) auto;
      inset-inline: auto;
      max-inline-size: none;
      margin-inline: 0;
      align-self: start;
      z-index: 5;
      max-block-size: calc(100dvh - var(--space-12));
      overflow-y: auto;
      padding: 0;
      border: none;
      border-radius: 0;
      background: none;
      backdrop-filter: none;
      box-shadow: none;
    }

    @include reduced-transparency {
      background-color: var(--color-bg-subtle);
      backdrop-filter: none;
    }

    @include forced-colors {
      background-color: Canvas;
      backdrop-filter: none;
    }
  }

  /* Reveal-on-scroll (mobile only): the pill is tucked below the viewport over
     the hero, slides up once content has scrolled above it, and tucks away
     again at the very bottom. Pure CSS via scroll-state — no JS. Where
     scroll-state is unsupported the @supports guard leaves the pill visible. */
  @media (width < 64em) {
    @supports (container-type: scroll-state) {
      .toc {
        translate: 0 calc(100% + var(--space-8));
        transition: translate var(--duration-normal) var(--easing-standard);
      }

      @container scroll-state(scrollable: top) {
        .toc {
          translate: 0 0;
        }
      }

      @container (not scroll-state(scrollable: bottom)) {
        .toc {
          translate: 0 calc(100% + var(--space-8));
        }
      }

      /* Direction-aware tier (scroll-state(scrolled:), Chrome 144+): the true
         hidey-bar — tuck while scrolling down, return on the first scroll up.
         Unknown queries never match, so browsers without `scrolled:` keep the
         rules above; later rules win where both tiers match. */
      @container scroll-state(scrolled: bottom) {
        .toc {
          translate: 0 calc(100% + var(--space-8));
        }
      }

      @container scroll-state(scrolled: top) {
        .toc {
          translate: 0 0;
        }
      }

      /* At the very top the pill stays tucked over the hero regardless of the
         last scroll direction. */
      @container (not scroll-state(scrollable: top)) {
        .toc {
          translate: 0 calc(100% + var(--space-8));
        }
      }
    }
  }

  .toc-heading {
    display: none;

    @include from('lg') {
      display: block;
      margin-block-end: var(--space-4);
      font-size: var(--text-sm);
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--color-text-subtle);
    }
  }

  .toc-groups {
    display: flex;
    justify-content: space-between;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;

    @include from('lg') {
      display: grid;
      gap: var(--space-4);
    }
  }

  .toc-group {
    flex: 1;

    @include from('lg') {
      flex: initial;
    }
  }

  .toc-group-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    min-block-size: 44px;
    padding: var(--space-1);
    /* Concentric with the pill, so an active background can never poke
       past the pill's end curves. */
    border-radius: var(--radius-full);
    font-weight: 600;
    color: var(--color-text-subtle);
    text-decoration: none;
    white-space: nowrap;
    text-align: center;
    background-image: radial-gradient(
      100% 130% at 50% 135%,
      color-mix(in oklab, var(--color-primary) 30%, transparent),
      transparent 72%
    );
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 100% 0;

    @include from('lg') {
      flex-direction: row;
      align-items: baseline;
      justify-content: flex-start;
      gap: var(--space-2);
      min-block-size: 0;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
      font-weight: 700;
      background-image: none;
    }

    @include can-hover {
      &:hover {
        color: var(--color-text);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .toc-group-n {
    display: none;

    @include from('lg') {
      display: inline;
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      color: var(--color-primary);
    }
  }

  /* Pillar icon — the mobile tab mark; the desktop sidebar uses the number. */
  .toc-group-icon {
    display: flex;
    inline-size: 1.5rem;
    block-size: 1.5rem;

    :deep(svg) {
      inline-size: 100%;
      block-size: 100%;
    }

    @include from('lg') {
      display: none;
    }
  }

  /* Full label on desktop, short label on the mobile tab. */
  .toc-group-label {
    display: none;

    @include from('lg') {
      display: inline;
    }
  }

  .toc-group-short {
    font-size: var(--text-sm);
    line-height: 1;

    @include from('lg') {
      display: none;
    }
  }

  .toc-sections {
    display: none;

    @include from('lg') {
      display: grid;
      gap: 1px;
      margin: var(--space-1) 0 0;
      padding-inline-start: var(--space-3);
      border-inline-start: 1px solid var(--color-border);
      list-style: none;
    }
  }

  .toc-subgroup-summary {
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
    cursor: pointer;

    @include can-hover {
      &:hover {
        color: var(--color-text);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .toc-subgroup-count {
    font-family: var(--font-mono);
    font-weight: 400;
    color: var(--color-primary);
  }

  .toc-subgroup-sections {
    display: grid;
    gap: 1px;
    margin-block-start: var(--space-1);
    padding-inline-start: var(--space-3);
    border-inline-start: 1px solid var(--color-border);
    list-style: none;
  }

  /* stylelint-disable property-no-unknown -- interest invokers + anchor positioning */
  .toc-section-link[interestfor] {
    interest-delay: 0.4s 0.15s;
  }

  .toc-preview {
    position: fixed;
    inset: auto;
    position-area: inline-end;
    position-try-fallbacks: flip-inline, flip-block;
    margin: 0 0 0 var(--space-2);
    max-inline-size: 20rem;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-lg);
    color: var(--color-text-subtle);
    font-size: var(--text-sm);
    opacity: 0;
    translate: -4px 0;
    transition:
      opacity var(--duration-fast) var(--easing-standard),
      translate var(--duration-fast) var(--easing-standard),
      display var(--duration-fast) allow-discrete,
      overlay var(--duration-fast) allow-discrete;

    &:popover-open {
      opacity: 1;
      translate: 0 0;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  @starting-style {
    .toc-preview:popover-open {
      opacity: 0;
      translate: -4px 0;
    }
  }
  /* stylelint-enable property-no-unknown */

  .toc-section-link {
    display: block;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
    text-decoration: none;

    @include can-hover {
      &:hover {
        color: var(--color-text);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  @supports (animation-timeline: view()) {
    .app-shell {
      timeline-scope: --vt-standard, --vt-craft, --vt-showcase, --vt-testing;
    }

    #standard { view-timeline-name: --vt-standard; }
    #craft { view-timeline-name: --vt-craft; }
    #showcase { view-timeline-name: --vt-showcase; }
    #testing { view-timeline-name: --vt-testing; }

    .toc-group-link {
      animation: toc-group-active linear both;
      animation-range: cover 0% cover 100%;
    }

    /* Mobile pill: the accent glow rises with the section's own scroll
       progress — the scrub is the state. */
    @keyframes toc-group-active {
      0%,
      100% {
        color: var(--color-text-subtle);
        background-size: 100% 0;
      }

      12%,
      88% {
        color: var(--color-text);
        background-size: 100% 100%;
      }
    }

    @include from('lg') {
      @keyframes toc-group-active {
        0%,
        100% {
          background-color: transparent;
          color: var(--color-text-subtle);
        }

        12%,
        88% {
          background-color: var(--color-bg-subtle);
          color: var(--color-text);
        }
      }
    }

    @include forced-colors {
      @keyframes toc-group-active {
        0%,
        100% {
          border: 1px solid transparent;
        }

        12%,
        88% {
          border: 1px solid Highlight;
        }
      }
    }
  }

  .hero-brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-text);
  }

  .hero-brand-mark {
    inline-size: 1.9rem;
    block-size: 1.9rem;
  }

  .hero-brand-dim {
    color: var(--color-text-subtle);
  }

  .hero-title {
    inline-size: fit-content;
    font-size: clamp(3rem, 12vw, 9rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: var(--tracking-tight);
    text-wrap: balance;
    background: var(--gradient-accent);
    /* stylelint-disable-next-line property-no-vendor-prefix -- Safari */
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;

    @include forced-colors {
      background: none;
      -webkit-text-fill-color: CanvasText;
      color: CanvasText;
    }
  }

  /* Hover flourish: a line draws across "bolted on", performing the thesis.
     position:relative pulls the span out of the parent's background-clip:text,
     so it needs its own gradient fill to keep rendering; the ::after line sits
     in a solid colour over it. */
  .hero-strike {
    position: relative;
    background: var(--gradient-accent);
    /* stylelint-disable-next-line property-no-vendor-prefix -- Safari */
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    @include forced-colors {
      background: none;
      -webkit-text-fill-color: CanvasText;
    }
  }

  .hero-strike::after {
    content: '';
    position: absolute;
    inset-inline: -0.04em;
    inset-block-start: 51%;
    block-size: 0.09em;
    border-radius: 1em;
    background-color: var(--color-text);
    scale: 0 1;
    transform-origin: left center;

    @include forced-colors {
      background-color: CanvasText;
    }
  }

  @include can-hover {
    .hero-title:hover .hero-strike::after {
      scale: 1 1;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .hero-strike::after {
      transition: scale var(--duration-normal) var(--easing-standard);
    }
  }

  .hero-lede {
    max-inline-size: 60ch;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--color-text-subtle);
  }

  .hero-watermark {
    position: absolute;
    z-index: -1;
    inline-size: 14rem;
    block-size: 14rem;
    color: var(--color-primary);
    opacity: 0.08;
    pointer-events: none;

    @include from('md') {
      inline-size: 30rem;
      block-size: 30rem;
    }

    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        animation: hero-watermark-parallax linear both;
        animation-timeline: view();
        animation-range: cover;
      }
    }

    @include forced-colors {
      display: none;
    }
  }

  .hero-watermark :deep(svg) {
    inline-size: 100%;
    block-size: 100%;
    stroke-width: 1;
  }

  .hero-watermark-lead {
    inset-block-start: 12%;
    inset-inline-start: 0;
    transform: translateX(-46%) rotate(-12deg);
  }

  .hero-watermark-trail {
    inset-block-end: 9%;
    inset-inline-end: 0;
    transform: translateX(46%) rotate(10deg);
  }

  @keyframes hero-watermark-parallax {
    from {
      translate: 0 -22%;
    }

    to {
      translate: 0 22%;
    }
  }

  .hero-icons {
    --hero-glyph: clamp(2.75rem, 7vw, 5rem);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* translateX cancels the half-track inset from centring the glyphs, so the
       first icon is flush-left without moving the tiled hit areas. */
    transform: translateX(calc((var(--hero-glyph) - 100% / 4) / 2));

    @include from('md') {
      grid-template-columns: repeat(6, 1fr);
      transform: translateX(calc((var(--hero-glyph) - 100% / 6) / 2));
    }
  }

  .hero-icon {
    display: grid;
    place-items: center;
    padding: var(--space-3);
    color: var(--color-text);

    &[data-kind='concept'] {
      color: var(--color-primary);
    }

    @media (prefers-reduced-motion: no-preference) {
      animation: hero-icon-in 0.5s var(--easing-enter) both;
      animation-delay: calc(var(--i, 0) * 45ms);
    }

    @include can-hover {
      transition: color var(--duration-normal) var(--easing-standard);
    }
  }

  @keyframes hero-icon-in {
    from {
      opacity: 0;
      transform: translateY(0.7rem);
    }
  }

  /* Styles the cell $offset siblings away (forward via `+`, backward via :has);
     $edge guards the row-boundary wrap. */
  @mixin dock-cell($offset, $dir, $edge, $scale, $color, $cols) {
    $guard: '';
    @if $edge == 'right' {
      $guard: ':not(:nth-child(#{$cols}n))';
    } @else if $edge == 'left' {
      $guard: ':not(:nth-child(#{$cols}n + 1))';
    }

    $sel: '';
    @if $dir == 'after' {
      $sel: '.hero-icon:hover#{$guard}';
      @for $i from 1 through $offset {
        $sel: '#{$sel} + .hero-icon';
      }
    } @else {
      // `through $offset - 1` would be `1 through 0`, which Sass counts DOWN — use `1 to`.
      $inner: '+ .hero-icon:hover#{$guard}';
      @for $i from 1 to $offset {
        $inner: '+ .hero-icon #{$inner}';
      }

      $sel: '.hero-icon:has(#{$inner})';
    }

    #{$sel} {
      color: $color;
    }

    #{$sel} .hero-icon-svg {
      scale: $scale;
    }
  }

  /* 2D bulge for $cols columns: ±1 left/right, ±$cols the row above/below,
     ±($cols ∓ 1) the diagonals. Colour rides the scale: more purple nearer. */
  @mixin dock-falloff($cols) {
    $near: 1.34;
    $diag: 1.16;
    $near-color: color-mix(in oklab, var(--color-accent) 60%, var(--color-primary));
    $diag-color: color-mix(in oklab, var(--color-accent) 25%, var(--color-primary));

    @include dock-cell(1, 'after', 'right', $near, $near-color, $cols); // right
    @include dock-cell(1, 'before', 'left', $near, $near-color, $cols); // left
    @include dock-cell($cols, 'after', '', $near, $near-color, $cols); // down
    @include dock-cell($cols, 'before', '', $near, $near-color, $cols); // up

    @include dock-cell($cols + 1, 'after', 'right', $diag, $diag-color, $cols); // down-right
    @include dock-cell($cols - 1, 'after', 'left', $diag, $diag-color, $cols); // down-left
    @include dock-cell($cols - 1, 'before', 'right', $diag, $diag-color, $cols); // up-right
    @include dock-cell($cols + 1, 'before', 'left', $diag, $diag-color, $cols); // up-left
  }

  @include can-hover {
    .hero-icon:hover {
      color: var(--color-accent);
    }

    @media (prefers-reduced-motion: no-preference) {
      .hero-icon:hover {
        z-index: 1;
      }

      .hero-icon:hover .hero-icon-svg {
        scale: 1.65;
      }

      @media (width < 48em) {
        @include dock-falloff(4);
      }

      @include from('md') {
        @include dock-falloff(6);
      }
    }
  }

  .hero-icon-svg {
    inline-size: var(--hero-glyph);
    block-size: var(--hero-glyph);
    fill: currentcolor;
    pointer-events: none;

    @include can-hover {
      transition: scale var(--duration-slow) var(--easing-standard);
    }

    @include forced-colors {
      fill: CanvasText;
    }
  }

  .hero-scroll {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: center;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-full);
    color: var(--color-text-subtle);
    font-size: var(--text-sm);
    font-weight: 600;
    text-decoration: none;

    @include can-hover {
      &:hover {
        color: var(--color-text);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .hero-scroll-icon {
    inline-size: 1.25rem;
    block-size: 1.25rem;
    fill: currentcolor;
    animation: hero-bob 1.8s ease-in-out infinite;

    @include reduced-motion {
      animation: none;
    }
  }

  @keyframes hero-bob {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(3px);
    }
  }

  .demo > h2 {
    font-size: var(--text-display-sm);
    font-weight: 800;
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
  }

  .demo > p {
    max-inline-size: 65ch;
    color: var(--color-text-subtle);
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .demo {
        /* fill none, not both: a held pre-entry transform inflates the rects of
           below-viewport sections, so smooth anchor scrolls overshoot (the
           showcase block is tall enough to land ~400px off). Off-screen
           sections don't need the hidden state applied to stay unseen. */
        animation: section-reveal linear none;
        animation-timeline: view();
        animation-range: entry 0% entry 420px;
      }

      @keyframes section-reveal {
        from {
          opacity: 0;
          transform: translateY(4rem) scale(0.94);
        }
      }
    }
  }

  .footer-title {
    font-size: var(--text-display-sm);
    font-weight: 800;
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
  }

  .footer-lede {
    max-inline-size: 65ch;
    color: var(--color-text-subtle);
  }

  .footer-details {
    max-inline-size: 65ch;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .footer-summary {
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .footer-details-body {
    display: grid;
    gap: var(--space-3);
    padding: 0 var(--space-4) var(--space-4);
    max-inline-size: 65ch;
    color: var(--color-text-subtle);
  }

  .footer-author {
    display: flex;
    align-items: start;
    gap: var(--space-4);
    max-inline-size: 60ch;
    margin-block-start: var(--space-12);
    padding-block-start: var(--space-12);
    border-block-start: 1px solid var(--color-border);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  /* The element is a gradient ring; the photo sits on ::after inset by the ring
     width. Spinning the conic angle (not the element) leaves the photo still. */
  .footer-author-avatar {
    position: relative;
    flex: none;
    inline-size: var(--space-20);
    block-size: var(--space-20);
    border-radius: var(--radius-full);
    background: conic-gradient(
      from var(--ring-angle, 0deg),
      var(--color-primary),
      var(--color-accent),
      var(--color-primary)
    );

    @media (prefers-reduced-motion: no-preference) {
      animation: avatar-ring-spin 3s linear infinite;
    }

    @include forced-colors {
      background: none;
      border: 1px solid currentcolor;
    }
  }

  /* Decorative (the name is in the adjacent text). background-* zooms and pans
     to frame the face; the gradient shows if the photo ever fails to load. */
  .footer-author-avatar::after {
    content: '';
    position: absolute;
    inset: 0.28rem;
    border-radius: var(--radius-full);
    background-color: var(--color-bg-subtle);
    background-image: url('/thomas.jpg'), var(--gradient-accent);
    background-size: 175%;
    background-position: 55% 18%;
    background-repeat: no-repeat;
  }

  @keyframes avatar-ring-spin {
    to {
      --ring-angle: 360deg;
    }
  }

  .footer-author-body {
    display: grid;
    gap: var(--space-3);
    padding-block-start: var(--space-2);
  }

  .footer-author-bio {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .footer-author-social {
    display: flex;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .footer-social-link {
    display: grid;
    place-items: center;
    inline-size: 40px;
    block-size: 40px;
    border-radius: var(--radius-full);
    color: var(--color-text-subtle);

    svg {
      inline-size: 1.25rem;
      block-size: 1.25rem;
    }

    @include can-hover {
      transition:
        color var(--duration-normal) var(--easing-standard),
        translate var(--duration-fast) var(--easing-standard),
        background-color var(--duration-normal) var(--easing-standard);

      &:hover {
        color: var(--color-primary);
        background-color: var(--color-bg-subtle);
      }

      @media (prefers-reduced-motion: no-preference) {
        &:hover {
          translate: 0 -3px;
        }
      }
    }
  }

  .footer-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-4);
    margin-block-start: var(--space-8);
    padding-block-start: var(--space-4);
    border-block-start: 1px solid var(--color-border);
    font-size: var(--text-sm);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .footer-copy {
    margin-inline-start: auto;
    color: var(--color-text-subtle);
  }
}
</style>
