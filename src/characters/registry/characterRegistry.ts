import type {
  CharacterMeta,
  CharacterRegistry,
  CharacterCategory,
  CharacterTier,
} from '../../types/character'

class CharacterRegistryImpl implements CharacterRegistry {
  private characters: Map<string, CharacterMeta> = new Map()

  register(character: CharacterMeta): void {
    this.characters.set(character.id, character)
  }

  getAll(): CharacterMeta[] {
    return Array.from(this.characters.values())
  }

  getById(id: string): CharacterMeta | undefined {
    return this.characters.get(id)
  }

  getByCategory(category: CharacterCategory): CharacterMeta[] {
    return this.getAll().filter((c) => c.category === category)
  }

  getByTier(tier: CharacterTier): CharacterMeta[] {
    return this.getAll().filter((c) => c.tier === tier)
  }
}

export const characterRegistry = new CharacterRegistryImpl()
