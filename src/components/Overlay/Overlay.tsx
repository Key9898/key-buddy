import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../stores/useStore'
import { KeyboardOverlay } from './KeyboardOverlay'
import { MouseOverlay } from './MouseOverlay'
import { Mic } from 'lucide-react'

export function Overlay() {
  const { micLevel, settings } = useStore()
  const { micVisible } = settings.overlay

  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none flex flex-col items-center gap-6 p-8">
      {/* Mic level bar */}
      <AnimatePresence>
        {micVisible && micLevel > 0.05 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-3 bg-base-100/40 backdrop-blur-sm px-4 py-2 rounded-2xl border border-accent/20 border-b-4 border-b-accent/30 shadow-xl"
          >
            <div className="bg-accent/10 p-2 rounded-xl">
              <Mic className="w-5 h-5 text-accent animate-pulse" />
            </div>
            <div className="w-32 h-3 bg-base-300 rounded-full overflow-hidden border border-base-content/5">
              <motion.div
                className="h-full bg-accent shadow-[0_0_12px_rgba(var(--a),0.4)]"
                animate={{
                  width: `${Math.min(100, micLevel * 100 * 2)}%`,
                }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-6 w-full justify-center">
        <MouseOverlay />
        <KeyboardOverlay />
      </div>
    </div>
  )
}
