// Content views for non-portfolio.ts tabs
import { Cm, K, Str, P, Id, Prop } from './tokens'
import { me, contact } from '../data'

function ReadmeView() {
  return (
    <div className="flex-1 overflow-auto bg-bg p-8 font-mono text-label text-syn-ident">
      <div className="max-w-[680px] space-y-5">
        <h1 className="text-[22px] font-bold text-white"># {me.name}</h1>
        <p className="text-muted">{me.title} · {me.location}</p>
        <hr className="border-line" />

        <section>
          <h2 className="mb-2 text-[14px] font-semibold text-syn-func">## About</h2>
          <p className="leading-relaxed text-syn-ident/80">
            Senior full-stack engineer with {me.experience}+ years building products at scale.
            Shipped {me.shipped}+ projects for {me.clients}+ clients. Maintaining {me.uptime} uptime
            across distributed infrastructure.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[14px] font-semibold text-syn-func">## Quick Start</h2>
          <div className="rounded-[4px] border border-line bg-bg2 p-3 text-label">
            <div className="text-muted"># clone & run</div>
            <div><span className="text-accent-green">$</span> git clone https://{contact.github}</div>
            <div><span className="text-accent-green">$</span> cd portfolio && npm install</div>
            <div><span className="text-accent-green">$</span> npm run dev</div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-[14px] font-semibold text-syn-func">## Contact</h2>
          <div className="space-y-1 text-label">
            <div><span className="text-muted">Email:</span>{' '}
              <a href={`mailto:${contact.email}`} className="text-syn-string hover:underline">{contact.email}</a>
            </div>
            <div><span className="text-muted">GitHub:</span>{' '}
              <a href={`https://${contact.github}`} target="_blank" rel="noreferrer" className="text-syn-string hover:underline">{contact.github}</a>
            </div>
            <div><span className="text-muted">LinkedIn:</span>{' '}
              <a href={`https://linkedin.com/${contact.linkedin}`} target="_blank" rel="noreferrer" className="text-syn-string hover:underline">linkedin.com/{contact.linkedin}</a>
            </div>
            <div><span className="text-muted">Telegram:</span>{' '}
              <a href={`https://t.me/${contact.telegram.replace('@','')}`} target="_blank" rel="noreferrer" className="text-syn-string hover:underline">{contact.telegram}</a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-[14px] font-semibold text-syn-func">## Status</h2>
          <div className="flex items-center gap-2 text-label">
            <span className="text-accent-green">●</span>
            <span>Available for hire · {contact.availability} · {contact.rate}</span>
          </div>
        </section>

        <p className="pt-4 text-micro text-muted">
          Last updated: {new Date().toISOString().slice(0, 10)} · MIT License
        </p>
      </div>
    </div>
  )
}

function EnvView() {
  const vars = [
    { k: 'OWNER', v: me.name.toUpperCase().replace(' ', '_') },
    { k: 'ROLE', v: 'SENIOR_FULLSTACK_DEVELOPER' },
    { k: 'LOCATION', v: me.location.toUpperCase().replace(', ', '_') },
    { k: 'EXPERIENCE_YEARS', v: String(me.experience) },
    { k: 'EMAIL', v: contact.email },
    { k: 'GITHUB_URL', v: `https://${contact.github}` },
    { k: 'LINKEDIN_URL', v: `https://linkedin.com/${contact.linkedin}` },
    { k: 'TELEGRAM', v: contact.telegram },
    { k: 'HOURLY_RATE', v: contact.rate },
    { k: 'AVAILABLE', v: String(me.open).toUpperCase() },
    { k: 'AVAILABILITY_DATE', v: contact.availability },
    { k: 'JWT_SECRET', v: '••••••••••••••••••••••••••••••••' },
    { k: 'DATABASE_URL', v: 'postgresql://••••••••@db.host:5432/portfolio' },
    { k: 'API_KEY', v: '••••••••••••••••••••••••••••••••••••' },
    { k: 'NEXT_PUBLIC_ENV', v: 'production' },
  ]

  return (
    <div className="flex-1 overflow-auto bg-bg p-6 font-mono">
      <div className="mb-4 flex items-center gap-2 text-micro text-muted">
        <span className="text-accent-yellow">⚠</span>
        <span>Sensitive values are redacted · Do not commit this file</span>
      </div>
      <div className="space-y-[3px]">
        {vars.map(({ k, v }, i) => {
          const isSecret = v.includes('•')
          return (
            <div key={k} className="flex items-baseline gap-0 text-label leading-[22px]">
              <span className="text-syn-ident">{k}</span>
              <span className="text-syn-punc">=</span>
              <span className={isSecret ? 'text-muted' : 'text-syn-string'}>{v}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-6 text-micro text-muted"># {vars.length} variables loaded</div>
    </div>
  )
}

export default function TabContent({ tab }) {
  if (tab === 'README.md') return <ReadmeView />
  if (tab === '.env') return <EnvView />
  return null
}
