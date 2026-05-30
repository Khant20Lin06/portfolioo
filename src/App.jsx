import { useEffect, useState, useCallback } from 'react'
import { useUI, UIProvider } from './context/UIContext'
import WindowChrome from './components/WindowChrome'
import FileTree from './components/FileTree'
import EditorTopBar from './components/EditorTopBar'
import CodeEditor from './components/CodeEditor'
import Minimap from './components/Minimap'
import StatusBar from './components/StatusBar'
import Terminal from './components/Terminal'
import TabContent from './components/TabContent'
import SearchPanel from './components/SearchPanel'
import CommandPalette from './components/CommandPalette'
import MobileFallback from './components/MobileFallback'
import ShortcutHelp from './components/ShortcutHelp'
import { VerticalHandle, HorizontalHandle } from './components/ResizeHandle'
import HireModal from './components/HireModal'
import CvModal from './components/CvModal'

function IDE() {
  const { activeTab, sidebarWidth, setSidebarWidth, terminalOpen, terminalHeight, setTerminalHeight, hireOpen, setHireOpen } = useUI()
  const isPortfolio = activeTab === 'portfolio.ts'

  const onSidebarDelta = useCallback((dx) => {
    setSidebarWidth((w) => Math.max(140, Math.min(360, w + dx)))
  }, [setSidebarWidth])

  const onTerminalDelta = useCallback((dy) => {
    setTerminalHeight((h) => Math.max(100, Math.min(480, h - dy)))
  }, [setTerminalHeight])

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-bg font-mono text-syn-ident">
      <WindowChrome />

      <div className="flex min-h-0 flex-1">
        {/* Sidebar with drag handle */}
        <div className="flex shrink-0" style={{ width: sidebarWidth }}>
          <FileTree width={sidebarWidth} />
        </div>
        <VerticalHandle onDelta={onSidebarDelta} />

        <main className="relative flex min-w-0 flex-1 flex-col">
          <EditorTopBar />

          <div className="relative flex min-h-0 flex-1 flex-col">
            <SearchPanel />
            {isPortfolio ? <CodeEditor /> : <TabContent tab={activeTab} />}
          </div>

          {/* Terminal with resize handle on top */}
          {terminalOpen && (
            <>
              <HorizontalHandle onDelta={onTerminalDelta} />
              <Terminal height={terminalHeight} />
            </>
          )}
        </main>

        <Minimap />
      </div>

      <StatusBar />
      <CommandPalette />
      <ShortcutHelp />
      <HireModal open={hireOpen} onClose={() => setHireOpen(false)} />
      <CvModal />
    </div>
  )
}

export default function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <UIProvider>
      {isMobile ? <MobileFallback /> : <IDE />}
    </UIProvider>
  )
}
