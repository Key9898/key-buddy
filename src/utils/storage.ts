const STORAGE_PREFIX = 'keybuddy_'

export function saveToStorage<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value)
    localStorage.setItem(STORAGE_PREFIX + key, serialized)
  } catch (error) {
    console.error(`Failed to save to storage: ${key}`, error)
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const serialized = localStorage.getItem(STORAGE_PREFIX + key)
    if (serialized === null) {
      return defaultValue
    }
    return JSON.parse(serialized) as T
  } catch (error) {
    console.error(`Failed to load from storage: ${key}`, error)
    return defaultValue
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key)
  } catch (error) {
    console.error(`Failed to remove from storage: ${key}`, error)
  }
}

export function clearStorage(): void {
  try {
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key))
  } catch (error) {
    console.error('Failed to clear storage', error)
  }
}
