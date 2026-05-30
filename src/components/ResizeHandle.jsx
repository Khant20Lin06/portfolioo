import { useRef, useCallback } from 'react'

// Vertical drag handle (between sidebar and editor)
export function VerticalHandle({ onDelta }) {
  const dragging = useRef(false)
  const last = useRef(0)

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    dragging.current = true
    last.current = e.clientX

    const onMove = (e) => {
      if (!dragging.current) return
      onDelta(e.clientX - last.current)
      last.current = e.clientX
    }
    const onUp = () => {
      dragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [onDelta])

  return (
    <div
      className="group/vhandle relative z-10 w-[4px] shrink-0 cursor-col-resize bg-transparent hover:bg-accent-blue/30 active:bg-accent-blue/50"
      onMouseDown={onMouseDown}
      title="Drag to resize"
    >
      {/* Visual line */}
      <div className="absolute inset-y-0 left-[1px] w-[1px] bg-line group-hover/vhandle:bg-accent-blue/50 transition-colors" />
    </div>
  )
}

// Horizontal drag handle (between editor and terminal)
export function HorizontalHandle({ onDelta }) {
  const dragging = useRef(false)
  const last = useRef(0)

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    dragging.current = true
    last.current = e.clientY

    const onMove = (e) => {
      if (!dragging.current) return
      onDelta(e.clientY - last.current)
      last.current = e.clientY
    }
    const onUp = () => {
      dragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [onDelta])

  return (
    <div
      className="group/hhandle relative z-10 h-[4px] shrink-0 cursor-row-resize bg-transparent hover:bg-accent-blue/30 active:bg-accent-blue/50"
      onMouseDown={onMouseDown}
    >
      <div className="absolute inset-x-0 top-[1px] h-[1px] bg-line group-hover/hhandle:bg-accent-blue/50 transition-colors" />
    </div>
  )
}
