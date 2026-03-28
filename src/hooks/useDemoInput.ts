import { useEffect, useState } from 'react'
import { useStore } from '../stores/useStore'
import { CharacterState } from '../types'

const stateCycle: CharacterState[] = ['idle', 'typing', 'mouse', 'click', 'speaking']

export function useDemoInput() {
  const { setCharacterState, setIsTyping, setMicLevel, setPressedKeys, setMouseButtons } =
    useStore()
  const [isDemo, setIsDemo] = useState(true)

  useEffect(() => {
    if (!isDemo) return

    let stateIndex = 0
    const keys = ['W', 'A', 'S', 'D', 'Space', 'Shift']
    const mouseButtons = ['left', 'right', 'middle']

    const interval = setInterval(() => {
      stateIndex = (stateIndex + 1) % stateCycle.length
      const newState = stateCycle[stateIndex]
      setCharacterState(newState)

      const isTypingState = newState === 'typing'
      setIsTyping(isTypingState)

      if (isTypingState) {
        // Randomly press 1-3 keys
        const pressed = keys.filter(() => Math.random() > 0.5)
        setPressedKeys(pressed.length > 0 ? pressed : ['F'])
      } else {
        setPressedKeys([])
      }

      if (newState === 'click') {
        setMouseButtons([mouseButtons[Math.floor(Math.random() * mouseButtons.length)]])
      } else {
        setMouseButtons([])
      }

      if (newState === 'speaking') {
        setMicLevel(Math.random() * 0.5 + 0.5)
      } else {
        setMicLevel(0)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isDemo, setCharacterState, setIsTyping, setMicLevel])

  return { isDemo, setIsDemo }
}
