import React from 'react'
import type { CharacterMeta } from '../../types/character'

export const shibaMateMeta: CharacterMeta = {
  id: 'shiba-mate',
  name: 'shibaMate',
  displayName: 'Shiba Mate',
  description: 'A loyal shiba companion for your desktop',
  thumbnail: '/characters/shiba-mate/thumbnail.png',
  tier: 'free',
  category: 'animal',
  tags: ['dog', 'shiba', 'cute', 'loyal'],
  animations: {
    idle: { frames: 12, duration: 1000, loop: true },
    typing: { frames: 8, duration: 667, loop: true },
    mouse: { frames: 6, duration: 500, loop: true },
    click: { frames: 4, duration: 333, loop: false },
    speaking: { frames: 12, duration: 1000, loop: true },
  },
  component: React.lazy(() => import('./ShibaMate')),
}
