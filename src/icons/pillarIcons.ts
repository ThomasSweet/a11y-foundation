/**
 * The four pillar marks — shared by the hub plates, the chapter headers, and
 * their oversized watermarks. Decorative; always rendered aria-hidden.
 */
const svg = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`

export type PillarIconName = 'standard' | 'craft' | 'next' | 'proof'

export const pillarIcons: Record<PillarIconName, string> = {
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
