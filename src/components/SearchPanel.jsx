import { useEffect, useRef } from 'react'
import { useUI } from '../context/UIContext'

// Fake match count based on query length — feels alive without real DOM search
function fakeMatchCount(q) {
  if (!q) return 0
  const seed = q.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return (seed % 9) + 1
}

export default function SearchPanel() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery } = useUI()
  const inputRef = useRef(null)

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [searchOpen])

  if (!searchOpen) return null

  const matches = fakeMatchCount(searchQuery)

  return (
    <div className="absolute right-[60px] top-[8px] z-30 w-[320px] rounded-[4px] border border-line bg-bg2 shadow-2xl">
      {/* Find row */}
      <div className="flex items-center gap-2 border-b border-line px-2 py-[5px]">
        <span className="text-micro text-muted">Find</span>
        <div className="relative flex flex-1 items-center">
          <input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full rounded-[3px] border border-line bg-bg px-2 py-[3px] text-label text-syn-ident outline-none focus:border-accent-blue/60 placeholder:text-muted"
            onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
          />
          {searchQuery && (
            <span className="absolute right-2 text-micro text-muted">
              {matches} of {matches}
            </span>
          )}
        </div>
        {/* regex / case / word toggle buttons */}
        {['.*', 'Aa', 'ab'].map((lbl) => (
          <button
            key={lbl}
            className="rounded-[3px] border border-transparent px-[5px] py-[1px] text-micro text-muted hover:border-line hover:text-syn-ident"
          >
            {lbl}
          </button>
        ))}
        <button
          className="ml-1 text-micro text-muted hover:text-syn-ident"
          onClick={() => { setSearchOpen(false); setSearchQuery('') }}
        >
          ✕
        </button>
      </div>

      {/* Replace row */}
      <div className="flex items-center gap-2 px-2 py-[5px]">
        <span className="text-micro text-muted">Replace</span>
        <input
          placeholder="Replace"
          className="flex-1 rounded-[3px] border border-line bg-bg px-2 py-[3px] text-label text-syn-ident outline-none focus:border-accent-blue/60 placeholder:text-muted"
        />
        <button className="rounded-[3px] border border-line px-[5px] py-[1px] text-micro text-muted hover:text-syn-ident">↩</button>
        <button className="rounded-[3px] border border-line px-[5px] py-[1px] text-micro text-muted hover:text-syn-ident">↩↩</button>
      </div>

      {/* Match info */}
      {searchQuery && (
        <div className="border-t border-line px-3 py-[4px] text-micro text-muted">
          {matches} results in portfolio.ts
        </div>
      )}
    </div>
  )
}
