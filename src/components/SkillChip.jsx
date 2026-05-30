import { useState, useRef } from 'react'

const LEVEL_LABEL = ['', 'Beginner', 'Familiar', 'Proficient', 'Advanced', 'Expert']
const LEVEL_COLOR = ['', '#586675', '#e3b341', '#f0883e', '#58a6ff', '#3fb950']

const SKILL_DESC = {
  TypeScript: 'Strict typing, generics, utility types, compiler config',
  React:      'Hooks, context, concurrent features, RSC',
  'Next.js':  'App router, SSR/SSG, server actions, edge runtime',
  Tailwind:   'Utility-first CSS, custom design systems',
  Vue:        'Composition API, Pinia, Nuxt.js',
  'Node.js':  'Event loop, streams, cluster, performance tuning',
  Python:     'FastAPI, async, data pipelines, scripting',
  Go:         'Goroutines, channels, gRPC services',
  PostgreSQL: 'Query optimisation, indexes, partitioning',
  GraphQL:    'Schema design, resolvers, federation',
  Docker:     'Multi-stage builds, compose, networking',
  Kubernetes: 'Deployments, HPA, Helm charts, service mesh',
  AWS:        'ECS, Lambda, RDS, CloudFront, CDK',
  Terraform:  'Modules, state management, workspaces',
  'CI/CD':    'GitHub Actions, ArgoCD, zero-downtime deploys',
}

export default function SkillChip({ name, color, level }) {
  const [show, setShow] = useState(false)
  const ref = useRef(null)

  return (
    <span className="relative mx-[3px] my-[3px] inline-flex align-middle">
      <span
        ref={ref}
        className="inline-flex cursor-default items-center gap-2 rounded-[4px] border border-line bg-bg3 px-[10px] py-[3px]"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: color }} />
        <span className="text-syn-string">{name}</span>
        <span className="flex items-center gap-[2px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-[3px] w-[14px] rounded-[1px] transition-colors"
              style={{ background: i < level ? '#3fb950' : '#1e2d3d' }}
            />
          ))}
        </span>
      </span>

      {/* VS Code-style tooltip */}
      {show && (
        <span className="pointer-events-none absolute bottom-full left-0 z-50 mb-[6px] w-[220px] rounded-[4px] border border-line bg-bg2 p-2 shadow-xl">
          {/* Header */}
          <span className="mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="h-[8px] w-[8px] rounded-full" style={{ background: color }} />
              <span className="text-label font-medium text-white">{name}</span>
            </span>
            <span
              className="rounded-[3px] px-1.5 py-[1px] text-micro font-medium"
              style={{ background: LEVEL_COLOR[level] + '22', color: LEVEL_COLOR[level] }}
            >
              {LEVEL_LABEL[level]}
            </span>
          </span>
          {/* Level bar full width */}
          <span className="mb-2 flex gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="h-[4px] flex-1 rounded-[1px]"
                style={{ background: i < level ? LEVEL_COLOR[level] : '#1e2d3d' }}
              />
            ))}
          </span>
          {/* Description */}
          <span className="block text-micro leading-relaxed text-muted">
            {SKILL_DESC[name] ?? `${name} proficiency level ${level}/5`}
          </span>
          {/* Arrow */}
          <span className="absolute -bottom-[5px] left-4 h-[8px] w-[8px] rotate-45 border-b border-r border-line bg-bg2" />
        </span>
      )}
    </span>
  )
}
