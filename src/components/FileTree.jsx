import { useState } from 'react'
import { useUI } from '../context/UIContext'

// ── react-icons imports ───────────────────────────────────────────────
import {
  SiTypescript, SiGo, SiPython, SiYaml,
  SiJson, SiMarkdown, SiDotenv,
} from 'react-icons/si'
import {
  VscFolder, VscFolderOpened,
  VscFileCode, VscFile,
} from 'react-icons/vsc'

// ── File icon map: extension/name → { Icon, color } ──────────────────
function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase()
  const base = name.toLowerCase()

  if (base === '.env')                       return { Icon: SiDotenv,     color: '#ecd53f' }
  if (base.endsWith('.ts') || ext === 'ts')  return { Icon: SiTypescript, color: '#3178c6' }
  if (ext === 'go')                          return { Icon: SiGo,         color: '#00add8' }
  if (ext === 'py')                          return { Icon: SiPython,     color: '#f0883e' }
  if (ext === 'yaml' || ext === 'yml')       return { Icon: SiYaml,       color: '#cc1018' }
  if (ext === 'json')                        return { Icon: SiJson,       color: '#e3b341' }
  if (ext === 'md')                          return { Icon: SiMarkdown,   color: '#3fb950' }
  // fallback
  return { Icon: VscFile, color: '#586675' }
}

// ── Folder color map: folder name → accent color ──────────────────────
const FOLDER_COLORS = {
  src:    '#58a6ff',
  api:    '#f0883e',
  infra:  '#e3b341',
  config: '#bc8cff',
  tests:  '#3fb950',
  docs:   '#3fb950',
}

// ── Root-level files ──────────────────────────────────────────────────
const rootFiles = [
  { name: 'README.md',     tab: 'README.md' },
  { name: '.env',          tab: '.env' },
  { name: 'package.json'  },
  { name: 'tsconfig.json' },
]

// ── Folder tree ───────────────────────────────────────────────────────
const tree = [
  {
    folder: 'src', open: true,
    children: [
      { name: 'portfolio.ts', tab: 'portfolio.ts' },
      { name: 'index.ts' },
      { name: 'theme.ts' },
    ],
  },
  {
    folder: 'api', open: true,
    children: [
      { name: 'handlers.go' },
      { name: 'routes.go' },
      { name: 'schema.json' },
    ],
  },
  {
    folder: 'infra', open: true,
    children: [
      { name: 'deploy.yaml' },
      { name: 'k8s.yaml' },
      { name: 'pipeline.py' },
    ],
  },
  {
    folder: 'config', open: false,
    children: [
      { name: 'tsconfig.json' },
      { name: '.eslintrc.json' },
    ],
  },
  {
    folder: 'tests', open: false,
    children: [{ name: 'e2e.ts' }],
  },
  {
    folder: 'docs', open: false,
    children: [
      { name: 'ARCHITECTURE.md' },
      { name: 'API.md' },
    ],
  },
]

// ── Context menu ──────────────────────────────────────────────────────
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

// ── File row ──────────────────────────────────────────────────────────
function FileRow({ name, tab, root = false }) {
  const { activeTab, setActiveTab } = useUI()
  const [menu, setMenu]     = useState(null)
  const [hovered, setHovered] = useState(false)
  const active = activeTab === tab && tab != null

  const { Icon, color } = getFileIcon(name)

  const openMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setMenu({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <div
        className={[
          `group/file relative flex cursor-default items-center gap-[7px] py-[3px] ${root ? 'pl-4' : 'pl-7'} pr-2 text-label`,
          active
            ? 'bg-[#162536] text-syn-ident'
            : 'text-muted hover:bg-[#0f1722] hover:text-syn-ident',
        ].join(' ')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => tab && setActiveTab(tab)}
        onContextMenu={openMenu}
      >
        {/* File icon */}
        <Icon style={{ color, fontSize: '13px', flexShrink: 0 }} />
        <span className="flex-1 truncate">{name}</span>
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
      {menu && <ContextMenu x={menu.x} y={menu.y} onClose={() => setMenu(null)} />}
    </>
  )
}

// ── Folder row ────────────────────────────────────────────────────────
function FolderRow({ folder, open, onClick }) {
  const color = FOLDER_COLORS[folder] || '#586675'
  const FolderIcon = open ? VscFolderOpened : VscFolder

  return (
    <div
      className="flex cursor-pointer items-center gap-[7px] py-[3px] pl-2 pr-2 text-label text-syn-ident hover:bg-[#0f1722]"
      onClick={onClick}
    >
      <span className="text-muted text-[9px]">{open ? '▾' : '▸'}</span>
      <FolderIcon style={{ color, fontSize: '14px', flexShrink: 0 }} />
      <span>{folder}</span>
    </div>
  )
}

// ── Recent files (with icons) ─────────────────────────────────────────
function RecentFiles() {
  const { recentFiles, setActiveTab } = useUI()
  return (
    <div className="border-t border-line pt-1 pb-2">
      <div className="px-3 py-1 text-micro uppercase tracking-wider text-muted">Recent</div>
      {recentFiles.map((f) => {
        const { Icon, color } = getFileIcon(f.name)
        return (
          <div
            key={f.name}
            className="flex cursor-pointer items-center gap-[7px] py-[3px] pl-5 pr-2 text-label text-muted hover:bg-[#0f1722] hover:text-syn-ident"
            onClick={() => setActiveTab(f.name)}
          >
            <Icon style={{ color, fontSize: '12px', flexShrink: 0, opacity: 0.7 }} />
            <span className="flex-1 truncate">{f.name}</span>
            <span className="text-micro text-[#2d4459]">{f.ago}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Main FileTree ─────────────────────────────────────────────────────
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
            <FolderRow
              folder={node.folder}
              open={openFolders[node.folder]}
              onClick={() => toggleFolder(node.folder)}
            />
            {openFolders[node.folder] &&
              node.children.map((f) => <FileRow key={f.name} {...f} />)}
          </div>
        ))}

        <RecentFiles />
      </div>
    </aside>
  )
}
