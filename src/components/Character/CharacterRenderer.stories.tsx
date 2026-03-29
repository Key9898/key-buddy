import type { Meta, StoryObj } from '@storybook/react-vite'
import { CharacterRenderer } from './CharacterRenderer'

const meta = {
  component: CharacterRenderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'typing', 'mouse', 'click', 'speaking'],
    },
  },
} satisfies Meta<typeof CharacterRenderer>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {
  args: {
    characterId: 'keybuddy-classic',
    state: 'idle',
  },
}

export const Typing: Story = {
  args: {
    characterId: 'keybuddy-classic',
    state: 'typing',
  },
}

export const Mouse: Story = {
  args: {
    characterId: 'shiba',
    state: 'mouse',
  },
}

export const NotFound: Story = {
  args: {
    characterId: 'non-existent',
    state: 'idle',
  },
}
