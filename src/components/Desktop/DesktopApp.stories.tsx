import type { Meta, StoryObj } from '@storybook/react-vite'
import { DesktopApp } from './DesktopApp'

const meta = {
  component: DesktopApp,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px] h-[400px] bg-transparent relative overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopApp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
