<template>
  <PracticeSection :id="id" title="Answers">
    <slot />
    <ol class="practice-answers">
      <li v-for="a in answers" :key="a.n" class="practice-answers-item">
        <details>
          <summary class="practice-answers-hint">
            Barrier {{ a.n }}: {{ a.hint }}
          </summary>
          <details class="practice-answers-reveal">
            <summary>Reveal the answer</summary>
            <div class="practice-answers-reveal-body">
              <p>{{ a.what }}</p>
              <p v-if="a.heard" class="practice-answers-heard">
                <strong>Heard:</strong> {{ a.heard }}
              </p>
              <p v-if="a.shouldSay" class="practice-answers-should">
                <strong>Should say:</strong> {{ a.shouldSay }}
              </p>
              <p class="practice-answers-meta">
                <a :href="a.criterionHref">WCAG {{ a.criterion }}</a>
                · Caught by: {{ a.caught }}
              </p>
              <p>
                {{ a.fix }}
                <a v-if="a.fixLink" :href="a.fixLink.href">{{ a.fixLink.label }}</a>
              </p>
            </div>
          </details>
        </details>
      </li>
    </ol>
  </PracticeSection>
</template>

<script setup lang="ts">
import PracticeSection from './PracticeSection.vue'
import type { Answer } from './practiceAnswers'

defineProps<{ id: string; answers: Answer[] }>()
</script>

<style scoped lang="scss">
@layer components {
  .practice-answers {
    display: grid;
    gap: var(--space-2);
    margin-block: var(--space-6) 0;
    padding: 0;
    list-style: none;
  }

  .practice-answers-item > details {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--bp-line-strong);
    border-radius: var(--radius-md);
    background-color: var(--bp-sheet);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .practice-answers-hint {
    font-weight: 600;
    color: var(--bp-ink);
    cursor: pointer;

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .practice-answers-reveal {
    margin-block-start: var(--space-3);

    summary {
      inline-size: fit-content;
      font-family: var(--bp-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--bp-accent);
      cursor: pointer;

      &:focus-visible {
        outline: var(--focus-ring-width) solid var(--focus-ring-color);
        outline-offset: 2px;
      }
    }
  }

  .practice-answers-reveal-body {
    display: grid;
    gap: var(--space-2);
    padding-block-start: var(--space-2);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);

    p {
      margin: 0;
      max-inline-size: none;
    }
  }

  .practice-answers-heard,
  .practice-answers-should {
    border-inline-start: 2px solid var(--bp-line-strong);
    padding-inline-start: var(--space-3);
    font-size: var(--text-sm);

    @include high-contrast {
      border-inline-start-color: currentcolor;
    }
  }

  .practice-answers-meta {
    font-family: var(--bp-mono);
    font-size: 0.75rem;
    letter-spacing: 0.02em;
  }
}
</style>
