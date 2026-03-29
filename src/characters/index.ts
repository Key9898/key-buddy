import { characterRegistry } from './registry/characterRegistry'
import './mockCharacters' // This registers all characters

export { characterRegistry }
export type { CharacterBaseProps } from './base/CharacterBase'
export { getAnimationFrames, getAnimationKey } from './base/CharacterBase'
