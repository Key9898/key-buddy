import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid, Store } from 'lucide-react'
import { CharacterCard } from '../Character/CharacterCard'
import { CharacterMarketplace } from '../Character/CharacterMarketplace'
import { characterRegistry } from '../../characters'
import { useCharacterStore } from '../../stores/useCharacterStore'
import clsx from 'clsx'

interface CharacterPickerProps {
  onSelect?: (characterId: string) => void
  className?: string
}

export function CharacterPicker({ onSelect, className }: CharacterPickerProps) {
  const [search, setSearch] = useState('')
  const [showMarketplace, setShowMarketplace] = useState(false)
  const { selectedCharacterId, setSelectedCharacterId, isCharacterUnlocked } = useCharacterStore()

  const allCharacters = useMemo(() => characterRegistry.getAll(), [])

  const filteredCharacters = useMemo(
    () =>
      allCharacters.filter(
        (char) =>
          char.displayName.toLowerCase().includes(search.toLowerCase()) ||
          char.description.toLowerCase().includes(search.toLowerCase())
      ),
    [allCharacters, search]
  )

  const handleSelect = (id: string) => {
    setSelectedCharacterId(id)
    onSelect?.(id)
  }

  return (
    <div className={clsx('flex flex-col gap-6 w-full h-full', className)}>
      <div className="flex items-center gap-3 px-4 py-2 bg-base-100 rounded-2xl border border-base-content/5 shadow-inner group">
        <Search className="w-4 h-4 opacity-40 group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search characters..."
          className="flex-1 bg-transparent text-sm font-bold outline-none placeholder:font-normal placeholder:opacity-50"
        />
        <button
          type="button"
          onClick={() => setShowMarketplace(true)}
          className="btn btn-xs btn-primary btn-circle"
          title="Open Marketplace"
        >
          <Store className="w-3 h-3" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-6">
          <AnimatePresence mode="popLayout">
            {filteredCharacters.map((char, index) => (
              <motion.div
                key={char.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4, delay: index * 0.05 }}
              >
                <CharacterCard
                  character={char}
                  isSelected={selectedCharacterId === char.id}
                  isLocked={!isCharacterUnlocked(char.id)}
                  onClick={() => handleSelect(char.id)}
                  className="!px-3 !py-2 h-[180px] md:h-full"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCharacters.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center opacity-40 gap-3">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <p className="font-black text-sm uppercase">No matches found</p>
              <p className="text-[10px] font-medium leading-tight">
                Try different keywords or check all categories.
              </p>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showMarketplace && (
          <motion.div
            className="fixed inset-0 z-50 bg-base-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                type="button"
                onClick={() => setShowMarketplace(false)}
                className="btn btn-circle btn-ghost"
                title="Close Marketplace"
                aria-label="Close Marketplace"
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
            <CharacterMarketplace />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
