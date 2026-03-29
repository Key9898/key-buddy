import type { Settings, KeyboardEvent, MouseEvent, MicLevel, ElectronAPI, Monitor } from '../types'

export function isElectronAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.electronAPI
}

export function getElectronAPI(): ElectronAPI | null {
  if (!isElectronAvailable()) {
    return null
  }
  return window.electronAPI!
}

export async function getSettings(): Promise<Settings | null> {
  const api = getElectronAPI()
  if (!api) return null

  try {
    return await api.getSettings()
  } catch (error) {
    console.error('Failed to get settings:', error)
    return null
  }
}

export async function setSettings(settings: Partial<Settings>): Promise<Settings | null> {
  const api = getElectronAPI()
  if (!api) return null

  try {
    return await api.setSettings(settings)
  } catch (error) {
    console.error('Failed to set settings:', error)
    return null
  }
}

export async function resetSettings(): Promise<Settings | null> {
  const api = getElectronAPI()
  if (!api) return null

  try {
    return await api.resetSettings()
  } catch (error) {
    console.error('Failed to reset settings:', error)
    return null
  }
}

export async function setWindowPosition(x: number, y: number): Promise<void> {
  const api = getElectronAPI()
  if (!api) return

  try {
    await api.setWindowPosition(x, y)
  } catch (error) {
    console.error('Failed to set window position:', error)
  }
}

export async function setWindowSize(width: number, height: number): Promise<void> {
  const api = getElectronAPI()
  if (!api) return

  try {
    await api.setWindowSize(width, height)
  } catch (error) {
    console.error('Failed to set window size:', error)
  }
}

export async function setWindowOpacity(opacity: number): Promise<void> {
  const api = getElectronAPI()
  if (!api) return

  try {
    await api.setWindowOpacity(opacity)
  } catch (error) {
    console.error('Failed to set window opacity:', error)
  }
}

export async function setClickThrough(enabled: boolean): Promise<void> {
  const api = getElectronAPI()
  if (!api) return

  try {
    await api.setClickThrough(enabled)
  } catch (error) {
    console.error('Failed to set click-through:', error)
  }
}

export async function setAlwaysOnTop(enabled: boolean): Promise<boolean | null> {
  const api = getElectronAPI()
  if (!api) return null

  try {
    return await api.setAlwaysOnTop(enabled)
  } catch (error) {
    console.error('Failed to set always-on-top:', error)
    return null
  }
}

export async function startWindowDrag(startX: number, startY: number): Promise<boolean> {
  const api = getElectronAPI()
  if (!api) return false

  try {
    return await api.startWindowDrag(startX, startY)
  } catch (error) {
    console.error('Failed to start window drag:', error)
    return false
  }
}

export async function moveWindowDrag(
  currentX: number,
  currentY: number
): Promise<{ x: number; y: number } | null> {
  const api = getElectronAPI()
  if (!api) return null

  try {
    return await api.moveWindowDrag(currentX, currentY)
  } catch (error) {
    console.error('Failed to move window drag:', error)
    return null
  }
}

export async function endWindowDrag(): Promise<{ x: number; y: number } | null> {
  const api = getElectronAPI()
  if (!api) return null

  try {
    return await api.endWindowDrag()
  } catch (error) {
    console.error('Failed to end window drag:', error)
    return null
  }
}

export async function minimizeWindow(): Promise<boolean> {
  const api = getElectronAPI()
  if (!api) return false

  try {
    return await api.minimizeWindow()
  } catch (error) {
    console.error('Failed to minimize window:', error)
    return false
  }
}

export async function showWindow(): Promise<boolean> {
  const api = getElectronAPI()
  if (!api) return false

  try {
    return await api.showWindow()
  } catch (error) {
    console.error('Failed to show window:', error)
    return false
  }
}

export async function getMonitors(): Promise<Monitor[]> {
  const api = getElectronAPI()
  if (!api) return []

  try {
    return await api.getMonitors()
  } catch (error) {
    console.error('Failed to get monitors:', error)
    return []
  }
}

export function onKeyboardEvent(callback: (event: KeyboardEvent) => void): (() => void) | null {
  const api = getElectronAPI()
  if (!api) return null

  try {
    return api.onKeyboardEvent(callback)
  } catch (error) {
    console.error('Failed to subscribe to keyboard events:', error)
    return null
  }
}

export function onMouseEvent(callback: (event: MouseEvent) => void): (() => void) | null {
  const api = getElectronAPI()
  if (!api) return null

  try {
    return api.onMouseEvent(callback)
  } catch (error) {
    console.error('Failed to subscribe to mouse events:', error)
    return null
  }
}

export function onMicLevel(callback: (level: MicLevel) => void): (() => void) | null {
  const api = getElectronAPI()
  if (!api) return null

  try {
    return api.onMicLevel(callback)
  } catch (error) {
    console.error('Failed to subscribe to mic level:', error)
    return null
  }
}

export async function startMic(deviceId?: string): Promise<boolean> {
  const api = getElectronAPI()
  if (!api) return false

  try {
    return await api.startMic(deviceId)
  } catch (error) {
    console.error('Failed to start mic:', error)
    return false
  }
}

export async function stopMic(): Promise<boolean> {
  const api = getElectronAPI()
  if (!api) return false

  try {
    return await api.stopMic()
  } catch (error) {
    console.error('Failed to stop mic:', error)
    return false
  }
}

export async function getMicDevices(): Promise<Array<{ id: string; name: string }>> {
  const api = getElectronAPI()
  if (!api) return []

  try {
    return await api.getMicDevices()
  } catch (error) {
    console.error('Failed to get mic devices:', error)
    return []
  }
}

export async function getInputStatus(): Promise<{
  keyboard: boolean
  mouse: boolean
  microphone: boolean
} | null> {
  const api = getElectronAPI()
  if (!api) return null

  try {
    return await api.getInputStatus()
  } catch (error) {
    console.error('Failed to get input status:', error)
    return null
  }
}
