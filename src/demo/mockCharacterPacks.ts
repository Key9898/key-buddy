import type { RemoteCharacterPack } from '../types/character'

export const mockRemotePacks: RemoteCharacterPack[] = [
  {
    id: 'pixel-cat',
    name: 'pixel-cat',
    displayName: 'Pixel Cat',
    version: '1.0.0',
    author: 'KeyBuddy Team',
    description: 'A retro pixel art cat companion with 8-bit charm.',
    thumbnail: 'https://placehold.co/256x256/6366f1/ffffff?text=Pixel+Cat',
    tier: 'free',
    category: 'animal',
    tags: ['pixel', 'retro', 'cat', '8-bit'],
    animations: {
      idle: { frames: 8, duration: 800, loop: true },
      typing: { frames: 6, duration: 400, loop: true },
      mouse: { frames: 4, duration: 300, loop: true },
      click: { frames: 2, duration: 150, loop: false },
      speaking: { frames: 8, duration: 800, loop: true },
    },
    entryPoint: 'index.js',
    downloadUrl: '/packs/pixel-cat.zip',
    fileSize: 245000,
    downloads: 15420,
    rating: 4.8,
    featured: true,
  },
  {
    id: 'dragon-mate',
    name: 'dragon-mate',
    displayName: 'Dragon Mate',
    version: '1.2.0',
    author: 'Fantasy Studios',
    description: 'A majestic dragon companion with fire breathing animations.',
    thumbnail: 'https://placehold.co/256x256/ef4444/ffffff?text=Dragon+Mate',
    tier: 'premium',
    category: 'fantasy',
    tags: ['dragon', 'fantasy', 'fire', 'mythical'],
    animations: {
      idle: { frames: 16, duration: 2000, loop: true },
      typing: { frames: 12, duration: 600, loop: true },
      mouse: { frames: 8, duration: 500, loop: true },
      click: { frames: 6, duration: 300, loop: false },
      speaking: { frames: 16, duration: 2000, loop: true },
    },
    entryPoint: 'index.js',
    downloadUrl: '/packs/dragon-mate.zip',
    fileSize: 890000,
    downloads: 8932,
    rating: 4.9,
    featured: true,
  },
  {
    id: 'astronaut-buddy',
    name: 'astronaut-buddy',
    displayName: 'Astronaut Buddy',
    version: '2.0.0',
    author: 'Space Creators',
    description: 'A floating astronaut companion for your cosmic adventures.',
    thumbnail: 'https://placehold.co/256x256/3b82f6/ffffff?text=Astronaut',
    tier: 'premium',
    category: 'minimal',
    tags: ['space', 'astronaut', 'floating', 'cosmic'],
    animations: {
      idle: { frames: 20, duration: 3000, loop: true },
      typing: { frames: 10, duration: 500, loop: true },
      mouse: { frames: 8, duration: 400, loop: true },
      click: { frames: 4, duration: 200, loop: false },
      speaking: { frames: 20, duration: 3000, loop: true },
    },
    entryPoint: 'index.js',
    downloadUrl: '/packs/astronaut-buddy.zip',
    fileSize: 1200000,
    downloads: 12543,
    rating: 4.7,
    featured: false,
  },
  {
    id: 'snowman-mate',
    name: 'snowman-mate',
    displayName: 'Snowman Mate',
    version: '1.0.0',
    author: 'Winter Works',
    description: 'A jolly snowman companion for cozy winter sessions.',
    thumbnail: 'https://placehold.co/256x256/e2e8f0/1e293b?text=Snowman',
    tier: 'free',
    category: 'seasonal',
    tags: ['winter', 'snowman', 'holiday', 'seasonal'],
    animations: {
      idle: { frames: 12, duration: 1500, loop: true },
      typing: { frames: 8, duration: 600, loop: true },
      mouse: { frames: 6, duration: 500, loop: true },
      click: { frames: 4, duration: 300, loop: false },
      speaking: { frames: 12, duration: 1500, loop: true },
    },
    entryPoint: 'index.js',
    downloadUrl: '/packs/snowman-mate.zip',
    fileSize: 320000,
    downloads: 6789,
    rating: 4.5,
    featured: false,
  },
  {
    id: 'robot-companion',
    name: 'robot-companion',
    displayName: 'Robot Companion',
    version: '3.1.0',
    author: 'Tech Toys Inc',
    description: 'A helpful robot buddy with LED display expressions.',
    thumbnail: 'https://placehold.co/256x256/10b981/ffffff?text=Robot',
    tier: 'premium',
    category: 'minimal',
    tags: ['robot', 'tech', 'LED', 'futuristic'],
    animations: {
      idle: { frames: 24, duration: 4000, loop: true },
      typing: { frames: 12, duration: 400, loop: true },
      mouse: { frames: 8, duration: 300, loop: true },
      click: { frames: 4, duration: 150, loop: false },
      speaking: { frames: 24, duration: 4000, loop: true },
    },
    entryPoint: 'index.js',
    downloadUrl: '/packs/robot-companion.zip',
    fileSize: 750000,
    downloads: 18234,
    rating: 4.9,
    featured: true,
  },
  {
    id: 'bunny-friend',
    name: 'bunny-friend',
    displayName: 'Bunny Friend',
    version: '1.0.0',
    author: 'Cute Creatures',
    description: 'An adorable bunny that hops along with your typing.',
    thumbnail: 'https://placehold.co/256x256/fbbf24/ffffff?text=Bunny',
    tier: 'free',
    category: 'animal',
    tags: ['bunny', 'cute', 'animal', 'hop'],
    animations: {
      idle: { frames: 10, duration: 1000, loop: true },
      typing: { frames: 8, duration: 500, loop: true },
      mouse: { frames: 6, duration: 400, loop: true },
      click: { frames: 4, duration: 250, loop: false },
      speaking: { frames: 10, duration: 1000, loop: true },
    },
    entryPoint: 'index.js',
    downloadUrl: '/packs/bunny-friend.zip',
    fileSize: 180000,
    downloads: 21456,
    rating: 4.6,
    featured: false,
  },
]

export function getFeaturedPacks(): RemoteCharacterPack[] {
  return mockRemotePacks.filter((pack) => pack.featured)
}

export function getPacksByCategory(category: string): RemoteCharacterPack[] {
  return mockRemotePacks.filter((pack) => pack.category === category)
}

export function getPacksByTier(tier: 'free' | 'premium'): RemoteCharacterPack[] {
  return mockRemotePacks.filter((pack) => pack.tier === tier)
}

export function searchPacks(query: string): RemoteCharacterPack[] {
  const lowerQuery = query.toLowerCase()
  return mockRemotePacks.filter(
    (pack) =>
      pack.displayName.toLowerCase().includes(lowerQuery) ||
      pack.description.toLowerCase().includes(lowerQuery) ||
      pack.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}
