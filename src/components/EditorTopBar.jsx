import { useState } from 'react'
import { useUI } from '../context/UIContext'
import { cv } from '../data'

const TAB_DOTS = {
  'portfolio.ts': '#58a6ff',
  'README.md':    '#3fb950',
  '.env':         '#f0883e',
}

export default function EditorTopBar() {
  const [copied, setCopied] = useState(false)
  const { activeTab, setHireOpen, setCvOpen } = useUI()

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { /* noop */ }
  }

  return (
    <div className="no-select flex h-[34px] shrink-0 items-center justify-between border-b border-line bg-bg2 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-label">
        <span className="text-muted">portfolio</span>
        <span className="text-muted">›</span>
        <span className="text-muted">src</span>
        <span className="text-muted">›</span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-[7px] w-[7px] rounded-full"
            style={{ background: TAB_DOTS[activeTab] ?? '#c9d1d9' }}
          />
          <span className="text-syn-ident">{activeTab}</span>
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={copyLink}
          className="rounded-[4px] border border-accent-blue/60 px-2.5 py-[3px] text-micro text-accent-blue transition-colors hover:bg-accent-blue/10"
        >
          {copied ? '✓ copied' : 'copy link'}
        </button>

        {/* CV buttons */}
        <button
          onClick={() => setCvOpen(true)}
          className="rounded-[4px] border border-[#e3b341]/60 px-2.5 py-[3px] text-micro text-[#e3b341] transition-colors hover:bg-[#e3b341]/10"
          title="Preview CV in modal"
        >
          view CV
        </button>
        <a
          href={cv.download}
          target="_blank"
          rel="noreferrer"
          className="rounded-[4px] border border-[#e3b341] bg-[#e3b341]/15 px-2.5 py-[3px] text-micro font-medium text-[#e3b341] transition-colors hover:bg-[#e3b341]/25"
          title="Download CV PDF"
        >
          ↓ CV
        </a>

        <button
          onClick={() => setHireOpen(true)}
          className="rounded-[4px] border border-accent-green bg-accent-green/15 px-2.5 py-[3px] text-micro font-medium text-accent-green transition-colors hover:bg-accent-green/25"
        >
          hire me
        </button>
      </div>
    </div>
  )
}
