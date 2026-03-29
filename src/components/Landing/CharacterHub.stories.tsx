import type { Meta, StoryObj } from '@storybook/react-vite'
import { CharacterHub } from './CharacterHub'

const meta = {
  component: CharacterHub,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CharacterHub>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="p-10 bg-base-100 min-h-screen">
        <Story />
      </div>
    ),
  ],
}
