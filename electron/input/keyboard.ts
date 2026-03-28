import type { BrowserWindow } from 'electron'

export interface KeyboardEventPayload {
  key: string
  type: 'down' | 'up'
  timestamp: number
}

type KeyboardCallback = (event: KeyboardEventPayload) => void

let uiohook: typeof import('uiohook-napi') | null = null
let isRunning = false
let callback: KeyboardCallback | null = null

try {
  uiohook = require('uiohook-napi')
} catch {
  console.warn('uiohook-napi not available - keyboard detection disabled')
}

export function startKeyboardListener(
  mainWindow: BrowserWindow,
  onEvent?: KeyboardCallback
): boolean {
  if (!uiohook) {
    console.warn('Keyboard listener not started - uiohook-napi not available')
    return false
  }

  if (isRunning) {
    console.warn('Keyboard listener already running')
    return true
  }

  callback = onEvent || null

  try {
    uiohook.uIOHook.on('keydown', (event: { keychar: string; keycode: number }) => {
      const payload: KeyboardEventPayload = {
        key: event.keychar || `Key${event.keycode}`,
        type: 'down',
        timestamp: Date.now(),
      }

      if (callback) {
        callback(payload)
      }

      mainWindow.webContents.send('keyboard:event', payload)
    })

    uiohook.uIOHook.on('keyup', (event: { keychar: string; keycode: number }) => {
      const payload: KeyboardEventPayload = {
        key: event.keychar || `Key${event.keycode}`,
        type: 'up',
        timestamp: Date.now(),
      }

      if (callback) {
        callback(payload)
      }

      mainWindow.webContents.send('keyboard:event', payload)
    })

    uiohook.uIOHook.start()
    isRunning = true
    console.log('Keyboard listener started')
    return true
  } catch (error) {
    console.error('Failed to start keyboard listener:', error)
    return false
  }
}

export function stopKeyboardListener(): void {
  if (!uiohook || !isRunning) {
    return
  }

  try {
    uiohook.uIOHook.stop()
    isRunning = false
    callback = null
    console.log('Keyboard listener stopped')
  } catch (error) {
    console.error('Failed to stop keyboard listener:', error)
  }
}

export function isKeyboardListenerRunning(): boolean {
  return isRunning
}
