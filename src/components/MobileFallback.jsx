// Shown on screens narrower than 768px — IDE layout doesn't work on mobile.
import { contact, me } from '../data'

export default function MobileFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 font-mono text-syn-ident">
      {/* Editor icon */}
      <div className="mb-6 flex h-[64px] w-[64px] items-center justify-center rounded-[12px] border border-line bg-bg2 text-[28px]">
        {'</>'}
      </div>

      <h1 className="mb-1 text-[16px] font-bold text-white">{me.name}</h1>
      <p className="mb-6 text-label text-muted">{me.title}</p>

      {/* IDE notice */}
      <div className="mb-8 w-full max-w-[320px] rounded-[6px] border border-accent-blue/30 bg-bg2 px-4 py-3">
        <div className="mb-1 flex items-center gap-2 text-label text-accent-blue">
          <span>💡</span>
          <span>Best viewed in a desktop browser</span>
        </div>
        <p className="text-micro text-muted leading-relaxed">
          This portfolio is rendered as a VS Code editor. Open it on a laptop or desktop
          for the full IDE experience.
        </p>
      </div>

      {/* Quick contact links */}
      <div className="w-full max-w-[320px] space-y-2">
        <a
          href={`mailto:${contact.email}?subject=Let's work together`}
          className="flex items-center gap-3 rounded-[4px] border border-line bg-bg2 px-4 py-3 text-label text-syn-ident hover:border-accent-green hover:text-accent-green"
        >
          <span className="text-muted">✉</span>
          <span>{contact.email}</span>
        </a>
        <a
          href={`https://${contact.github}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-[4px] border border-line bg-bg2 px-4 py-3 text-label text-syn-ident hover:border-accent-blue hover:text-accent-blue"
        >
          <span className="text-muted">⎔</span>
          <span>{contact.github}</span>
        </a>
        <a
          href={`https://linkedin.com/${contact.linkedin}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-[4px] border border-line bg-bg2 px-4 py-3 text-label text-syn-ident hover:border-[#0077b5] hover:text-[#0077b5]"
        >
          <span className="text-muted">⬡</span>
          <span>linkedin.com/{contact.linkedin}</span>
        </a>
        <a
          href={`https://t.me/${contact.telegram.replace('@','')}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-[4px] border border-line bg-bg2 px-4 py-3 text-label text-syn-ident hover:border-[#29a9ea] hover:text-[#29a9ea]"
        >
          <span className="text-muted">✈</span>
          <span>{contact.telegram}</span>
        </a>
      </div>

      <div className="mt-8 flex items-center gap-2 text-micro text-muted">
        <span className="text-accent-green">●</span>
        <span>Available · {contact.rate} · {contact.availability}</span>
      </div>
    </div>
  )
}
