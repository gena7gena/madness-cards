<script setup lang="ts">
import MadnessStepColumn from './components/MadnessStepColumn.vue'
import { madnessSteps } from './data/madness'
</script>

<template>
  <main class="layout">
    <header class="page-header">
      <p class="eyebrow">Из markdown</p>
      <h1>Ступени безумия</h1>
      <p class="intro">
        Каждая ступень недостатков стоит напротив соответствующей ступени преимуществ.
      </p>
    </header>

    <section class="board" aria-label="Ступени безумия">
      <div
        v-for="pair in madnessSteps"
        :key="pair.drawbackStep.level"
        class="step-group"
      >
        <h2 class="step-title">Ступень {{ pair.drawbackStep.level }}</h2>

        <div class="step-row">
          <MadnessStepColumn :step="pair.drawbackStep" side="drawback" />
          <MadnessStepColumn :step="pair.advantageStep" side="advantage" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.layout {
  width: min(1400px, 100%);
  margin: 0 auto;
  padding: 48px 24px 64px;
}

.page-header {
  max-width: 760px;
  margin-bottom: 32px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
  color: var(--muted);
}

h1 {
  margin: 10px 0 0;
  font-size: clamp(2.4rem, 4vw, 4.6rem);
  line-height: 0.95;
}

.intro {
  margin-top: 16px;
  max-width: 62ch;
  color: var(--muted);
  font-size: 1.05rem;
}

.board {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.step-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.step-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
}

.step-title {
  margin: 0;
  text-align: center;
  font-size: clamp(1.4rem, 2vw, 1.9rem);
  line-height: 1;
}

@media (max-width: 980px) {
  .layout {
    padding-inline: 16px;
    padding-top: 28px;
  }

  .step-row {
    grid-template-columns: 1fr;
  }
}
</style>
