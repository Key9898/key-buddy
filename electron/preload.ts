import type { IpcRendererEvent } from 'electron'
import { contextBridge, ipcRenderer } from 'electron'
import type { Settings, KeyboardEvent, MouseEvent, MicLevel } from '../src/types'

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

const electronAPI: ElectronAPI = {
  setWindowPosition: (x: number, y: number) => ipcRenderer.invoke('window:position', { x, y }),

  setWindowSize: (width: number, height: number) =>
    ipcRenderer.invoke('window:size', { width, height }),

  setWindowOpacity: (opacity: number) => ipcRenderer.invoke('window:opacity', opacity),

  setClickThrough: (enabled: boolean) => ipcRenderer.invoke('window:clickthrough', enabled),

  setAlwaysOnTop: (enabled: boolean) => ipcRenderer.invoke('window:always-on-top', enabled),

  startWindowDrag: (startX: number, startY: number) =>
    ipcRenderer.invoke('window:drag:start', { x: startX, y: startY }),

  moveWindowDrag: (currentX: number, currentY: number) =>
    ipcRenderer.invoke('window:drag:move', { x: currentX, y: currentY }),

  endWindowDrag: () => ipcRenderer.invoke('window:drag:end'),

  getMonitors: () => ipcRenderer.invoke('window:monitors'),

  getSettings: () => ipcRenderer.invoke('settings:get'),

  setSettings: (settings: Partial<Settings>) => ipcRenderer.invoke('settings:set', settings),

  resetSettings: () => ipcRenderer.invoke('settings:reset'),

  onKeyboardEvent: (callback: (event: KeyboardEvent) => void) => {
    const handler = (_event: IpcRendererEvent, data: KeyboardEvent) => callback(data)
    ipcRenderer.on('keyboard:event', handler)
    return () => ipcRenderer.removeListener('keyboard:event', handler)
  },

  onMouseEvent: (callback: (event: MouseEvent) => void) => {
    const handler = (_event: IpcRendererEvent, data: MouseEvent) => callback(data)
    ipcRenderer.on('mouse:event', handler)
    return () => ipcRenderer.removeListener('mouse:event', handler)
  },

  onMicLevel: (callback: (level: MicLevel) => void) => {
    const handler = (_event: IpcRendererEvent, data: MicLevel) => callback(data)
    ipcRenderer.on('mic:level', handler)
    return () => ipcRenderer.removeListener('mic:level', handler)
  },

  onSettingsLoaded: (callback: (settings: Settings) => void) => {
    const handler = (_event: IpcRendererEvent, data: Settings) => callback(data)
    ipcRenderer.on('settings:loaded', handler)
    return () => ipcRenderer.removeListener('settings:loaded', handler)
  },

  startMic: (deviceId?: string) => ipcRenderer.invoke('mic:start', deviceId),

  stopMic: () => ipcRenderer.invoke('mic:stop'),

  setMicDevice: (deviceId: string) => ipcRenderer.invoke('mic:set-device', deviceId),

  getMicDevices: () => ipcRenderer.invoke('mic:devices'),

  getInputStatus: () => ipcRenderer.invoke('input:status'),

  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  },
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
