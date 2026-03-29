import type { Meta, StoryObj } from '@storybook/react-vite'
import { LockedOverlay } from './LockedOverlay'

const meta = {
  component: LockedOverlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showText: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-64 h-64 bg-base-200 relative overflow-hidden rounded-2xl flex items-center justify-center border-2 border-dashed border-base-content/20 font-black text-xs uppercase opacity-20">
        Parent Card Placeholder
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LockedOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showText: true,
  },
}

export const IconOnly: Story = {
  args: {
    showText: false,
  },
}
