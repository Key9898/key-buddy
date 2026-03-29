import { Character } from '../Character'
import { DraggableHandle } from '../Overlay'
import { SettingsPanel } from '../Settings/SettingsPanel'
import { useDemoInput, useKeyboard, useMouse, useMicrophone } from '../../hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings as SettingsIcon, Play, Pause } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useStore } from '../../stores/useStore'

export function DesktopApp() {
  const { isDemo, setIsDemo } = useDemoInput()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { settings } = useStore()

  useKeyboard()
  useMouse()
  useMicrophone()

  useEffect(() => {
    if (settings.window.clickThrough) {
      document.body.style.pointerEvents = 'none'
    } else {
      document.body.style.pointerEvents = 'auto'
    }
  }, [settings.window.clickThrough])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-transparent relative overflow-hidden font-sans select-none">
      <DraggableHandle />

      <main className="flex-1 flex flex-col items-center justify-center w-full h-full relative">
        <Character />
      </main>

      <motion.div
        className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          type="button"
          onClick={() => setIsDemo(!isDemo)}
          className={`btn btn-circle btn-sm shadow-lg ${isDemo ? 'btn-primary' : 'btn-ghost bg-base-100/50'}`}
          title={isDemo ? 'Stop Demo' : 'Start Demo'}
          aria-label={isDemo ? 'Stop Demo' : 'Start Demo'}
        >
          {isDemo ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          className="btn btn-circle btn-primary btn-sm shadow-xl hover:scale-110 active:scale-95 transition-all"
          aria-label="Open Settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </motion.div>

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
