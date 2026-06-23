// Wrap the DOM change; the browser captures before/after and tweens the morph
// — no FLIP math, no animation library. Guard it so the swap stays instant
// under reduced motion and where the API isn't supported.
function setView(next) {
  const apply = () => render(next)
  if (document.startViewTransition && !prefersReducedMotion()) {
    document.startViewTransition(apply)
  } else {
    apply()
  }
}
