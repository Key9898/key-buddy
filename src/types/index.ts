export type CharacterState = 'idle' | 'typing' | 'mouse' | 'click' | 'speaking'

export interface KeyboardEvent {
  key: string
  type: 'down' | 'up'
  timestamp: number
}

export interface MouseEvent {
  x: number
  y: number
  button?: string
  type: 'move' | 'click' | 'scroll'
}

export interface MicLevel {
  level: number
  timestamp: number
}

export interface Settings {
  character: {
    name: string
    size: number
    opacity: number
  }
  window: {
    x: number
    y: number
    width: number
    height: number
    alwaysOnTop: boolean
    clickThrough: boolean
  }
  overlay: {
    keyboardVisible: boolean
    mouseVisible: boolean
    micVisible: boolean
  }
  input: {
    keyboardEnabled: boolean
    mouseEnabled: boolean
    micEnabled: boolean
    micSensitivity: number
  }
}

export const defaultSettings: Settings = {
  character: {
    name: 'default',
    size: 256,
    opacity: 1,
  },
  window: {
    x: 100,
    y: 100,
    width: 350,
    height: 350,
    alwaysOnTop: true,
    clickThrough: false,
  },
  overlay: {
    keyboardVisible: true,
    mouseVisible: true,
    micVisible: true,
  },
  input: {
    keyboardEnabled: true,
    mouseEnabled: true,
    micEnabled: false,
    micSensitivity: 0.5,
  },
}

export type { ElectronAPI, Monitor } from './electron'
