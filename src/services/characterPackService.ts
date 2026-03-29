import type {
  CharacterPackManifest,
  CharacterPack,
  DownloadProgress,
  RemoteCharacterPack,
} from '../types/character'
import { useCharacterPackStore } from '../stores/useCharacterPackStore'

const MANIFEST_FILE = 'manifest.json'
const REQUIRED_MANIFEST_FIELDS: (keyof CharacterPackManifest)[] = [
  'id',
  'name',
  'displayName',
  'version',
  'author',
  'description',
  'thumbnail',
  'tier',
  'category',
  'animations',
  'entryPoint',
]

export interface ValidationResult {
  valid: boolean
  errors: string[]
  manifest?: CharacterPackManifest
}

export function validateManifest(data: unknown): ValidationResult {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid manifest: not an object'] }
  }

  const manifest = data as Record<string, unknown>

  for (const field of REQUIRED_MANIFEST_FIELDS) {
    if (!(field in manifest)) {
      errors.push(`Missing required field: ${field}`)
    }
  }

  if (manifest.animations && typeof manifest.animations === 'object') {
    const anim = manifest.animations as Record<string, unknown>
    const requiredAnimations = ['idle', 'typing', 'mouse', 'click', 'speaking']
    for (const animField of requiredAnimations) {
      if (!(animField in anim)) {
        errors.push(`Missing animation: ${animField}`)
      }
    }
  }

  if (manifest.tier && !['free', 'premium'].includes(manifest.tier as string)) {
    errors.push(`Invalid tier: ${manifest.tier}. Must be 'free' or 'premium'`)
  }

  if (
    manifest.category &&
    !['animal', 'fantasy', 'minimal', 'seasonal'].includes(manifest.category as string)
  ) {
    errors.push(
      `Invalid category: ${manifest.category}. Must be 'animal', 'fantasy', 'minimal', or 'seasonal'`
    )
  }

  return {
    valid: errors.length === 0,
    errors,
    manifest: errors.length === 0 ? (manifest as unknown as CharacterPackManifest) : undefined,
  }
}

export async function parseManifestFile(file: File): Promise<ValidationResult> {
  try {
    const text = await file.text()
    const data = JSON.parse(text)
    return validateManifest(data)
  } catch (error) {
    return {
      valid: false,
      errors: [
        `Failed to parse manifest: ${error instanceof Error ? error.message : 'Unknown error'}`,
      ],
    }
  }
}

export async function importFromDirectory(
  dirHandle: FileSystemDirectoryHandle
): Promise<ValidationResult & { pack?: CharacterPack }> {
  try {
    const manifestFile = await dirHandle.getFileHandle(MANIFEST_FILE)
    const file = await manifestFile.getFile()
    const result = await parseManifestFile(file)

    if (!result.valid || !result.manifest) {
      return result
    }

    const pack: CharacterPack = {
      manifest: result.manifest,
      source: 'local',
      installedAt: new Date().toISOString(),
      localPath: dirHandle.name,
    }

    return { ...result, pack }
  } catch (error) {
    return {
      valid: false,
      errors: [
        `Failed to import from directory: ${error instanceof Error ? error.message : 'Unknown error'}`,
      ],
    }
  }
}

export async function importFromZip(
  file: File
): Promise<ValidationResult & { pack?: CharacterPack }> {
  try {
    const JSZip = (await import('jszip')).default
    const zip = await JSZip.loadAsync(file)

    const manifestFile = zip.file(MANIFEST_FILE)
    if (!manifestFile) {
      return { valid: false, errors: ['No manifest.json found in zip file'] }
    }

    const manifestText = await manifestFile.async('string')
    const data = JSON.parse(manifestText)
    const result = validateManifest(data)

    if (!result.valid || !result.manifest) {
      return result
    }

    const pack: CharacterPack = {
      manifest: result.manifest,
      source: 'local',
      installedAt: new Date().toISOString(),
      localPath: file.name.replace(/\.zip$/i, ''),
    }

    return { ...result, pack }
  } catch (error) {
    return {
      valid: false,
      errors: [
        `Failed to import from zip: ${error instanceof Error ? error.message : 'Unknown error'}`,
      ],
    }
  }
}

export async function downloadRemotePack(
  remotePack: RemoteCharacterPack,
  onProgress?: (progress: DownloadProgress) => void
): Promise<{ success: boolean; pack?: CharacterPack; error?: string }> {
  const store = useCharacterPackStore.getState()
  const packId = remotePack.id

  try {
    onProgress?.({
      status: 'downloading',
      progress: 0,
      message: 'Starting download...',
    })
    store.setDownloadProgress(packId, {
      status: 'downloading',
      progress: 0,
      message: 'Starting download...',
    })

    const response = await fetch(remotePack.downloadUrl)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const contentLength = response.headers.get('content-length')
    const totalSize = contentLength ? parseInt(contentLength, 10) : remotePack.fileSize

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('Failed to get response reader')
    }

    const chunks: Uint8Array[] = []
    let downloadedSize = 0

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      chunks.push(value)
      downloadedSize += value.length

      const progress = totalSize > 0 ? Math.round((downloadedSize / totalSize) * 100) : 50
      onProgress?.({
        status: 'downloading',
        progress,
        message: `Downloaded ${Math.round(downloadedSize / 1024)}KB`,
      })
      store.setDownloadProgress(packId, {
        status: 'downloading',
        progress,
        message: `Downloaded ${Math.round(downloadedSize / 1024)}KB`,
      })
    }

    onProgress?.({
      status: 'extracting',
      progress: 100,
      message: 'Extracting...',
    })
    store.setDownloadProgress(packId, {
      status: 'extracting',
      progress: 100,
      message: 'Extracting...',
    })

    const JSZip = (await import('jszip')).default
    const zipData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0))
    let offset = 0
    for (const chunk of chunks) {
      zipData.set(chunk, offset)
      offset += chunk.length
    }

    const zip = await JSZip.loadAsync(zipData)

    const manifestFile = zip.file(MANIFEST_FILE)
    if (!manifestFile) {
      throw new Error('No manifest.json found in downloaded pack')
    }

    const manifestText = await manifestFile.async('string')
    const manifestData = JSON.parse(manifestText)
    const validation = validateManifest(manifestData)

    if (!validation.valid) {
      throw new Error(`Invalid manifest: ${validation.errors.join(', ')}`)
    }

    const pack: CharacterPack = {
      manifest: validation.manifest!,
      source: 'remote',
      installedAt: new Date().toISOString(),
      remoteUrl: remotePack.downloadUrl,
    }

    onProgress?.({
      status: 'installing',
      progress: 100,
      message: 'Installing...',
    })
    store.setDownloadProgress(packId, {
      status: 'installing',
      progress: 100,
      message: 'Installing...',
    })

    store.installPack(pack)

    onProgress?.({
      status: 'completed',
      progress: 100,
      message: 'Installation complete!',
    })
    store.setDownloadProgress(packId, {
      status: 'completed',
      progress: 100,
      message: 'Installation complete!',
    })

    setTimeout(() => {
      store.clearDownloadProgress(packId)
    }, 3000)

    return { success: true, pack }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    onProgress?.({
      status: 'error',
      progress: 0,
      message: 'Download failed',
      error: errorMessage,
    })
    store.setDownloadProgress(packId, {
      status: 'error',
      progress: 0,
      message: 'Download failed',
      error: errorMessage,
    })

    return { success: false, error: errorMessage }
  }
}

export function installPack(pack: CharacterPack): void {
  const store = useCharacterPackStore.getState()
  store.installPack(pack)
}

export function uninstallPack(packId: string): void {
  const store = useCharacterPackStore.getState()
  store.uninstallPack(packId)
}

export function isPackInstalled(packId: string): boolean {
  return useCharacterPackStore.getState().isPackInstalled(packId)
}

export function getInstalledPacks(): CharacterPack[] {
  return useCharacterPackStore.getState().installedPacks
}
