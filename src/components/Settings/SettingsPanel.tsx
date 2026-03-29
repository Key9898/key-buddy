import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../stores/useStore'
import {
  X,
  Settings,
  User,
  Keyboard,
  MousePointer,
  Mic,
  Power,
  Layout,
  Sliders,
  Info,
  Minimize2,
  RotateCcw,
} from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'
import { minimizeWindow, setWindowPosition, setWindowSize } from '../../utils/ipc'
import { CharacterPicker } from './CharacterPicker'

/**
 * SettingsPanel component for the desktop app overlay.
 * Features tabs for General, Character, and Overlay settings.
 */
export function SettingsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { settings, setSettings } = useStore()
  const [activeTab, setActiveTab] = useState('general')

  if (!isOpen) return null

  const tabs = [
    { id: 'general', label: 'General', icon: Sliders },
    { id: 'character', label: 'Character', icon: User },
    { id: 'overlays', label: 'Overlays', icon: Layout },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute bottom-20 right-4 w-96 bg-base-100/95 backdrop-blur-md rounded-3xl border border-primary/20 shadow-2xl overflow-hidden z-[100]"
    >
      {/* Header */}
      <div className="p-6 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Settings className="w-6 h-6 text-primary animate-spin-slow" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-none text-base-content">Settings</h2>
            <p className="text-xs text-base-content/60 mt-1">Configure your KeyBuddy preferences</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-circle btn-ghost btn-sm"
          aria-label="Close settings"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex h-[450px]">
        {/* Sidebar */}
        <div className="w-20 bg-base-200/50 p-2 flex flex-col gap-2 border-r border-primary/5">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'p-3 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center gap-1.5',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 scale-105'
                    : 'text-base-content/40 hover:bg-primary/5 hover:text-primary'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {tab.label.charAt(0)}
                </span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div
                key="general"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <section>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3 block">
                    System
                  </label>
                  <div className="bg-base-200/50 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-base-content">
                      <Power className="w-4 h-4 text-base-content/60" />
                      <span className="text-sm font-medium">Launch at Startup</span>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary toggle-sm"
                      aria-label="Launch at startup"
                    />
                  </div>
                </section>

                <section>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3 block">
                    Window Size
                  </label>
                  <div className="space-y-3 bg-base-200/50 rounded-2xl p-4">
                    <div className="flex justify-between text-xs font-black uppercase tracking-tight text-base-content">
                      <span>Size</span>
                      <span className="text-primary">{settings.window.width}px</span>
                    </div>
                    <input
                      type="range"
                      min="250"
                      max="500"
                      step="10"
                      value={settings.window.width}
                      onChange={async (e) => {
                        const size = Number(e.target.value)
                        setSettings({ window: { ...settings.window, width: size, height: size } })
                        await setWindowSize(size, size)
                      }}
                      className="range range-primary range-xs"
                      aria-label="Window size"
                    />
                    <div className="flex justify-between text-[10px] text-base-content/40">
                      <span>250px</span>
                      <span>500px</span>
                    </div>
                  </div>
                </section>

                <section>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3 block">
                    Window
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="flex-1 bg-base-100/50 p-3 rounded-2xl border border-primary/5 flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase text-primary/40">
                          Pos X
                        </span>
                        <input
                          type="number"
                          value={settings.window.x}
                          onChange={async (e) => {
                            const x = Number(e.target.value)
                            setSettings({ window: { ...settings.window, x } })
                            await setWindowPosition(x, settings.window.y)
                          }}
                          className="bg-transparent font-bold outline-none w-full text-base-content"
                          aria-label="Window X position"
                        />
                      </div>
                      <div className="flex-1 bg-base-100/50 p-3 rounded-2xl border border-primary/5 flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase text-primary/40">
                          Pos Y
                        </span>
                        <input
                          type="number"
                          value={settings.window.y}
                          onChange={async (e) => {
                            const y = Number(e.target.value)
                            setSettings({ window: { ...settings.window, y } })
                            await setWindowPosition(settings.window.x, y)
                          }}
                          className="bg-transparent font-bold outline-none w-full text-base-content"
                          aria-label="Window Y position"
                        />
                      </div>
                    </div>
                    <SettingToggle
                      label="Always on Top"
                      checked={settings.window.alwaysOnTop}
                      onChange={(v) =>
                        setSettings({ window: { ...settings.window, alwaysOnTop: v } })
                      }
                    />
                    <SettingToggle
                      label="Click Through"
                      checked={settings.window.clickThrough}
                      onChange={(v) =>
                        setSettings({ window: { ...settings.window, clickThrough: v } })
                      }
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          const x = 100
                          const y = 100
                          setSettings({ window: { ...settings.window, x, y } })
                          await setWindowPosition(x, y)
                        }}
                        className="btn btn-sm btn-ghost flex-1 gap-2 text-base-content"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await minimizeWindow()
                          onClose()
                        }}
                        className="btn btn-sm btn-ghost flex-1 gap-2 text-base-content"
                      >
                        <Minimize2 className="w-4 h-4" />
                        Minimize
                      </button>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'character' && (
              <motion.div
                key="character"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6 h-full flex flex-col"
              >
                <section className="flex-1 min-h-0">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3 block">
                    Discovery
                  </label>
                  <CharacterPicker
                    onSelect={(id: string) =>
                      setSettings({ character: { ...settings.character, name: id } })
                    }
                  />
                </section>

                <section>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3 block">
                    Appearance
                  </label>
                  <div className="space-y-6 bg-base-200/50 rounded-3xl p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-black uppercase tracking-tight text-base-content">
                        <span>Size</span>
                        <span className="text-primary">{settings.character.size}px</span>
                      </div>
                      <input
                        type="range"
                        min="128"
                        max="512"
                        step="8"
                        value={settings.character.size}
                        onChange={(e) =>
                          setSettings({
                            character: { ...settings.character, size: Number(e.target.value) },
                          })
                        }
                        className="range range-primary range-xs"
                        aria-label="Character size"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-black uppercase tracking-tight text-base-content">
                        <span>Opacity</span>
                        <span className="text-primary">
                          {Math.round(settings.character.opacity * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={settings.character.opacity}
                        onChange={(e) =>
                          setSettings({
                            character: { ...settings.character, opacity: Number(e.target.value) },
                          })
                        }
                        className="range range-primary range-xs"
                        aria-label="Character transparency"
                      />
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'overlays' && (
              <motion.div
                key="overlays"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <label className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3 block">
                  Visibility
                </label>
                <div className="bg-base-200/50 rounded-3xl p-4 space-y-4">
                  <OverlayToggle
                    icon={Keyboard}
                    label="Keyboard"
                    checked={settings.overlay.keyboardVisible}
                    onChange={(v) =>
                      setSettings({ overlay: { ...settings.overlay, keyboardVisible: v } })
                    }
                  />
                  <OverlayToggle
                    icon={MousePointer}
                    label="Mouse"
                    checked={settings.overlay.mouseVisible}
                    onChange={(v) =>
                      setSettings({ overlay: { ...settings.overlay, mouseVisible: v } })
                    }
                  />
                  <OverlayToggle
                    icon={Mic}
                    label="Microphone"
                    checked={settings.overlay.micVisible}
                    onChange={(v) =>
                      setSettings({ overlay: { ...settings.overlay, micVisible: v } })
                    }
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-4 bg-base-300/30 flex items-center justify-between text-[10px] uppercase font-bold tracking-tighter opacity-40">
        <div className="flex items-center gap-1">
          <Info className="w-3 h-3" />
          <span>v1.0.0 Alpha</span>
        </div>
        <div className="flex items-center gap-2">
          <span>KeyBuddy #BuildWithAntigravity</span>
        </div>
      </div>
    </motion.div>
  )
}

function SettingToggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-base-100/50 rounded-2xl">
      <span className="text-sm font-medium text-base-content">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle toggle-primary toggle-sm"
        aria-label={label}
      />
    </div>
  )
}

function OverlayToggle({
  icon: Icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-base-100 flex items-center justify-center border border-primary/5">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-sm font-bold tracking-tight text-base-content">{label}</span>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle toggle-primary toggle-sm"
        aria-label={label}
      />
    </div>
  )
}
