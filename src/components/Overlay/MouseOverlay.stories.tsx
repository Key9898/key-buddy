import type { Meta, StoryObj } from '@storybook/react-vite'
import { MouseOverlay } from './MouseOverlay'

const meta = {
  component: MouseOverlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MouseOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
