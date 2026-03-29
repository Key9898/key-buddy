import React from 'react'
import type { CharacterMeta } from '../../types/character'

export const keyBuddyMeta: CharacterMeta = {
  id: 'keybuddy-classic',
  name: 'keyBuddy',
  displayName: 'KeyBuddy Classic',
  description: 'The lovable original companion.',
  thumbnail: 'https://placehold.co/256x256/f472b6/ffffff?text=KeyBuddy',
  tier: 'free',
  category: 'animal',
  tags: ['cat', 'classic', 'cute'],
  animations: {
    idle: { frames: 12, duration: 1000, loop: true },
    typing: { frames: 8, duration: 667, loop: true },
    mouse: { frames: 6, duration: 500, loop: true },
    click: { frames: 4, duration: 333, loop: false },
    speaking: { frames: 12, duration: 1000, loop: true },
  },
  component: React.lazy(() => import('./KeyBuddy')),
}
