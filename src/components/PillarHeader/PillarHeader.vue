<template>
  <!-- Opens a pillar like a chapter: a per-pillar mark, the numbered eyebrow,
       the pillar title (the real <h2> for this region), and an optional lead.
       The icon is decorative; the heading carries the accessible name. -->
  <header class="pillar-header">
    <p class="pillar-header-eyebrow">{{ eyebrow }}</p>
    <div class="pillar-header-top">
      <span class="pillar-header-icon" aria-hidden="true" v-html="icons[icon]"></span>
      <h2 :id="titleId" class="pillar-header-title">{{ title }}</h2>
    </div>
    <p v-if="$slots.default" class="pillar-header-lead"><slot /></p>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  icon: 'standard' | 'craft' | 'next' | 'proof'
  eyebrow: string
  title: string
  titleId: string
}>()

// Decorative line icons, one per pillar — stroke-based so they echo the
// brand's focus-ring motif, on a shared 24×24 geometry so the set reads as
// one family. Kept inline (not a sprite) since there are only four.
const svg = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`

const icons: Record<string, string> = {
  // Checklist — the requirement / the standard.
  standard: svg(
    '<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="m7.2 8.2 1.3 1.3 2.3-2.5"/><path d="M13.5 8h3.3"/><path d="m7.2 14.2 1.3 1.3 2.3-2.5"/><path d="M13.5 14h3.3"/>',
  ),
  // Curly braces — the craft of modern CSS / HTML.
  craft: svg(
    '<path d="M9.5 4c-1.8 0-2.5.8-2.5 2.6v2c0 1.3-.5 1.9-1.8 1.9 1.3 0 1.8.6 1.8 1.9v2c0 1.8.7 2.6 2.5 2.6"/><path d="M14.5 4c1.8 0 2.5.8 2.5 2.6v2c0 1.3.5 1.9 1.8 1.9-1.3 0-1.8.6-1.8 1.9v2c0 1.8-.7 2.6-2.5 2.6"/>',
  ),
  // Sparkle — what's arriving next.
  next: svg(
    '<path d="M12 3.5c.7 4 1.8 5.1 5.5 5.8-3.7.7-4.8 1.8-5.5 5.8-.7-4-1.8-5.1-5.5-5.8 3.7-.7 4.8-1.8 5.5-5.8z"/><path d="M18 14.5c.3 1.6.8 2.1 2.3 2.4-1.5.3-2 .8-2.3 2.4-.3-1.6-.8-2.1-2.3-2.4 1.5-.3 2-.8 2.3-2.4z"/>',
  ),
  // Shield + check — the proof it holds up.
  proof: svg(
    '<path d="M12 3 5 5.8v5.2c0 4.3 3 7.4 7 8.9 4-1.5 7-4.6 7-8.9V5.8L12 3z"/><path d="m8.8 11.8 2.2 2.2 4.2-4.4"/>',
  ),
}
</script>

<style scoped lang="scss">
@layer components {
  .pillar-header {
    display: grid;
    gap: var(--space-4);
    justify-items: start;
    max-inline-size: 60ch;
  }

  /* Icon and title ride on one line, centred on each other, so the mark
     anchors the heading instead of floating above it. The eyebrow sits on its
     own line above. */
  .pillar-header-top {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  /* Pull the eyebrow close to the icon/title row it labels. */
  .pillar-header-eyebrow + .pillar-header-top {
    margin-block-start: calc(var(--space-4) * -1 + var(--space-2));
  }

  /* App-icon style tile, echoing the favicon: the mark sits in a soft rounded
     square so each pillar opens with a clear visual anchor. */
  .pillar-header-icon {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    inline-size: 3.5rem;
    block-size: 3.5rem;
    color: var(--color-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .pillar-header-icon :deep(svg) {
    inline-size: 2rem;
    block-size: 2rem;
  }

  .pillar-header-eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    letter-spacing: 0.02em;
    color: var(--color-primary);
  }

  .pillar-header-title {
    /* A mini-poster scale — smaller than the hero, larger than a section. */
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
  }

  .pillar-header-lead {
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--color-text-subtle);
  }
}
</style>
