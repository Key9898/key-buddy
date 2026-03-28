import type { Settings } from '../types'
import { defaultSettings } from '../types'

export function isValidKey(key: string): boolean {
  if (!key || typeof key !== 'string') return false
  return key.length > 0 && key.length <= 50
}

export function isValidOpacity(value: number): boolean {
  return typeof value === 'number' && value >= 0 && value <= 1
}

export function isValidSize(value: number): boolean {
  return typeof value === 'number' && value > 0 && value <= 1000
}

export function isValidPosition(value: number): boolean {
  return typeof value === 'number' && Number.isFinite(value)
}

export function isValidSensitivity(value: number): boolean {
  return typeof value === 'number' && value >= 0 && value <= 1
}

function isValidCharacterSettings(settings: unknown): boolean {
  const s = settings as Record<string, unknown>
  return (
    typeof s === 'object' &&
    s !== null &&
    typeof s.name === 'string' &&
    isValidSize(s.size as number) &&
    isValidOpacity(s.opacity as number)
  )
}

function isValidWindowSettings(settings: unknown): boolean {
  const s = settings as Record<string, unknown>
  return (
    typeof s === 'object' &&
    s !== null &&
    isValidPosition(s.x as number) &&
    isValidPosition(s.y as number) &&
    isValidSize(s.width as number) &&
    isValidSize(s.height as number) &&
    typeof s.alwaysOnTop === 'boolean' &&
    typeof s.clickThrough === 'boolean'
  )
}

function isValidOverlaySettings(settings: unknown): boolean {
  const s = settings as Record<string, unknown>
  return (
    typeof s === 'object' &&
    s !== null &&
    typeof s.keyboardVisible === 'boolean' &&
    typeof s.mouseVisible === 'boolean' &&
    typeof s.micVisible === 'boolean'
  )
}

function isValidInputSettings(settings: unknown): boolean {
  const s = settings as Record<string, unknown>
  return (
    typeof s === 'object' &&
    s !== null &&
    typeof s.keyboardEnabled === 'boolean' &&
    typeof s.mouseEnabled === 'boolean' &&
    typeof s.micEnabled === 'boolean' &&
    isValidSensitivity(s.micSensitivity as number)
  )
}

export function validateSettings(settings: unknown): Settings | null {
  if (!settings || typeof settings !== 'object') {
    return null
  }

  const s = settings as Record<string, unknown>

  if (
    !isValidCharacterSettings(s.character) ||
    !isValidWindowSettings(s.window) ||
    !isValidOverlaySettings(s.overlay) ||
    !isValidInputSettings(s.input)
  ) {
    return null
  }

  return settings as Settings
}

export function mergeWithDefaults(settings: Partial<Settings>): Settings {
  return {
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
}
