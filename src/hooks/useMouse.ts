import { useEffect, useCallback, useRef } from 'react'
import { useStore } from '../stores/useStore'
import { onMouseEvent, isElectronAvailable } from '../utils/ipc'
import type { MouseEvent, CharacterState } from '../types'

const CLICK_STATE_DURATION = 300
const MOUSE_MOVE_THROTTLE = 16

export function useMouse() {
  const {
    settings,
    mousePosition,
    setMousePosition,
    mouseButtons,
    setMouseButtons,
    characterState,
    setCharacterState,
  } = useStore()

  const lastMoveTimeRef = useRef(0)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const updateCharacterState = useCallback(
    (newState: CharacterState) => {
      if (characterState !== 'speaking' && characterState !== 'typing') {
        setCharacterState(newState)
      }
    },
    [characterState, setCharacterState]
  )

  const handleClickEnd = useCallback(() => {
    setMouseButtons([])
    updateCharacterState('idle')
  }, [setMouseButtons, updateCharacterState])

  const handleMouseEvent = useCallback(
    (event: MouseEvent) => {
      if (!settings.input.mouseEnabled) return

      const { x, y, button, type } = event
      const now = Date.now()

      if (type === 'move') {
        if (now - lastMoveTimeRef.current < MOUSE_MOVE_THROTTLE) {
          return
        }
        lastMoveTimeRef.current = now

        setMousePosition({ x, y })

        if (characterState === 'idle') {
          updateCharacterState('mouse')
        }
      } else if (type === 'click') {
        if (button) {
          setMouseButtons([button])
          updateCharacterState('click')

          if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current)
          }
          clickTimeoutRef.current = setTimeout(handleClickEnd, CLICK_STATE_DURATION)
        }
      } else if (type === 'scroll') {
        updateCharacterState('mouse')
      }
    },
    [
      settings.input.mouseEnabled,
      characterState,
      setMousePosition,
      setMouseButtons,
      updateCharacterState,
      handleClickEnd,
    ]
  )

  useEffect(() => {
    if (!isElectronAvailable()) {
      return
    }

    const unsubscribe = onMouseEvent(handleMouseEvent)

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }
    }
  }, [handleMouseEvent])

  return {
    position: mousePosition,
    buttons: mouseButtons,
    characterState,
    isEnabled: settings.input.mouseEnabled,
    isElectron: isElectronAvailable(),
  }
}
