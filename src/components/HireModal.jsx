import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = 'service_rvjg5ol'
const TEMPLATE_ID = 'template_ocuv3z2'
const PUBLIC_KEY  = 'Ric4KtiWreKI-f5KB'

const STATUS = { idle: 'idle', sending: 'sending', sent: 'sent', error: 'error' }

export default function HireModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', title: '', message: '' })
  const [status, setStatus] = useState(STATUS.idle)
  const [errors, setErrors] = useState({})
  const nameRef = useRef(null)

  // Focus name field when modal opens
  useEffect(() => {
    if (open) {
      setStatus(STATUS.idle)
      setErrors({})
      setTimeout(() => nameRef.current?.focus(), 80)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  if (!open) return null

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Required'
    if (!form.email.trim())   e.email   = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const send = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus(STATUS.sending)
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name:    form.name,
          email:   form.email,
          title:   form.title || '(no subject)',
          message: form.message,
        },
        PUBLIC_KEY
      )
      setStatus(STATUS.sent)
      setForm({ name: '', email: '', title: '', message: '' })
    } catch {
      setStatus(STATUS.error)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-[6px] border border-line bg-bg2 shadow-2xl font-mono">

        {/* Header — VS Code style */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="flex items-center gap-2 text-label">
            <span className="text-accent-green">✉</span>
            <span className="text-white font-medium">hire(</span>
            <span className="text-syn-type">Company</span>
            <span className="text-white font-medium">)</span>
            <span className="text-muted ml-1">— send message</span>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-syn-ident text-label transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Sent state */}
        {status === STATUS.sent ? (
          <div className="px-6 py-10 text-center">
            <div className="mb-3 text-[32px]">✓</div>
            <div className="mb-1 text-label font-medium text-accent-green">Message sent!</div>
            <div className="text-micro text-muted mb-6">
              I'll get back to you as soon as possible.
            </div>
            <button
              onClick={onClose}
              className="rounded-[4px] border border-accent-green bg-accent-green/15 px-4 py-2 text-label text-accent-green hover:bg-accent-green/25 transition-colors"
            >
              close
            </button>
          </div>
        ) : (
          <form onSubmit={send} className="px-5 py-4 space-y-3">

            {/* Row: name + email */}
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="from_name"
                placeholder="Your name"
                value={form.name}
                onChange={set('name')}
                error={errors.name}
                ref={nameRef}
              />
              <Field
                label="from_email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={set('email')}
                error={errors.email}
              />
            </div>

            {/* Subject */}
            <Field
              label="title"
              placeholder="What are you working on? (optional)"
              value={form.title}
              onChange={set('title')}
            />

            {/* Message */}
            <Field
              label="message"
              placeholder="Tell me about the project, timeline, budget…"
              value={form.message}
              onChange={set('message')}
              error={errors.message}
              multiline
              rows={5}
            />

            {/* Error banner */}
            {status === STATUS.error && (
              <div className="rounded-[4px] border border-[#ff7b72]/40 bg-[#ff7b72]/10 px-3 py-2 text-micro text-[#ff7b72]">
                ✖ Failed to send. Check your connection and try again.
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-micro text-muted">
                Powered by EmailJS · free tier
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-[4px] border border-line px-3 py-[5px] text-label text-muted hover:text-syn-ident transition-colors"
                >
                  cancel
                </button>
                <button
                  type="submit"
                  disabled={status === STATUS.sending}
                  className="flex items-center gap-2 rounded-[4px] border border-accent-green bg-accent-green/15 px-4 py-[5px] text-label font-medium text-accent-green hover:bg-accent-green/25 disabled:opacity-50 transition-colors"
                >
                  {status === STATUS.sending ? (
                    <><Spinner /> sending…</>
                  ) : (
                    <>✉ send message</>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

// ── Field component ───────────────────────────────────────────────────
import { forwardRef } from 'react'

const Field = forwardRef(function Field(
  { label, type = 'text', placeholder, value, onChange, error, multiline, rows = 3 },
  ref
) {
  const base =
    'w-full rounded-[3px] border bg-bg px-3 py-[6px] text-label text-syn-ident outline-none transition-colors placeholder:text-muted ' +
    (error
      ? 'border-[#ff7b72]/60 focus:border-[#ff7b72]'
      : 'border-line focus:border-accent-blue/60')

  return (
    <div>
      {/* Label looks like a TS comment */}
      <div className="mb-1 text-micro text-syn-comment">
        // {label}
        {error && <span className="ml-2 text-[#ff7b72]">← {error}</span>}
      </div>
      {multiline ? (
        <textarea
          ref={ref}
          className={base + ' resize-none leading-relaxed'}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          ref={ref}
          type={type}
          className={base}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  )
})

function Spinner() {
  return (
    <span className="inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-accent-green border-t-transparent" />
  )
}
