import { useUI } from '../context/UIContext'

const TABS = [
  { name: 'portfolio.ts', dot: '#58a6ff' },
  { name: 'README.md', dot: '#3fb950' },
  { name: '.env', dot: '#f0883e' },
]

function TrafficLight({ color }) {
  return (
    <span className="inline-block h-[12px] w-[12px] rounded-full" style={{ background: color }} />
  )
}

export default function WindowChrome() {
  const { activeTab, setActiveTab, setPaletteOpen } = useUI()

  return (
    <div className="no-select flex h-[38px] shrink-0 items-stretch border-b border-line bg-bg2">
      {/* Traffic lights */}
      <div className="flex items-center gap-2 px-4">
        <TrafficLight color="#ff5f57" />
        <TrafficLight color="#ffbd2e" />
        <TrafficLight color="#28ca40" />
      </div>

      {/* File tabs */}
      <div className="flex items-stretch">
        {TABS.map((t) => {
          const isActive = activeTab === t.name
          return (
            <button
              key={t.name}
              onClick={() => setActiveTab(t.name)}
              className={[
                'flex items-center gap-2 border-r border-line px-4 text-label transition-colors',
                isActive
                  ? 'bg-bg text-syn-ident'
                  : 'bg-bg2 text-muted hover:bg-bg/60 hover:text-syn-ident',
              ].join(' ')}
            >
              <span className="h-[7px] w-[7px] rounded-full" style={{ background: t.dot }} />
              <span>{t.name}</span>
              {isActive && <span className="ml-1 text-muted">×</span>}
            </button>
          )
        })}
      </div>

      {/* Command palette trigger (right side hint) */}
      <div className="ml-auto flex items-center pr-4">
        <button
          onClick={() => setPaletteOpen(true)}
          className="flex items-center gap-1.5 rounded-[4px] border border-line px-2 py-[2px] text-micro text-muted hover:border-accent-blue/50 hover:text-syn-ident"
          title="Open Command Palette (Ctrl+K)"
        >
          <span>⌘</span>
          <span>Ctrl+K</span>
        </button>
      </div>
    </div>
  )
}
