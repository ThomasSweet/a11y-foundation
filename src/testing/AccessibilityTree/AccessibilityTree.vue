<template>
  <ul class="accessibility-tree" role="list">
    <li class="accessibility-tree-card">
      <p class="accessibility-tree-kind">01 · Styled only</p>
      <div class="accessibility-tree-stage">
        <div class="accessibility-tree-button">Save draft</div>
      </div>
      <p class="accessibility-tree-markup"><code>{{ fakeButtonMarkup }}</code></p>
      <dl class="accessibility-tree-readout">
        <div class="accessibility-tree-row">
          <dt>Role</dt>
          <dd><code>generic</code></dd>
        </div>
        <div class="accessibility-tree-row">
          <dt>Name</dt>
          <dd>none</dd>
        </div>
        <div class="accessibility-tree-row">
          <dt>From</dt>
          <dd>—</dd>
        </div>
      </dl>
      <p class="accessibility-tree-note">
        To the tree this is text in a box: not focusable, not pressable,
        nothing to announce. And because nothing says it was meant to be a
        button, a scanner has nothing to flag — the quiet failure.
      </p>
    </li>

    <li class="accessibility-tree-card">
      <p class="accessibility-tree-kind">02 · The native element</p>
      <div class="accessibility-tree-stage">
        <button type="button" class="accessibility-tree-button">Save draft</button>
      </div>
      <p class="accessibility-tree-markup"><code>{{ realButtonMarkup }}</code></p>
      <dl class="accessibility-tree-readout">
        <div class="accessibility-tree-row">
          <dt>Role</dt>
          <dd><code>button</code></dd>
        </div>
        <div class="accessibility-tree-row">
          <dt>Name</dt>
          <dd>“Save draft”</dd>
        </div>
        <div class="accessibility-tree-row">
          <dt>From</dt>
          <dd>its content</dd>
        </div>
      </dl>
      <p class="accessibility-tree-note">
        Same pixels, different tree. The element brings the role, the focus
        stop, and the keyboard behaviour; the text becomes the name for free.
      </p>
    </li>

    <li class="accessibility-tree-card">
      <p class="accessibility-tree-kind">03 · A label that points</p>
      <div class="accessibility-tree-stage">
        <label class="accessibility-tree-label" for="accessibility-tree-email">Email</label>
        <input
          id="accessibility-tree-email"
          class="accessibility-tree-input"
          type="email"
          autocomplete="email"
        />
      </div>
      <p class="accessibility-tree-markup"><code>{{ labelMarkup }}</code></p>
      <dl class="accessibility-tree-readout">
        <div class="accessibility-tree-row">
          <dt>Role</dt>
          <dd><code>textbox</code></dd>
        </div>
        <div class="accessibility-tree-row">
          <dt>Name</dt>
          <dd>“Email”</dd>
        </div>
        <div class="accessibility-tree-row">
          <dt>From</dt>
          <dd>the <code>&lt;label&gt;</code></dd>
        </div>
      </dl>
      <p class="accessibility-tree-note">
        <code>for</code> wires the two together: the field is named in the
        tree, and clicking the label focuses it — one attribute, two wins.
      </p>
    </li>

    <li class="accessibility-tree-card">
      <p class="accessibility-tree-kind">04 · ARIA on top</p>
      <div class="accessibility-tree-stage">
        <button type="button" class="accessibility-tree-button" aria-label="Add to cart, size medium">
          Add to cart
        </button>
      </div>
      <p class="accessibility-tree-markup"><code>{{ ariaLabelMarkup }}</code></p>
      <dl class="accessibility-tree-readout">
        <div class="accessibility-tree-row">
          <dt>Role</dt>
          <dd><code>button</code></dd>
        </div>
        <div class="accessibility-tree-row">
          <dt>Name</dt>
          <dd>“Add to cart, size medium”</dd>
        </div>
        <div class="accessibility-tree-row">
          <dt>From</dt>
          <dd><code>aria-label</code></dd>
        </div>
      </dl>
      <p class="accessibility-tree-note">
        <code>aria-label</code> replaces the content in the tree entirely.
        Keep the visible words at the front — voice-control users press
        buttons by saying what they see (WCAG 2.5.3).
      </p>
    </li>
  </ul>
</template>

<script setup lang="ts">
const fakeButtonMarkup = '<div class="btn">Save draft</div>'
const realButtonMarkup = '<button>Save draft</button>'
const labelMarkup = '<label for="email">Email</label> <input id="email" type="email">'
const ariaLabelMarkup = '<button aria-label="Add to cart, size medium">Add to cart</button>'
</script>

<style scoped lang="scss">
@layer components {
  .accessibility-tree {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr));
    gap: var(--space-4);
    margin-block: var(--space-6) 0;
    padding: 0;
    list-style: none;
  }

  .accessibility-tree-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-inline-size: 0;
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .accessibility-tree-kind {
    margin: 0;
    font-family: var(--bp-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-subtle);
  }

  .accessibility-tree-stage {
    padding-block: var(--space-2);
  }

  .accessibility-tree-button {
    display: inline-flex;
    align-items: center;
    min-block-size: 2.75rem;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);
    font: inherit;
    font-weight: 600;
    color: var(--color-text);
  }

  .accessibility-tree-label {
    display: block;
    margin-block-end: var(--space-1);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text);
  }

  .accessibility-tree-input {
    inline-size: 100%;
    max-inline-size: 16rem;
    min-block-size: 2.75rem;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);
    font: inherit;
    color: var(--color-text);
  }

  .accessibility-tree-markup {
    margin: 0;
    font-size: var(--text-sm);
    overflow-wrap: break-word;
  }

  .accessibility-tree-readout {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding-block-start: var(--space-2);
    border-block-start: 1px dashed var(--color-border);
  }

  .accessibility-tree-row {
    display: grid;
    grid-template-columns: 3.5rem 1fr;
    gap: var(--space-2);
    align-items: baseline;
  }

  .accessibility-tree-row dt {
    font-family: var(--bp-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-subtle);
  }

  .accessibility-tree-row dd {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--color-text);
  }

  .accessibility-tree-note {
    margin: 0;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--color-text-subtle);
  }
}
</style>
