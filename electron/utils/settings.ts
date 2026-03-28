import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import type { Settings } from '../../src/types'
import { defaultSettings } from '../../src/types'

const SETTINGS_FILE = 'settings.json'

let settingsPath: string | null = null
let currentSettings: Settings = defaultSettings

function getSettingsPath(): string {
  if (!settingsPath) {
    const userDataPath = app.getPath('userData')
    settingsPath = path.join(userDataPath, SETTINGS_FILE)
  }
  return settingsPath
}

function validateSettings(parsed: unknown): parsed is Settings {
  if (!parsed || typeof parsed !== 'object') {
    return false
  }

  const obj = parsed as Record<string, unknown>

  if (obj.character && typeof obj.character === 'object') {
    const char = obj.character as Record<string, unknown>
    if (
      char.opacity !== undefined &&
      (typeof char.opacity !== 'number' || char.opacity < 0 || char.opacity > 1)
    ) {
      return false
    }
    if (
      char.size !== undefined &&
      (typeof char.size !== 'number' || char.size < 64 || char.size > 512)
    ) {
      return false
    }
  }

  if (obj.window && typeof obj.window === 'object') {
    const win = obj.window as Record<string, unknown>
    if (
      win.width !== undefined &&
      (typeof win.width !== 'number' || win.width < 100 || win.width > 800)
    ) {
      return false
    }
    if (
      win.height !== undefined &&
      (typeof win.height !== 'number' || win.height < 100 || win.height > 800)
    ) {
      return false
    }
  }

  if (obj.input && typeof obj.input === 'object') {
    const input = obj.input as Record<string, unknown>
    if (
      input.micSensitivity !== undefined &&
      (typeof input.micSensitivity !== 'number' ||
        input.micSensitivity < 0 ||
        input.micSensitivity > 1)
    ) {
      return false
    }
  }

  return true
}

export function loadSettings(): Settings {
  try {
    const filePath = getSettingsPath()

    if (!fs.existsSync(filePath)) {
      console.log('Settings file not found, creating with defaults')
      saveSettings(defaultSettings)
      return defaultSettings
    }

    const rawData = fs.readFileSync(filePath, 'utf-8')

    if (!rawData.trim()) {
      console.warn('Settings file is empty, using defaults')
      saveSettings(defaultSettings)
      return defaultSettings
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(rawData)
    } catch (parseError) {
      console.error('Settings file contains invalid JSON:', parseError)
      const backupPath = filePath + '.corrupt'
      fs.copyFileSync(filePath, backupPath)
      console.log(`Corrupt settings backed up to: ${backupPath}`)
      saveSettings(defaultSettings)
      return defaultSettings
    }

    if (!validateSettings(parsed)) {
      console.warn('Settings file contains invalid values, using defaults')
      const backupPath = filePath + '.invalid'
      fs.copyFileSync(filePath, backupPath)
      console.log(`Invalid settings backed up to: ${backupPath}`)
      saveSettings(defaultSettings)
      return defaultSettings
    }

    currentSettings = {
      character: {
        ...defaultSettings.character,
        ...parsed.character,
      },
      window: {
        ...defaultSettings.window,
        ...parsed.window,
      },
      overlay: {
        ...defaultSettings.overlay,
        ...parsed.overlay,
      },
      input: {
        ...defaultSettings.input,
        ...parsed.input,
      },
    }

    console.log('Settings loaded successfully')
    return currentSettings
  } catch (error) {
    console.error('Failed to load settings:', error)
    currentSettings = defaultSettings
    return currentSettings
  }
}

export function saveSettings(settings: Settings): Settings {
  try {
    const filePath = getSettingsPath()

    currentSettings = {
      character: {
        ...defaultSettings.character,
        ...settings.character,
      },
      window: {
        ...defaultSettings.window,
        ...settings.window,
      },
      overlay: {
        ...defaultSettings.overlay,
        ...settings.overlay,
      },
      input: {
        ...defaultSettings.input,
        ...settings.input,
      },
    }

    const rawData = JSON.stringify(currentSettings, null, 2)
    fs.writeFileSync(filePath, rawData, 'utf-8')

    console.log('Settings saved successfully')
    return currentSettings
  } catch (error) {
    console.error('Failed to save settings:', error)
    return currentSettings
  }
}

export function getSettings(): Settings {
  return currentSettings
}

export function updateSettings(partial: Partial<Settings>): Settings {
  const newSettings: Settings = {
    character: {
      ...currentSettings.character,
      ...partial.character,
    },
    window: {
      ...currentSettings.window,
      ...partial.window,
    },
    overlay: {
      ...currentSettings.overlay,
      ...partial.overlay,
    },
    input: {
      ...currentSettings.input,
      ...partial.input,
    },
  }

  return saveSettings(newSettings)
}

export function resetSettings(): Settings {
  console.log('Settings reset to defaults')
  return saveSettings(defaultSettings)
}
