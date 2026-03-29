import type { CharacterProps, CharacterState, AnimationConfig } from '../../types/character'

export interface CharacterBaseProps extends CharacterProps {}

export function getAnimationFrames(
  config: AnimationConfig,
  state: CharacterState
): { frames: number; duration: number; loop: boolean } {
  return config[state]
}

export function getAnimationKey(state: CharacterState, frame: number): string {
  return `${state}-${frame}`
}
