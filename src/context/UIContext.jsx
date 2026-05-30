import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [activeLine, setActiveLine]       = useState(null)
  const [activeTab, setActiveTab]         = useState('portfolio.ts')
  const [collapsed, setCollapsed]         = useState({})
  const [terminalOpen, setTerminalOpen]   = useState(false)
  const [terminalHeight, setTerminalHeight] = useState(220)
  const [searchOpen, setSearchOpen]       = useState(false)
  const [searchQuery, setSearchQuery]     = useState('')
  const [paletteOpen, setPaletteOpen]     = useState(false)
  const [highlightWord, setHighlightWord] = useState(null)
  const [typingDone, setTypingDone]       = useState(false)
  const [scrollPct, setScrollPct]         = useState(0)
  const [shortcutHelp, setShortcutHelp]   = useState(false)
  const [hireOpen, setHireOpen]           = useState(false)
  const [cvOpen, setCvOpen]               = useState(false)
  const [sidebarWidth, setSidebarWidth]   = useState(220)
  const [recentFiles, setRecentFiles]     = useState([
    { name: 'portfolio.ts', ago: 'just now',  dot: '#58a6ff' },
    { name: 'README.md',    ago: '2m ago',    dot: '#3fb950' },
    { name: '.env',         ago: '5m ago',    dot: '#f0883e' },
  ])

  // Ref to the scrollable editor container — set from CodeEditor
  const editorScrollRef = useRef(null)

  const toggleCollapse = useCallback((id) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] })), [])

  // Track recent file when tab changes
  const switchTab = useCallback((name) => {
    setActiveTab(name)
    const dotMap = { 'portfolio.ts': '#58a6ff', 'README.md': '#3fb950', '.env': '#f0883e' }
    setRecentFiles((prev) => {
      const filtered = prev.filter((f) => f.name !== name)
      return [{ name, ago: 'just now', dot: dotMap[name] ?? '#c9d1d9' }, ...filtered].slice(0, 5)
    })
  }, [])

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') { e.preventDefault(); setSearchOpen((v) => !v) }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setPaletteOpen((v) => !v) }
      if ((e.ctrlKey || e.metaKey) && e.key === '`') { e.preventDefault(); setTerminalOpen((v) => !v) }
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
        setShortcutHelp((v) => !v)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setPaletteOpen(false)
        setShortcutHelp(false)
        setHighlightWord(null)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <UIContext.Provider value={{
      activeLine, setActiveLine,
      activeTab, setActiveTab: switchTab,
      collapsed, toggleCollapse,
      terminalOpen, setTerminalOpen,
      terminalHeight, setTerminalHeight,
      searchOpen, setSearchOpen,
      searchQuery, setSearchQuery,
      paletteOpen, setPaletteOpen,
      highlightWord, setHighlightWord,
      typingDone, setTypingDone,
      scrollPct, setScrollPct,
      shortcutHelp, setShortcutHelp,
      hireOpen, setHireOpen,
      cvOpen, setCvOpen,
      sidebarWidth, setSidebarWidth,
      recentFiles,
      editorScrollRef,
    }}>
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => useContext(UIContext)
