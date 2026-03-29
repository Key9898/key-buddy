import type { Settings, KeyboardEvent, MouseEvent, MicLevel } from './index'

export interface Monitor {
  id: string
  x: number
  y: number
  width: number
  height: number
  isPrimary: boolean
}

export interface ElectronAPI {
  setWindowPosition: (x: number, y: number) => Promise<void>
  setWindowSize: (width: number, height: number) => Promise<void>
  setWindowOpacity: (opacity: number) => Promise<void>
  setClickThrough: (enabled: boolean) => Promise<void>
  setAlwaysOnTop: (enabled: boolean) => Promise<boolean | null>
  startWindowDrag: (startX: number, startY: number) => Promise<boolean>
  moveWindowDrag: (currentX: number, currentY: number) => Promise<{ x: number; y: number } | null>
  endWindowDrag: () => Promise<{ x: number; y: number } | null>
  minimizeWindow: () => Promise<boolean>
  showWindow: () => Promise<boolean>
  getMonitors: () => Promise<Monitor[]>
  getSettings: () => Promise<Settings>
  setSettings: (settings: Partial<Settings>) => Promise<Settings>
  resetSettings: () => Promise<Settings>
  onKeyboardEvent: (callback: (event: KeyboardEvent) => void) => () => void
  onMouseEvent: (callback: (event: MouseEvent) => void) => () => void
  onMicLevel: (callback: (level: MicLevel) => void) => () => void
  onSettingsLoaded: (callback: (settings: Settings) => void) => () => void
  startMic: (deviceId?: string) => Promise<boolean>
  stopMic: () => Promise<boolean>
  setMicDevice: (deviceId: string) => Promise<boolean>
  getMicDevices: () => Promise<Array<{ id: string; name: string }>>
  getInputStatus: () => Promise<{
    keyboard: boolean
    mouse: boolean
    microphone: boolean
  }>
  removeAllListeners: (channel: string) => void
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}
