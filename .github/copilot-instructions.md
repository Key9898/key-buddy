# KeyBuddy - Project Rules

This document ensures consistency across all AI agents and IDEs working on this project.

---

## Project Overview

**KeyBuddy** is a cross-platform desktop input overlay application with an animated character that reacts to user inputs (keyboard, mouse, microphone). Built for streamers and content creators.

| Attribute        | Value                       |
| ---------------- | --------------------------- |
| **Name**         | KeyBuddy                    |
| **Type**         | Desktop Application         |
| **Platforms**    | Windows, macOS, Linux       |
| **Target Users** | Streamers, Content Creators |
| **License**      | Open Source (MIT)           |

---

## Tech Stack

### Frontend

| Component | Technology                             |
| --------- | -------------------------------------- |
| Framework | React + TypeScript                     |
| Desktop   | Electron                               |
| Animation | Framer Motion                          |
| Styling   | Tailwind CSS + DaisyUI (cupcake theme) |
| Icons     | Lucide React                           |
| State     | Zustand                                |
| Build     | Vite + Electron Builder                |

### Development Tools

| Component  | Technology |
| ---------- | ---------- |
| Linting    | ESLint     |
| Formatting | Prettier   |
| UI Dev     | Storybook  |

### Input Detection

| Component  | Technology   |
| ---------- | ------------ |
| Keyboard   | uiohook-napi |
| Mouse      | uiohook-napi |
| Microphone | naudiodon    |

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

### Folder Naming

| Type       | Convention | Example      |
| ---------- | ---------- | ------------ |
| Components | PascalCase | `Character/` |
| Features   | PascalCase | `Settings/`  |
| Utilities  | camelCase  | `utils/`     |
| Hooks      | camelCase  | `hooks/`     |
| Types      | camelCase  | `types/`     |

### Import Order

1. React & Framework
2. Third-party libraries
3. Internal components
4. Hooks
5. Utils
6. Types
7. Styles

### CSS/Tailwind Conventions

- Use DaisyUI classes first, then Tailwind utilities
- Use `clsx` for conditional classes

---

## File Structure

```
keybuddy/
├── electron/                  # Electron main process
│   ├── main.ts
│   ├── preload.ts
│   ├── input/
│   ├── audio/
│   └── utils/
│
├── src/                       # React frontend
│   ├── components/            # Modular Component Architecture
│   │   ├── Character/
│   │   ├── Overlay/
│   │   ├── Settings/
│   │   └── ui/
│   ├── hooks/
│   ├── utils/
│   ├── stores/
│   ├── demo/mocks/
│   ├── types/
│   └── styles/
│
├── characters/                # Character assets
├── .storybook/
└── config files
```

---

## Development Scripts

| Script                 | Command                         | Description            |
| ---------------------- | ------------------------------- | ---------------------- |
| `dev`                  | `vite`                          | Start dev server       |
| `build`                | `tsc && vite build`             | Build for production   |
| `lint`                 | `eslint . --ext .ts,.tsx`       | Run ESLint             |
| `lint:fix`             | `eslint . --ext .ts,.tsx --fix` | Fix ESLint errors      |
| `format`               | `prettier --write .`            | Format all files       |
| `format:check`         | `prettier --check .`            | Check formatting       |
| `storybook`            | `storybook dev -p 6006`         | Start Storybook        |
| `build-storybook`      | `storybook build`               | Build Storybook static |
| `electron:dev`         | Electron dev mode               | Run Electron in dev    |
| `electron:build`       | `electron-builder`              | Build Electron app     |
| `electron:build:win`   | `electron-builder --win`        | Build for Windows      |
| `electron:build:mac`   | `electron-builder --mac`        | Build for macOS        |
| `electron:build:linux` | `electron-builder --linux`      | Build for Linux        |

---

## IPC Channels

### Main → Renderer

| Channel           | Payload                    |
| ----------------- | -------------------------- |
| `keyboard:event`  | `{ key, type, timestamp }` |
| `mouse:event`     | `{ x, y, button, type }`   |
| `mic:level`       | `{ level, timestamp }`     |
| `settings:loaded` | `Settings`                 |

### Renderer → Main

| Channel               | Payload             |
| --------------------- | ------------------- |
| `settings:get`        | -                   |
| `settings:set`        | `Settings`          |
| `window:position`     | `{ x, y }`          |
| `window:size`         | `{ width, height }` |
| `window:opacity`      | `number` (0-1)      |
| `window:clickthrough` | `boolean`           |
| `mic:start`           | -                   |
| `mic:stop`            | -                   |
| `mic:device`          | `deviceId`          |

---

## Performance Targets

| Metric          | Target  | Maximum |
| --------------- | ------- | ------- |
| Memory (Idle)   | < 100MB | 150MB   |
| Memory (Active) | < 200MB | 300MB   |
| CPU (Idle)      | < 1%    | 3%      |
| CPU (Active)    | < 10%   | 15%     |
| Startup Time    | < 2s    | 3s      |
| Animation FPS   | 60 FPS  | 30 FPS  |

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

### Commit Convention

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

---

## Character Asset Specification

| Property      | Value                 |
| ------------- | --------------------- |
| Format        | PNG with transparency |
| Frame Size    | 256x256 pixels        |
| Frame Rate    | 12 FPS                |
| Color Mode    | RGBA                  |
| Max File Size | 500KB per animation   |

### Animations

| Animation  | Frames | Duration | Loop |
| ---------- | ------ | -------- | ---- |
| `idle`     | 12     | 1s       | Yes  |
| `typing`   | 8      | 0.67s    | Yes  |
| `mouse`    | 6      | 0.5s     | Yes  |
| `click`    | 4      | 0.33s    | No   |
| `speaking` | 12     | 1s       | Yes  |

---

## Important Rules for AI Agents

### Before Making Changes

1. Read `docs/PROJECT_PLAN.md` to understand current project state
2. Read `docs/SESSION_SUMMARY.md` to understand recent work
3. Read `docs/CHANGELOG.md` to understand recent changes

### After Making Changes

1. Update `docs/CHANGELOG.md` with changes made
2. Update `docs/SESSION_SUMMARY.md` with current session work
3. Run `npm run lint` and `npm run format` before committing
4. If project rules are modified, sync changes to all IDE config files:
   - `.trae/rules/project_rules.md`
   - `CLAUDE.md`
   - `.cursorrules`
   - `CODEX.md`
   - `.github/copilot-instructions.md`

### Code Quality

1. Always use TypeScript strict mode
2. Follow existing code patterns in the project
3. Use DaisyUI components when available
4. Add Storybook stories for new components
5. Keep components small and focused
6. **CRITICAL: Only modify what is necessary** - Never touch existing working logic, UI/UX, functions, or code unless explicitly asked. Focus only on the specific change requested.

### Architecture

1. Main process (Electron) handles: input detection, file I/O, system integration
2. Renderer process (React) handles: UI, animations, state management
3. Use IPC for communication between processes
4. Use Zustand for global state
5. Use custom hooks for reusable logic

---

## Key Files Reference

| File                      | Purpose                       |
| ------------------------- | ----------------------------- |
| `docs/PROJECT_PLAN.md`    | Complete project plan & specs |
| `docs/SESSION_SUMMARY.md` | Current session work summary  |
| `docs/CHANGELOG.md`       | History of changes            |

## AI Agent Configuration Files

| File                              | IDE/Agent                 |
| --------------------------------- | ------------------------- |
| `.trae/rules/project_rules.md`    | Trae IDE                  |
| `CLAUDE.md`                       | Claude Code               |
| `.cursorrules`                    | Cursor IDE                |
| `CODEX.md`                        | Codex                     |
| `.github/copilot-instructions.md` | GitHub Copilot / VSCode   |
| `.vscode/settings.json`           | VSCode workspace settings |

---

_Last Updated: 2026-03-28_
