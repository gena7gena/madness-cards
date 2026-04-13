<script setup lang="ts">
import type { MadnessCard, MadnessSide } from '../types/madness'

defineProps<{
  card: MadnessCard
  side: MadnessSide
}>()
</script>

<template>
  <article class="card-item" :class="`card-item-${side}`">
    <h3>{{ card.title }}</h3>
    <p>{{ card.text }}</p>
  </article>
</template>

<style scoped>
.card-item {
  min-height: 168px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 55%),
    #121316;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.card-item-drawback {
  border-color: rgba(166, 75, 93, 0.24);
}

.card-item-advantage {
  border-color: rgba(74, 143, 114, 0.34);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 0 0 1px rgba(74, 143, 114, 0.06);
}

h3 {
  margin: 0 0 10px;
  font-size: 1rem;
}

p {
  margin: 0;
  color: var(--muted);
  font-size: 0.96rem;
}
</style>
