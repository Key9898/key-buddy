import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CharacterCard } from '../Character/CharacterCard'
import { characterRegistry } from '../../characters'
import type { CharacterCategory } from '../../types/character'
import clsx from 'clsx'

type FilterCategory = 'all' | CharacterCategory

export function CharacterHub({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<FilterCategory>('all')

  const allCharacters = useMemo(() => characterRegistry.getAll(), [])

  const filteredCharacters = useMemo(
    () =>
      activeTab === 'all'
        ? allCharacters
        : allCharacters.filter((char) => char.category === activeTab),
    [allCharacters, activeTab]
  )

  const categories = [
    { id: 'all' as const, label: 'All' },
    { id: 'animal' as const, label: 'Animal' },
    { id: 'fantasy' as const, label: 'Fantasy' },
    { id: 'minimal' as const, label: 'Minimal' },
    { id: 'seasonal' as const, label: 'Seasonal' },
  ]

  return (
    <section
      className={clsx('flex flex-col gap-10 w-full max-w-7xl mx-auto py-16 px-6', className)}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
          Meet Your{' '}
          <span className="text-primary italic underline decoration-8 underline-offset-8">
            Buddy
          </span>
        </h2>
        <p className="max-w-2xl text-lg font-medium opacity-60">
          Discover a diverse collection of desktop companions. From mythical creatures to minimalist
          icons, pick the one that fits your personality.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 p-1 bg-base-200/50 rounded-[2rem] w-fit mx-auto backdrop-blur-sm border border-base-content/5 shadow-inner">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={clsx(
              'px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 relative',
              activeTab === cat.id
                ? 'text-primary-content z-10'
                : 'text-base-content/50 hover:text-base-content/80'
            )}
          >
            {activeTab === cat.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/20"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[400px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredCharacters.map((char) => (
            <motion.div
              key={char.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            >
              <CharacterCard
                character={char}
                className="h-full"
                isLocked={char.tier === 'premium'}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
