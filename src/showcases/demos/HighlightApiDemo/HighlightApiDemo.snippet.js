// Build Range objects over the matches, then register them under a name.
// The ::highlight(search) rule paints them — no DOM mutation.
const ranges = findMatchRanges(container, query) // your match-finding
CSS.highlights.set('search', new Highlight(...ranges))

// Presentation only: because it never touches the DOM or a11y tree, it must
// never be the sole way meaning is conveyed.
