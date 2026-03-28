# KeyBuddy

A cross-platform desktop input overlay application with an animated character that reacts to your keyboard, mouse, and microphone — built for streamers and content creators.

![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-0.1.0-orange)

---

## Features

- **Animated Character** — Cute character that reacts to your inputs in real time
- **Keyboard Overlay** — Visual display of key presses with animations
- **Mouse Tracking** — Mouse movement and click detection
- **Microphone Reactive** — Character responds to your voice (Phase 2)
- **Always on Top** — Transparent overlay that stays visible while streaming
- **Cross-Platform** — Windows, macOS, and Linux support
- **Customizable** — Adjust position, size, opacity, and character

---

## Download

Download the latest release for your platform from the [Releases](../../releases) page:

| Platform | File                                                    |
| -------- | ------------------------------------------------------- |
| Windows  | `KeyBuddy-Setup-x.x.x.exe`                              |
| macOS    | `KeyBuddy-x.x.x.dmg`                                    |
| Linux    | `KeyBuddy-x.x.x.AppImage` or `keybuddy_x.x.x_amd64.deb` |

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- npm v10+
- Windows: [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022) (for native modules)
- macOS: Xcode Command Line Tools (`xcode-select --install`)
- Linux: `sudo apt-get install -y libgtk-3-dev libxss1 libnss3 libasound2-dev`

### Setup

```bash
git clone https://github.com/YOUR_USERNAME/key-buddy.git
cd key-buddy
npm install
```

### Scripts

| Command                        | Description                             |
| ------------------------------ | --------------------------------------- |
| `npm run dev`                  | Start Vite dev server                   |
| `npm run electron:dev`         | Run Electron in development mode        |
| `npm run build`                | Build frontend for production           |
| `npm run electron:build`       | Build Electron app for current platform |
| `npm run electron:build:win`   | Build installer for Windows             |
| `npm run electron:build:mac`   | Build DMG for macOS                     |
| `npm run electron:build:linux` | Build AppImage + deb for Linux          |
| `npm run lint`                 | Run ESLint                              |
| `npm run format`               | Format code with Prettier               |
| `npm run storybook`            | Start Storybook component explorer      |

### Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Desktop**: Electron
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS + DaisyUI (cupcake theme)
- **State**: Zustand
- **Input Detection**: uiohook-napi (keyboard & mouse)
- **Audio**: naudiodon (microphone)

---

## Architecture

```
Main Process (Node.js)     Renderer Process (React)
├── keyboard.ts       →    Character animations
├── mouse.ts          →    Keyboard overlay
├── microphone.ts     →    Settings panel
└── settings.ts       →    Zustand state
```

Communication between processes uses Electron IPC channels.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request to `develop`

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

---

## License

[MIT](LICENSE) — KeyBuddy Team
