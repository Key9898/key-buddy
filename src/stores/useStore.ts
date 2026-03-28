import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { CharacterState, Settings, defaultSettings } from '../types'

interface StoreState {
  characterState: CharacterState
  setCharacterState: (state: CharacterState) => void

  settings: Settings
  setSettings: (settings: Partial<Settings>) => void

  isTyping: boolean
  setIsTyping: (typing: boolean) => void

  mousePosition: { x: number; y: number }
  setMousePosition: (pos: { x: number; y: number }) => void

  micLevel: number
  setMicLevel: (level: number) => void

  pressedKeys: string[]
  setPressedKeys: (keys: string[]) => void

  mouseButtons: string[]
  setMouseButtons: (buttons: string[]) => void
}

const storeCreator: StateCreator<StoreState> = (set) => ({
  characterState: 'idle',
  setCharacterState: (state: CharacterState) => set({ characterState: state }),

  settings: defaultSettings,
  setSettings: (newSettings: Partial<Settings>) =>
    set((state: StoreState) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  isTyping: false,
  setIsTyping: (typing: boolean) => set({ isTyping: typing }),

  mousePosition: { x: 0, y: 0 },
  setMousePosition: (pos: { x: number; y: number }) => set({ mousePosition: pos }),

  micLevel: 0,
  setMicLevel: (level: number) => set({ micLevel: level }),

  pressedKeys: [],
  setPressedKeys: (keys: string[]) => set({ pressedKeys: keys }),

  mouseButtons: [],
  setMouseButtons: (buttons: string[]) => set({ mouseButtons: buttons }),
})

export const useStore = create(storeCreator)
