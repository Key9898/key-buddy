import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CharacterCard } from './CharacterCard'
import type { CharacterMeta } from '../../types/character'

const createMockCharacter = (overrides: Partial<CharacterMeta> = {}): CharacterMeta => ({
  id: 'keybuddy-classic',
  name: 'keybuddy-classic',
  displayName: 'KeyBuddy Classic',
  description: 'The lovable original companion.',
  thumbnail: 'https://placehold.co/256x256/fdf0ed/f472b6?text=KeyBuddy+Classic',
  tier: 'free',
  category: 'animal',
  tags: ['cat', 'classic'],
  animations: {
    idle: { frames: 12, duration: 1000, loop: true },
    typing: { frames: 8, duration: 670, loop: true },
    mouse: { frames: 6, duration: 500, loop: true },
    click: { frames: 4, duration: 330, loop: false },
    speaking: { frames: 12, duration: 1000, loop: true },
  },
  component: React.lazy(() => Promise.resolve({ default: () => null })),
  ...overrides,
})

const meta = {
  component: CharacterCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSelected: { control: 'boolean' },
    isLocked: { control: 'boolean' },
  },
  args: {
    character: createMockCharacter(),
  },
} satisfies Meta<typeof CharacterCard>

export default meta
type Story = StoryObj<typeof meta>

export const Free: Story = {
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
}

export const Selected: Story = {
  args: {
    isSelected: true,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
}

export const PremiumLocked: Story = {
  args: {
    isLocked: true,
    character: createMockCharacter({
      id: 'shiba',
      name: 'shiba-mate',
      displayName: 'Shiba Mate',
      description: 'A loyal shiba companion.',
      thumbnail: 'https://placehold.co/256x256/fdf0ed/5b21b6?text=Shiba+Mate',
      tier: 'premium',
    }),
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
}

export const PremiumUnlocked: Story = {
  args: {
    isLocked: false,
    character: createMockCharacter({
      id: 'neon',
      name: 'neon-mate',
      displayName: 'Neon Mate',
      description: 'A futuristic neon companion.',
      thumbnail: 'https://placehold.co/256x256/fdf0ed/7c3aed?text=Neon+Mate',
      tier: 'premium',
      category: 'fantasy',
    }),
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
}
