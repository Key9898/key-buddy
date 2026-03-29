import type { BrowserWindow } from 'electron'
import type { UioHookNapi } from 'uiohook-napi'

export interface MouseEventPayload {
  x: number
  y: number
  button: 'left' | 'right' | 'middle' | null
  type: 'move' | 'click' | 'scroll'
  timestamp: number
}

type MouseCallback = (event: MouseEventPayload) => void

interface UiohookModule {
  uIOHook: UioHookNapi
}

let uiohook: UiohookModule | null = null
let isRunning = false
let callback: MouseCallback | null = false as unknown as MouseCallback
let lastMoveTime = 0
const MOVE_THROTTLE_MS = 16

try {
  uiohook = require('uiohook-napi')
} catch {
  console.warn('uiohook-napi not available - mouse detection disabled')
}

function mapMouseButton(button: number): 'left' | 'right' | 'middle' | null {
  switch (button) {
    case 1:
      return 'left'
    case 2:
      return 'right'
    case 3:
      return 'middle'
    default:
      return null
  }
}

export function startMouseListener(mainWindow: BrowserWindow, onEvent?: MouseCallback): boolean {
  if (!uiohook) {
    console.warn('Mouse listener not started - uiohook-napi not available')
    return false
  }

  if (isRunning) {
    console.warn('Mouse listener already running')
    return true
  }

  callback = onEvent || null

  try {
    uiohook.uIOHook.on('mousemove', (event: { x: number; y: number }) => {
      const now = Date.now()
      if (now - lastMoveTime < MOVE_THROTTLE_MS) {
        return
      }
      lastMoveTime = now

      const payload: MouseEventPayload = {
        x: event.x,
        y: event.y,
        button: null,
        type: 'move',
        timestamp: now,
      }

      if (callback) {
        callback(payload)
      }

      mainWindow.webContents.send('mouse:event', payload)
    })

    uiohook.uIOHook.on('mousedown', (event: { x: number; y: number; button: number }) => {
      const payload: MouseEventPayload = {
        x: event.x,
        y: event.y,
        button: mapMouseButton(event.button),
        type: 'click',
        timestamp: Date.now(),
      }

      if (callback) {
        callback(payload)
      }

      mainWindow.webContents.send('mouse:event', payload)
    })

    uiohook.uIOHook.on('mousewheel', (event: { x: number; y: number; rotation: number }) => {
      const payload: MouseEventPayload = {
        x: event.x,
        y: event.y,
        button: null,
        type: 'scroll',
        timestamp: Date.now(),
      }

      if (callback) {
        callback(payload)
      }

      mainWindow.webContents.send('mouse:event', payload)
    })

    uiohook.uIOHook.start()
    isRunning = true
    console.log('Mouse listener started')
    return true
  } catch (error) {
    console.error('Failed to start mouse listener:', error)
    return false
  }
}

export function stopMouseListener(): void {
  if (!uiohook || !isRunning) {
    return
  }

  try {
    uiohook.uIOHook.stop()
    isRunning = false
    callback = null
    console.log('Mouse listener stopped')
  } catch (error) {
    console.error('Failed to stop mouse listener:', error)
  }
}

export function isMouseListenerRunning(): boolean {
  return isRunning
}
