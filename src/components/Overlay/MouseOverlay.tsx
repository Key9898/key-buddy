import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../stores/useStore'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export function MouseOverlay() {
  const { mouseButtons, settings, characterState } = useStore()
  const { mouseVisible } = settings.overlay
  const [ripples, setRipples] = useState<{ id: number; button: string }[]>([])

  const isScrolling = characterState === 'mouse' && mouseButtons.length === 0

  useEffect(() => {
    if (mouseButtons.length > 0) {
      const newRipples = mouseButtons.map((button) => ({ id: Date.now() + Math.random(), button }))
      setRipples((prev) => [...prev, ...newRipples].slice(-5))

      const timer = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => !newRipples.find((nr) => nr.id === r.id)))
      }, 600)

      return () => clearTimeout(timer)
    }
  }, [mouseButtons])

  if (!mouseVisible) return null

  const isPressed = (btn: string) => mouseButtons.includes(btn)

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-base-100/40 backdrop-blur-md rounded-3xl border border-secondary/20 shadow-2xl pointer-events-none min-w-[140px]">
      <div className="relative">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={clsx(
                'absolute -inset-4 rounded-full border-4',
                ripple.button === 'left'
                  ? 'border-primary/40'
                  : ripple.button === 'right'
                    ? 'border-secondary/40'
                    : 'border-accent/40'
              )}
            />
          ))}
        </AnimatePresence>

        <div className="w-20 h-32 rounded-[2.5rem] border-4 border-base-300 relative bg-base-100 shadow-inner flex overflow-hidden">
          <div className="flex-1 border-r-2 border-base-200 flex flex-col pt-1">
            <motion.div
              animate={{
                backgroundColor: isPressed('left') ? 'oklch(var(--p))' : 'transparent',
                opacity: isPressed('left') ? 1 : 0.1,
              }}
              className="h-14 mx-1.5 mt-1.5 rounded-tl-[1.8rem] rounded-tr-sm transition-all border-b-2 border-base-200"
            />
          </div>
          <div className="flex-1 flex flex-col pt-1">
            <motion.div
              animate={{
                backgroundColor: isPressed('right') ? 'oklch(var(--s))' : 'transparent',
                opacity: isPressed('right') ? 1 : 0.1,
              }}
              className="h-14 mx-1.5 mt-1.5 rounded-tr-[1.8rem] rounded-tl-sm transition-all border-b-2 border-base-200"
            />
          </div>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-5 h-10 rounded-full bg-base-200 border-2 border-base-300 flex flex-col items-center justify-center gap-1 overflow-hidden">
            <motion.div
              animate={{
                y: isScrolling ? [0, -4, 0] : 0,
                backgroundColor:
                  isPressed('middle') || isScrolling ? 'oklch(var(--a))' : 'oklch(var(--bc))',
                opacity: isPressed('middle') || isScrolling ? 1 : 0.2,
              }}
              className="w-1.5 h-4 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 mt-2">
        <div className="flex gap-2 text-[10px] font-black font-mono uppercase tracking-widest">
          <span
            className={clsx(
              'px-2 py-1 rounded-lg transition-all',
              isPressed('left')
                ? 'bg-primary text-primary-content shadow-lg shadow-primary/30'
                : 'bg-base-200 text-base-content/20'
            )}
          >
            L
          </span>
          <span
            className={clsx(
              'px-2 py-1 rounded-lg transition-all',
              isPressed('middle') || isScrolling
                ? 'bg-accent text-accent-content shadow-lg shadow-accent/30'
                : 'bg-base-200 text-base-content/20'
            )}
          >
            M
          </span>
          <span
            className={clsx(
              'px-2 py-1 rounded-lg transition-all',
              isPressed('right')
                ? 'bg-secondary text-secondary-content shadow-lg shadow-secondary/30'
                : 'bg-base-200 text-base-content/20'
            )}
          >
            R
          </span>
        </div>

        {/* Mouse Position Indicator */}
        <div className="flex flex-col gap-2 p-3 bg-base-200/50 rounded-2xl border border-base-content/5 mt-1 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-black font-mono opacity-60 uppercase tracking-tighter">
                Position
              </span>
            </div>
            <span className="text-[10px] font-bold font-mono opacity-40">
              {Math.round(useStore.getState().mousePosition.x)},{' '}
              {Math.round(useStore.getState().mousePosition.y)}
            </span>
          </div>

          {/* Mini-map */}
          <div className="w-full h-12 bg-base-300/30 rounded-lg relative overflow-hidden border border-base-content/5">
            <motion.div
              className="absolute w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_oklch(var(--s))]"
              animate={{
                x: (useStore.getState().mousePosition.x / window.innerWidth) * 100,
                y: (useStore.getState().mousePosition.y / window.innerHeight) * 40,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            />
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '10px 10px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
