import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StateCreator } from 'zustand'
import type { CharacterPack, DownloadProgress, CharacterPackManifest } from '../types/character'
import { characterRegistry } from '../characters/registry/characterRegistry'
import React from 'react'

interface CharacterPackStore {
  installedPacks: CharacterPack[]
  downloadProgress: Record<string, DownloadProgress>

  installPack: (pack: CharacterPack) => void
  uninstallPack: (packId: string) => void
  getInstalledPack: (packId: string) => CharacterPack | undefined
  isPackInstalled: (packId: string) => boolean

  setDownloadProgress: (packId: string, progress: DownloadProgress) => void
  getDownloadProgress: (packId: string) => DownloadProgress | undefined
  clearDownloadProgress: (packId: string) => void

  registerPackAsCharacter: (pack: CharacterPack) => void
}

const characterPackStoreCreator: StateCreator<CharacterPackStore> = (set, get) => ({
  installedPacks: [],
  downloadProgress: {},

  installPack: (pack: CharacterPack) => {
    const existing = get().getInstalledPack(pack.manifest.id)
    if (existing) return

    set((state) => ({
      installedPacks: [...state.installedPacks, pack],
    }))

    get().registerPackAsCharacter(pack)
  },

  uninstallPack: (packId: string) => {
    set((state) => ({
      installedPacks: state.installedPacks.filter((p) => p.manifest.id !== packId),
    }))
  },

  getInstalledPack: (packId: string) => {
    return get().installedPacks.find((p) => p.manifest.id === packId)
  },

  isPackInstalled: (packId: string) => {
    return get().installedPacks.some((p) => p.manifest.id === packId)
  },

  setDownloadProgress: (packId: string, progress: DownloadProgress) => {
    set((state) => ({
      downloadProgress: { ...state.downloadProgress, [packId]: progress },
    }))
  },

  getDownloadProgress: (packId: string) => {
    return get().downloadProgress[packId]
  },

  clearDownloadProgress: (packId: string) => {
    set((state) => {
      const newProgress = { ...state.downloadProgress }
      delete newProgress[packId]
      return { downloadProgress: newProgress }
    })
  },

  registerPackAsCharacter: (pack: CharacterPack) => {
    const manifest = pack.manifest

    const LazyComponent = React.lazy(async () => {
      if (pack.source === 'local' && pack.localPath) {
        try {
          const module = await import(
            /* @vite-ignore */
            pack.localPath + '/' + manifest.entryPoint
          )
          return { default: module.default }
        } catch {
          return {
            default: () => (
              <div className="p-4 text-center text-error">
                Failed to load character: {manifest.displayName}
              </div>
            ),
          }
        }
      }

      return {
        default: () => <div className="p-4 text-center">{manifest.displayName} (Preview Mode)</div>,
      }
    })

    const characterMeta = {
      id: manifest.id,
      name: manifest.name,
      displayName: manifest.displayName,
      description: manifest.description,
      thumbnail: manifest.thumbnail,
      tier: manifest.tier,
      category: manifest.category,
      tags: manifest.tags,
      animations: manifest.animations,
      component: LazyComponent,
    }

    characterRegistry.register(characterMeta)
  },
})

export const useCharacterPackStore = create<CharacterPackStore>()(
  persist(characterPackStoreCreator, {
    name: 'keybuddy-character-packs',
    partialize: (state) => ({
      installedPacks: state.installedPacks,
    }),
  })
)

export function manifestToPack(
  manifest: CharacterPackManifest,
  source: 'local' | 'remote' = 'local',
  localPath?: string,
  remoteUrl?: string
): CharacterPack {
  return {
    manifest,
    source,
    installedAt: new Date().toISOString(),
    localPath,
    remoteUrl,
  }
}
