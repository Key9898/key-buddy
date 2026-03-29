import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StateCreator } from 'zustand'
import { characterRegistry } from '../characters/registry/characterRegistry'

interface CharacterStore {
  selectedCharacterId: string
  unlockedCharacters: string[]
  setSelectedCharacterId: (id: string) => void
  unlockCharacter: (id: string) => void
  isCharacterUnlocked: (id: string) => boolean
}

const characterStoreCreator: StateCreator<CharacterStore> = (set) => ({
  selectedCharacterId: 'keybuddy-classic',
  unlockedCharacters: ['keybuddy-classic', 'shiba-mate'],

  setSelectedCharacterId: (id: string) => set({ selectedCharacterId: id }),

  unlockCharacter: (id: string) =>
    set((state) => ({
      unlockedCharacters: state.unlockedCharacters.includes(id)
        ? state.unlockedCharacters
        : [...state.unlockedCharacters, id],
    })),

  isCharacterUnlocked: (id: string): boolean => {
    // DEVELOPER MODE: Unlock all characters for the user to test during implementation
    // return get().unlockedCharacters.includes(id) || true;
    const character = characterRegistry.getById(id)
    if (!character) return false
    // Temporarily returning true for easier local testing of all tiers
    return true
  },
})

export const useCharacterStore = create<CharacterStore>()(
  persist(characterStoreCreator, {
    name: 'keybuddy-character-store',
    partialize: (state) => ({
      selectedCharacterId: state.selectedCharacterId,
      unlockedCharacters: state.unlockedCharacters,
    }),
  })
)
