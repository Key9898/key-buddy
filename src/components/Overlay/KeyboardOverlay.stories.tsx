import type { Meta, StoryObj } from '@storybook/react-vite'
import { KeyboardOverlay } from './KeyboardOverlay'

const meta = {
  component: KeyboardOverlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KeyboardOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
