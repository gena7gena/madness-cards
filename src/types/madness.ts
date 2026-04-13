export type MadnessCard = {
  title: string
  text: string
}

export type MadnessStep = {
  level: number
  cards: MadnessCard[]
}

export type MadnessSide = 'drawback' | 'advantage'

export type MadnessStepPair = {
  drawbackStep: MadnessStep
  advantageStep: MadnessStep
}
