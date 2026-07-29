<template>
  <SiteFrame sheet="A·02" sheet-title="Agent skill">
    <h1 class="agent-skill-title">Agent skill</h1>
    <p class="agent-skill-lede">
      Everything this site argues, packaged so a coding agent can load it. Most
      accessibility barriers are not missing ARIA — they are a native element
      that got replaced by a <code>div</code> and then partially rebuilt. An
      agent that knows this reaches for the element instead.
    </p>

    <section class="agent-skill-section">
      <h2 class="agent-skill-h2">Install it</h2>
      <p class="agent-skill-p">
        A skill is a folder: one <code>SKILL.md</code> holding the rules, plus
        reference files the agent opens only when the task calls for them. Drop
        it wherever your tool loads skills from — for Claude Code that is
        <code>~/.claude/skills/</code>.
      </p>
      <CodeBlock :code="install" label="sh" />
    </section>

    <section class="agent-skill-section">
      <h2 class="agent-skill-h2">What it tells an agent</h2>
      <p class="agent-skill-p">
        Mostly one instruction in different shapes: use the thing that already
        does the job. Eight of the swaps it asks for:
      </p>

      <ul class="agent-skill-swaps">
        <li v-for="s in swaps" :key="s.need" class="agent-skill-swap">
          <span class="agent-skill-swap-need">{{ s.need }}</span>
          <span class="agent-skill-swap-line">
            <span class="agent-skill-swap-mark" aria-hidden="true">✓</span>
            Use <code>{{ s.use }}</code>
          </span>
          <span class="agent-skill-swap-line agent-skill-swap-line-not">
            <span class="agent-skill-swap-mark" aria-hidden="true">✕</span>
            Not {{ s.not }}
          </span>
        </li>
      </ul>

      <p class="agent-skill-p">
        Each native element arrives with keyboard behaviour, focus management, a
        role, a name, and conventions the user already knows. A rebuilt version
        starts at zero and has to earn all of it back. That gap is where the
        barriers come from.
      </p>
    </section>

    <section class="agent-skill-section">
      <h2 class="agent-skill-h2">What’s in it</h2>
      <dl class="agent-skill-files">
        <div v-for="f in files" :key="f.name" class="agent-skill-file">
          <dt class="agent-skill-file-name">{{ f.name }}</dt>
          <dd class="agent-skill-file-desc">{{ f.desc }}</dd>
        </div>
      </dl>
      <p class="agent-skill-p">
        The three reference files are generated from the same registries this
        site renders, so the skill cannot quietly drift from the demos you can
        click here.
      </p>
    </section>

    <section class="agent-skill-section">
      <h2 class="agent-skill-h2">A note on shelf life</h2>
      <p class="agent-skill-p">
        The rules are the durable part. They describe what the web platform
        does, and that moves slowly. How agents load skills is new and moving
        fast, so the install path and the file layout above may already be
        behind by the time you read this. If the mechanics do not match what
        your tool expects, treat the folder in the repository as the source of
        truth — the guidance inside it transfers either way.
      </p>
      <p class="agent-skill-p">
        <a :href="repo">Read the skill on GitHub</a>
      </p>
    </section>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import CodeBlock from '../../showcases/CodeBlock/CodeBlock.vue'

const repo = 'https://github.com/ThomasSweet/a11y-foundation/tree/main/skills/accessible-by-default'

const install = `git clone https://github.com/ThomasSweet/a11y-foundation
cp -r a11y-foundation/skills/accessible-by-default ~/.claude/skills/`

const swaps = [
  { need: 'A modal', use: '<dialog> + showModal()', not: 'a div plus a focus-trap library' },
  { need: 'A menu or a tooltip', use: 'popover', not: 'a div plus a click-outside handler' },
  { need: 'Expand and collapse', use: '<details> / <summary>', not: 'a div plus aria-expanded plus height JS' },
  { need: 'A dropdown', use: '<select>', not: 'a div with listbox roles' },
  { need: 'Anything clickable', use: '<button>', not: 'a div with a click handler' },
  { need: 'Anything that navigates', use: '<a href>', not: 'a button that calls the router' },
  { need: 'A field label', use: '<label for>', not: 'a placeholder, or aria-label alone' },
  { need: 'Validation styling', use: ':user-valid / :user-invalid', not: 'toggling classes on every keystroke' },
]

const files = [
  {
    name: 'SKILL.md',
    desc: 'The decisions: what to reach for, what never to break, how to guard a feature that is not Baseline yet, and the ways this usually goes wrong.',
  },
  {
    name: 'references/wcag-criteria.md',
    desc: 'The success criteria most often broken by hand-built components, each with its requirement and who pays when it is missed.',
  },
  {
    name: 'references/modern-css.md',
    desc: 'Every feature in the showcase, grouped by Baseline tier, with its @supports condition and the accessibility problem it solves.',
  },
  {
    name: 'references/css-snippets.md',
    desc: 'The accessible implementation of each one, free of this project’s tokens and mixins, so it is copy-paste ready.',
  },
]
</script>

<style scoped lang="scss">
@layer components {
  .agent-skill-title {
    margin: 0;
    max-inline-size: 15ch;
    font-size: var(--text-display-sm);
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-wrap: balance;
    color: var(--bp-ink);
  }

  .agent-skill-lede {
    max-inline-size: 58ch;
    margin-block: var(--space-4) 0;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .agent-skill-section {
    margin-block-start: var(--space-16);
    max-inline-size: 68ch;
  }

  .agent-skill-h2 {
    margin: 0 0 var(--space-4);
    font-size: var(--text-2xl);
    letter-spacing: -0.01em;
    color: var(--bp-ink);
  }

  .agent-skill-p {
    margin-block: var(--space-4) 0;
    max-inline-size: 62ch;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .agent-skill-swaps {
    display: grid;
    gap: var(--space-3);
    margin-block: var(--space-6) 0;
    padding: 0;
    list-style: none;
  }

  .agent-skill-swap {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--bp-line-strong);
    border-radius: var(--radius-md);
    background-color: var(--bp-sheet);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .agent-skill-swap-need {
    font-weight: 700;
    color: var(--bp-ink);
  }

  .agent-skill-swap-line {
    display: flex;
    gap: var(--space-2);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .agent-skill-swap-mark {
    flex: none;
    font-weight: 700;
    color: var(--color-success);
  }

  .agent-skill-swap-line-not .agent-skill-swap-mark {
    color: var(--color-error);
  }

  .agent-skill-files {
    display: grid;
    gap: var(--space-4);
    margin-block: var(--space-6) 0;
  }

  .agent-skill-file-name {
    font-family: var(--bp-mono);
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--bp-accent);
  }

  .agent-skill-file-desc {
    margin: var(--space-1) 0 0;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }
}
</style>
