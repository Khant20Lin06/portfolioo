import { useEffect } from 'react'
import { useUI } from '../context/UIContext'
import { cv, me, contact } from '../data'

export default function CvModal() {
  const { cvOpen, setCvOpen } = useUI()

  useEffect(() => {
    if (!cvOpen) return
    const h = (e) => { if (e.key === 'Escape') setCvOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [cvOpen, setCvOpen])

  if (!cvOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px]"
        onClick={() => setCvOpen(false)}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-[6px] border border-line bg-bg2 shadow-2xl font-mono">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="flex items-center gap-2 text-label">
            <span className="text-[#e3b341]">📄</span>
            <span className="text-white font-medium">curriculum_vitae.pdf</span>
          </div>
          <button onClick={() => setCvOpen(false)} className="text-muted hover:text-syn-ident text-label transition-colors">✕</button>
        </div>

        {/* CV card preview */}
        <div className="px-5 py-6">

          {/* Fake PDF thumbnail */}
          <div className="mb-5 rounded-[4px] border border-line bg-bg3 p-5">
            {/* PDF header bar */}
            <div className="mb-4 flex items-center gap-2 border-b border-line pb-3">
              <span className="text-[#e3b341] text-[18px]">📄</span>
              <div>
                <div className="text-label font-medium text-white">{me.name}</div>
                <div className="text-micro text-muted">{me.title}</div>
              </div>
              <span className="ml-auto rounded-[3px] bg-[#e3b341]/20 px-2 py-[2px] text-micro text-[#e3b341]">PDF</span>
            </div>

            {/* Fake content lines */}
            <div className="space-y-[6px]">
              {/* Section: About */}
              <div className="text-micro font-semibold text-syn-func mb-1">CONTACT</div>
              {[
                { icon: '✉', val: contact.email },
                { icon: '⎔', val: contact.github },
                { icon: '✈', val: contact.telegram },
              ].map(({ icon, val }) => (
                <div key={val} className="flex items-center gap-2 text-micro text-muted">
                  <span className="w-4 text-center">{icon}</span>
                  <span>{val}</span>
                </div>
              ))}

              <div className="my-3 border-t border-line" />

              <div className="text-micro font-semibold text-syn-func mb-1">EXPERIENCE</div>
              <div className="flex items-baseline justify-between text-micro">
                <span className="text-syn-ident">{me.title}</span>
                <span className="text-muted">{me.experience} yrs</span>
              </div>
              <div className="flex gap-1 flex-wrap mt-1">
                {['React', 'Next.js', 'Express.js', 'Flutter', 'PostgreSQL'].map(t => (
                  <span key={t} className="rounded-[3px] border border-line px-1.5 py-[1px] text-micro text-muted">{t}</span>
                ))}
              </div>

              <div className="my-3 border-t border-line" />

              {/* Blurred lines simulating more content */}
              <div className="space-y-[5px] select-none pointer-events-none" style={{ filter: 'blur(3px)', opacity: 0.35 }}>
                {[90, 75, 85, 60, 80, 55, 70].map((w, i) => (
                  <div key={i} className="h-[6px] rounded-full bg-muted" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={cv.view}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-[4px] border border-line bg-bg3 px-4 py-3 text-label text-syn-ident transition-colors hover:border-accent-blue/50 hover:text-accent-blue"
            >
              <span>↗</span>
              <span>Open in Drive</span>
            </a>
            <a
              href={cv.download}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-[4px] border border-[#e3b341] bg-[#e3b341]/15 px-4 py-3 text-label font-medium text-[#e3b341] transition-colors hover:bg-[#e3b341]/25"
            >
              <span>↓</span>
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-line px-5 py-2 text-micro text-muted flex items-center justify-between">
          <span>Hosted on Google Drive</span>
          <span>Press <kbd className="rounded-[2px] border border-line px-1 py-[1px] text-micro">Esc</kbd> to close</span>
        </div>
      </div>
    </>
  )
}
