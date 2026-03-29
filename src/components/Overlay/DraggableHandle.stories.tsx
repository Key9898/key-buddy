import type { Meta, StoryObj } from '@storybook/react-vite'
import { DraggableHandle } from './DraggableHandle'

const meta = {
  component: DraggableHandle,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="relative w-[350px] h-[100px] bg-base-200 rounded-2xl overflow-hidden">
        <Story />
        <div className="absolute inset-0 flex items-center justify-center text-base-content/30 text-sm">
          Drag area at top
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof DraggableHandle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
