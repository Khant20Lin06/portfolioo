import { useState, useEffect, useRef, useCallback } from 'react'
import { K, Fn, Str, Num, Ty, Cm, P, Id, Prop } from './tokens'
import SkillChip from './SkillChip'
import ProjectCard from './ProjectCard'
import { me, frontend, backend, infra, projects, contact, cv } from '../data'
import { useUI } from '../context/UIContext'

const I = ({ n = 1 }) => <span>{'  '.repeat(n)}</span>
const Divider = ({ label }) => (
  <Cm>{`// ── ${label} ${'─'.repeat(Math.max(2, 26 - label.length))}`}</Cm>
)
const Field = ({ k, children, comma = true }) => (
  <><I /><Prop>{k}</Prop><P>:</P> {children}{comma && <P>,</P>}</>
)

// ── Git blame data (fake but realistic) ──────────────────────────────
const BLAME = [
  { hash: 'a4f3c21', who: 'khantlin', ago: '2d' },
  { hash: 'a4f3c21', who: 'khantlin', ago: '2d' },
  { hash: 'a4f3c21', who: 'khantlin', ago: '2d' },
  { hash: 'a4f3c21', who: 'khantlin', ago: '2d' },
  { hash: 'a4f3c21', who: 'khantlin', ago: '2d' },
  { hash: 'a4f3c21', who: 'khantlin', ago: '2d' },
  { hash: '3d91b0e', who: 'khantlin', ago: '5d' },
  { hash: '3d91b0e', who: 'khantlin', ago: '5d' },
  { hash: 'c7e82fa', who: 'khantlin', ago: '1w' },
  { hash: 'c7e82fa', who: 'khantlin', ago: '1w' },
  { hash: '9b2d441', who: 'khantlin', ago: '2w' },
  { hash: '9b2d441', who: 'khantlin', ago: '2w' },
  { hash: '9b2d441', who: 'khantlin', ago: '2w' },
  { hash: '9b2d441', who: 'khantlin', ago: '2w' },
  { hash: '9b2d441', who: 'khantlin', ago: '2w' },
  { hash: '9b2d441', who: 'khantlin', ago: '2w' },
  { hash: '9b2d441', who: 'khantlin', ago: '2w' },
  { hash: '9b2d441', who: 'khantlin', ago: '2w' },
  { hash: '01f3a9d', who: 'khantlin', ago: '3w' },
]

// Blame tooltip shown on hover
function BlameTooltip({ hash, who, ago }) {
  const MSGS = {
    'a4f3c21': 'feat: add edge-cache layer to sentinel-edge',
    '3d91b0e': 'fix: resolve race condition in forge-ci runner',
    'c7e82fa': 'refactor: orbit-analytics stream processor',
    '9b2d441': 'feat: ship atlas-design-system v3.0',
    '01f3a9d': 'chore: bump deps, update CI pipeline',
  }
  return (
    <span className="pointer-events-none absolute left-[44px] top-0 z-50 flex items-center gap-2 whitespace-nowrap rounded-[4px] border border-line bg-bg2 px-2 py-[3px] shadow-xl text-micro">
      <span className="text-accent-blue font-medium">{hash}</span>
      <span className="text-muted">·</span>
      <span className="text-syn-ident">{who}</span>
      <span className="text-muted">·</span>
      <span className="text-muted">{ago} ago</span>
      <span className="text-muted">·</span>
      <span className="text-syn-string italic">{MSGS[hash] ?? 'update'}</span>
    </span>
  )
}

// Git blame gutter cell
function BlameCell({ lineIdx }) {
  const [tip, setTip] = useState(false)
  const b = BLAME[lineIdx % BLAME.length]
  // Only show on every ~3rd line so it doesn't clutter
  const show = lineIdx % 3 === 0
  if (!show) return <span className="inline-block w-[88px]" />
  return (
    <span
      className="relative inline-flex cursor-default items-center gap-1"
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      <span className="text-micro text-[#2d4459] hover:text-muted transition-colors select-none">
        {b.hash} · {b.ago}
      </span>
      {tip && <BlameTooltip {...b} />}
    </span>
  )
}

// ── Error / warning squiggle diagnostics ─────────────────────────────
// Maps line index → diagnostic info
const DIAGNOSTICS = {
  7:  { type: 'warning', msg: "Module './types' not found — using declaration merging" },
  12: { type: 'error',   msg: "Type 'string' is not assignable to type 'JobTitle'" },
  16: { type: 'info',    msg: "Property 'uptime' can be inferred from usage" },
  22: { type: 'warning', msg: "Prefer 'readonly' for stack declarations" },
  46: { type: 'error',   msg: "Promise returned from 'hire' is not handled at call sites" },
}

function Squiggle({ type }) {
  const color = type === 'error' ? '#ff7b72' : type === 'warning' ? '#e3b341' : '#58a6ff'
  return (
    <span
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='2'%3E%3Cpath d='M0 1 Q1.5 0 3 1 Q4.5 2 6 1' stroke='${encodeURIComponent(color)}' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom',
      }}
    />
  )
}

function DiagTooltip({ type, msg }) {
  const color = type === 'error' ? '#ff7b72' : type === 'warning' ? '#e3b341' : '#58a6ff'
  const icon  = type === 'error' ? '✖' : type === 'warning' ? '⚠' : 'ℹ'
  return (
    <span
      className="pointer-events-none absolute left-0 top-full z-50 mt-[3px] flex max-w-[400px] items-start gap-2 rounded-[4px] border border-line bg-bg2 px-3 py-2 shadow-xl text-label"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <span style={{ color }}>{icon}</span>
      <span>
        <span className="block font-medium" style={{ color }}>{type.toUpperCase()}</span>
        <span className="text-muted">{msg}</span>
        <span className="mt-1 block text-micro text-[#2d4459]">portfolio.ts · TypeScript(2322)</span>
      </span>
    </span>
  )
}

// ── Code lens annotation (above function declarations) ───────────────
function CodeLens({ label }) {
  return (
    <div className="mb-[2px] text-micro text-[#2d4459] select-none pl-2 hover:text-muted cursor-default transition-colors">
      {label}
    </div>
  )
}

// ── Fold toggle button ────────────────────────────────────────────────
function FoldBtn({ id }) {
  const { collapsed, toggleCollapse } = useUI()
  return (
    <span
      className="mr-1 inline-flex h-[14px] w-[14px] cursor-pointer items-center justify-center rounded-[2px] border border-[#2a3f55] bg-bg3 text-[8px] text-muted select-none hover:border-accent-blue hover:text-accent-blue"
      onClick={(e) => { e.stopPropagation(); toggleCollapse(id) }}
    >
      {collapsed[id] ? '+' : '−'}
    </span>
  )
}

// ── Word highlight ────────────────────────────────────────────────────
function W({ word, children }) {
  const { highlightWord, setHighlightWord } = useUI()
  const active = highlightWord === word
  return (
    <span
      className={['cursor-pointer rounded-[2px]', active ? 'bg-[#1f3a5f] outline outline-1 outline-[#58a6ff]/40' : 'hover:bg-[#1a2d42]'].join(' ')}
      onClick={(e) => { e.stopPropagation(); setHighlightWord(active ? null : word) }}
    >
      {children}
    </span>
  )
}

// ── Line builder ─────────────────────────────────────────────────────
// Each entry: { jsx, foldId?, codeLens? }
function buildLines(collapsed) {
  const lines = []
  const line = (jsx, extra = {}) => lines.push({ jsx, ...extra })

  line(<Cm>/**</Cm>)
  line(<Cm> * @author&nbsp;&nbsp;&nbsp;{me.name}</Cm>)
  line(<Cm> * @role&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{me.title}</Cm>)
  line(<Cm> * @location {me.location}</Cm>)
  line(<><Cm> * @status&nbsp;&nbsp;</Cm><span className="text-accent-green">● AVAILABLE FOR HIRE</span></>)
  line(<Cm> */</Cm>)

  line(<><K>import</K> <P>{'{'}</P>{' '}<W word="Engineer"><Ty>Engineer</Ty></W><P>,</P>{' '}<W word="Stack"><Ty>Stack</Ty></W><P>,</P>{' '}<W word="Project"><Ty>Project</Ty></W>{' '}<P>{'}'}</P> <K>from</K> <Str>'./types'</Str><P>;</P></>)
  line(<><K>import</K> <K>type</K> <P>{'{'}</P>{' '}<W word="Company"><Ty>Company</Ty></W>{' '}<P>{'}'}</P> <K>from</K> <Str>'./hiring'</Str><P>;</P></>)
  line(<span />)

  line(<>
    <FoldBtn id="me" />
    <K>const</K> <W word="me"><Id>me</Id></W><P>:</P> <W word="Engineer"><Ty>Engineer</Ty></W> <P>=</P> <P>{'{'}</P>
    {collapsed['me'] && <><span className="ml-1 text-syn-punc opacity-60">{'{ … }'}</span><P>;</P></>}
  </>, { foldId: 'me' })

  if (!collapsed['me']) {
    line(<Field k="name"><Str>'{me.name}'</Str></Field>)
    line(<Field k="title"><Str>'{me.title}'</Str></Field>)
    line(<Field k="experience"><Num>{me.experience}</Num></Field>)
    line(<Field k="shipped"><Num>{me.shipped}</Num></Field>)
    line(<Field k="clients"><Num>{me.clients}</Num></Field>)
    line(<Field k="uptime"><Str>'{me.uptime}'</Str></Field>)
    line(<Field k="open"><K>{String(me.open)}</K></Field>)
    line(<><P>{'}'}</P><P>;</P></>)
  }
  line(<span />)

  const skillBlock = (varName, arr, foldId) => {
    line(<Divider label={varName.charAt(0).toUpperCase() + varName.slice(1)} />)
    line(<>
      <FoldBtn id={foldId} />
      <K>const</K> <W word={varName}><Id>{varName}</Id></W>
      <P>:</P> <W word="Stack"><Ty>Stack</Ty></W><P>[]</P> <P>=</P> <P>[</P>
      {collapsed[foldId] && <><span className="ml-1 text-syn-punc opacity-60">[ … ]</span><P>;</P></>}
    </>, { foldId })
    if (!collapsed[foldId]) {
      line(<span className="inline-flex flex-wrap items-center"><I />{arr.map((s) => <SkillChip key={s.name} {...s} />)}</span>)
      line(<><P>]</P><P>;</P></>)
    }
    line(<span />)
  }

  skillBlock('frontend', frontend, 'frontend')
  skillBlock('backend',  backend,  'backend')
  skillBlock('infra',    infra,    'infra')

  line(<Divider label="Projects" />)
  line(<>
    <FoldBtn id="projects" />
    <K>const</K> <W word="projects"><Id>projects</Id></W>
    <P>:</P> <W word="Project"><Ty>Project</Ty></W><P>[]</P> <P>=</P> <P>[</P>
    {collapsed['projects'] && <><span className="ml-1 text-syn-punc opacity-60">[ … ]</span><P>;</P></>}
  </>, { foldId: 'projects' })

  if (!collapsed['projects']) {
    projects.forEach((p) => line(<span className="inline-block pl-6"><ProjectCard {...p} /></span>))
    line(<><P>]</P><P>;</P></>)
  }
  line(<span />)

  line(<Divider label="Contact" />)
  // Code lens above hire()
  line(<><K>export</K> <K>async</K> <K>function</K>{' '}<W word="hire"><Fn>hire</Fn></W><P>(</P><Id>you</Id><P>:</P> <W word="Company"><Ty>Company</Ty></W><P>)</P> <P>{'{'}</P></>, { codeLens: '2 references · async · returns Promise<Response>' })
  line(<><I /><K>return</K> <P>{'{'}</P></>)
  line(<><I n={2} /><Prop>email</Prop><P>:</P>{' '}<a href={`mailto:${contact.email}`} className="text-syn-string underline decoration-syn-string/30 underline-offset-2 hover:decoration-syn-string">'{contact.email}'</a><P>,</P></>)
  line(<><I n={2} /><Prop>phone</Prop><P>:</P>{' '}<a href={`tel:${contact.phone}`} className="text-syn-string underline decoration-syn-string/30 underline-offset-2 hover:decoration-syn-string">'{contact.phone}'</a><P>,</P></>)
  line(<><I n={2} /><Prop>github</Prop><P>:</P>{' '}<a href={`https://${contact.github}`} target="_blank" rel="noreferrer" className="text-syn-string underline decoration-syn-string/30 underline-offset-2 hover:decoration-syn-string">'{contact.github}'</a><P>,</P></>)
  line(<><I n={2} /><Prop>linkedin</Prop><P>:</P>{' '}<a href={`https://linkedin.com/${contact.linkedin}`} target="_blank" rel="noreferrer" className="text-syn-string underline decoration-syn-string/30 underline-offset-2 hover:decoration-syn-string">'{contact.linkedin}'</a><P>,</P></>)
  line(<><I n={2} /><Prop>telegram</Prop><P>:</P>{' '}<a href={`https://t.me/${contact.telegram.replace('@','')}`} target="_blank" rel="noreferrer" className="text-syn-string underline decoration-syn-string/30 underline-offset-2 hover:decoration-syn-string">'{contact.telegram}'</a><P>,</P></>)
  line(<><I n={2} /><Prop>cv</Prop><P>:</P>{' '}<a href={cv.view} target="_blank" rel="noreferrer" className="text-syn-string underline decoration-syn-string/30 underline-offset-2 hover:decoration-syn-string">'{cv.view.slice(0, 48)}…'</a><P>,</P></>)
  line(<><I n={2} /><Prop>rate</Prop><P>:</P> <Str>'{contact.rate}'</Str><P>,</P></>)
  line(<><I n={2} /><Prop>availability</Prop><P>:</P> <Str>'{contact.availability}'</Str><P>,</P></>)
  line(<><I /><P>{'}'}</P><P>;</P></>)
  line(<><P>{'}'}</P></>)
  line(<span />)
  line(<><Cm>// EOF</Cm>{' '}<span className="inline-block h-[14px] w-[8px] translate-y-[2px] animate-cursor bg-accent-blue align-middle" /></>)

  return lines
}

// ── Main component ────────────────────────────────────────────────────
export default function CodeEditor() {
  const { activeLine, setActiveLine, collapsed, typingDone, setTypingDone, setScrollPct, editorScrollRef } = useUI()
  const [visibleCount, setVisibleCount] = useState(0)
  const [blameVisible, setBlameVisible] = useState(false)
  const [hoveredDiag, setHoveredDiag]   = useState(null)
  const scrollRef = useRef(null)

  const lines = buildLines(collapsed)
  const total = lines.length

  // Typing animation
  useEffect(() => {
    if (typingDone) { setVisibleCount(total); return }
    if (visibleCount >= total) { setTypingDone(true); return }
    const delay = visibleCount < 6 ? 45 : visibleCount < 18 ? 28 : 16
    const t = setTimeout(() => setVisibleCount((v) => v + 1), delay)
    return () => clearTimeout(t)
  }, [visibleCount, total, typingDone, setTypingDone])

  // Expose scroll ref to context (for minimap sync)
  useEffect(() => {
    if (scrollRef.current) editorScrollRef.current = scrollRef.current
  }, [editorScrollRef])

  // Track scroll progress
  const onScroll = useCallback((e) => {
    const el = e.currentTarget
    const max = el.scrollHeight - el.clientHeight
    setScrollPct(max > 0 ? el.scrollTop / max : 0)
  }, [setScrollPct])

  // Keyboard shortcut: Ctrl+B toggle blame
  useEffect(() => {
    const h = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        setBlameVisible((v) => !v)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const shown = lines.slice(0, visibleCount)

  return (
    <div ref={scrollRef} className="flex flex-1 overflow-auto bg-bg" onScroll={onScroll}>
      {/* Single column: each row = gutter cell(s) + code cell side-by-side.
          This guarantees line numbers always match code height, even for
          multi-line project cards and skill chip rows. */}
      <div className="relative grow pt-3 text-code">
        {shown.map(({ jsx, codeLens }, i) => {
          const diag = DIAGNOSTICS[i]
          return (
            <div key={i}>
              {/* Code-lens row — spans full width, no line number */}
              {codeLens && (
                <div className="flex">
                  <div className="w-[44px] shrink-0" />
                  {blameVisible && <div className="w-[88px] shrink-0" />}
                  <div className="grow">
                    <CodeLens label={codeLens} />
                  </div>
                </div>
              )}

              {/* Code row — gutter + blame + content all same height */}
              <div
                className={['group/line relative flex cursor-default leading-[20px] transition-colors',
                  activeLine === i ? 'bg-[#0e1e2e] outline outline-[0.5px] outline-[#1e2d3d]' : 'hover:bg-[#0d1520]',
                ].join(' ')}
                onClick={() => setActiveLine(i === activeLine ? null : i)}
                onMouseEnter={() => diag && setHoveredDiag(i)}
                onMouseLeave={() => setHoveredDiag(null)}
              >
                {/* Blame cell */}
                {blameVisible && (
                  <div className="no-select w-[88px] shrink-0 select-none px-1 pt-0">
                    <BlameCell lineIdx={i} />
                  </div>
                )}

                {/* Line number */}
                <div className={['no-select w-[44px] shrink-0 select-none pr-3 text-right',
                  activeLine === i ? 'text-syn-ident' : 'text-[#3a5068]',
                ].join(' ')}>
                  {DIAGNOSTICS[i] && (
                    <span className={['mr-1 inline-block h-[8px] w-[8px] rounded-full',
                      diag.type === 'error' ? 'bg-[#ff7b72]' : diag.type === 'warning' ? 'bg-[#e3b341]' : 'bg-[#58a6ff]',
                    ].join(' ')} />
                  )}
                  {i + 1}
                </div>

                {/* Code content */}
                <div className="relative min-h-[20px] grow whitespace-pre-wrap px-2">
                  {jsx}
                  {diag && <Squiggle type={diag.type} />}
                  {diag && hoveredDiag === i && <DiagTooltip {...diag} />}
                </div>
              </div>
            </div>
          )
        })}
        <div className="h-24" />
      </div>

      {/* Blame toggle hint (bottom-right of editor) */}
      <div className="pointer-events-none absolute bottom-28 right-16 text-micro text-[#1e3248] select-none">
        Ctrl+B: git blame
      </div>
    </div>
  )
}
