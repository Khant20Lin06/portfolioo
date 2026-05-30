import { useUI } from '../context/UIContext'

const SECTIONS = [
  {
    title: 'Navigation',
    keys: [
      { keys: ['Ctrl', 'K'],   desc: 'Command Palette' },
      { keys: ['Ctrl', 'F'],   desc: 'Find in file' },
      { keys: ['Ctrl', '`'],   desc: 'Toggle Terminal' },
      { keys: ['Ctrl', 'B'],   desc: 'Toggle Git Blame' },
      { keys: ['?'],           desc: 'Show this help' },
      { keys: ['Esc'],         desc: 'Close overlays' },
    ],
  },
  {
    title: 'Editor',
    keys: [
      { keys: ['Click line'],    desc: 'Select / highlight line' },
      { keys: ['Click ident'],   desc: 'Highlight all occurrences' },
      { keys: ['Click − / +'],   desc: 'Fold / unfold code block' },
      { keys: ['Hover chip'],    desc: 'Skill proficiency tooltip' },
      { keys: ['Hover line'],    desc: 'Diagnostic tooltip (squiggle)' },
    ],
  },
  {
    title: 'Panels',
    keys: [
      { keys: ['Drag sidebar'],  desc: 'Resize file explorer' },
      { keys: ['Drag terminal'], desc: 'Resize terminal panel' },
      { keys: ['Click minimap'], desc: 'Jump to scroll position' },
      { keys: ['Tab click'],     desc: 'Switch file (portfolio / README / .env)' },
    ],
  },
  {
    title: 'Quick Actions',
    keys: [
      { keys: ['hire me'],       desc: 'Opens email client' },
      { keys: ['copy link'],     desc: 'Copies portfolio URL' },
      { keys: ['>  hire'],       desc: 'Command: send email' },
      { keys: ['>  github'],     desc: 'Command: open GitHub' },
    ],
  },
]

function Kbd({ children }) {
  return (
    <kbd className="inline-flex items-center rounded-[3px] border border-line bg-bg3 px-[5px] py-[1px] text-micro text-syn-ident">
      {children}
    </kbd>
  )
}

export default function ShortcutHelp() {
  const { shortcutHelp, setShortcutHelp } = useUI()
  if (!shortcutHelp) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]" onClick={() => setShortcutHelp(false)} />
      <div className="fixed left-1/2 top-1/2 z-50 w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-[6px] border border-line bg-bg2 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-label font-medium text-white">Keyboard Shortcuts</span>
            <span className="rounded-[3px] border border-line px-1.5 py-[1px] text-micro text-muted">portfolio.ts</span>
          </div>
          <button onClick={() => setShortcutHelp(false)} className="text-muted hover:text-syn-ident text-label">✕</button>
        </div>

        {/* Grid of sections */}
        <div className="grid grid-cols-2 gap-0 p-1">
          {SECTIONS.map((sec) => (
            <div key={sec.title} className="p-4">
              <div className="mb-2 text-micro font-semibold uppercase tracking-wider text-muted">
                {sec.title}
              </div>
              <div className="space-y-[6px]">
                {sec.keys.map(({ keys, desc }) => (
                  <div key={desc} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1">
                      {keys.map((k, i) => (
                        <span key={i} className="flex items-center gap-1">
                          {i > 0 && <span className="text-micro text-muted">+</span>}
                          <Kbd>{k}</Kbd>
                        </span>
                      ))}
                    </span>
                    <span className="text-label text-muted">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-line px-5 py-2 text-micro text-muted">
          Press <Kbd>?</Kbd> or <Kbd>Esc</Kbd> to close · VS Code-style portfolio
        </div>
      </div>
    </>
  )
}
