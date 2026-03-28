import { Character } from './components/Character'
import { Overlay } from './components/Overlay'
import { SettingsPanel } from './components/Settings/SettingsPanel'
import { useDemoInput } from './hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings as SettingsIcon, Play, Pause } from 'lucide-react'
import { useState } from 'react'

function App() {
  const { isDemo, setIsDemo } = useDemoInput()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-transparent relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl relative">
        <Character />
        <Overlay />
      </main>

      {/* Control Bar */}
      <motion.div
        className="absolute bottom-6 right-6 flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => setIsDemo(!isDemo)}
          className={`btn btn-circle btn-sm shadow-lg ${isDemo ? 'btn-primary' : 'btn-ghost bg-base-100/50'}`}
          title={isDemo ? 'Stop Demo' : 'Start Demo'}
        >
          {isDemo ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="btn btn-circle btn-primary btn-md shadow-xl hover:scale-110 active:scale-95 transition-all"
        >
          <SettingsIcon className="w-6 h-6" />
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

export default App
