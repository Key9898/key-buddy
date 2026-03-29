import { Suspense, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CharacterSkeleton } from './CharacterSkeleton'
import { AlertCircle } from 'lucide-react'
import { characterRegistry } from '../../characters'
import type { CharacterState } from '../../types/character'
import clsx from 'clsx'

interface CharacterRendererProps {
  characterId: string
  state: CharacterState
  className?: string
}

export function CharacterRenderer({ characterId, state, className }: CharacterRendererProps) {
  const characterMeta = useMemo(() => {
    return characterRegistry.getById(characterId)
  }, [characterId])

  const LazyCharacter = useMemo(() => {
    if (!characterMeta) return null
    return characterMeta.component
  }, [characterMeta])

  return (
    <div
      className={clsx('flex items-center justify-center min-h-[320px] relative h-full', className)}
    >
      <Suspense fallback={<CharacterSkeleton />}>
        <AnimatePresence mode="wait">
          {LazyCharacter ? (
            <motion.div
              key={`${characterId}-${state}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              className="w-full h-full flex items-center justify-center"
            >
              <LazyCharacter state={state} className="w-full h-full" />
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center opacity-40 gap-3">
              <AlertCircle className="w-8 h-8 text-error" />
              <p className="font-black text-sm uppercase tracking-tighter">Character Not Found</p>
              <p className="text-xs opacity-60">ID: {characterId}</p>
            </div>
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  )
}
