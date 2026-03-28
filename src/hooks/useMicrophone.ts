import { useEffect, useCallback, useRef, useState } from 'react'
import { useStore } from '../stores/useStore'
import { onMicLevel, startMic, stopMic, getMicDevices, isElectronAvailable } from '../utils/ipc'
import type { MicLevel, CharacterState } from '../types'

const SPEAKING_THRESHOLD = 0.3
const SILENCE_TIMEOUT = 300

interface AudioDevice {
  id: string
  name: string
}

export function useMicrophone() {
  const { settings, micLevel, setMicLevel, characterState, setCharacterState } = useStore()

  const [isListening, setIsListening] = useState(false)
  const [devices, setDevices] = useState<AudioDevice[]>([])
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isSpeakingRef = useRef(false)

  const updateCharacterState = useCallback(
    (newState: CharacterState) => {
      setCharacterState(newState)
    },
    [setCharacterState]
  )

  const handleMicLevel = useCallback(
    (event: MicLevel) => {
      if (!settings.input.micEnabled) return

      const { level } = event
      const normalizedLevel = Math.min(1, Math.max(0, level))
      const threshold = SPEAKING_THRESHOLD * (1 - settings.input.micSensitivity * 0.5)

      setMicLevel(normalizedLevel)

      if (normalizedLevel > threshold) {
        if (!isSpeakingRef.current) {
          isSpeakingRef.current = true
          updateCharacterState('speaking')
        }

        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current)
          silenceTimeoutRef.current = null
        }
      } else {
        if (isSpeakingRef.current && !silenceTimeoutRef.current) {
          silenceTimeoutRef.current = setTimeout(() => {
            isSpeakingRef.current = false
            if (characterState === 'speaking') {
              updateCharacterState('idle')
            }
            silenceTimeoutRef.current = null
          }, SILENCE_TIMEOUT)
        }
      }
    },
    [
      settings.input.micEnabled,
      settings.input.micSensitivity,
      characterState,
      setMicLevel,
      updateCharacterState,
    ]
  )

  const startListening = useCallback(async () => {
    if (!isElectronAvailable()) {
      console.warn('Electron not available, cannot start microphone')
      return false
    }

    try {
      const success = await startMic()
      if (success) {
        setIsListening(true)
      }
      return success
    } catch (error) {
      console.error('Failed to start microphone:', error)
      return false
    }
  }, [])

  const stopListening = useCallback(async () => {
    if (!isElectronAvailable()) return

    try {
      await stopMic()
      setIsListening(false)
      setMicLevel(0)
      isSpeakingRef.current = false

      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
        silenceTimeoutRef.current = null
      }
    } catch (error) {
      console.error('Failed to stop microphone:', error)
    }
  }, [setMicLevel])

  const selectDevice = useCallback(async (deviceId: string) => {
    if (!isElectronAvailable()) return false

    try {
      const api = window.electronAPI
      if (api?.setMicDevice) {
        await api.setMicDevice(deviceId)
        setSelectedDevice(deviceId)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to set microphone device:', error)
      return false
    }
  }, [])

  const refreshDevices = useCallback(async () => {
    if (!isElectronAvailable()) return []

    try {
      const deviceList = await getMicDevices()
      setDevices(deviceList || [])
      return deviceList
    } catch (error) {
      console.error('Failed to get microphone devices:', error)
      return []
    }
  }, [])

  useEffect(() => {
    if (!isElectronAvailable() || !settings.input.micEnabled) {
      return
    }

    const unsubscribe = onMicLevel(handleMicLevel)

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
    }
  }, [handleMicLevel, settings.input.micEnabled])

  useEffect(() => {
    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
    }
  }, [])

  return {
    level: micLevel,
    isListening,
    isSpeaking: isSpeakingRef.current,
    devices,
    selectedDevice,
    isEnabled: settings.input.micEnabled,
    sensitivity: settings.input.micSensitivity,
    isElectron: isElectronAvailable(),
    startListening,
    stopListening,
    selectDevice,
    refreshDevices,
  }
}
