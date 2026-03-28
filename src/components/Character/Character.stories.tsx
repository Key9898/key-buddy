import type { Meta, StoryObj } from '@storybook/react'
import { Character } from './Character'

const meta = {
  component: Character,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Character>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Typing: Story = {
  parameters: {
    // In a real environment, we would mock the store
    // For now, these are placeholders representing the visual states
  },
}
