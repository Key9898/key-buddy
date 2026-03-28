/// <reference types="vite/client" />

interface ElectronAPI {
  setWindowPosition: (x: number, y: number) => Promise<void>
  setWindowSize: (width: number, height: number) => Promise<void>
  setWindowOpacity: (opacity: number) => Promise<void>
  setClickThrough: (enabled: boolean) => Promise<void>
  onKeyboardEvent: (callback: (event: unknown) => void) => void
  onMouseEvent: (callback: (event: unknown) => void) => void
  onMicLevel: (callback: (level: unknown) => void) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {}
