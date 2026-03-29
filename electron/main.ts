import {
  app,
  BrowserWindow,
  ipcMain,
  screen,
  Display,
  Tray,
  Menu,
  nativeImage,
  NativeImage,
} from 'electron'
import path from 'path'
import {
  startKeyboardListener,
  stopKeyboardListener,
  isKeyboardListenerRunning,
} from './input/keyboard'
import { startMouseListener, stopMouseListener, isMouseListenerRunning } from './input/mouse'
import {
  startMicrophoneListener,
  stopMicrophoneListener,
  isMicrophoneListenerRunning,
  setMicrophoneSensitivity,
  getAudioDevices,
} from './audio/microphone'
import { loadSettings, getSettings, updateSettings, resetSettings } from './utils/settings'
import type { Settings } from '../src/types'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let inputListenersStarted = false
let isDragging = false
let dragStartPos = { x: 0, y: 0 }
let windowStartPos: [number, number] = [0, 0]

function getValidWindowPosition(
  x: number,
  y: number,
  width: number,
  height: number
): { x: number; y: number } {
  const displays = screen.getAllDisplays()

  if (displays.length === 0) {
    return { x, y }
  }

  let bestDisplay: Display | null = null
  let maxOverlap = 0

  for (const display of displays) {
    const { x: dx, y: dy, width: dw, height: dh } = display.bounds

    const overlapX = Math.max(0, Math.min(x + width, dx + dw) - Math.max(x, dx))
    const overlapY = Math.max(0, Math.min(y + height, dy + dh) - Math.max(y, dy))
    const overlap = overlapX * overlapY

    if (overlap > maxOverlap) {
      maxOverlap = overlap
      bestDisplay = display
    }
  }

  if (bestDisplay && maxOverlap > 0) {
    return { x, y }
  }

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width: pw, height: ph } = primaryDisplay.workAreaSize
  const { x: px, y: py } = primaryDisplay.bounds

  return {
    x: px + Math.floor((pw - width) / 2),
    y: py + Math.floor((ph - height) / 2),
  }
}

function getMonitors() {
  const displays = screen.getAllDisplays()
  return displays.map((display) => ({
    id: display.id.toString(),
    x: display.bounds.x,
    y: display.bounds.y,
    width: display.bounds.width,
    height: display.bounds.height,
    isPrimary: display.id === screen.getPrimaryDisplay().id,
  }))
}

function createTray() {
  const iconPath = path.join(__dirname, '../public/icon.png')
  let icon: NativeImage

  try {
    icon = nativeImage.createFromPath(iconPath)
    if (icon.isEmpty()) {
      icon = nativeImage.createEmpty()
    }
  } catch {
    icon = nativeImage.createEmpty()
  }

  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Window',
      click: () => {
        if (mainWindow) {
          mainWindow.show()
          mainWindow.focus()
        }
      },
    },
    {
      label: 'Always on Top',
      type: 'checkbox',
      checked: getSettings().window.alwaysOnTop,
      click: (menuItem) => {
        if (mainWindow) {
          mainWindow.setAlwaysOnTop(menuItem.checked)
          updateSettings({
            window: { ...getSettings().window, alwaysOnTop: menuItem.checked },
          })
        }
      },
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit()
      },
    },
  ])

  tray.setToolTip('KeyBuddy')
  tray.setContextMenu(contextMenu)

  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show()
      mainWindow.focus()
    }
  })
}

function createWindow() {
  const settings = getSettings()
  const validPos = getValidWindowPosition(
    settings.window.x,
    settings.window.y,
    settings.window.width,
    settings.window.height
  )

  mainWindow = new BrowserWindow({
    width: settings.window.width,
    height: settings.window.height,
    x: validPos.x,
    y: validPos.y,
    transparent: true,
    frame: false,
    alwaysOnTop: settings.window.alwaysOnTop,
    resizable: true,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.setIgnoreMouseEvents(settings.window.clickThrough)
  mainWindow.setOpacity(settings.character.opacity)

  mainWindow.on('moved', () => {
    if (mainWindow) {
      const [x, y] = mainWindow.getPosition()
      updateSettings({
        window: { ...getSettings().window, x, y },
      })
    }
  })

  mainWindow.on('resized', () => {
    if (mainWindow) {
      const [width, height] = mainWindow.getSize()
      updateSettings({
        window: { ...getSettings().window, width, height },
      })
    }
  })
}

function startInputListeners() {
  if (!mainWindow || inputListenersStarted) {
    return
  }

  const settings = getSettings()

  if (settings.input.keyboardEnabled) {
    const keyboardStarted = startKeyboardListener(mainWindow)
    if (keyboardStarted) {
      console.log('Keyboard listener started successfully')
    } else {
      console.warn('Keyboard listener failed to start - demo mode available')
    }
  }

  if (settings.input.mouseEnabled) {
    const mouseStarted = startMouseListener(mainWindow)
    if (mouseStarted) {
      console.log('Mouse listener started successfully')
    } else {
      console.warn('Mouse listener failed to start - demo mode available')
    }
  }

  if (settings.input.micEnabled) {
    const micStarted = startMicrophoneListener(mainWindow, undefined, settings.input.micSensitivity)
    if (micStarted) {
      console.log('Microphone listener started successfully')
    } else {
      console.warn('Microphone listener failed to start - demo mode available')
    }
  }

  inputListenersStarted = true
}

function stopInputListeners() {
  stopKeyboardListener()
  stopMouseListener()
  stopMicrophoneListener()
  inputListenersStarted = false
}

function setupIpcHandlers() {
  ipcMain.handle('settings:get', async () => {
    return getSettings()
  })

  ipcMain.handle('settings:set', async (_event, settings: Partial<Settings>) => {
    const updated = updateSettings(settings)

    if (mainWindow) {
      if (settings.window?.alwaysOnTop !== undefined) {
        mainWindow.setAlwaysOnTop(settings.window.alwaysOnTop)
      }
      if (settings.window?.clickThrough !== undefined) {
        mainWindow.setIgnoreMouseEvents(settings.window.clickThrough)
      }
      if (settings.character?.opacity !== undefined) {
        mainWindow.setOpacity(settings.character.opacity)
      }
    }

    if (settings.input?.micSensitivity !== undefined) {
      setMicrophoneSensitivity(settings.input.micSensitivity)
    }

    return updated
  })

  ipcMain.handle('window:position', async (_event, position: { x: number; y: number }) => {
    if (mainWindow) {
      mainWindow.setPosition(position.x, position.y)
      updateSettings({
        window: { ...getSettings().window, x: position.x, y: position.y },
      })
    }
  })

  ipcMain.handle('window:size', async (_event, size: { width: number; height: number }) => {
    if (mainWindow) {
      mainWindow.setSize(size.width, size.height)
      updateSettings({
        window: { ...getSettings().window, width: size.width, height: size.height },
      })
    }
  })

  ipcMain.handle('window:opacity', async (_event, opacity: number) => {
    if (mainWindow) {
      mainWindow.setOpacity(opacity)
      updateSettings({
        character: { ...getSettings().character, opacity },
      })
    }
  })

  ipcMain.handle('window:clickthrough', async (_event, enabled: boolean) => {
    if (mainWindow) {
      mainWindow.setIgnoreMouseEvents(enabled)
      updateSettings({
        window: { ...getSettings().window, clickThrough: enabled },
      })
    }
  })

  ipcMain.handle('mic:start', async (_event, deviceId?: string) => {
    if (mainWindow) {
      const settings = getSettings()
      return startMicrophoneListener(mainWindow, deviceId, settings.input.micSensitivity)
    }
    return false
  })

  ipcMain.handle('mic:stop', async () => {
    stopMicrophoneListener()
    return true
  })

  ipcMain.handle('mic:devices', async () => {
    return getAudioDevices()
  })

  ipcMain.handle('mic:set-device', async (_event, deviceId: string) => {
    if (mainWindow && isMicrophoneListenerRunning()) {
      stopMicrophoneListener()
      const settings = getSettings()
      return startMicrophoneListener(mainWindow, deviceId, settings.input.micSensitivity)
    }
    return false
  })

  ipcMain.handle('input:status', async () => {
    return {
      keyboard: isKeyboardListenerRunning(),
      mouse: isMouseListenerRunning(),
      microphone: isMicrophoneListenerRunning(),
    }
  })

  ipcMain.handle('window:drag:start', async (_event, startPos: { x: number; y: number }) => {
    if (mainWindow) {
      isDragging = true
      dragStartPos = startPos
      const [x, y] = mainWindow.getPosition()
      windowStartPos = [x, y]
      return true
    }
    return false
  })

  ipcMain.handle('window:drag:move', async (_event, currentPos: { x: number; y: number }) => {
    if (mainWindow && isDragging) {
      const deltaX = currentPos.x - dragStartPos.x
      const deltaY = currentPos.y - dragStartPos.y
      const newX = windowStartPos[0] + deltaX
      const newY = windowStartPos[1] + deltaY
      mainWindow.setPosition(newX, newY)
      return { x: newX, y: newY }
    }
    return null
  })

  ipcMain.handle('window:drag:end', async () => {
    if (mainWindow && isDragging) {
      isDragging = false
      const [x, y] = mainWindow.getPosition()
      updateSettings({
        window: { ...getSettings().window, x, y },
      })
      return { x, y }
    }
    return null
  })

  ipcMain.handle('window:always-on-top', async (_event, enabled: boolean) => {
    if (mainWindow) {
      mainWindow.setAlwaysOnTop(enabled)
      updateSettings({
        window: { ...getSettings().window, alwaysOnTop: enabled },
      })
      return enabled
    }
    return null
  })

  ipcMain.handle('window:monitors', async () => {
    return getMonitors()
  })

  ipcMain.handle('settings:reset', async () => {
    const settings = resetSettings()
    if (mainWindow) {
      mainWindow.setAlwaysOnTop(settings.window.alwaysOnTop)
      mainWindow.setIgnoreMouseEvents(settings.window.clickThrough)
      mainWindow.setOpacity(settings.character.opacity)
      mainWindow.setSize(settings.window.width, settings.window.height)
      mainWindow.setPosition(settings.window.x, settings.window.y)
    }
    return settings
  })

  ipcMain.handle('window:minimize', async () => {
    if (mainWindow) {
      mainWindow.hide()
      return true
    }
    return false
  })

  ipcMain.handle('window:show', async () => {
    if (mainWindow) {
      mainWindow.show()
      mainWindow.focus()
      return true
    }
    return false
  })
}

app.whenReady().then(() => {
  loadSettings()
  createWindow()
  createTray()
  setupIpcHandlers()

  setTimeout(() => {
    startInputListeners()
  }, 1000)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  stopInputListeners()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  stopInputListeners()
})
