import { useState } from 'react'
import {
  SiNestjs, SiNodedotjs, SiTypescript, SiPostgresql, SiSocketdotio,
  SiReact, SiNextdotjs, SiTailwindcss, SiFlutter,
  SiDocker, SiGithubactions, SiVercel,
  SiExpress, SiDjango, SiPython, SiRedis,
} from 'react-icons/si'

const LEVEL_LABEL = ['', 'Beginner', 'Familiar', 'Proficient', 'Advanced', 'Expert']
const LEVEL_COLOR = ['', '#586675', '#e3b341', '#f0883e', '#58a6ff', '#3fb950']

// AWS has no icon in react-icons/si — falls back to colored dot
const ICON_MAP = {
  NestJS:           { Icon: SiNestjs,        color: '#e0234e' },
  'Node.js':        { Icon: SiNodedotjs,     color: '#3fb950' },
  TypeScript:       { Icon: SiTypescript,    color: '#3178c6' },
  PostgreSQL:       { Icon: SiPostgresql,    color: '#336791' },
  'Socket.io':      { Icon: SiSocketdotio,   color: '#ffffff' },
  React:            { Icon: SiReact,         color: '#61dafb' },
  'React Native':   { Icon: SiReact,         color: '#61dafb' },
  'Next.js':        { Icon: SiNextdotjs,     color: '#ffffff' },
  Tailwind:         { Icon: SiTailwindcss,   color: '#38bdf8' },
  Flutter:          { Icon: SiFlutter,       color: '#54c5f8' },
  Docker:           { Icon: SiDocker,        color: '#2496ed' },
  'GitHub Actions': { Icon: SiGithubactions, color: '#2088ff' },
  AWS:              { Icon: null,            color: '#ff9900' },
  Vercel:           { Icon: SiVercel,        color: '#ffffff' },
  'CI/CD':          { Icon: SiGithubactions, color: '#3fb950' },
  'Express.js':     { Icon: SiExpress,       color: '#ffffff' },
  Django:           { Icon: SiDjango,        color: '#44b78b' },
  Python:           { Icon: SiPython,        color: '#f0883e' },
  Redis:            { Icon: SiRedis,         color: '#ff4438' },
  cPanel:           { Icon: null,            color: '#ff6c2c' },
}

const SKILL_DESC = {
  NestJS:           'Modular architecture, 25-module monolith, decorators, DI',
  'Node.js':        'Event loop, streams, REST API, performance tuning',
  TypeScript:       'Strict typing, generics, utility types, compiler config',
  PostgreSQL:       'Prisma ORM, 49-model schema, query optimisation',
  'Socket.io':      'Real-time WebSocket gateway, multi-party chat',
  React:            'Hooks, context, RSC, concurrent features',
  'React Native':   'Cross-platform mobile apps, Expo, navigation',
  'Next.js':        'App router, SSR/SSG, server actions, API routes',
  Tailwind:         'Utility-first CSS, responsive design systems',
  Flutter:          'Production Android POS, Dart 3.10, barcode scanning',
  Docker:           'Multi-stage builds, compose, container networking',
  'GitHub Actions': 'CI/CD pipelines, automated testing, deployment',
  AWS:              'EC2, RDS, S3, CloudFront deployments',
  Vercel:           'Next.js deployments, edge functions, preview URLs',
  'CI/CD':          'GitHub Actions, automated test & deploy pipelines',
  'Express.js':     'REST APIs, middleware, routing, Node.js server',
  Django:           'DRF, REST API, OTP auth, admin dashboard',
  Python:           'Django DRF, data pipelines, scripting',
  Redis:            'BullMQ job queues, caching, pub/sub',
  cPanel:           'Web hosting, server management, deployment',
}

export default function SkillChip({ name, color, level }) {
  const [show, setShow] = useState(false)
  const entry     = ICON_MAP[name]
  const Icon      = entry?.Icon ?? null
  const iconColor = entry?.color ?? color

  return (
    <span className="relative mx-[3px] my-[3px] inline-flex align-middle">
      <span
        className="inline-flex cursor-default items-center gap-[7px] rounded-[4px] border border-line bg-bg3 px-[10px] py-[3px]"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {Icon ? (
          <Icon style={{ color: iconColor, fontSize: '14px', flexShrink: 0 }} />
        ) : (
          <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: iconColor }} />
        )}
        <span className="text-syn-string">{name}</span>
        <span className="flex items-center gap-[2px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-[3px] w-[14px] rounded-[1px]"
              style={{ background: i < level ? '#3fb950' : '#1e2d3d' }}
            />
          ))}
        </span>
      </span>

      {show && (
        <span className="pointer-events-none absolute bottom-full left-0 z-50 mb-[6px] w-[220px] rounded-[4px] border border-line bg-bg2 p-2 shadow-xl">
          <span className="mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              {Icon && <Icon style={{ color: iconColor, fontSize: '13px' }} />}
              <span className="text-label font-medium text-white">{name}</span>
            </span>
            <span
              className="rounded-[3px] px-1.5 py-[1px] text-micro font-medium"
              style={{ background: LEVEL_COLOR[level] + '22', color: LEVEL_COLOR[level] }}
            >
              {LEVEL_LABEL[level]}
            </span>
          </span>
          <span className="mb-2 flex gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="h-[4px] flex-1 rounded-[1px]"
                style={{ background: i < level ? LEVEL_COLOR[level] : '#1e2d3d' }}
              />
            ))}
          </span>
          <span className="block text-micro leading-relaxed text-muted">
            {SKILL_DESC[name] ?? `${name} — level ${level}/5`}
          </span>
          <span className="absolute -bottom-[5px] left-4 h-[8px] w-[8px] rotate-45 border-b border-r border-line bg-bg2" />
        </span>
      )}
    </span>
  )
}
