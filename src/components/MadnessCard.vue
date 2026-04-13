<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { MadnessCard, MadnessSide } from '../types/madness'

const props = defineProps<{
  card: MadnessCard
  side: MadnessSide
}>()

const textRef = ref<HTMLElement | null>(null)
const isExpanded = ref(false)
const isOverflowing = ref(false)

const buttonLabel = computed(() => (isExpanded.value ? 'свернуть' : 'далее'))

function updateOverflowState() {
  const textElement = textRef.value

  if (!textElement || isExpanded.value) {
    return
  }

  isOverflowing.value = textElement.scrollHeight > textElement.clientHeight + 1
}

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

function handleResize() {
  updateOverflowState()
}

onMounted(async () => {
  await nextTick()
  updateOverflowState()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

watch(isExpanded, async (expanded) => {
  if (!expanded) {
    await nextTick()
    updateOverflowState()
  }
})
</script>

<template>
  <article
    class="card-item"
    :class="[`card-item-${side}`, { 'card-item-expanded': isExpanded }]"
  >
    <h3>{{ card.title }}</h3>

    <p
      ref="textRef"
      class="card-text"
      :class="{ 'card-text-expanded': isExpanded }"
    >
      {{ props.card.text }}
    </p>

    <button
      v-if="isOverflowing || isExpanded"
      type="button"
      class="toggle-button"
      :class="`toggle-button-${side}`"
      @click="toggleExpanded"
    >
      {{ buttonLabel }}
    </button>
  </article>
</template>

<style scoped>
.card-item {
  height: 220px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 55%),
    #121316;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
}

.card-item-expanded {
  height: auto;
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

.card-text {
  margin: 0;
  color: var(--muted);
  font-size: 0.96rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text-expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
}

.toggle-button {
  margin-top: auto;
  align-self: flex-start;
  padding: 8px 0 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
}

.toggle-button-drawback {
  color: #ffb3c0;
}

.toggle-button-advantage {
  color: #a9e3ca;
}
</style>
