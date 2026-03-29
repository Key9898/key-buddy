import { useEffect, useCallback, useRef } from 'react'
import { useStore } from '../stores/useStore'
import { onKeyboardEvent, isElectronAvailable } from '../utils/ipc'
import type { KeyboardEvent, CharacterState } from '../types'

const TYPING_TIMEOUT = 500
const IGNORED_KEYS = ['Control', 'Alt', 'Shift', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock']

export function useKeyboard() {
  const {
    settings,
    pressedKeys,
    setPressedKeys,
    isTyping,
    setIsTyping,
    characterState,
    setCharacterState,
  } = useStore()

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pressedKeysRef = useRef<Set<string>>(new Set())

  const updateCharacterState = useCallback(
    (newState: CharacterState) => {
      if (characterState !== 'speaking') {
        setCharacterState(newState)
      }
    },
    [characterState, setCharacterState]
  )

  const handleTypingEnd = useCallback(() => {
    setIsTyping(false)
    setPressedKeys([])
    pressedKeysRef.current.clear()
    updateCharacterState('idle')
  }, [setIsTyping, setPressedKeys, updateCharacterState])

  const resetTypingTimeout = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(handleTypingEnd, TYPING_TIMEOUT)
  }, [handleTypingEnd])

  const handleKeyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      if (!settings.input.keyboardEnabled) return

      const { key, type } = event

      if (IGNORED_KEYS.includes(key)) return

      if (type === 'down') {
        pressedKeysRef.current.add(key)
        setPressedKeys(Array.from(pressedKeysRef.current))

        if (!isTyping) {
          setIsTyping(true)
          updateCharacterState('typing')
        }

        resetTypingTimeout()
      } else if (type === 'up') {
        pressedKeysRef.current.delete(key)
        setPressedKeys(Array.from(pressedKeysRef.current))
      }
    },
    [
      settings.input.keyboardEnabled,
      isTyping,
      setIsTyping,
      setPressedKeys,
      updateCharacterState,
      resetTypingTimeout,
    ]
  )

  useEffect(() => {
    if (!isElectronAvailable()) {
      return
    }

    const unsubscribe = onKeyboardEvent(handleKeyboardEvent)

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [handleKeyboardEvent])

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return {
    pressedKeys,
    isTyping,
    lastKey: pressedKeys[pressedKeys.length - 1] || null,
    characterState,
    isEnabled: settings.input.keyboardEnabled,
    isElectron: isElectronAvailable(),
  }
}
