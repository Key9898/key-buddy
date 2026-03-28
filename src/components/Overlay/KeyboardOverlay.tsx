import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../stores/useStore'
import { Command, ArrowBigUp, Cpu, Layers } from 'lucide-react'
import clsx from 'clsx'

const MODIFIERS = [
  { key: 'Control', icon: Cpu, label: 'Ctrl' },
  { key: 'Alt', icon: Layers, label: 'Alt' },
  { key: 'Shift', icon: ArrowBigUp, label: 'Shift' },
  { key: 'Meta', icon: Command, label: 'Win' },
]

export function KeyboardOverlay() {
  const { pressedKeys, settings } = useStore()
  const { keyboardVisible } = settings.overlay

  if (!keyboardVisible) return null

  const activeModifiers = MODIFIERS.filter((m) => pressedKeys.includes(m.key))
  const normalKeys = pressedKeys.filter((k) => !MODIFIERS.find((m) => m.key === k))

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-base-100/40 backdrop-blur-md rounded-3xl border border-primary/20 shadow-2xl pointer-events-none min-w-[320px]">
      {/* Modifiers row */}
      <div className="flex gap-2 w-full justify-center">
        {MODIFIERS.map(({ key, icon: Icon, label }) => {
          const isActive = pressedKeys.includes(key)
          return (
            <motion.div
              key={key}
              animate={{
                scale: isActive ? 1.05 : 1,
                backgroundColor: isActive ? 'oklch(var(--p))' : 'oklch(var(--b1) / 0.3)',
                color: isActive ? 'oklch(var(--pc))' : 'oklch(var(--bc) / 0.4)',
                borderColor: isActive ? 'oklch(var(--p))' : 'oklch(var(--bc) / 0.1)',
              }}
              className="flex-1 flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-75"
            >
              <Icon className={clsx('w-4 h-4 mb-1', isActive ? 'opacity-100' : 'opacity-40')} />
              <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
            </motion.div>
          )
        })}
      </div>

      {/* Main keys area */}
      <div className="flex flex-wrap items-center justify-center gap-2 min-h-[48px] w-full">
        <AnimatePresence mode="popLayout">
          {normalKeys.length === 0 && activeModifiers.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-primary"
            >
              Ready for Input
            </motion.div>
          ) : (
            normalKeys.map((key) => (
              <motion.div
                key={key}
                layout
                initial={{ scale: 0.5, opacity: 0, x: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.5, opacity: 0, scaleY: 0 }}
                className={clsx(
                  'min-w-[54px] h-12 flex items-center justify-center px-4 rounded-xl',
                  'bg-primary text-primary-content font-black shadow-lg shadow-primary/30',
                  'border-b-4 border-primary-focus active:border-b-0 active:translate-y-[2px]',
                  'transition-all duration-75 uppercase text-lg italic'
                )}
              >
                {key}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
