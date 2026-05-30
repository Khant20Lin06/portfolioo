import { useCallback } from 'react'
import { useUI } from '../context/UIContext'

const rows = Array.from({ length: 64 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const r = seed / 233280
  return { width: 20 + Math.round(r * 70), indent: i % 7 === 0 ? 0 : Math.round((r * 12) % 10) }
})

const blocks = [
  { from: 19, to: 24, color: '#1f6feb' },
  { from: 26, to: 31, color: '#1f6feb' },
  { from: 33, to: 38, color: '#238636' },
  { from: 41, to: 50, color: '#1f6feb' },
  { from: 52, to: 60, color: '#238636' },
]

const TOTAL_ROWS = rows.length

export default function Minimap() {
  const { scrollPct, editorScrollRef } = useUI()

  // Viewport indicator height — represents ~30% of total
  const viewH = Math.round(TOTAL_ROWS * 0.30)
  // Viewport indicator top position based on scrollPct
  const maxTop = TOTAL_ROWS - viewH
  const indicatorTop = Math.round(scrollPct * maxTop)

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relY = (e.clientY - rect.top) / rect.height
    const el = editorScrollRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    el.scrollTop = relY * max
  }, [editorScrollRef])

  return (
    <div
      className="no-select relative w-[52px] shrink-0 cursor-pointer overflow-hidden border-l border-line bg-bg py-3"
      onClick={handleClick}
      title="Click to scroll"
    >
      {/* Viewport highlight indicator — moves with scroll */}
      <div
        className="absolute inset-x-0 bg-[#ffffff08] transition-[top] duration-75 ease-linear pointer-events-none"
        style={{
          top: `${12 + indicatorTop * 4}px`,
          height: `${viewH * 4}px`,
        }}
      />

      <div className="relative flex flex-col gap-[2px] px-[6px]">
        {rows.map((row, i) => {
          const block = blocks.find((b) => i >= b.from && i <= b.to)
          return (
            <div
              key={i}
              className="h-[2px] rounded-[1px] transition-colors"
              style={{
                width: `${row.width}%`,
                marginLeft: `${row.indent}%`,
                background: block ? block.color : '#243447',
                opacity: block ? 0.9 : 0.6,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
