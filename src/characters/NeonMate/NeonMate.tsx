import { motion } from 'framer-motion'
import type { CharacterBaseProps } from '../base/CharacterBase'

export default function NeonMate({ state, className }: CharacterBaseProps) {
  return (
    <motion.div className={className} data-character="neon-mate" data-state={state}>
      <div className="w-full h-full bg-accent/20 rounded-full" />
    </motion.div>
  )
}
