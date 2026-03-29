import type { Meta, StoryObj } from '@storybook/react-vite'
import { CharacterPicker } from './CharacterPicker'

const meta = {
  component: CharacterPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'selected' },
  },
} satisfies Meta<typeof CharacterPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-[500px] h-[400px] border border-base-content/10 rounded-3xl p-6 bg-base-200">
        <Story />
      </div>
    ),
  ],
}

export const WithSelection: Story = {
  decorators: [
    (Story) => (
      <div className="w-[500px] h-[400px] border border-base-content/10 rounded-3xl p-6 bg-base-200">
        <Story />
      </div>
    ),
  ],
}
