import { motion } from 'framer-motion'
import type { CharacterBaseProps } from '../base/CharacterBase'

export default function ShibaMate({ state, className }: CharacterBaseProps) {
  return (
    <motion.div className={className} data-character="shiba-mate" data-state={state}>
      <div className="w-full h-full bg-secondary/20 rounded-full" />
    </motion.div>
  )
}
