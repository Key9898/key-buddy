const KEY_DISPLAY_NAMES: Record<string, string> = {
  ControlLeft: 'Ctrl',
  ControlRight: 'Ctrl',
  ShiftLeft: 'Shift',
  ShiftRight: 'Shift',
  AltLeft: 'Alt',
  AltRight: 'Alt',
  MetaLeft: 'Win',
  MetaRight: 'Win',
  Space: 'Space',
  Enter: 'Enter',
  Tab: 'Tab',
  Escape: 'Esc',
  Backspace: 'Backspace',
  Delete: 'Del',
  Insert: 'Ins',
  Home: 'Home',
  End: 'End',
  PageUp: 'PgUp',
  PageDown: 'PgDn',
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  CapsLock: 'Caps',
  NumLock: 'Num',
  ScrollLock: 'Scroll',
  Minus: '-',
  Equal: '=',
  BracketLeft: '[',
  BracketRight: ']',
  Backslash: '\\',
  Semicolon: ';',
  Quote: "'",
  Backquote: '`',
  Comma: ',',
  Period: '.',
  Slash: '/',
  Numpad0: 'Num0',
  Numpad1: 'Num1',
  Numpad2: 'Num2',
  Numpad3: 'Num3',
  Numpad4: 'Num4',
  Numpad5: 'Num5',
  Numpad6: 'Num6',
  Numpad7: 'Num7',
  Numpad8: 'Num8',
  Numpad9: 'Num9',
  NumpadMultiply: 'Num*',
  NumpadAdd: 'Num+',
  NumpadSubtract: 'Num-',
  NumpadDecimal: 'Num.',
  NumpadDivide: 'Num/',
  NumpadEnter: 'NumEnter',
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  F4: 'F4',
  F5: 'F5',
  F6: 'F6',
  F7: 'F7',
  F8: 'F8',
  F9: 'F9',
  F10: 'F10',
  F11: 'F11',
  F12: 'F12',
}

export function formatKey(key: string): string {
  if (KEY_DISPLAY_NAMES[key]) {
    return KEY_DISPLAY_NAMES[key]
  }

  if (key.startsWith('Key')) {
    return key.slice(3)
  }

  if (key.startsWith('Digit')) {
    return key.slice(5)
  }

  return key
}

export function formatKeyCombo(keys: string[]): string {
  if (keys.length === 0) return ''
  return keys.map(formatKey).join('+')
}

export function formatMousePosition(x: number, y: number): string {
  return `${Math.round(x)}, ${Math.round(y)}`
}

export function formatMouseButton(button: string | undefined): string {
  if (!button) return ''

  const buttonNames: Record<string, string> = {
    left: 'LMB',
    right: 'RMB',
    middle: 'MMB',
    back: 'Back',
    forward: 'Forward',
  }

  return buttonNames[button] || button
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}
