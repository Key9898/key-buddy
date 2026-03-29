import { motion } from 'framer-motion'
import { Download, Star, Check, Loader2 } from 'lucide-react'
import clsx from 'clsx'
import type { RemoteCharacterPack } from '../../types/character'
import { useCharacterPackStore } from '../../stores/useCharacterPackStore'

interface CharacterPackCardProps {
  pack: RemoteCharacterPack
  onDownload?: (pack: RemoteCharacterPack) => void
  compact?: boolean
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDownloads(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return count.toString()
}

export function CharacterPackCard({ pack, onDownload, compact = false }: CharacterPackCardProps) {
  const isInstalled = useCharacterPackStore((s) => s.isPackInstalled(pack.id))
  const downloadProgress = useCharacterPackStore((s) => s.downloadProgress[pack.id])

  const isDownloading =
    downloadProgress &&
    downloadProgress.status !== 'completed' &&
    downloadProgress.status !== 'error'

  const tierColors = {
    free: 'badge-success',
    premium: 'badge-warning',
  }

  const categoryIcons = {
    animal: '🐾',
    fantasy: '✨',
    minimal: '⬡',
    seasonal: '🎄',
  }

  if (compact) {
    return (
      <motion.div
        className={clsx(
          'card card-compact bg-base-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer',
          isInstalled && 'ring-2 ring-success'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <figure className="px-4 pt-4">
          <img
            src={pack.thumbnail}
            alt={pack.displayName}
            className="rounded-xl h-24 w-24 object-cover"
          />
        </figure>
        <div className="card-body p-3">
          <h3 className="card-title text-sm line-clamp-1">{pack.displayName}</h3>
          <div className="flex gap-1">
            <span className={clsx('badge badge-sm', tierColors[pack.tier])}>{pack.tier}</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={clsx(
        'card bg-base-200 shadow-xl hover:shadow-2xl transition-all overflow-hidden',
        isInstalled && 'ring-2 ring-success',
        pack.featured && 'ring-1 ring-primary'
      )}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {pack.featured && (
        <div className="absolute top-2 right-2 z-10">
          <span className="badge badge-primary badge-sm">Featured</span>
        </div>
      )}

      <figure className="relative h-48 bg-base-300">
        <img src={pack.thumbnail} alt={pack.displayName} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-2 flex gap-1">
          <span className={clsx('badge badge-sm', tierColors[pack.tier])}>{pack.tier}</span>
          <span className="badge badge-ghost badge-sm">
            {categoryIcons[pack.category]} {pack.category}
          </span>
        </div>
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg">{pack.displayName}</h2>
        <p className="text-sm text-base-content/70 line-clamp-2">{pack.description}</p>

        <div className="flex flex-wrap gap-1 mt-2">
          {pack.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge badge-outline badge-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-base-content/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-warning text-warning" />
              {pack.rating.toFixed(1)}
            </span>
            <span>{formatDownloads(pack.downloads)} downloads</span>
          </div>
          <span>{formatFileSize(pack.fileSize)}</span>
        </div>

        <div className="text-xs text-base-content/50 mt-1">by {pack.author}</div>

        <div className="card-actions justify-end mt-3">
          {isInstalled ? (
            <button className="btn btn-success btn-sm" disabled>
              <Check className="w-4 h-4" />
              Installed
            </button>
          ) : isDownloading ? (
            <button className="btn btn-primary btn-sm" disabled>
              <Loader2 className="w-4 h-4 animate-spin" />
              {downloadProgress?.progress || 0}%
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => onDownload?.(pack)}>
              <Download className="w-4 h-4" />
              Download
            </button>
          )}
        </div>

        {isDownloading && downloadProgress && (
          <div className="mt-2">
            <progress
              className="progress progress-primary w-full"
              value={downloadProgress.progress}
              max={100}
            />
            <p className="text-xs text-center mt-1 text-base-content/60">
              {downloadProgress.message}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
