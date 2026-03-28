declare module 'uiohook-napi' {
  export interface KeyEvent {
    keychar: string
    keycode: number
  }

  export interface MouseEvent {
    x: number
    y: number
    button: number
  }

  export interface WheelEvent {
    x: number
    y: number
    rotation: number
  }

  export interface UioHookNapi {
    on(event: 'keydown', handler: (e: KeyEvent) => void): void
    on(event: 'keyup', handler: (e: KeyEvent) => void): void
    on(event: 'mousedown', handler: (e: MouseEvent) => void): void
    on(event: 'mouseup', handler: (e: MouseEvent) => void): void
    on(event: 'mousemove', handler: (e: MouseEvent) => void): void
    on(event: 'wheel', handler: (e: WheelEvent) => void): void
    on(event: 'mousewheel', handler: (e: WheelEvent) => void): void
    start(): void
    stop(): void
  }

  const uIOHook: UioHookNapi
  export { uIOHook }
}
