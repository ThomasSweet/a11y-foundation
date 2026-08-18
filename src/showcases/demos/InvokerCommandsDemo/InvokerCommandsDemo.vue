<template>
  <div class="invoker-commands-demo">
    <p class="invoker-commands-invite">
      Open the dialog with the first button and watch focus move inside it.
      Press <kbd>Esc</kbd>: it closes, and focus lands back on the button you
      pressed. The second button toggles a small popover card. No JavaScript is
      wired to any of this — each button declares a <code>command</code> and a
      <code>commandfor</code>, and the browser does the rest.
    </p>

    <p class="invoker-commands-note">
      If nothing happens, your browser hasn't shipped invoker commands yet —
      the buttons below are wired with attributes alone.
    </p>

    <div class="invoker-commands-row">
      <button
        type="button"
        class="invoker-commands-button"
        commandfor="invoker-commands-dialog"
        command="show-modal"
      >
        Open the dialog
      </button>

      <button
        type="button"
        class="invoker-commands-button invoker-commands-popover-trigger"
        commandfor="invoker-commands-popover"
        command="toggle-popover"
      >
        Toggle the popover
      </button>
    </div>

    <dialog id="invoker-commands-dialog" class="invoker-commands-dialog">
      <h4 class="invoker-commands-dialog-title">All of this came free</h4>
      <p class="invoker-commands-dialog-text">
        Focus moved in here on its own. This dialog sits in the top layer, the
        page behind it is inert under the backdrop, and <kbd>Esc</kbd> already
        works. Close it and focus hands straight back to the trigger — none of
        that behaviour is scripted.
      </p>
      <div class="invoker-commands-dialog-actions">
        <button
          type="button"
          class="invoker-commands-button"
          commandfor="invoker-commands-dialog"
          command="close"
        >
          Close
        </button>
      </div>
    </dialog>

    <div id="invoker-commands-popover" popover class="invoker-commands-popover">
      <p>
        This card sits in the top layer too. Toggle it closed with the same
        button, press <kbd>Esc</kbd>, or click anywhere else — light dismiss is
        part of the deal.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .invoker-commands-demo {
    display: grid;
    gap: var(--space-3);

    kbd {
      padding: 0 var(--space-1);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-family: var(--bp-mono);
      font-size: 0.85em;
    }
  }

  .invoker-commands-invite {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .invoker-commands-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
    font-style: italic;
  }

  .invoker-commands-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }

  .invoker-commands-button {
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    font-weight: 600;
    cursor: pointer;

    @include can-hover {
      &:hover {
        background-color: var(--color-bg-subtle);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .invoker-commands-popover-trigger {
    anchor-name: --invoker-commands-popover-anchor;
  }

  .invoker-commands-dialog {
    max-inline-size: 40ch;
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-lg);

    &::backdrop {
      background-color: rgb(0 0 0 / 45%);
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .invoker-commands-dialog-title {
    margin-block-end: var(--space-2);
    font-size: var(--text-lg);
    font-weight: 700;
  }

  .invoker-commands-dialog-text {
    margin-block-end: var(--space-4);
    color: var(--color-text-subtle);
  }

  .invoker-commands-dialog-actions {
    display: flex;
    justify-content: flex-end;
  }

  .invoker-commands-popover {
    max-inline-size: 32ch;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-md);
    font-size: var(--text-sm);

    p {
      margin: 0;
    }

    @supports (anchor-name: --a) {
      position: fixed;
      position-anchor: --invoker-commands-popover-anchor;
      position-area: block-end span-inline-end;
      inset: auto;
      margin-block-start: var(--space-2);
      position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }
}
</style>
