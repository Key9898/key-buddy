import { useEffect, useState, useCallback } from 'react'
import { useStore } from '../stores/useStore'
import {
  isElectronAvailable,
  getSettings,
  setSettings as setIPCSettings,
  getInputStatus,
} from '../utils/ipc'
import type { Settings } from '../types'

interface IPCStatus {
  isAvailable: boolean
  isConnected: boolean
  error: string | null
}

interface InputStatus {
  keyboard: boolean
  mouse: boolean
  microphone: boolean
}

export function useIPC() {
  const { settings, setSettings: updateStoreSettings } = useStore()
  const [status, setStatus] = useState<IPCStatus>({
    isAvailable: false,
    isConnected: false,
    error: null,
  })
  const [inputStatus, setInputStatus] = useState<InputStatus>({
    keyboard: false,
    mouse: false,
    microphone: false,
  })

  const initializeIPC = useCallback(async () => {
    if (!isElectronAvailable()) {
      setStatus({
        isAvailable: false,
        isConnected: false,
        error: 'Electron API not available - running in demo mode',
      })
      return false
    }

    try {
      const loadedSettings = await getSettings()
      if (loadedSettings) {
        updateStoreSettings(loadedSettings)
      }

      const status = await getInputStatus()
      if (status) {
        setInputStatus(status)
      }

      setStatus({
        isAvailable: true,
        isConnected: true,
        error: null,
      })

      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setStatus({
        isAvailable: true,
        isConnected: false,
        error: errorMessage,
      })
      return false
    }
  }, [updateStoreSettings])

  const saveSettings = useCallback(
    async (newSettings: Partial<Settings>) => {
      if (!status.isAvailable) {
        console.warn('Cannot save settings: Electron not available')
        return null
      }

      try {
        const savedSettings = await setIPCSettings(newSettings)
        if (savedSettings) {
          updateStoreSettings(savedSettings)
        }
        return savedSettings
      } catch (error) {
        console.error('Failed to save settings:', error)
        return null
      }
    },
    [status.isAvailable, updateStoreSettings]
  )

  const refreshInputStatus = useCallback(async () => {
    if (!status.isAvailable) return null

    try {
      const status = await getInputStatus()
      if (status) {
        setInputStatus(status)
      }
      return status
    } catch (error) {
      console.error('Failed to get input status:', error)
      return null
    }
  }, [status.isAvailable])

  useEffect(() => {
    initializeIPC()
  }, [initializeIPC])

  return {
    status,
    inputStatus,
    settings,
    isElectron: status.isAvailable,
    isDemo: !status.isAvailable,
    initializeIPC,
    saveSettings,
    refreshInputStatus,
  }
}
