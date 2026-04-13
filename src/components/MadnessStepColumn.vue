<script setup lang="ts">
import MadnessCard from './MadnessCard.vue'
import type { MadnessSide, MadnessStep } from '../types/madness'

const props = defineProps<{
  step: MadnessStep
  side: MadnessSide
}>()

const sideTitle = props.side === 'drawback' ? 'Недостатки' : 'Преимущества'
</script>

<template>
  <section class="step-column" :class="`step-column-${side}`">
    <header class="step-heading">
      <p class="side-title">{{ sideTitle }}</p>
    </header>

    <div class="cards-grid">
      <MadnessCard
        v-for="card in step.cards"
        :key="card.title"
        :card="card"
        :side="side"
      />
    </div>
  </section>
</template>

<style scoped>
.step-column {
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(8px);
}

.step-column-drawback {
  background:
    linear-gradient(180deg, rgba(166, 75, 93, 0.2), rgba(166, 75, 93, 0.06) 35%, transparent 72%),
    var(--panel);
  border-color: rgba(166, 75, 93, 0.34);
}

.step-column-advantage {
  background:
    linear-gradient(180deg, rgba(74, 143, 114, 0.34), rgba(74, 143, 114, 0.14) 42%, transparent 78%),
    linear-gradient(135deg, rgba(27, 61, 49, 0.72), rgba(20, 35, 31, 0.72)),
    var(--panel);
  border-color: rgba(74, 143, 114, 0.52);
}

.step-heading {
  margin-bottom: 16px;
}

.side-title {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.92rem;
  font-weight: 700;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  align-items: start;
}

.step-column-drawback .side-title {
  color: #ffb3c0;
}

.step-column-advantage .side-title {
  color: #a9e3ca;
}
</style>
