import { useState, useEffect, useRef } from 'react'
import { useUI } from '../context/UIContext'
import { me, contact } from '../data'

// Sequence of terminal lines to animate through
const BOOT_SEQUENCE = [
  { text: `khantlin@portfolio:~$ npm install`, delay: 0 },
  { text: `added 136 packages in 1.2s`, delay: 300, color: '#3fb950' },
  { text: ``, delay: 100 },
  { text: `khantlin@portfolio:~$ git log --oneline -5`, delay: 200 },
  { text: `a4f3c21 feat: add edge-cache layer to sentinel-edge`, delay: 150, color: '#58a6ff' },
  { text: `3d91b0e fix: resolve race condition in forge-ci runner`, delay: 100, color: '#58a6ff' },
  { text: `c7e82fa refactor: orbit-analytics stream processor`, delay: 100, color: '#58a6ff' },
  { text: `9b2d441 feat: ship atlas-design-system v3.0`, delay: 100, color: '#58a6ff' },
  { text: `01f3a9d chore: bump deps, update CI pipeline`, delay: 100, color: '#58a6ff' },
  { text: ``, delay: 100 },
  { text: `khantlin@portfolio:~$ uptime`, delay: 200 },
  { text: `System uptime: ${me.uptime} · ${me.shipped} projects shipped`, delay: 150, color: '#3fb950' },
  { text: ``, delay: 100 },
  { text: `khantlin@portfolio:~$ ping ${contact.github.split('/')[1]}`, delay: 300 },
  { text: `PING ${contact.github} (93.184.216.34): 56 bytes`, delay: 200 },
  { text: `64 bytes from ${contact.github}: icmp_seq=0 ttl=56 time=12.3 ms`, delay: 300, color: '#3fb950' },
  { text: `64 bytes from ${contact.github}: icmp_seq=1 ttl=56 time=11.8 ms`, delay: 400, color: '#3fb950' },
  { text: ``, delay: 100 },
  { text: `khantlin@portfolio:~$ echo "open to work: $AVAILABLE"`, delay: 300 },
  { text: `open to work: TRUE`, delay: 150, color: '#e3b341' },
  { text: ``, delay: 100 },
  { text: `khantlin@portfolio:~$ █`, delay: 200 },
]

const PROMPT = 'khantlin@portfolio:~$ '

export default function Terminal({ height = 220 }) {
  const { terminalOpen, setTerminalOpen } = useUI()
  const [lines, setLines] = useState([])
  const [userInput, setUserInput] = useState('')
  const [booted, setBooted] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Boot animation
  useEffect(() => {
    if (!terminalOpen || booted) return
    let idx = 0
    let timeouts = []
    let cumulative = 0

    BOOT_SEQUENCE.forEach((item) => {
      cumulative += item.delay
      const t = setTimeout(() => {
        setLines((prev) => [...prev, { text: item.text, color: item.color }])
      }, cumulative)
      timeouts.push(t)
    })

    const done = setTimeout(() => setBooted(true), cumulative + 200)
    timeouts.push(done)
    return () => timeouts.forEach(clearTimeout)
  }, [terminalOpen, booted])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  useEffect(() => {
    if (terminalOpen && booted) inputRef.current?.focus()
  }, [terminalOpen, booted])


  const handleCommand = (e) => {
    if (e.key !== 'Enter') return
    const cmd = userInput.trim()
    const echo = { text: `${PROMPT}${cmd}` }
    let response = { text: `command not found: ${cmd}`, color: '#ff7b72' }

    const lower = cmd.toLowerCase()
    if (!cmd) { response = { text: '' } }
    else if (lower === 'help') {
      response = { text: `Available: hire · github · linkedin · clear · whoami · skills`, color: '#3fb950' }
    } else if (lower === 'whoami') {
      response = { text: `${me.name} — ${me.title}`, color: '#58a6ff' }
    } else if (lower === 'hire') {
      window.open(`mailto:${contact.email}?subject=Let's work together`)
      response = { text: `Opening email client…`, color: '#3fb950' }
    } else if (lower === 'github') {
      window.open(`https://${contact.github}`, '_blank')
      response = { text: `Opening ${contact.github}…`, color: '#3fb950' }
    } else if (lower === 'linkedin') {
      window.open(`https://linkedin.com/${contact.linkedin}`, '_blank')
      response = { text: `Opening LinkedIn…`, color: '#3fb950' }
    } else if (lower === 'clear') {
      setLines([])
      setUserInput('')
      return
    } else if (lower === 'skills') {
      response = { text: `TypeScript · React · Go · Node.js · PostgreSQL · Docker · K8s · AWS`, color: '#e3b341' }
    } else if (lower === 'exit' || lower === 'quit') {
      setTerminalOpen(false)
      return
    }

    setLines((prev) => [...prev, echo, response, { text: '' }])
    setUserInput('')
  }

  return (
    <div className="flex shrink-0 flex-col border-t border-line bg-bg2" style={{ height }}>
      {/* Terminal tab bar */}
      <div className="flex h-[32px] items-center justify-between border-b border-line px-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 border-b-[1.5px] border-accent-blue pb-[1px] text-label text-syn-ident">
            <span className="text-muted">▶</span> TERMINAL
          </span>
          <span className="text-label text-muted hover:text-syn-ident cursor-default">PROBLEMS</span>
          <span className="text-label text-muted hover:text-syn-ident cursor-default">OUTPUT</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-micro text-muted hover:text-syn-ident">+</button>
          <button className="text-micro text-muted hover:text-syn-ident">⊟</button>
          <button
            className="text-micro text-muted hover:text-accent-red"
            onClick={() => setTerminalOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Terminal body */}
      <div
        className="flex-1 overflow-y-auto px-3 py-2 font-mono text-label"
        onClick={() => booted && inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className="leading-[20px]" style={{ color: line.color || '#c9d1d9' }}>
            {line.text || ' '}
          </div>
        ))}

        {/* Interactive input */}
        {booted && (
          <div className="flex items-center leading-[20px]">
            <span className="text-accent-green">{PROMPT}</span>
            <input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent text-syn-ident outline-none caret-accent-blue"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
