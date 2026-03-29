import { motion } from 'framer-motion'
import { GripVertical } from 'lucide-react'
import { useState, useRef, useCallback, useEffect } from 'react'
import {
  isElectronAvailable,
  startWindowDrag,
  moveWindowDrag,
  endWindowDrag,
} from '../../utils/ipc'

export function DraggableHandle() {
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPos = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback(async (e: React.MouseEvent) => {
    if (!isElectronAvailable()) return

    e.preventDefault()
    setIsDragging(true)
    dragStartPos.current = { x: e.screenX, y: e.screenY }

    await startWindowDrag(e.screenX, e.screenY)
  }, [])

  const handleMouseMove = useCallback(
    async (e: MouseEvent) => {
      if (!isDragging || !isElectronAvailable()) return

      await moveWindowDrag(e.screenX, e.screenY)
    },
    [isDragging]
  )

  const handleMouseUp = useCallback(async () => {
    if (!isDragging || !isElectronAvailable()) return

    setIsDragging(false)
    await endWindowDrag()
  }, [isDragging])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [handleMouseMove, handleMouseUp])

  if (!isElectronAvailable()) {
    return null
  }

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-8 cursor-move flex items-center justify-center z-50 group"
      onMouseDown={handleMouseDown}
      whileHover={{ backgroundColor: 'rgba(var(--p), 0.1)' }}
      whileTap={{ backgroundColor: 'rgba(var(--p), 0.2)' }}
    >
      <motion.div
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ y: isDragging ? 2 : 0 }}
      >
        <GripVertical className="w-5 h-5 text-primary/40" />
      </motion.div>
    </motion.div>
  )
}
