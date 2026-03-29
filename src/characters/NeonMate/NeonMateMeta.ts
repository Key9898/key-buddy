import React from 'react'
import type { CharacterMeta } from '../../types/character'

export const neonMateMeta: CharacterMeta = {
  id: 'neon-mate',
  name: 'neonMate',
  displayName: 'Neon Mate',
  description: 'An electrifying companion with neon glow effects',
  thumbnail: '/characters/neon-mate/thumbnail.png',
  tier: 'premium',
  category: 'fantasy',
  tags: ['neon', 'electric', 'glow', 'cyber'],
  animations: {
    idle: { frames: 12, duration: 1000, loop: true },
    typing: { frames: 8, duration: 667, loop: true },
    mouse: { frames: 6, duration: 500, loop: true },
    click: { frames: 4, duration: 333, loop: false },
    speaking: { frames: 12, duration: 1000, loop: true },
  },
  component: React.lazy(() => import('./NeonMate')),
}
