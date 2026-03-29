import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { TierBadge } from './TierBadge'
import { LockedOverlay } from './LockedOverlay'
import clsx from 'clsx'
import type { CharacterMeta } from '../../types/character'

interface CharacterCardProps {
  character: CharacterMeta
  isSelected?: boolean
  isLocked?: boolean
  onClick?: () => void
  className?: string
}

/**
 * CharacterCard component for displaying a character in the marketplace or gallery.
 * Includes thumbnail, tier badge, name, description, selected state, and locked overlay.
 */
export function CharacterCard({
  character,
  isSelected = false,
  isLocked = false,
  onClick,
  className,
}: CharacterCardProps) {
  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.05 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={!isLocked ? onClick : undefined}
      className={clsx(
        'group h-full flex flex-col items-center bg-base-100 rounded-2xl border border-base-content/5 shadow-md hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden',
        {
          'ring-2 ring-primary border-primary bg-primary/5': isSelected,
          'cursor-not-allowed filter grayscale-[0.3]': isLocked,
        },
        className
      )}
    >
      {/* Locked State Overlay */}
      {isLocked && <LockedOverlay className="rounded-2xl" />}

      {/* Thumbnail Section */}
      <div className="w-full aspect-square bg-base-200/50 flex items-center justify-center p-6 relative overflow-hidden">
        <img
          src={character.thumbnail}
          alt={character.displayName}
          className={clsx(
            'w-full h-full object-contain drop-shadow-lg transition-transform duration-500',
            { 'group-hover:scale-110': !isLocked }
          )}
        />

        {/* Selection Indicator Badge */}
        {isSelected && (
          <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-lg border-2 border-base-100 z-20">
            <Check className="w-4 h-4" />
          </div>
        )}

        {/* Tier Badge */}
        <div className="absolute top-3 right-3 z-30 flex gap-2">
          <TierBadge tier={character.tier} size="sm" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 w-full p-4 flex flex-col gap-1 items-center md:items-start text-center md:text-left">
        <h4 className="font-black text-sm tracking-tight leading-none truncate max-w-full">
          {character.name}
        </h4>
        <p className="text-[10px] font-medium opacity-50 truncate max-w-full leading-tight">
          {character.description}
        </p>
      </div>
    </motion.div>
  )
}
