import { motion, AnimatePresence } from 'framer-motion'
import type { CharacterBaseProps } from './base/CharacterBase'
import { Hexagon, Sparkles, Bot, Zap } from 'lucide-react'
import clsx from 'clsx'

interface GenericCharacterProps extends CharacterBaseProps {
  id: string
  category: string
  color?: string
}

/**
 * Enhanced Generic Character Component.
 * Differentiates visual identities based on the character category.
 * Provides unique shapes, effects, and animations for each type.
 */
export default function GenericCharacter({
  id,
  state,
  category,
  className,
  color = 'bg-primary',
}: GenericCharacterProps) {
  // Categorical styling logic
  const isFantasy = category === 'fantasy'
  const isMinimal = category === 'minimal'
  const isSeasonal = category === 'seasonal'

  return (
    <motion.div
      className={clsx(
        'w-64 h-64 relative overflow-hidden flex flex-col items-center justify-center p-8 gap-4 shadow-2xl border border-white/10',
        className,
        isFantasy ? 'rounded-[4rem]' : isMinimal ? 'rounded-none' : 'rounded-3xl',
        color + '/5'
      )}
      data-character={id}
      data-state={state}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Identity Icons (Unique per category) */}
      <div className="absolute top-4 right-4 opacity-20 text-white">
        {isFantasy && <Sparkles className="w-6 h-6 animate-pulse" />}
        {isMinimal && <Hexagon className="w-6 h-6" />}
        {isSeasonal && <Zap className="w-6 h-6 animate-bounce" />}
        {category === 'animal' && <Bot className="w-6 h-6" />}
      </div>

      {/* Character Body Shape */}
      <motion.div
        className={clsx(
          'w-32 h-32 relative shadow-lg flex items-center justify-center border-4 border-white/20',
          color,
          isFantasy ? 'rounded-full blur-[2px]' : isMinimal ? 'rounded-lg' : 'rounded-[2.5rem]'
        )}
        animate={{
          y: state === 'typing' ? [-5, 5, -5] : 0,
          scale: state === 'speaking' ? [1, 1.05, 1] : 1,
        }}
        transition={{ repeat: Infinity, duration: 0.3 }}
      >
        {/* Eyes based on state */}
        <div className="flex gap-4">
          <motion.div
            className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        </div>

        {/* Reactive Effects */}
        {isFantasy && (
          <motion.div
            className="absolute -inset-4 bg-white/10 rounded-full filter blur-xl -z-10"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}

        {/* Paws based on state */}
        {(state === 'typing' || state === 'click') && (
          <motion.div
            className="absolute -bottom-2 left-0 right-0 flex justify-between px-4 z-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
          >
            <div
              className={clsx(
                'w-10 h-10 border-2 border-white/20 shadow-md',
                isMinimal ? 'rounded-md' : 'rounded-full',
                color
              )}
            />
            <div
              className={clsx(
                'w-10 h-10 border-2 border-white/20 shadow-md',
                isMinimal ? 'rounded-md' : 'rounded-full',
                color
              )}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Meta Labels (Unique Identity) */}
      <div className="text-center z-20">
        <p className="text-[10px] font-black uppercase tracking-tighter text-white drop-shadow-md leading-none">
          {id.split('-').join(' ')}
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
          <div className={clsx('w-1.5 h-1.5 rounded-full animate-ping', color)} />
          <p className="text-[7px] font-extrabold uppercase text-white/80">{state}</p>
        </div>
      </div>

      {/* Dynamic Particles for 'active' states */}
      <AnimatePresence>
        {state === 'typing' && (
          <motion.div
            className="absolute inset-0 bg-white/5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 border-t border-white/10"
              animate={{ y: ['0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
