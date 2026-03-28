declare module 'naudiodon' {
  export interface DeviceInfo {
    id: number
    name: string
    hostAPIName: string
    maxInputChannels: number
    maxOutputChannels: number
    defaultSampleRate: number
  }

  export interface AudioInputOptions {
    deviceId: number
    channels?: number
    sampleRate?: number
    format?: number
  }

  export class AudioInput {
    constructor(options: AudioInputOptions)
    on(event: 'data', callback: (data: Buffer) => void): this
    on(event: 'error', callback: (error: Error) => void): this
    on(event: 'close', callback: () => void): this
    start(): void
    stop(): void
    close(): void
  }

  export function getDevices(): DeviceInfo[]

  export const SampleFormatFloat32: number
}
