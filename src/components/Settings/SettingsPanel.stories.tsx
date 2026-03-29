import type { Meta, StoryObj } from '@storybook/react-vite'
import { SettingsPanel } from './SettingsPanel'
import { useStore } from '../../stores/useStore'

const meta = {
  component: SettingsPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="relative w-[400px] h-[500px] bg-base-200 rounded-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SettingsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
}

export const GeneralTab: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
  play: async () => {
    const store = useStore.getState()
    store.setSettings({
      window: {
        ...store.settings.window,
        width: 350,
        height: 350,
      },
    })
  },
}

export const CharacterTab: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
}

export const OverlaysTab: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
}
