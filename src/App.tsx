import { DesktopApp } from './components/Desktop/DesktopApp'
import { LandingPage } from './components/Landing/LandingPage'
import type { ElectronAPI } from './types'

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}

function App() {
  const isElectron = typeof window !== 'undefined' && window.electronAPI !== undefined

  return isElectron ? <DesktopApp /> : <LandingPage />
}

export default App
