import type { BrowserWindow } from 'electron'

export interface MicLevelPayload {
  level: number
  timestamp: number
}

export interface AudioDevice {
  id: string
  name: string
}

type MicLevelCallback = (level: MicLevelPayload) => void

let naudiodon: typeof import('naudiodon') | null = null
let isRunning = false
let callback: MicLevelCallback | null = null
let audioInput: InstanceType<typeof import('naudiodon').AudioInput> | null = null
let levelInterval: NodeJS.Timeout | null = null
let currentSensitivity = 0.5

try {
  naudiodon = require('naudiodon')
} catch {
  console.warn('naudiodon not available - microphone detection disabled')
}

export function getAudioDevices(): AudioDevice[] {
  if (!naudiodon) {
    return []
  }

  try {
    const devices = naudiodon.getDevices()
    return devices
      .filter((d: { maxInputChannels: number }) => d.maxInputChannels > 0)
      .map((d: { id: number; name: string }) => ({
        id: String(d.id),
        name: d.name,
      }))
  } catch (error) {
    console.error('Failed to get audio devices:', error)
    return []
  }
}

export function startMicrophoneListener(
  mainWindow: BrowserWindow,
  deviceId?: string,
  sensitivity?: number,
  onLevel?: MicLevelCallback
): boolean {
  if (!naudiodon) {
    console.warn('Microphone listener not started - naudiodon not available')
    return false
  }

  if (isRunning) {
    stopMicrophoneListener()
  }

  callback = onLevel || null
  currentSensitivity = sensitivity ?? 0.5

  try {
    const devices = naudiodon.getDevices()
    const inputDevices = devices.filter((d: { maxInputChannels: number }) => d.maxInputChannels > 0)

    if (inputDevices.length === 0) {
      console.warn('No input devices found')
      return false
    }

    let targetDevice = inputDevices[0]
    if (deviceId) {
      const found = inputDevices.find((d: { id: number }) => String(d.id) === deviceId)
      if (found) {
        targetDevice = found
      }
    }

    audioInput = new naudiodon.AudioInput({
      deviceId: targetDevice.id,
      channels: 1,
      sampleRate: 44100,
      format: naudiodon.SampleFormatFloat32,
    })

    let maxLevel = 0
    let sampleCount = 0
    const samplesPerUpdate = 441

    audioInput.on('data', (data: Buffer) => {
      const floatData = new Float32Array(data.buffer, data.byteOffset, data.byteLength / 4)

      for (let i = 0; i < floatData.length; i++) {
        const absValue = Math.abs(floatData[i])
        if (absValue > maxLevel) {
          maxLevel = absValue
        }
        sampleCount++

        if (sampleCount >= samplesPerUpdate) {
          const normalizedLevel = Math.min(maxLevel / currentSensitivity, 1)
          const payload: MicLevelPayload = {
            level: normalizedLevel,
            timestamp: Date.now(),
          }

          if (callback) {
            callback(payload)
          }

          mainWindow.webContents.send('mic:level', payload)

          maxLevel = 0
          sampleCount = 0
        }
      }
    })

    audioInput.start()
    isRunning = true
    console.log(`Microphone listener started on device: ${targetDevice.name}`)
    return true
  } catch (error) {
    console.error('Failed to start microphone listener:', error)
    return false
  }
}

export function stopMicrophoneListener(): void {
  if (!isRunning) {
    return
  }

  try {
    if (audioInput) {
      audioInput.stop()
      audioInput = null
    }

    if (levelInterval) {
      clearInterval(levelInterval)
      levelInterval = null
    }

    isRunning = false
    callback = null
    console.log('Microphone listener stopped')
  } catch (error) {
    console.error('Failed to stop microphone listener:', error)
  }
}

export function setMicrophoneSensitivity(sensitivity: number): void {
  currentSensitivity = Math.max(0.1, Math.min(1, sensitivity))
}

export function isMicrophoneListenerRunning(): boolean {
  return isRunning
}
