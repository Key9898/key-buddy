import type { CharacterState } from './index'

export type CharacterTier = 'free' | 'premium'

export type CharacterCategory = 'animal' | 'fantasy' | 'minimal' | 'seasonal'

export { CharacterState }

export interface AnimationState {
  frames: number
  duration: number
  loop: boolean
}

export interface AnimationConfig {
  idle: AnimationState
  typing: AnimationState
  mouse: AnimationState
  click: AnimationState
  speaking: AnimationState
}

export interface CharacterProps {
  state: CharacterState
  className?: string
}

export interface CharacterMeta {
  id: string
  name: string
  displayName: string
  description: string
  thumbnail: string
  tier: CharacterTier
  category: CharacterCategory
  tags: string[]
  animations: AnimationConfig
  component:
    | React.LazyExoticComponent<React.ComponentType<CharacterProps>>
    | React.ComponentType<CharacterProps>
}

export interface CharacterRegistry {
  getAll: () => CharacterMeta[]
  getById: (id: string) => CharacterMeta | undefined
  getByCategory: (category: CharacterCategory) => CharacterMeta[]
  getByTier: (tier: CharacterTier) => CharacterMeta[]
  register: (character: CharacterMeta) => void
}

export type DownloadStatus =
  | 'idle'
  | 'downloading'
  | 'extracting'
  | 'installing'
  | 'completed'
  | 'error'

export interface DownloadProgress {
  status: DownloadStatus
  progress: number
  message: string
  error?: string
}

export interface CharacterPackManifest {
  id: string
  name: string
  displayName: string
  version: string
  author: string
  description: string
  thumbnail: string
  tier: CharacterTier
  category: CharacterCategory
  tags: string[]
  animations: AnimationConfig
  entryPoint: string
  assets?: string[]
  previewUrl?: string
  downloadUrl?: string
  fileSize?: number
  createdAt?: string
  updatedAt?: string
}

export interface CharacterPack {
  manifest: CharacterPackManifest
  source: 'local' | 'remote' | 'bundled'
  installedAt: string
  localPath?: string
  remoteUrl?: string
}

export interface RemoteCharacterPack extends CharacterPackManifest {
  downloadUrl: string
  fileSize: number
  downloads: number
  rating: number
  featured: boolean
}

export interface CharacterPackStore {
  installedPacks: CharacterPack[]
  downloadProgress: Map<string, DownloadProgress>
  installPack: (pack: CharacterPack) => void
  uninstallPack: (packId: string) => void
  getInstalledPack: (packId: string) => CharacterPack | undefined
  setDownloadProgress: (packId: string, progress: DownloadProgress) => void
  clearDownloadProgress: (packId: string) => void
}
