import { useState, useEffect, useRef } from 'react'
import { useUI } from '../context/UIContext'
import { contact, cv } from '../data'

const COMMANDS = [
  {
    id: 'hire',
    label: '> hire me',
    desc: `Send message to ${contact.email}`,
    icon: '✉',
    isToggle: 'hire',
  },
  {
    id: 'github',
    label: '> open github',
    desc: contact.github,
    icon: '⎔',
    action: () => window.open(`https://${contact.github}`, '_blank'),
  },
  {
    id: 'linkedin',
    label: '> open linkedin',
    desc: `linkedin.com/${contact.linkedin}`,
    icon: '⬡',
    action: () => window.open(`https://linkedin.com/${contact.linkedin}`, '_blank'),
  },
  {
    id: 'terminal',
    label: '> toggle terminal',
    desc: 'Open / close the integrated terminal panel',
    icon: '>_',
    isToggle: 'terminal',
  },
  {
    id: 'search',
    label: '> find in file',
    desc: 'Search within portfolio.ts  (Ctrl+F)',
    icon: '⌕',
    isToggle: 'search',
  },
  {
    id: 'cv-view',
    label: '> view CV',
    desc: 'Preview curriculum vitae PDF',
    icon: '📄',
    isToggle: 'cv',
  },
  {
    id: 'cv-download',
    label: '> download CV',
    desc: 'Download CV as PDF from Google Drive',
    icon: '↓',
    action: () => window.open(cv.download, '_blank'),
  },
  {
    id: 'copy',
    label: '> copy portfolio link',
    desc: 'Copy the URL of this page to clipboard',
    icon: '⎘',
    action: () => navigator.clipboard.writeText(window.location.href),
  },
  {
    id: 'collapse',
    label: '> collapse all sections',
    desc: 'Fold all collapsible code blocks',
    icon: '⊟',
    isCollapse: true,
  },
]

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, setTerminalOpen, setSearchOpen, toggleCollapse, setHireOpen, setCvOpen } = useUI()
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (paletteOpen) {
      setQuery('')
      setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [paletteOpen])

  if (!paletteOpen) return null

  const filtered = COMMANDS.filter(
    (c) =>
      !query ||
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.desc.toLowerCase().includes(query.toLowerCase())
  )

  const run = (cmd) => {
    if (cmd.action) cmd.action()
    if (cmd.isToggle === 'hire')     setHireOpen(true)
    if (cmd.isToggle === 'cv')       setCvOpen(true)
    if (cmd.isToggle === 'terminal') setTerminalOpen((v) => !v)
    if (cmd.isToggle === 'search')   setSearchOpen((v) => !v)
    if (cmd.isCollapse) {
      ;['me', 'frontend', 'backend', 'infra', 'projects'].forEach((id) => {
        toggleCollapse(id)
      })
    }
    setPaletteOpen(false)
  }

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && filtered[activeIdx]) run(filtered[activeIdx])
    if (e.key === 'Escape') setPaletteOpen(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
        onClick={() => setPaletteOpen(false)}
      />
      {/* Palette */}
      <div className="fixed left-1/2 top-[15%] z-50 w-[520px] -translate-x-1/2 rounded-[6px] border border-line bg-bg2 shadow-2xl">
        {/* Input */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="text-muted text-label">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0) }}
            onKeyDown={onKey}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-label text-syn-ident outline-none placeholder:text-muted"
          />
          <kbd className="rounded-[3px] border border-line px-1 py-[1px] text-micro text-muted">esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[300px] overflow-y-auto py-1">
          {filtered.length === 0 && (
            <div className="px-4 py-3 text-label text-muted">No commands found</div>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              className={[
                'flex w-full items-center gap-3 px-4 py-[7px] text-left transition-colors',
                i === activeIdx ? 'bg-[#1a2d42]' : 'hover:bg-[#0f1a28]',
              ].join(' ')}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => run(cmd)}
            >
              <span className="w-[18px] text-center text-label text-muted">{cmd.icon}</span>
              <span className="flex-1">
                <span className="block text-label text-accent-blue">{cmd.label}</span>
                <span className="block text-micro text-muted">{cmd.desc}</span>
              </span>
              {i === activeIdx && (
                <kbd className="rounded-[2px] border border-line px-1 text-micro text-muted">↵</kbd>
              )}
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 border-t border-line px-4 py-2 text-micro text-muted">
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span>esc close</span>
          <span className="ml-auto">Ctrl+K to open</span>
        </div>
      </div>
    </>
  )
}
