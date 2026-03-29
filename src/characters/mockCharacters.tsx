import React from 'react'
import type { CharacterMeta, CharacterProps } from '../types/character'
import { characterRegistry } from './registry/characterRegistry'

const KeyBuddy = React.lazy(() => import('./KeyBuddy/KeyBuddy'))
const GenericCharacter = React.lazy(() => import('./GenericCharacter'))

interface GenericWrapperProps extends CharacterProps {
  id: string
  category: string
  color: string
}

const GenericWrapper: React.FC<GenericWrapperProps> = (props) => (
  <React.Suspense fallback={null}>
    <GenericCharacter {...props} id={props.id} category={props.category} color={props.color} />
  </React.Suspense>
)
GenericWrapper.displayName = 'GenericWrapper'

const renderGeneric = (id: string, category: string, color: string): React.FC<CharacterProps> => {
  const Component: React.FC<CharacterProps> = (props) => (
    <GenericWrapper {...props} id={id} category={category} color={color} />
  )
  Component.displayName = `GenericCharacter_${id}`
  return Component
}

export const mockCharacters: CharacterMeta[] = [
  {
    id: 'keybuddy-classic',
    name: 'keybuddy-classic',
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
    component: KeyBuddy,
  },
  {
    id: 'shiba-mate',
    name: 'shiba-mate',
    displayName: 'Shiba Mate',
    description: 'A loyal shiba companion for your desktop.',
    thumbnail: 'https://placehold.co/256x256/fbbf24/ffffff?text=Shiba+Mate',
    tier: 'free',
    category: 'animal',
    tags: ['dog', 'shiba', 'loyal'],
    animations: {
      idle: { frames: 10, duration: 800, loop: true },
      typing: { frames: 6, duration: 500, loop: true },
      mouse: { frames: 4, duration: 400, loop: true },
      click: { frames: 4, duration: 333, loop: false },
      speaking: { frames: 10, duration: 800, loop: true },
    },
    component: renderGeneric('shiba-mate', 'animal', 'bg-accent'),
  },
  {
    id: 'neon-mate',
    name: 'neon-mate',
    displayName: 'Neon Mate',
    description: 'A futuristic neon companion with reactive glow effects.',
    thumbnail: 'https://placehold.co/256x256/c084fc/ffffff?text=Neon+Mate',
    tier: 'premium',
    category: 'minimal',
    tags: ['glow', 'neon', 'minimal'],
    animations: {
      idle: { frames: 12, duration: 1500, loop: true },
      typing: { frames: 12, duration: 500, loop: true },
      mouse: { frames: 12, duration: 500, loop: true },
      click: { frames: 12, duration: 333, loop: false },
      speaking: { frames: 12, duration: 1500, loop: true },
    },
    component: renderGeneric('neon-mate', 'minimal', 'bg-secondary'),
  },
  {
    id: 'ghost-mate',
    name: 'ghost-mate',
    displayName: 'Ghostly Mate',
    description: 'Boo! This interactive ghost buddy reacts to your typing with spectral energy.',
    thumbnail: 'https://placehold.co/256x256/94a3b8/ffffff?text=Ghostly+Mate',
    tier: 'premium',
    category: 'fantasy',
    tags: ['creature', 'fantasy', 'floating'],
    animations: {
      idle: { frames: 12, duration: 2000, loop: true },
      typing: { frames: 12, duration: 800, loop: true },
      mouse: { frames: 12, duration: 800, loop: true },
      click: { frames: 12, duration: 400, loop: false },
      speaking: { frames: 12, duration: 2000, loop: true },
    },
    component: renderGeneric('ghostly-mate', 'fantasy', 'bg-neutral'),
  },
  {
    id: 'mech-buddy',
    name: 'mech-buddy',
    displayName: 'Mech Buddy',
    description: 'For the tech-savvy creators. It taps its robotic paws at light speed.',
    thumbnail: 'https://placehold.co/256x256/22d3ee/ffffff?text=Mech+Buddy',
    tier: 'premium',
    category: 'minimal',
    tags: ['robot', 'tech', 'minimal'],
    animations: {
      idle: { frames: 12, duration: 3000, loop: true },
      typing: { frames: 12, duration: 400, loop: true },
      mouse: { frames: 12, duration: 400, loop: true },
      click: { frames: 12, duration: 200, loop: false },
      speaking: { frames: 12, duration: 3000, loop: true },
    },
    component: renderGeneric('mech-buddy', 'minimal', 'bg-info'),
  },
  {
    id: 'witchy-mate',
    name: 'witchy-mate',
    displayName: 'Witchy Mate',
    description: 'A seasonal magical companion. Perfect for spooky October sessions.',
    thumbnail: 'https://placehold.co/256x256/7c3aed/ffffff?text=Witchy+Mate',
    tier: 'premium',
    category: 'fantasy',
    tags: ['magic', 'seasonal', 'creature'],
    animations: {
      idle: { frames: 16, duration: 1200, loop: true },
      typing: { frames: 16, duration: 600, loop: true },
      mouse: { frames: 16, duration: 600, loop: true },
      click: { frames: 16, duration: 300, loop: false },
      speaking: { frames: 16, duration: 1200, loop: true },
    },
    component: renderGeneric('witchy-mate', 'fantasy', 'bg-primary'),
  },
  {
    id: 'jack-o-buddy',
    name: 'jack-o-buddy',
    displayName: 'Jack-O-Buddy',
    description: 'Carve your input into this seasonal pumpkin pal.',
    thumbnail: 'https://placehold.co/256x256/f97316/ffffff?text=Jack-O-Buddy',
    tier: 'premium',
    category: 'seasonal',
    tags: ['holiday', 'seasonal', 'fun'],
    animations: {
      idle: { frames: 12, duration: 1000, loop: true },
      typing: { frames: 12, duration: 500, loop: true },
      mouse: { frames: 12, duration: 500, loop: true },
      click: { frames: 12, duration: 333, loop: false },
      speaking: { frames: 12, duration: 1000, loop: true },
    },
    component: renderGeneric('jack-o-buddy', 'seasonal', 'bg-warning'),
  },
  {
    id: 'cyberpunk-mate',
    name: 'cyberpunk-mate',
    displayName: 'Cyberpunk Mate',
    description: 'Glitch your screen with this high-tech cybernetic assistant.',
    thumbnail: 'https://placehold.co/256x256/4ade80/ffffff?text=Cyber+Mate',
    tier: 'premium',
    category: 'minimal',
    tags: ['minimal', 'tech', 'cyber'],
    animations: {
      idle: { frames: 24, duration: 4000, loop: true },
      typing: { frames: 12, duration: 300, loop: true },
      mouse: { frames: 12, duration: 300, loop: true },
      click: { frames: 12, duration: 250, loop: false },
      speaking: { frames: 24, duration: 4000, loop: true },
    },
    component: renderGeneric('cyberpunk-mate', 'minimal', 'bg-success'),
  },
]

// Register them all
mockCharacters.forEach((c) => characterRegistry.register(c))
