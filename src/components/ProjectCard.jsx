import { useState } from 'react'

const accents = { blue: '#58a6ff', orange: '#f0883e', purple: '#bc8cff', green: '#3fb950' }

// Extra detail shown when card is expanded
const DETAILS = {
  'orbit-analytics': {
    stack: 'TypeScript · Kafka · ClickHouse · Redis · k8s',
    lines: '48,200',
    commits: '1,341',
    contributors: 3,
    status: 'production',
    highlight: 'Handles 2.4M events/day with p99 latency < 12ms',
  },
  'forge-ci': {
    stack: 'Go · Docker · gRPC · SQLite · Prometheus',
    lines: '21,050',
    commits: '882',
    contributors: 2,
    status: 'production',
    highlight: 'Sub-100ms cold starts via pre-warmed OCI snapshots',
  },
  'atlas-design-system': {
    stack: 'React · Radix · Storybook · Rollup · Chromatic',
    lines: '34,700',
    commits: '2,104',
    contributors: 7,
    status: 'production',
    highlight: 'WCAG 2.1 AA compliant · adopted by 40+ internal teams',
  },
  'sentinel-edge': {
    stack: 'Rust · WASM · Cloudflare Workers · Terraform',
    lines: '12,800',
    commits: '567',
    contributors: 2,
    status: 'active',
    highlight: '99.99% SLA · < 1ms WAF rule evaluation at edge',
  },
}

const STATUS_COLOR = { production: '#3fb950', active: '#58a6ff', archived: '#586675' }

export default function ProjectCard({ name, accent = 'blue', stars, metric, description, tags = [] }) {
  const [expanded, setExpanded] = useState(false)
  const color = accents[accent] || accents.blue
  const detail = DETAILS[name]

  return (
    <span
      className="my-[5px] block max-w-[560px] cursor-pointer rounded-r-[6px] border border-line bg-bg2 px-3 py-2 transition-all"
      style={{ borderLeft: `3px solid ${color}` }}
      onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v) }}
      title={expanded ? 'Click to collapse' : 'Click to expand'}
    >
      {/* Header row */}
      <span className="flex items-baseline justify-between gap-3">
        <span className="flex items-center gap-2">
          <span className="font-medium text-white">{name}</span>
          <span className="text-micro text-muted transition-transform" style={{ display: 'inline-block', transform: expanded ? 'rotate(90deg)' : 'none' }}>›</span>
        </span>
        <span className="flex items-center gap-3 text-micro text-muted">
          <span className="flex items-center gap-1"><span className="text-accent-green">★</span>{stars.toLocaleString()}</span>
          <span>{metric}</span>
        </span>
      </span>

      {/* Description */}
      <span className="mt-1 block text-[11px] leading-snug text-muted">{description}</span>

      {/* Tags */}
      <span className="mt-2 flex flex-wrap gap-[6px]">
        {tags.map((t) => (
          <span key={t} className="rounded-full border px-2 py-[1px] text-micro" style={{ borderColor: color, color }}>{t}</span>
        ))}
      </span>

      {/* Expanded detail — inline, no modal */}
      {expanded && detail && (
        <span className="mt-3 block border-t border-line pt-3">
          {/* Status + highlight */}
          <span className="mb-2 flex items-center gap-2">
            <span
              className="rounded-full px-2 py-[1px] text-micro font-medium"
              style={{ background: STATUS_COLOR[detail.status] + '22', color: STATUS_COLOR[detail.status] }}
            >
              ● {detail.status}
            </span>
            <span className="text-micro text-muted italic">{detail.highlight}</span>
          </span>

          {/* Stats grid */}
          <span className="mb-2 grid grid-cols-3 gap-2">
            {[
              { label: 'Lines', val: detail.lines },
              { label: 'Commits', val: detail.commits },
              { label: 'Contributors', val: String(detail.contributors) },
            ].map(({ label, val }) => (
              <span key={label} className="rounded-[4px] border border-line bg-bg3 px-2 py-1 text-center">
                <span className="block text-[13px] font-medium text-white">{val}</span>
                <span className="block text-micro text-muted">{label}</span>
              </span>
            ))}
          </span>

          {/* Full stack */}
          <span className="block text-micro text-muted">
            <span className="text-syn-punc">{'// '}</span>
            <span className="text-syn-comment">{detail.stack}</span>
          </span>
        </span>
      )}
    </span>
  )
}
