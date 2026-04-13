import madnessMarkdown from '../../cards/Ступени Безумия - Кровь.md?raw'
import { parseMadnessMarkdown } from '../parsers/madness'

export const madnessSteps = parseMadnessMarkdown(madnessMarkdown)
