import { useState } from 'react'

const accents = { blue: '#58a6ff', orange: '#f0883e', purple: '#bc8cff', green: '#3fb950' }

// Extra detail shown when card is expanded
const DETAILS = {
  'werte-food-delivery': {
    stack: 'NestJS · TypeScript · PostgreSQL · Prisma ORM · Redis · BullMQ · WebSocket · Docker',
    lines: '25,000+',
    commits: '340+',
    contributors: 1,
    status: 'production',
    highlight: '25 modules · 49 DB models · 9-stage order status tracking',
  },
  'eco-market': {
    stack: 'NestJS · Node.js · PostgreSQL · Socket.io · JWT · RBAC · Swagger',
    lines: '12,400',
    commits: '180+',
    contributors: 1,
    status: 'production',
    highlight: 'Modular NestJS backend · RBAC + JWT access/refresh token strategy',
  },
  'fashion-ecommerce': {
    stack: 'Django · Python · DRF · Next.js · PostgreSQL · OTP · JWT',
    lines: '9,800',
    commits: '145',
    contributors: 1,
    status: 'production',
    highlight: 'Product variants (size/color/SKU) · warehouse management · sales analytics',
  },
  'frappe-mobile-pos': {
    stack: 'Flutter · Dart 3.10 · SQLite · Socket.io · GitHub Actions · CI/CD',
    lines: '8,200',
    commits: '210',
    contributors: 1,
    status: 'production',
    highlight: 'Full cart · barcode scanning · 10+ reports · bilingual EN/MM UI',
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
