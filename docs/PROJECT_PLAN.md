# KeyBuddy - Project Plan

## Project Overview

**KeyBuddy** is a cross-platform desktop input overlay application with an animated character that reacts to user inputs. Designed for streamers and content creators.

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Name**         | KeyBuddy                    |
| **Type**         | Desktop Application         |
| **Platforms**    | Windows, macOS, Linux       |
| **Target Users** | Streamers, Content Creators |
| **License**      | Open Source (MIT)           |
| **Cost**         | $0 (All Free Tiers)         |

---

## Tech Stack

### Frontend (Desktop App)

| Component | Technology              | Purpose                    |
| --------- | ----------------------- | -------------------------- |
| Framework | React + TypeScript      | UI development             |
| Desktop   | Electron                | Cross-platform desktop app |
| Animation | Framer Motion           | Character animations       |
| Styling   | Tailwind CSS + DaisyUI  | UI styling (cupcake theme) |
| Icons     | Lucide React            | UI icons                   |
| State     | Zustand                 | Global state management    |
| Build     | Vite + Electron Builder | Development & distribution |

### Development Tools

| Component  | Technology | Purpose               |
| ---------- | ---------- | --------------------- |
| Linting    | ESLint     | Code quality & errors |
| Formatting | Prettier   | Code formatting       |
| UI Dev     | Storybook  | Component development |

### Input Detection

| Component  | Technology   | Purpose               |
| ---------- | ------------ | --------------------- |
| Keyboard   | uiohook-napi | Global keyboard hooks |
| Mouse      | uiohook-napi | Global mouse hooks    |
| Microphone | naudiodon    | Audio input detection |

### Backend (Phase 2+)

| Component | Technology            | Purpose                |
| --------- | --------------------- | ---------------------- |
| Website   | Vercel                | Landing page & API     |
| Database  | Supabase (PostgreSQL) | User data storage      |
| Auth      | Supabase Auth         | User authentication    |
| Storage   | Supabase Storage      | Character file storage |

### Distribution

| Component | Technology      | Purpose             |
| --------- | --------------- | ------------------- |
| Code      | GitHub          | Source repository   |
| Downloads | GitHub Releases | App distribution    |
| Website   | Vercel          | keybuddy.vercel.app |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      USER'S COMPUTER                         │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Electron App                          │ │
│  │                                                        │ │
│  │  ┌─────────────────────┐  ┌─────────────────────────┐ │ │
│  │  │   Main Process      │  │   Renderer Process      │ │ │
│  │  │   (Node.js)         │  │   (React)               │ │ │
│  │  │                     │  │                         │ │ │
│  │  │  ┌───────────────┐  │  │  ┌───────────────────┐  │ │ │
│  │  │  │ uiohook-napi  │  │  │  │ Character         │  │ │ │
│  │  │  │ (keyboard)    │──┼──┼─→│ (Framer Motion)   │  │ │ │
│  │  │  └───────────────┘  │  │  └───────────────────┘  │ │ │
│  │  │  ┌───────────────┐  │  │  ┌───────────────────┐  │ │ │
│  │  │  │ uiohook-napi  │  │  │  │ Keyboard Overlay  │  │ │ │
│  │  │  │ (mouse)       │──┼──┼─→│ (DaisyUI)         │  │ │ │
│  │  │  └───────────────┘  │  │  └───────────────────┘  │ │ │
│  │  │  ┌───────────────┐  │  │  ┌───────────────────┐  │ │ │
│  │  │  │ naudiodon     │  │  │  │ Settings Panel    │  │ │ │
│  │  │  │ (microphone)  │──┼──┼─→│ (DaisyUI)         │  │ │ │
│  │  │  └───────────────┘  │  │  └───────────────────┘  │ │ │
│  │  │  ┌───────────────┐  │  │                         │ │ │
│  │  │  │ Settings I/O  │  │  │  State: Zustand         │ │ │
│  │  │  └───────────────┘  │  │                         │ │ │
│  │  └─────────────────────┘  └─────────────────────────┘ │ │
│  │                                                        │ │
│  │  Local Files:                                         │ │
│  │  ├── settings.json (user preferences)                 │ │
│  │  └── characters/ (character sprites)                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Internet (Phase 2+)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      CLOUD SERVICES                          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ GitHub       │  │ Vercel       │  │ Supabase         │  │
│  │              │  │              │  │                  │  │
│  │ • Source     │  │ • Website    │  │ • Auth           │  │
│  │ • Releases   │  │ • API        │  │ • Database       │  │
│  │ • Issues     │  │ • CDN        │  │ • Storage        │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                              │
│  URL: keybuddy.vercel.app                                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
keybuddy/
├── electron/                      # Electron main process
│   ├── main.ts                    # App entry, window creation
│   ├── preload.ts                 # IPC bridge
│   ├── input/
│   │   ├── keyboard.ts            # Keyboard hooks (uiohook)
│   │   └── mouse.ts               # Mouse hooks (uiohook)
│   ├── audio/
│   │   └── microphone.ts          # Mic input (naudiodon)
│   └── utils/
│       └── settings.ts            # Settings file I/O
│
├── src/                           # React frontend
│   ├── components/                # Modular Component Architecture
│   │   │
│   │   ├── Character/             # Main animated character
│   │   │   ├── Character.tsx      # UI component
│   │   │   ├── Character.stories.tsx
│   │   │   ├── animations.ts      # Framer Motion variants
│   │   │   └── index.ts
│   │   │
│   │   ├── Overlay/               # Input overlay display
│   │   │   ├── Overlay.tsx
│   │   │   ├── KeyboardOverlay.tsx
│   │   │   ├── MouseOverlay.tsx
│   │   │   ├── Overlay.stories.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Settings/              # Settings panel
│   │   │   ├── Settings.tsx
│   │   │   ├── SettingsPanel.tsx
│   │   │   ├── Settings.stories.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── ui/                    # Shared UI components
│   │       ├── Button/
│   │       │   ├── Button.tsx
│   │       │   ├── Button.stories.tsx
│   │       │   └── index.ts
│   │       ├── Input/
│   │       │   ├── Input.tsx
│   │       │   └── index.ts
│   │       ├── Slider/
│   │       │   ├── Slider.tsx
│   │       │   └── index.ts
│   │       └── Toggle/
│   │           ├── Toggle.tsx
│   │           └── index.ts
│   │
│   ├── hooks/                     # Smart Logic (Reusable)
│   │   ├── useKeyboard.ts         # Keyboard input logic
│   │   ├── useMouse.ts            # Mouse input logic
│   │   ├── useMicrophone.ts       # Mic input logic
│   │   ├── useSettings.ts         # Settings state
│   │   ├── useCharacter.ts        # Character state
│   │   └── useIPC.ts              # Electron IPC
│   │
│   ├── utils/                     # API & Functions
│   │   ├── ipc.ts                 # Electron IPC helpers
│   │   ├── storage.ts             # Local storage
│   │   ├── formatters.ts          # Data formatters
│   │   └── validators.ts          # Input validators
│   │
│   ├── stores/                    # Zustand stores
│   │   ├── useStore.ts            # Main store
│   │   ├── useSettingsStore.ts    # Settings store
│   │   └── useCharacterStore.ts   # Character store
│   │
│   ├── demo/                      # Demo & Mocks
│   │   └── mocks/
│   │       ├── keyboardEvents.ts
│   │       └── mouseEvents.ts
│   │
│   ├── types/                     # TypeScript types
│   │   ├── character.ts
│   │   ├── settings.ts
│   │   ├── input.ts
│   │   └── index.ts
│   │
│   ├── styles/
│   │   └── global.css             # DaisyUI cupcake theme
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── characters/                    # Character assets
│   └── default/
│       ├── idle/                  # Idle animation frames
│       ├── typing/                # Typing animation frames
│       └── mouse/                 # Mouse animation frames
│
├── assets/                        # Static assets
│   └── icon.png
│
├── .storybook/                    # Storybook config
│   ├── main.ts
│   └── preview.ts
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── .eslintrc.js
├── .prettierrc
├── electron-builder.yml
└── README.md
```

---

## Phase Plan

### Phase 1: MVP (Estimated: 2 months)

**Goal:** Working product with basic features

#### Features

- [ ] **Transparent Overlay Window**
  - [ ] Always on top
  - [ ] Click-through enabled
  - [ ] Resizable & draggable
  - [ ] Multi-monitor support

- [ ] **Keyboard Detection & Display**
  - [ ] Global keyboard hooks
  - [ ] Visual keyboard overlay
  - [ ] Key press animations
  - [ ] Modifier key handling (Shift, Ctrl, Alt)

- [ ] **Mouse Detection & Display**
  - [ ] Global mouse hooks
  - [ ] Mouse position tracking
  - [ ] Click animations (left, right, middle)
  - [ ] Scroll wheel detection

- [ ] **Character System**
  - [ ] Default cute character (sprite-based)
  - [ ] Idle animation
  - [ ] Typing animation
  - [ ] Mouse movement animation
  - [ ] Click reaction animation

- [ ] **Settings Panel**
  - [ ] Position adjustment
  - [ ] Size adjustment
  - [ ] Opacity control
  - [ ] Character selection (default only)
  - [ ] Startup on boot option
  - [ ] Show/hide keyboard overlay toggle

#### Technical Tasks

- [ ] Initialize project (Electron + React + Vite)
- [ ] Setup TypeScript configuration
- [ ] Setup Tailwind CSS + DaisyUI (cupcake theme)
- [ ] Setup Zustand store
- [ ] Implement IPC communication (main ↔ renderer)
- [ ] Implement keyboard hooks (uiohook-napi)
- [ ] Implement mouse hooks (uiohook-napi)
- [ ] Create character component with Framer Motion
- [ ] Create keyboard overlay component
- [ ] Create settings panel component
- [ ] Implement settings persistence (JSON file)
- [ ] Setup Electron Builder for distribution
- [ ] Test on Windows
- [ ] Test on macOS
- [ ] Test on Linux

#### Distribution

- [ ] Create GitHub repository
- [ ] Setup GitHub Actions for CI/CD
- [ ] Create release builds (Windows, macOS, Linux)
- [ ] Publish to GitHub Releases

#### Success Criteria

- App runs on all 3 platforms
- Character responds to keyboard/mouse
- Users can download and use it
- No major bugs or crashes

---

### Phase 2: Differentiation (Estimated: 1-2 months)

**Goal:** Stand out from Bongo Cat and similar apps

#### Features

- [ ] **Microphone Reactive**
  - [ ] Audio level detection
  - [ ] Speaking animation
  - [ ] Volume-based reactions
  - [ ] Microphone selection

- [ ] **Multiple Characters**
  - [ ] 3-5 default characters
  - [ ] Character selection UI
  - [ ] Character preview

- [ ] **Custom Character Upload**
  - [ ] Upload sprite sheets
  - [ ] Character configuration (JSON)
  - [ ] Character validation

- [ ] **Auto-Update System**
  - [ ] Check for updates
  - [ ] Download & install
  - [ ] Update notifications

- [ ] **Enhanced Settings**
  - [ ] Theme selection (cupcake, synthwave, etc.)
  - [ ] Animation speed control
  - [ ] Character-specific settings
  - [ ] Import/Export settings

#### Backend Tasks

- [ ] Setup Vercel project
- [ ] Setup Supabase project
- [ ] Create database schema
- [ ] Implement authentication
- [ ] Create storage buckets
- [ ] Build landing page
- [ ] Build API endpoints

#### Success Criteria

- Microphone feature works
- Multiple characters available
- Auto-update functions
- User base growing

---

### Phase 3: Innovation (Estimated: 2-3 months)

**Goal:** Unique features & community building

#### Features

- [ ] **AI-Powered Reactions**
  - [ ] Context-aware animations
  - [ ] Smart responses
  - [ ] Learning from usage patterns

- [ ] **Character Marketplace**
  - [ ] Community characters
  - [ ] Premium character packs
  - [ ] Character ratings & reviews

- [ ] **Community Features**
  - [ ] Share characters
  - [ ] User profiles
  - [ ] Activity feed

- [ ] **Integrations**
  - [ ] OBS integration
  - [ ] Streamlabs integration
  - [ ] Discord integration

#### Success Criteria

- Active community
- Character marketplace active
- Streamers using it regularly
- Sustainable growth

---

## Key Differentiators

| Feature     | Bongo Cat    | KeyBuddy                 |
| ----------- | ------------ | ------------------------ |
| Platform    | Windows only | Windows, Mac, Linux      |
| Microphone  | ❌           | ✅ Audio reactive        |
| Characters  | Cat only     | Multiple + custom upload |
| Open Source | ❌           | ✅                       |
| Settings    | Basic        | Advanced                 |
| Auto-update | ❌           | ✅                       |
| Community   | ❌           | ✅ (Phase 3)             |

---

## Security & Privacy

- **Open Source:** Code is public, anyone can verify
- **No Data Collection:** Everything runs locally (MVP)
- **No Server Required (MVP):** No data leaves user's computer
- **Optional Account (Phase 2+):** Only for premium features
- **Password Field Detection:** Overlay hides on password fields

---

## Cost Breakdown

| Service  | Free Tier             | When to Pay               |
| -------- | --------------------- | ------------------------- |
| GitHub   | Unlimited             | Never (for this project)  |
| Vercel   | 100GB/month           | >100GB bandwidth          |
| Supabase | 500MB DB, 1GB storage | >500MB DB or >1GB storage |
| Domain   | keybuddy.vercel.app   | Custom domain (~$10/year) |

**Total Monthly Cost: $0**

---

## Risks & Mitigation

| Risk                             | Probability | Mitigation                           |
| -------------------------------- | ----------- | ------------------------------------ |
| Input hooks fail on some systems | Medium      | Extensive testing, fallback options  |
| Performance issues               | Low         | Optimize animations, limit resources |
| Security concerns                | Medium      | Open source, transparent             |
| Free tier limits hit             | Low         | Monitor usage, optimize files        |
| Character design quality         | Medium      | Start simple, iterate                |

---

## DaisyUI Theme Configuration

Using **cupcake** theme for cute, playful appearance. Configured in `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './electron/**/*.{js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cupcake'],
  },
}
```

Theme is applied via `data-theme="cupcake"` attribute in `index.html`.

---

## Development Approach

### Hybrid Strategy

1. **Start Similar to Bongo Cat** (Phase 1)
   - Proven concept
   - Learn the basics
   - Quick to market

2. **Differentiate** (Phase 2)
   - Add unique features
   - Cross-platform support
   - Microphone reactivity

3. **Innovate** (Phase 3)
   - AI features
   - Community building
   - Marketplace

---

## Next Steps

1. Initialize project with Electron + React + Vite
2. Setup development environment
3. Begin Phase 1 development

---

## Progress Tracking

| Phase                    | Status      | Start Date | End Date |
| ------------------------ | ----------- | ---------- | -------- |
| Phase 1: MVP             | Not Started | -          | -        |
| Phase 2: Differentiation | Not Started | -          | -        |
| Phase 3: Innovation      | Not Started | -          | -        |

---

## Development Scripts

### NPM Scripts

| Script                 | Command                         | Description              |
| ---------------------- | ------------------------------- | ------------------------ |
| `dev`                  | `vite`                          | Start development server |
| `build`                | `tsc && vite build`             | Build for production     |
| `preview`              | `vite preview`                  | Preview production build |
| `lint`                 | `eslint . --ext .ts,.tsx`       | Run ESLint               |
| `lint:fix`             | `eslint . --ext .ts,.tsx --fix` | Fix ESLint errors        |
| `format`               | `prettier --write .`            | Format all files         |
| `format:check`         | `prettier --check .`            | Check formatting         |
| `storybook`            | `storybook dev -p 6006`         | Start Storybook          |
| `build-storybook`      | `storybook build`               | Build Storybook static   |
| `electron:dev`         | `electron .`                    | Run Electron in dev mode |
| `electron:build`       | `electron-builder`              | Build Electron app       |
| `electron:build:win`   | `electron-builder --win`        | Build for Windows        |
| `electron:build:mac`   | `electron-builder --mac`        | Build for macOS          |
| `electron:build:linux` | `electron-builder --linux`      | Build for Linux          |

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "electron:dev": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\"",
    "electron:build": "npm run build && electron-builder",
    "electron:build:win": "npm run build && electron-builder --win",
    "electron:build:mac": "npm run build && electron-builder --mac",
    "electron:build:linux": "npm run build && electron-builder --linux"
  }
}
```

---

## IPC Channels

### Main Process → Renderer Process

| Channel           | Direction | Payload                    | Description               |
| ----------------- | --------- | -------------------------- | ------------------------- |
| `keyboard:event`  | Main→Rend | `{ key, type, timestamp }` | Keyboard input event      |
| `mouse:event`     | Main→Rend | `{ x, y, button, type }`   | Mouse input event         |
| `mic:level`       | Main→Rend | `{ level, timestamp }`     | Microphone volume level   |
| `settings:loaded` | Main→Rend | `Settings`                 | Settings loaded from file |
| `app:update`      | Main→Rend | `{ version, available }`   | Update notification       |

### Renderer Process → Main Process

| Channel               | Direction | Payload             | Description              |
| --------------------- | --------- | ------------------- | ------------------------ |
| `settings:get`        | Rend→Main | -                   | Request current settings |
| `settings:set`        | Rend→Main | `Settings`          | Save settings to file    |
| `window:position`     | Rend→Main | `{ x, y }`          | Set window position      |
| `window:size`         | Rend→Main | `{ width, height }` | Set window size          |
| `window:opacity`      | Rend→Main | `number` (0-1)      | Set window opacity       |
| `window:clickthrough` | Rend→Main | `boolean`           | Toggle click-through     |
| `mic:start`           | Rend→Main | -                   | Start mic detection      |
| `mic:stop`            | Rend→Main | -                   | Stop mic detection       |
| `mic:device`          | Rend→Main | `deviceId`          | Select mic device        |

### IPC Types

```typescript
interface KeyEvent {
  key: string
  type: 'down' | 'up'
  timestamp: number
}

interface MouseEvent {
  x: number
  y: number
  button: 'left' | 'right' | 'middle' | null
  type: 'move' | 'click' | 'scroll'
  timestamp: number
}

interface MicLevel {
  level: number
  timestamp: number
}

interface Settings {
  window: {
    x: number
    y: number
    width: number
    height: number
    opacity: number
    clickThrough: boolean
  }
  character: {
    id: string
    scale: number
    animationSpeed: number
  }
  overlay: {
    showKeyboard: boolean
    showMouse: boolean
    showMic: boolean
  }
  mic: {
    deviceId: string
    sensitivity: number
  }
}
```

---

## Code Conventions

### File Naming

| Type       | Convention        | Example              |
| ---------- | ----------------- | -------------------- |
| Components | PascalCase        | `Character.tsx`      |
| Hooks      | camelCase + use   | `useKeyboard.ts`     |
| Utils      | camelCase         | `formatters.ts`      |
| Types      | PascalCase        | `CharacterState.ts`  |
| Stores     | camelCase + use   | `useStore.ts`        |
| Stories    | Component.stories | `Button.stories.tsx` |
| Tests      | Component.test    | `Button.test.ts`     |
| Constants  | camelCase         | `constants.ts`       |

### Folder Naming

| Type       | Convention | Example      |
| ---------- | ---------- | ------------ |
| Components | PascalCase | `Character/` |
| Features   | PascalCase | `Settings/`  |
| Utilities  | camelCase  | `utils/`     |
| Hooks      | camelCase  | `hooks/`     |
| Types      | camelCase  | `types/`     |

### Component Structure

```typescript
// Component file structure
import { motion } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';
import type { CharacterProps } from './types';
import { animations } from './animations';

export function Character({ id, scale }: CharacterProps) {
  const { settings } = useSettings();

  return (
    <motion.div
      variants={animations}
      className="character"
    >
      {/* Component content */}
    </motion.div>
  );
}
```

### Import Order

```typescript
// 1. React & Framework
import { useState, useEffect } from 'react'

// 2. Third-party libraries
import { motion } from 'framer-motion'
import { Settings, Keyboard } from 'lucide-react'

// 3. Internal components
import { Button } from '@/components/ui/Button'

// 4. Hooks
import { useSettings } from '@/hooks/useSettings'

// 5. Utils
import { formatKey } from '@/utils/formatters'

// 6. Types
import type { Settings as SettingsType } from '@/types'

// 7. Styles
import './styles.css'
```

### TypeScript Conventions

```typescript
// Interface for props
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

// Type for unions
type ButtonVariant = 'primary' | 'secondary'

// Enum for constants
enum AnimationState {
  Idle = 'idle',
  Typing = 'typing',
  Mouse = 'mouse',
}
```

### CSS/Tailwind Conventions

```typescript
// Use DaisyUI classes first, then Tailwind utilities
<div className="btn btn-primary btn-sm rounded-full shadow-lg">

// Use clsx for conditional classes
import clsx from 'clsx';

<div className={clsx(
  'btn',
  isActive && 'btn-active',
  isDisabled && 'btn-disabled'
)}>
```

---

## Character Asset Specification

### Sprite Format

| Property      | Value                 |
| ------------- | --------------------- |
| Format        | PNG with transparency |
| Frame Size    | 256x256 pixels        |
| Frame Rate    | 12 FPS                |
| Color Mode    | RGBA                  |
| Max File Size | 500KB per animation   |

### Animation Types

| Animation  | Frames | Duration | Loop |
| ---------- | ------ | -------- | ---- |
| `idle`     | 12     | 1s       | Yes  |
| `typing`   | 8      | 0.67s    | Yes  |
| `mouse`    | 6      | 0.5s     | Yes  |
| `click`    | 4      | 0.33s    | No   |
| `speaking` | 12     | 1s       | Yes  |

### File Structure

```
characters/
└── {character-id}/
    ├── metadata.json          # Character configuration
    ├── idle/
    │   ├── frame_000.png
    │   ├── frame_001.png
    │   └── ...
    ├── typing/
    │   ├── frame_000.png
    │   └── ...
    ├── mouse/
    │   └── ...
    ├── click/
    │   └── ...
    └── speaking/              # Phase 2
        └── ...
```

### Metadata Schema

```json
{
  "id": "default-cat",
  "name": "Default Cat",
  "author": "KeyBuddy Team",
  "version": "1.0.0",
  "description": "A cute animated cat character",
  "animations": {
    "idle": {
      "frames": 12,
      "fps": 12,
      "loop": true
    },
    "typing": {
      "frames": 8,
      "fps": 12,
      "loop": true
    },
    "mouse": {
      "frames": 6,
      "fps": 12,
      "loop": true
    },
    "click": {
      "frames": 4,
      "fps": 12,
      "loop": false
    }
  },
  "scale": 1.0,
  "offset": { "x": 0, "y": 0 }
}
```

### Naming Convention

```
{character-id}-{animation}-frame_{number}.png

Examples:
- default-cat-idle-frame_000.png
- default-cat-typing-frame_000.png
- robot-mouse-frame_000.png
```

---

## Performance Targets

### Resource Limits

| Metric          | Target  | Maximum    |
| --------------- | ------- | ---------- |
| Memory (Idle)   | < 100MB | 150MB      |
| Memory (Active) | < 200MB | 300MB      |
| CPU (Idle)      | < 1%    | 3%         |
| CPU (Active)    | < 10%   | 15%        |
| GPU             | < 5%    | 10%        |
| Startup Time    | < 2s    | 3s         |
| Animation FPS   | 60 FPS  | 30 FPS min |

### Optimization Strategies

| Area          | Strategy                             |
| ------------- | ------------------------------------ |
| Animations    | Use CSS transforms, GPU acceleration |
| Sprites       | Lazy load, sprite sheets             |
| State Updates | Debounce, throttle                   |
| IPC           | Batch events, reduce frequency       |
| Memory        | Cleanup unused assets                |
| Rendering     | React.memo, useMemo, useCallback     |

### Monitoring

```typescript
// Performance monitoring in development
if (process.env.NODE_ENV === 'development') {
  setInterval(() => {
    const memory = process.memoryUsage()
    console.log('Memory:', Math.round(memory.heapUsed / 1024 / 1024), 'MB')
  }, 5000)
}
```

---

## Keyboard Shortcuts

### Global Shortcuts (System-wide)

| Shortcut       | Action                    |
| -------------- | ------------------------- |
| `Ctrl+Shift+K` | Toggle overlay visibility |
| `Ctrl+Shift+S` | Open settings             |
| `Ctrl+Shift+Q` | Quit application          |

### App Shortcuts (When focused)

| Shortcut  | Action               |
| --------- | -------------------- |
| `Escape`  | Close settings panel |
| `R`       | Reset position       |
| `H`       | Toggle click-through |
| `+` / `-` | Adjust size          |
| `[` / `]` | Adjust opacity       |

### Settings Panel

| Shortcut    | Action         |
| ----------- | -------------- |
| `Tab`       | Next field     |
| `Shift+Tab` | Previous field |
| `Enter`     | Save & close   |
| `Escape`    | Cancel & close |

---

## Error Handling

### Error Types

| Type            | Description             | Handling               |
| --------------- | ----------------------- | ---------------------- |
| `InputError`    | uiohook-napi failure    | Fallback, show warning |
| `AudioError`    | naudiodon failure       | Disable mic feature    |
| `SettingsError` | Settings file I/O error | Use defaults           |
| `AssetError`    | Character asset missing | Use default character  |
| `IPCError`      | Communication failure   | Retry, log error       |

### Error Boundary

```typescript
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
```

### Logging

```typescript
// Log levels
type LogLevel = 'debug' | 'info' | 'warn' | 'error'

function log(level: LogLevel, message: string, data?: unknown) {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

  if (data) {
    console[level](logMessage, data)
  } else {
    console[level](logMessage)
  }

  // In production, send to error tracking service
  if (level === 'error' && process.env.NODE_ENV === 'production') {
    // Send to error tracking (Phase 2+)
  }
}
```

---

## Git Workflow

### Branch Strategy

| Branch      | Purpose                    |
| ----------- | -------------------------- |
| `main`      | Production releases        |
| `develop`   | Development integration    |
| `feature/*` | New features               |
| `fix/*`     | Bug fixes                  |
| `release/*` | Release preparation        |
| `hotfix/*`  | Emergency production fixes |

### Branch Naming

```
feature/keyboard-overlay
feature/microphone-detection
fix/settings-not-saving
fix/memory-leak
release/v1.0.0
hotfix/crash-on-startup
```

### Commit Convention

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Commit Types

| Type       | Description                 |
| ---------- | --------------------------- |
| `feat`     | New feature                 |
| `fix`      | Bug fix                     |
| `docs`     | Documentation only          |
| `style`    | Code style (formatting)     |
| `refactor` | Code refactoring            |
| `perf`     | Performance improvement     |
| `test`     | Adding/updating tests       |
| `chore`    | Build, config, dependencies |

### Commit Examples

```
feat(overlay): add keyboard overlay component
fix(settings): save settings on change
docs(readme): update installation instructions
style(character): format animation code
refactor(hooks): extract keyboard logic to useKeyboard
perf(overlay): optimize render performance
test(button): add unit tests for Button component
chore(deps): update dependencies
```

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes with conventional commits
3. Run `npm run lint` and `npm run format`
4. Create PR to `develop`
5. Review & approve
6. Squash merge to `develop`
7. When ready for release, merge `develop` to `main`

---

## Testing Strategy

> **Note:** Testing implementation will be done in Phase 2. Phase 1 will use manual testing only.

### Phase 1: Manual Testing Only

| Approach         | Description                    |
| ---------------- | ------------------------------ |
| Manual Testing   | Test all features manually     |
| Console Logging  | Debug with console.log         |
| Error Boundaries | React error handling           |
| TypeScript       | Type safety (already included) |

**Why No Vitest in Phase 1:**

- Focus on core features first
- uiohook-napi (OS-level hooks) hard to test
- naudiodon (hardware) hard to test
- Electron IPC complex to test
- Faster time to MVP

### Phase 2: Add Vitest

| Test Type                | Target Components            |
| ------------------------ | ---------------------------- |
| Unit Tests (Vitest)      | Utilities, State, Animations |
| Component Tests (Vitest) | Character, Settings, Overlay |
| Integration Tests        | IPC, Settings persistence    |

**Vitest Setup Tasks (Phase 2):**

- [ ] Install Vitest
- [ ] Configure Vitest for Electron
- [ ] Write unit tests for utilities
- [ ] Write component tests
- [ ] Setup coverage reporting

---

_Last Updated: 2026-03-28_
