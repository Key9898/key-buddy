# KeyBuddy - Project Plan

## Project Overview

**KeyBuddy** is a cross-platform desktop input overlay application with an animated character that reacts to user inputs. Designed for streamers and content creators. Combines the best of **BongoCat** (keyboard/mouse visualizer) and **Desktop Mate** (cute character companion).

| Attribute        | Value                                   |
| ---------------- | --------------------------------------- |
| **Name**         | KeyBuddy                                |
| **Type**         | Desktop Application + Marketing Website |
| **Platforms**    | Windows, macOS, Linux                   |
| **Target Users** | Streamers, Content Creators             |
| **License**      | Open Source (MIT)                       |
| **Cost**         | $0 (All Free Tiers)                     |

### Core Concept

- **BongoCat Style**: Keyboard/mouse input visualization
- **Desktop Mate Style**: Cute character that follows your inputs
- **Compact & Draggable**: Small overlay window (350x350 default)
- **Marketing Website**: Landing page with interactive preview

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

### Single Codebase, Dual Environment

KeyBuddy uses **environment detection** to serve different experiences from a single codebase:

```tsx
function App() {
  const isElectron = window.electronAPI !== undefined

  if (isElectron) {
    return <DesktopApp /> // Compact Overlay
  }
  return <LandingPage /> // Marketing Website
}
```

| Environment | Experience      | Purpose               |
| ----------- | --------------- | --------------------- |
| Electron    | Desktop Overlay | Main application      |
| Browser     | Landing Page    | Marketing & downloads |

### Desktop App Architecture

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
│  │  │  │ uiohook-napi  │  │  │  │ Draggable Handle  │  │ │ │
│  │  │  │ (mouse)       │──┼──┼─→│ (Compact UI)      │  │ │ │
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
```

### Marketing Website Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      WEB BROWSER                             │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  React App (Vercel)                    │ │
│  │                                                        │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │              Landing Page                        │  │ │
│  │  │                                                  │  │ │
│  │  │  ┌─────────────┐  ┌─────────────────────────┐   │  │ │
│  │  │  │ Hero        │  │ Interactive Preview     │   │  │ │
│  │  │  │ Section     │  │ (Mini Character Card)   │   │  │ │
│  │  │  └─────────────┘  └─────────────────────────┘   │  │ │
│  │  │                                                  │  │ │
│  │  │  ┌─────────────┐  ┌─────────────────────────┐   │  │ │
│  │  │  │ Features    │  │ Download Center         │   │  │ │
│  │  │  │ Section     │  │ (Win/Mac/Linux)         │   │  │ │
│  │  │  └─────────────┘  └─────────────────────────┘   │  │ │
│  │  │                                                  │  │ │
│  │  │  ┌─────────────────────────────────────────┐    │  │ │
│  │  │  │ Onboarding Guide                        │    │  │ │
│  │  │  │ (How to use)                            │    │  │ │
│  │  │  └─────────────────────────────────────────┘    │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  │                                                        │ │
│  │  Shared Components:                                    │ │
│  │  └── Character (same as Desktop)                       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Internet
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
│   │   ├── Character/             # Main animated character (SHARED)
│   │   │   ├── Character.tsx      # UI component
│   │   │   ├── Character.stories.tsx
│   │   │   ├── animations.ts      # Framer Motion variants
│   │   │   └── index.ts
│   │   │
│   │   ├── Overlay/               # Desktop: Compact overlay
│   │   │   ├── Overlay.tsx
│   │   │   ├── DraggableHandle.tsx
│   │   │   ├── Overlay.stories.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Settings/              # Desktop: Settings panel
│   │   │   ├── Settings.tsx
│   │   │   ├── SettingsPanel.tsx
│   │   │   ├── Settings.stories.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Landing/               # Web: Marketing page (NEW)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── InteractivePreview.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── DownloadCenter.tsx
│   │   │   ├── OnboardingGuide.tsx
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
│   │   ├── useIPC.ts              # Electron IPC
│   │   └── useEnvironment.ts      # Environment detection (NEW)
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
│   ├── App.tsx                    # Environment detection
│   ├── DesktopApp.tsx             # Desktop overlay app (NEW)
│   ├── LandingPage.tsx            # Marketing website (NEW)
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

**Goal:** Working product with basic features + Marketing Website

#### Desktop App Features

- [ ] **Compact Overlay Window**
  - [ ] Default size: 350x350 pixels
  - [ ] Always on top
  - [ ] Transparent background
  - [ ] Click-through enabled
  - [ ] Draggable handle for repositioning
  - [ ] Multi-monitor support

- [ ] **Keyboard Detection & Display**
  - [ ] Global keyboard hooks
  - [ ] Key press animations
  - [ ] Modifier key handling (Shift, Ctrl, Alt)

- [ ] **Mouse Detection & Display**
  - [ ] Global mouse hooks
  - [ ] Click animations (left, right, middle)
  - [ ] Scroll wheel detection

- [ ] **Character System**
  - [ ] Default cute character (sprite-based)
  - [ ] Idle animation
  - [ ] Typing animation
  - [ ] Mouse movement animation
  - [ ] Click reaction animation

- [ ] **Settings Panel (Compact)**
  - [ ] Position adjustment
  - [ ] Size adjustment
  - [ ] Opacity control
  - [ ] Character selection (default only)
  - [ ] Startup on boot option

#### Marketing Website Features

- [ ] **Hero Section**
  - [ ] Catchy headline & tagline
  - [ ] Call-to-action buttons
  - [ ] Animated background

- [ ] **Interactive Preview**
  - [ ] Mini character card
  - [ ] Demo keyboard/mouse input
  - [ ] Shows character reactions

- [ ] **Features Section**
  - [ ] Key features grid
  - [ ] Animated icons
  - [ ] Responsive layout

- [ ] **Download Center**
  - [ ] Windows download button
  - [ ] macOS download button
  - [ ] Linux download button
  - [ ] Version info display

- [ ] **Onboarding Guide**
  - [ ] Step-by-step instructions
  - [ ] Screenshots/GIFs
  - [ ] Tips for streamers

#### Technical Tasks

- [ ] **Environment Detection**
  - [ ] Create useEnvironment hook
  - [ ] Update App.tsx for dual environment
  - [ ] Create DesktopApp.tsx
  - [ ] Create LandingPage.tsx

- [ ] **Desktop App**
  - [ ] Update electron/main.ts for compact window
  - [ ] Implement draggable handle
  - [ ] Create compact settings panel
  - [ ] Test on Windows
  - [ ] Test on macOS
  - [ ] Test on Linux

- [ ] **Marketing Website**
  - [ ] Create Landing components
  - [ ] Setup Vercel deployment
  - [ ] Configure routing (if needed)
  - [ ] Optimize for SEO

- [ ] **Shared**
  - [ ] Ensure Character works in both environments
  - [ ] Setup demo mode for web preview
  - [ ] Configure build for both targets

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

| Feature     | Bongo Cat    | Desktop Mate | KeyBuddy                     |
| ----------- | ------------ | ------------ | ---------------------------- |
| Platform    | Windows only | Windows only | Windows, Mac, Linux          |
| Microphone  | ❌           | ❌           | ✅ Audio reactive            |
| Characters  | Cat only     | Limited      | Multiple + custom upload     |
| Open Source | ❌           | ❌           | ✅                           |
| Settings    | Basic        | Basic        | Advanced                     |
| Auto-update | ❌           | ❌           | ✅                           |
| Community   | ❌           | ❌           | ✅ (Phase 3)                 |
| Marketing   | ❌           | ❌           | ✅ Landing page + onboarding |
| Compact UI  | ❌           | ❌           | ✅ 350x350 draggable overlay |

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
| Phase 1: MVP             | In Progress | 2026-03-01 | -        |
| Phase 2: Differentiation | Not Started | -          | -        |
| Phase 3: Innovation      | Not Started | -          | -        |

### Phase 1 Progress

| Task                  | Status       |
| --------------------- | ------------ |
| Project Setup         | ✅ Completed |
| Electron Main Process | ✅ Completed |
| Input Detection       | ✅ Completed |
| Audio Detection       | ✅ Completed |
| Window Management     | ✅ Completed |
| Settings Persistence  | ✅ Completed |
| Character Component   | ✅ Completed |
| Settings Panel        | ✅ Completed |
| Environment Detection | 🔄 Pending   |
| Desktop App Refactor  | 🔄 Pending   |
| Landing Page          | 🔄 Pending   |
| Vercel Deployment     | 🔄 Pending   |

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

## Character Marketplace

### Overview

Character Marketplace သည် users တွေကို ကွဲပြားတဲ့ character designs တွေကို ရွေးချယ်ခွင့်ပေးတဲ့ system တစ်ခုဖြစ်ပါတယ်။ Landing Page မှာ Character Hub (Gallery) နဲ့ Desktop App မှာ Visual Character Picker တို့ကို ပေါင်းစပ်ထားပါတယ်။

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CHARACTER MARKETPLACE                         │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                  Character Registry                          ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           ││
│  │  │BongoCat │ │ShibaMate│ │NeonMate │ │  ...    │           ││
│  │  │ (free)  │ │ (free)  │ │(premium)│ │         │           ││
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘           ││
│  │       └───────────┴───────────┴───────────┘                 ││
│  │                           │                                  ││
│  │                    ┌──────▼──────┐                          ││
│  │                    │   Registry  │                          ││
│  │                    │    Index    │                          ││
│  │                    └──────┬──────┘                          ││
│  └───────────────────────────┼─────────────────────────────────┘│
│                              │                                   │
│  ┌───────────────────────────┼─────────────────────────────────┐│
│  │                     UI Layer                                 ││
│  │  ┌───────────────┐  ┌──────▼──────┐  ┌───────────────────┐  ││
│  │  │ Landing Page  │  │  Settings   │  │   Desktop App     │  ││
│  │  │ Character Hub │  │   Panel     │  │   Character       │  ││
│  │  │ (Gallery)     │  │ (Picker)    │  │   Renderer        │  ││
│  │  └───────────────┘  └─────────────┘  └───────────────────┘  ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   State Management                           ││
│  │  ┌─────────────────────────────────────────────────────┐    ││
│  │  │  Zustand Store: selectedCharacterId, unlockedChars  │    ││
│  │  └─────────────────────────────────────────────────────┘    ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### File Structure

```
src/
├── characters/                          # Character System
│   ├── base/
│   │   ├── CharacterBase.tsx            # Base component interface
│   │   ├── CharacterProps.ts            # Shared props type
│   │   └── index.ts
│   │
│   ├── BongoCat/                        # Character 1: Classic Cat
│   │   ├── BongoCat.tsx                 # Component
│   │   ├── BongoCat.stories.tsx         # Storybook
│   │   ├── animations.ts                # Framer Motion variants
│   │   ├── assets/
│   │   │   ├── thumbnail.png            # Gallery thumbnail
│   │   │   ├── idle/                    # Idle frames
│   │   │   ├── typing/                  # Typing frames
│   │   │   ├── mouse/                   # Mouse frames
│   │   │   └── click/                   # Click frames
│   │   └── index.ts
│   │
│   ├── ShibaMate/                       # Character 2: Shiba Dog
│   │   ├── ShibaMate.tsx
│   │   ├── ShibaMate.stories.tsx
│   │   ├── animations.ts
│   │   ├── assets/
│   │   └── index.ts
│   │
│   ├── NeonMate/                        # Character 3: Lightning Storm
│   │   ├── NeonMate.tsx
│   │   ├── NeonMate.stories.tsx
│   │   ├── animations.ts
│   │   ├── assets/
│   │   └── index.ts
│   │
│   ├── registry/
│   │   ├── characterRegistry.ts         # All characters metadata
│   │   ├── characterLoader.ts           # Lazy loading utility
│   │   └── index.ts
│   │
│   └── index.ts
│
├── components/
│   ├── Character/                       # Character Renderer
│   │   ├── CharacterRenderer.tsx        # Dynamic character loader
│   │   ├── CharacterPicker.tsx          # Settings: Visual picker
│   │   ├── CharacterCard.tsx            # Gallery card component
│   │   └── index.ts
│   │
│   ├── Landing/
│   │   ├── CharacterHub.tsx             # Gallery section
│   │   └── ...
│   │
│   └── Settings/
│       ├── SettingsPanel.tsx            # Updated with CharacterPicker
│       └── ...
│
├── hooks/
│   ├── useCharacter.ts                  # Character state hook
│   ├── useCharacterRegistry.ts          # Registry access hook
│   └── ...
│
├── stores/
│   ├── useCharacterStore.ts             # Character state
│   └── useStore.ts
│
└── types/
    ├── character.ts                     # Character types
    └── index.ts
```

### Type Definitions

```typescript
// src/types/character.ts

export type CharacterTier = 'free' | 'premium'
export type CharacterCategory = 'animal' | 'fantasy' | 'minimal' | 'seasonal'
export type AnimationType = 'idle' | 'typing' | 'mouse' | 'click' | 'speaking'

export interface AnimationConfig {
  idle: { frames: number; fps: number; loop: boolean }
  typing: { frames: number; fps: number; loop: boolean }
  mouse: { frames: number; fps: number; loop: boolean }
  click: { frames: number; fps: number; loop: boolean }
  speaking: { frames: number; fps: number; loop: boolean }
}

export interface CharacterMeta {
  id: string
  name: string
  displayName: string
  description: string
  thumbnail: string
  tier: CharacterTier
  category: CharacterCategory
  tags: string[]
  animations: AnimationConfig
  component: React.LazyExoticComponent<React.ComponentType<CharacterProps>>
}

export interface CharacterProps {
  state: AnimationType
  inputPosition?: { x: number; y: number }
  size: number
  className?: string
}

export interface CharacterState {
  selectedCharacterId: string
  unlockedCharacters: string[]
  setSelectedCharacter: (id: string) => void
  unlockCharacter: (id: string) => void
  isCharacterUnlocked: (id: string) => boolean
}
```

### Character Registry Example

```typescript
// src/characters/registry/characterRegistry.ts

import { lazy } from 'react'
import type { CharacterMeta } from '@/types/character'

export const characterRegistry: CharacterMeta[] = [
  {
    id: 'bongo-cat',
    name: 'BongoCat',
    displayName: 'Bongo Cat',
    description: 'Classic keyboard companion. Paws that dance with your keystrokes.',
    thumbnail: '/characters/bongo-cat/thumbnail.png',
    tier: 'free',
    category: 'animal',
    tags: ['classic', 'cat', 'cute'],
    animations: {
      idle: { frames: 12, fps: 12, loop: true },
      typing: { frames: 8, fps: 12, loop: true },
      mouse: { frames: 6, fps: 12, loop: true },
      click: { frames: 4, fps: 12, loop: false },
      speaking: { frames: 12, fps: 12, loop: true },
    },
    component: lazy(() => import('../BongoCat/BongoCat')),
  },
  // ... more characters
]

export const getCharacterById = (id: string): CharacterMeta | undefined => {
  return characterRegistry.find((char) => char.id === id)
}

export const getCharactersByTier = (tier: CharacterTier): CharacterMeta[] => {
  return characterRegistry.filter((char) => char.tier === tier)
}

export const getCharactersByCategory = (category: CharacterCategory): CharacterMeta[] => {
  return characterRegistry.filter((char) => char.category === category)
}
```

### Component Specifications

| Component           | Purpose                                    | Location                    |
| ------------------- | ------------------------------------------ | --------------------------- |
| `CharacterRenderer` | Dynamic character loader with lazy loading | `src/components/Character/` |
| `CharacterPicker`   | Visual character selection in Settings     | `src/components/Character/` |
| `CharacterCard`     | Gallery card for Character Hub             | `src/components/Character/` |
| `CharacterHub`      | Landing page gallery section               | `src/components/Landing/`   |

### UI/UX Flow

#### Landing Page - Character Hub

```
┌─────────────────────────────────────────────────────────────────┐
│                  🐾 Discover Your Buddy                          │
│              Find the perfect companion for your stream          │
├─────────────────────────────────────────────────────────────────┤
│  [All] [Animals] [Fantasy] [Minimal] [Seasonal]     ← Filters   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   🐱        │  │   🐕        │  │   ⚡        │             │
│  │  Bongo Cat  │  │ Shiba Mate  │  │ Neon Storm  │             │
│  │   FREE      │  │   FREE      │  │  PREMIUM    │             │
│  │  [Preview]  │  │  [Preview]  │  │  [Preview]  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│              [ Download KeyBuddy to Get Started ]                │
└─────────────────────────────────────────────────────────────────┘
```

#### Settings Panel - Character Picker

```
┌─────────────────────────────────────────┐
│  ⚙️ Settings                             │
├─────────────────────────────────────────┤
│  🎭 Character                            │
│  ┌───────┐ ┌───────┐ ┌───────┐         │
│  │ 🐱    │ │ 🐕    │ │ ⚡    │         │
│  │ Bongo │ │ Shiba │ │ Neon │         │
│  │  ✓    │ │       │ │ 🔒   │         │
│  └───────┘ └───────┘ └───────┘         │
│                                         │
│  Selected: Bongo Cat                    │
│  "Classic keyboard companion"           │
└─────────────────────────────────────────┘
```

### Implementation Phases

#### Phase 1: Foundation

| Task | Description                                           | Priority |
| ---- | ----------------------------------------------------- | -------- |
| 1.1  | Create `src/types/character.ts` with all interfaces   | High     |
| 1.2  | Create `src/characters/base/CharacterBase.tsx`        | High     |
| 1.3  | Create `src/characters/registry/characterRegistry.ts` | High     |
| 1.4  | Create `src/stores/useCharacterStore.ts`              | High     |
| 1.5  | Migrate existing Character to `BongoCat` character    | High     |

#### Phase 2: Core Components

| Task | Description                                       | Priority |
| ---- | ------------------------------------------------- | -------- |
| 2.1  | Create `CharacterRenderer.tsx` with lazy loading  | High     |
| 2.2  | Create `CharacterPicker.tsx` for Settings         | High     |
| 2.3  | Create `CharacterCard.tsx` for Gallery            | Medium   |
| 2.4  | Update `SettingsPanel.tsx` to use CharacterPicker | High     |
| 2.5  | Add Storybook stories for new components          | Medium   |

#### Phase 3: Second Character

| Task | Description                                   | Priority |
| ---- | --------------------------------------------- | -------- |
| 3.1  | Design ShibaMate character assets             | High     |
| 3.2  | Create `ShibaMate.tsx` with unique animations | High     |
| 3.3  | Add ShibaMate to registry                     | High     |
| 3.4  | Test character switching                      | High     |

#### Phase 4: Landing Page Hub

| Task | Description                         | Priority |
| ---- | ----------------------------------- | -------- |
| 4.1  | Create `CharacterHub.tsx` component | High     |
| 4.2  | Add to LandingPage.tsx              | High     |
| 4.3  | Create preview modal                | Medium   |
| 4.4  | Add category filtering              | Medium   |
| 4.5  | Responsive design                   | High     |

#### Phase 5: Premium Character

| Task | Description                                  | Priority |
| ---- | -------------------------------------------- | -------- |
| 5.1  | Design NeonMate character assets             | High     |
| 5.2  | Create `NeonMate.tsx` with unique animations | High     |
| 5.3  | Implement premium tier logic                 | Medium   |
| 5.4  | Add locked state UI                          | Medium   |

### Technical Details

#### Lazy Loading Strategy

```typescript
// characterLoader.ts
import { lazy, Suspense } from 'react'

export const loadCharacter = (id: string) => {
  const character = getCharacterById(id)
  if (!character) return null

  return lazy(() => import(`../${character.name}/${character.name}.tsx`))
}
```

#### Bundle Optimization

```typescript
// Vite config for code splitting
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'character-bongo': ['src/characters/BongoCat'],
          'character-shiba': ['src/characters/ShibaMate'],
          'character-neon': ['src/characters/NeonMate'],
        },
      },
    },
  },
})
```

### Character Tiers

| Tier    | Access          | Characters                    |
| ------- | --------------- | ----------------------------- |
| Free    | Default         | BongoCat, ShibaMate           |
| Premium | Unlock required | NeonMate, Seasonal characters |

### Summary

| Aspect              | Decision                                                        |
| ------------------- | --------------------------------------------------------------- |
| **Architecture**    | Registry pattern with lazy loading                              |
| **State**           | Zustand with persist middleware                                 |
| **Components**      | CharacterRenderer, CharacterPicker, CharacterCard, CharacterHub |
| **Characters**      | BongoCat (free), ShibaMate (free), NeonMate (premium)           |
| **UI Location**     | Settings Panel (Picker) + Landing Page (Hub)                    |
| **Bundle Strategy** | Code splitting per character                                    |
| **Storage**         | LocalStorage for unlocked characters                            |

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

_Last Updated: 2026-03-29_

---

## UI/UX Design Guidelines

### Core Design Principles

| Principle        | Description                                 |
| ---------------- | ------------------------------------------- |
| **Clean**        | Minimal clutter, clear visual hierarchy     |
| **Cute**         | Playful, friendly, approachable aesthetics  |
| **Professional** | Polished, consistent, production-ready look |

### Desktop App Design

| Aspect         | Specification                    |
| -------------- | -------------------------------- |
| Default Size   | 350x350 pixels                   |
| Window Type    | Transparent, Always-on-top       |
| Interaction    | Draggable handle for positioning |
| Settings Panel | Compact, collapsible             |
| Theme          | DaisyUI Cupcake                  |

### Marketing Website Design

| Section          | Purpose                      |
| ---------------- | ---------------------------- |
| Hero Section     | Catch attention, main CTA    |
| Interactive Demo | Show character in action     |
| Features Grid    | Highlight key capabilities   |
| Download Center  | Easy access to all platforms |
| Onboarding Guide | Help new users get started   |

### Responsive Design

| Breakpoint | Target         |
| ---------- | -------------- |
| sm         | Mobile devices |
| md         | Tablets        |
| lg         | Small laptops  |
| xl         | Desktops       |
| 2xl        | Large screens  |

### Accessibility

- WCAG AA color contrast minimum
- Keyboard navigation support
- Visible focus indicators
- Screen reader friendly labels
