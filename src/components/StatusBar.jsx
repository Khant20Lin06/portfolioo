import { useUI } from '../context/UIContext'

function Item({ children, className = '', onClick, title }) {
  return (
    <span
      className={`flex cursor-default items-center gap-1 px-2 ${onClick ? 'cursor-pointer hover:bg-[#2a3f55]' : ''} ${className}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </span>
  )
}

export default function StatusBar() {
  const { terminalOpen, setTerminalOpen, setPaletteOpen, activeLine } = useUI()

  return (
    <div className="no-select flex h-[24px] shrink-0 items-center justify-between bg-statusbar text-micro text-[#c9d1d9]">
      {/* Left */}
      <div className="flex items-stretch h-full">
        <Item className="text-accent-blue">⎇ main</Item>
        <Item className="text-accent-green">✓ 0 errors</Item>
        <Item className="text-accent-yellow">⚠ 0 warnings</Item>
        <Item className="text-[#8b98a5]">
          Ln {activeLine !== null ? activeLine + 1 : 58}, Col 1
        </Item>
        <Item
          className="text-muted"
          onClick={() => setTerminalOpen((v) => !v)}
          title="Toggle Terminal (Ctrl+`)"
        >
          <span className={terminalOpen ? 'text-accent-green' : 'text-muted'}>▶</span>
          <span>Terminal</span>
        </Item>
      </div>

      {/* Right */}
      <div className="flex items-stretch h-full">
        <Item className="text-[#8b98a5]">Spaces: 2</Item>
        <Item className="text-[#8b98a5]">UTF-8</Item>
        <Item className="text-[#8b98a5]">LF</Item>
        <Item className="text-[#8b98a5]">TypeScript</Item>
        <Item className="text-accent-green">● Prettier</Item>
        <Item
          className="text-accent-blue"
          onClick={() => setPaletteOpen(true)}
          title="Open Command Palette (Ctrl+K)"
        >
          ESLint
        </Item>
      </div>
    </div>
  )
}
