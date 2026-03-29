import type { Meta, StoryObj } from '@storybook/react-vite'
import { TierBadge } from './TierBadge'

const meta = {
  component: TierBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tier: {
      control: 'select',
      options: ['free', 'premium'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof TierBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Free: Story = {
  args: {
    tier: 'free',
    size: 'md',
  },
}

export const Premium: Story = {
  args: {
    tier: 'premium',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    tier: 'premium',
    size: 'lg',
  },
}

export const Small: Story = {
  args: {
    tier: 'free',
    size: 'sm',
  },
}
