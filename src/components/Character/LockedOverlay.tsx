import { Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface LockedOverlayProps {
  className?: string
  showText?: boolean
}

/**
 * LockedOverlay component used to indicate that a character is locked or premium.
 * Displayed on top of CharacterCard with a semi-transparent dark background.
 */
export function LockedOverlay({ className, showText = true }: LockedOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={clsx(
        'absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center gap-2 rounded-xl group-hover:bg-black/70 transition-colors',
        className
      )}
    >
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
        <Lock className="w-5 h-5 text-white" />
      </div>
      {showText && (
        <span className="text-[10px] font-black uppercase tracking-widest text-white/80 select-none">
          Premium
        </span>
      )}
    </motion.div>
  )
}
