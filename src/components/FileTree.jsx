import { useState } from 'react'
import { useUI } from '../context/UIContext'

function RecentFiles() {
  const { recentFiles, setActiveTab } = useUI()
  return (
    <div className="border-t border-line pt-1 pb-2">
      <div className="px-3 py-1 text-micro uppercase tracking-wider text-muted">Recent</div>
      {recentFiles.map((f) => (
        <div
          key={f.name}
          className="flex cursor-pointer items-center gap-2 py-[3px] pl-5 pr-2 text-label text-muted hover:bg-[#0f1722] hover:text-syn-ident"
          onClick={() => setActiveTab(f.name)}
        >
          <span className="h-[6px] w-[6px] shrink-0 rounded-full opacity-70" style={{ background: f.dot }} />
          <span className="flex-1 truncate">{f.name}</span>
          <span className="text-micro text-[#2d4459]">{f.ago}</span>
        </div>
      ))}
    </div>
  )
}

const C = {
  ts: '#58a6ff', py: '#f0883e', yaml: '#39bae6',
  go: '#00add8', json: '#e3b341', md: '#3fb950', env: '#f0883e',
}

// Root-level files (not inside any folder)
const rootFiles = [
  { name: 'README.md',     dot: C.md,  tab: 'README.md' },
  { name: '.env',          dot: C.env, tab: '.env' },
  { name: 'package.json',  dot: C.json },
  { name: 'tsconfig.json', dot: C.json },
]

const tree = [
  {
    folder: 'src', open: true,
    children: [
      { name: 'portfolio.ts', dot: C.ts, tab: 'portfolio.ts' },
      { name: 'index.ts', dot: C.ts },
      { name: 'theme.ts', dot: C.ts },
    ],
  },
  {
    folder: 'api', open: true,
    children: [
      { name: 'handlers.go', dot: C.go },
      { name: 'routes.go', dot: C.go },
      { name: 'schema.json', dot: C.json },
    ],
  },
  {
    folder: 'infra', open: true,
    children: [
      { name: 'deploy.yaml', dot: C.yaml },
      { name: 'k8s.yaml', dot: C.yaml },
      { name: 'pipeline.py', dot: C.py },
    ],
  },
  {
    folder: 'config', open: false,
    children: [
      { name: 'tsconfig.json', dot: C.json },
      { name: '.eslintrc.json', dot: C.json },
    ],
  },
  {
    folder: 'tests', open: false,
    children: [{ name: 'e2e.ts', dot: C.ts }],
  },
  {
    folder: 'docs', open: false,
    children: [
      { name: 'ARCHITECTURE.md', dot: C.md },
      { name: 'API.md',          dot: C.md },
    ],
  },
]

const FILE_MENU = ['Open to Side', 'Copy Path', 'Copy Relative Path', '─', 'Rename', 'Delete']

function ContextMenu({ x, y, onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 min-w-[160px] rounded-[4px] border border-line bg-bg2 py-1 shadow-xl"
        style={{ left: x, top: y }}
      >
        {FILE_MENU.map((item, i) =>
          item === '─' ? (
            <div key={i} className="my-1 border-t border-line" />
          ) : (
            <button
              key={item}
              className="w-full px-3 py-[3px] text-left text-label text-syn-ident hover:bg-[#1a2d42]"
              onClick={onClose}
            >
              {item}
            </button>
          )
        )}
      </div>
    </>
  )
}

function FileRow({ name, dot, tab, root = false }) {
  const { activeTab, setActiveTab } = useUI()
  const [menu, setMenu] = useState(null)
  const [hovered, setHovered] = useState(false)
  const active = activeTab === tab && tab != null

  const openMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setMenu({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <div
        className={[
          // root files use pl-4, folder children use pl-7
          `group/file relative flex cursor-default items-center gap-2 py-[3px] ${root ? 'pl-4' : 'pl-7'} pr-2 text-label`,
          active
            ? 'bg-[#162536] text-syn-ident'
            : 'text-muted hover:bg-[#0f1722] hover:text-syn-ident',
        ].join(' ')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => tab && setActiveTab(tab)}
        onContextMenu={openMenu}
      >
        <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: dot }} />
        <span className="truncate flex-1">{name}</span>
        {hovered && (
          <button
            className="ml-auto flex h-[16px] w-[16px] items-center justify-center rounded-[2px] text-[10px] text-muted hover:bg-[#1e2d3d] hover:text-syn-ident"
            onClick={openMenu}
            title="More actions"
          >
            ···
          </button>
        )}
      </div>
      {menu && (
        <ContextMenu x={menu.x} y={menu.y} onClose={() => setMenu(null)} />
      )}
    </>
  )
}

function Chevron({ open }) {
  return <span className="inline-block w-3 text-muted">{open ? '▾' : '▸'}</span>
}

export default function FileTree({ width = 220 }) {
  const [openFolders, setOpenFolders] = useState(() => {
    const m = {}
    tree.forEach((n) => { m[n.folder] = n.open })
    return m
  })

  const toggleFolder = (folder) =>
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }))

  return (
    <aside className="no-select flex w-full shrink-0 flex-col bg-bg3" style={{ minWidth: 0 }}>
      <div className="flex items-center justify-between px-3 py-2 text-micro uppercase tracking-wider text-muted">
        <span>Explorer</span>
        <span className="text-muted">⋯</span>
      </div>
      <div className="px-3 pb-1 text-micro font-bold uppercase tracking-wide text-syn-ident">
        portfolio
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Root-level files */}
        {rootFiles.map((f) => <FileRow key={f.name} {...f} root />)}

        {/* Folder tree */}
        {tree.map((node) => (
          <div key={node.folder}>
            <div
              className="flex cursor-pointer items-center gap-1 py-[3px] pl-2 pr-2 text-label text-syn-ident hover:bg-[#0f1722]"
              onClick={() => toggleFolder(node.folder)}
            >
              <Chevron open={openFolders[node.folder]} />
              <span className="text-[#54aeff]">🗀</span>
              <span>{node.folder}</span>
            </div>
            {openFolders[node.folder] &&
              node.children.map((f) => <FileRow key={f.name} {...f} />)}
          </div>
        ))}
        <RecentFiles />
      </div>
    </aside>
  )
}
