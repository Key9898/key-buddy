# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - Unreleased

### Added - 2026-03-28

#### Distribution & CI/CD Setup

- Created `electron-builder.yml` with full cross-platform build configuration
  - Windows: NSIS installer (x64, ia32) with desktop/start menu shortcuts
  - macOS: DMG (x64, arm64) with dark mode support
  - Linux: AppImage + deb (x64)
  - GitHub Releases publish provider for auto-update support
- Created `.github/workflows/build.yml` GitHub Actions CI/CD pipeline
  - Builds on push to `main`, pull requests, and version tags (`v*`)
  - Matrix strategy across Windows, macOS, Ubuntu runners
  - Publishes release artifacts to GitHub Releases on tag push
  - Uploads build artifacts with 7-day retention
- Created `README.md` with project overview, download links, dev setup, and architecture
- Created `LICENSE` (MIT, 2026 KeyBuddy Team)

---

## [Unreleased]

### Changed - 2026-03-28

#### Documentation Organization

- Moved documentation files to `docs/` folder
  - `PROJECT_PLAN.md` → `docs/PROJECT_PLAN.md`
  - `CHANGELOG.md` → `docs/CHANGELOG.md`
  - `SESSION_SUMMARY.md` → `docs/SESSION_SUMMARY.md`
- Updated all IDE config files with new `docs/` paths
  - `.trae/rules/project_rules.md`
  - `CLAUDE.md`
  - `.cursorrules`
  - `CODEX.md`
  - `.github/copilot-instructions.md`

### Added - 2026-03-28

#### Project Planning

- Created `PROJECT_PLAN.md` with comprehensive project documentation
  - Project Overview with target users and platforms
  - Complete Tech Stack documentation (Frontend, Dev Tools, Input Detection, Backend, Distribution)
  - Architecture diagram showing Electron app structure
  - Detailed File Structure with Modular Component Architecture
  - Phase Plan (MVP, Differentiation, Innovation)
  - Key Differentiators vs Bongo Cat
  - Security & Privacy considerations
  - Cost Breakdown (all free tiers)
  - Risks & Mitigation strategies
  - DaisyUI Theme Configuration (cupcake theme)
  - Development Approach strategy

- Added Development Scripts section
  - NPM scripts table with all commands
  - Package.json scripts configuration
  - Dev, build, lint, format, storybook, electron scripts

- Added IPC Channels section
  - Main → Renderer channels (keyboard, mouse, mic, settings)
  - Renderer → Main channels (settings, window, mic control)
  - TypeScript interfaces for all IPC payloads

- Added Code Conventions section
  - File naming conventions (PascalCase, camelCase)
  - Folder naming conventions
  - Component structure template
  - Import order guidelines
  - TypeScript conventions
  - CSS/Tailwind conventions

- Added Character Asset Specification section
  - Sprite format requirements (PNG, 256x256, 12 FPS)
  - Animation types (idle, typing, mouse, click, speaking)
  - File structure for character assets
  - Metadata JSON schema
  - Naming convention for sprite files

- Added Performance Targets section
  - Resource limits (Memory, CPU, GPU)
  - Optimization strategies
  - Performance monitoring code

- Added Keyboard Shortcuts section
  - Global shortcuts (system-wide)
  - App shortcuts (when focused)
  - Settings panel shortcuts

- Added Error Handling section
  - Error types and handling strategies
  - Error Boundary component
  - Logging utility

- Added Git Workflow section
  - Branch strategy (main, develop, feature, fix, release, hotfix)
  - Branch naming conventions
  - Commit convention (Conventional Commits)
  - Commit types and examples
  - Pull Request process

- Added Testing Strategy section
  - Vitest for unit testing (Phase 2)
  - Testing approach and priorities

#### Cross-Agent Consistency

- Created `.trae/rules/project_rules.md`
  - Project overview for AI agents
  - Tech stack summary
  - Code conventions quick reference
  - File structure overview
  - Development scripts reference
  - IPC channels reference
  - Performance targets
  - Git workflow summary
  - Character asset specs
  - Important rules for AI agents
  - Key files reference

---

## [0.0.0] - Project Initialization

### Status

- Project planning phase complete
- Ready for Phase 1 development

---

## Version History

| Version | Date       | Description               |
| ------- | ---------- | ------------------------- |
| 0.0.0   | 2026-03-28 | Project planning complete |

---

_Next milestone: Phase 1 MVP Development_
