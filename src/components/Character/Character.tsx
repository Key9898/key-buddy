import { motion } from 'framer-motion'
import { useStore } from '../../stores/useStore'
import { useCharacterStore } from '../../stores/useCharacterStore'
import { CharacterRenderer } from './CharacterRenderer'

/**
 * Main Dynamic Character Component.
 * Acts as a wrapper that reads from the character store and renders
 * the selected buddy via CharacterRenderer.
 */
export function Character() {
  const { characterState, settings } = useStore()
  const { selectedCharacterId } = useCharacterStore()
  const { size, opacity } = settings.character

  return (
    <motion.div
      className="relative flex items-center justify-center pointer-events-none"
      style={{ width: size, height: size * 0.75, opacity }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 25 }}
    >
      <CharacterRenderer
        characterId={selectedCharacterId}
        state={characterState}
        className="w-full h-full"
      />
    </motion.div>
  )
}
