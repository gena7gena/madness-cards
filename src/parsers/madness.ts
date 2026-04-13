import type { MadnessCard, MadnessStep, MadnessStepPair } from '../types/madness'

type MadnessSection = 'drawback' | 'advantage'

const SECTION_BY_TITLE: Record<string, MadnessSection> = {
  Недостатки: 'drawback',
  Преимущества: 'advantage',
}

function createStep(level: number): MadnessStep {
  return {
    level,
    cards: [],
  }
}

function startsWithTodo(value: string): boolean {
  return /^todo\b/i.test(value.trim())
}

function getOrCreateStep(stepsByLevel: Map<number, MadnessStep>, level: number): MadnessStep {
  const existingStep = stepsByLevel.get(level)

  if (existingStep) {
    return existingStep
  }

  const step = createStep(level)
  stepsByLevel.set(level, step)
  return step
}

export function parseMadnessMarkdown(markdown: string): MadnessStepPair[] {
  const sideMaps: Record<MadnessSection, Map<number, MadnessStep>> = {
    drawback: new Map<number, MadnessStep>(),
    advantage: new Map<number, MadnessStep>(),
  }

  let currentSection: MadnessSection | null = null
  let currentStep: MadnessStep | null = null
  let currentCard: MadnessCard | null = null
  let ignoreTodoBlock = false

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim()

    if (!line) {
      continue
    }

    const mainHeadingMatch = line.match(/^#\s+(.+)$/)

    if (mainHeadingMatch) {
      const title = mainHeadingMatch[1].trim()
      currentSection = SECTION_BY_TITLE[title] ?? null
      currentStep = null
      currentCard = null
      ignoreTodoBlock = false
      continue
    }

    if (!currentSection) {
      continue
    }

    const stepHeadingMatch = line.match(/^##\s+(.+)$/)

    if (stepHeadingMatch) {
      const title = stepHeadingMatch[1].trim()
      currentCard = null
      ignoreTodoBlock = false

      if (startsWithTodo(title)) {
        currentStep = null
        continue
      }

      const levelMatch = title.match(/(\d+)/)

      if (!levelMatch) {
        currentStep = null
        continue
      }

      currentStep = getOrCreateStep(sideMaps[currentSection], Number(levelMatch[1]))
      continue
    }

    const cardHeadingMatch = line.match(/^###\s+(.+)$/)

    if (cardHeadingMatch) {
      const title = cardHeadingMatch[1].trim()
      ignoreTodoBlock = false

      if (!currentStep || startsWithTodo(title)) {
        currentCard = null
        continue
      }

      currentCard = {
        title,
        text: '',
      }
      currentStep.cards.push(currentCard)
      continue
    }

    if (startsWithTodo(line)) {
      currentCard = null
      ignoreTodoBlock = true
      continue
    }

    if (ignoreTodoBlock || !currentCard) {
      continue
    }

    currentCard.text = currentCard.text ? `${currentCard.text} ${line}` : line
  }

  const levels = [...new Set([...sideMaps.drawback.keys(), ...sideMaps.advantage.keys()])].sort(
    (left, right) => left - right,
  )

  return levels.map((level) => ({
    drawbackStep: sideMaps.drawback.get(level) ?? createStep(level),
    advantageStep: sideMaps.advantage.get(level) ?? createStep(level),
  }))
}
