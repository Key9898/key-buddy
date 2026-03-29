import type { Meta, StoryObj } from '@storybook/react-vite'
import { Overlay } from './Overlay'
import { useStore } from '../../stores/useStore'

const meta = {
  component: Overlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[500px] h-[200px] bg-base-200 rounded-3xl overflow-hidden relative">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Overlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithMicLevel: Story = {
  play: () => {
    useStore.getState().setMicLevel(0.5)
  },
}

export const HighMicLevel: Story = {
  play: () => {
    useStore.getState().setMicLevel(0.85)
  },
}

export const MicHidden: Story = {
  play: () => {
    useStore.getState().setSettings({
      overlay: {
        keyboardVisible: true,
        mouseVisible: true,
        micVisible: false,
      },
    })
  },
}
