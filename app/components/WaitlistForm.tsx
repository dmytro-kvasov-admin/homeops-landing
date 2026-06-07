'use client'

import { useState } from 'react'

const AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+']

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.12)',
  border: '1px solid rgba(255,255,255,0.2)',
  fontSize: '15px',
  color: '#ffffff',
  outline: 'none',
  fontFamily: 'var(--font-inter)',
  transition: 'background 150ms ease, border-color 150ms ease, box-shadow 150ms ease',
  boxSizing: 'border-box',
}

const focusStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.18)',
  borderColor: 'rgba(255,255,255,0.45)',
  boxShadow: '0 0 0 3px rgba(255,255,255,0.1)',
}

const blurStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.12)',
  borderColor: 'rgba(255,255,255,0.2)',
  boxShadow: 'none',
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-inter)',
        }}
      >
        {label}
        {!required && (
          <span style={{ fontWeight: 400, marginLeft: '6px', opacity: 0.6, textTransform: 'none', letterSpacing: 0 }}>
            optional
          </span>
        )}
      </label>
      {children}
    </div>
  )
}

export function WaitlistForm() {
  const [form, setForm] = useState({ name: '', email: '', age: '', zip: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="waitlist"
      className="py-32 px-8"
      aria-label="Join the waitlist"
    >
      <div className="container">
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #004ac6 0%, #2563eb 60%, #6a1edb 100%)',
            borderRadius: '24px',
            padding: 'clamp(48px, 7vw, 80px) clamp(32px, 6vw, 64px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0px 24px 48px -12px rgba(0, 74, 198, 0.35)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(0,74,198,0.9) 0%, rgba(37,99,235,0.85) 50%, rgba(106,30,219,0.8) 100%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center' }}>
                <h2
                  className="font-headline"
                  style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '16px' }}
                >
                  You&apos;re on the list
                </h2>
                <p className="font-body" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '12px' }}>
                  We&apos;ll reach out when early access opens. No spam, ever.
                </p>
                <p className="font-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6' }}>
                  A confirmation email is on its way to <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{form.email}</strong>
                </p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h2
                    className="font-headline"
                    style={{
                      fontSize: 'clamp(26px, 4vw, 44px)',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '-0.03em',
                      marginBottom: '16px',
                      lineHeight: '1.1',
                    }}
                  >
                    Back-to-school grocery season is coming. Get your budget under control before prices spike.
                  </h2>
                  <p
                    className="font-body"
                    style={{ fontSize: '17px', color: 'rgba(219,225,255,0.85)', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto' }}
                  >
                    Join 500+ households who are done overspending. Plan meals on a budget, compare grocery prices at Walmart, Kroger, and more — and stop wasting food.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* 2-column grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '16px',
                      marginBottom: '16px',
                    }}
                  >
                    <Field label="First name">
                      <input
                        type="text"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Sarah"
                        disabled={status === 'loading'}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
                      />
                    </Field>

                    <Field label="Email" required>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="sarah@example.com"
                        required
                        disabled={status === 'loading'}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
                      />
                    </Field>

                    <Field label="Age range" required>
                      <select
                        value={form.age}
                        onChange={set('age')}
                        required
                        disabled={status === 'loading'}
                        style={{
                          ...inputStyle,
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.5)' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 16px center',
                          paddingRight: '40px',
                          color: form.age ? '#ffffff' : 'rgba(255,255,255,0.45)',
                        }}
                        onFocus={(e) => Object.assign(e.currentTarget.style, { ...focusStyle, color: '#ffffff' })}
                        onBlur={(e) => Object.assign(e.currentTarget.style, { ...blurStyle, color: form.age ? '#ffffff' : 'rgba(255,255,255,0.45)' })}
                      >
                        <option value="" disabled style={{ color: '#151c27', background: '#1e3a8a' }}>Select your age range</option>
                        {AGE_RANGES.map((r) => (
                          <option key={r} value={r} style={{ color: '#151c27', background: '#ffffff' }}>{r}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label="ZIP code" required>
                      <input
                        type="text"
                        value={form.zip}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '').slice(0, 5)
                          setForm((prev) => ({ ...prev, zip: v }))
                        }}
                        placeholder="90210"
                        required
                        pattern="\d{5}"
                        inputMode="numeric"
                        maxLength={5}
                        disabled={status === 'loading'}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
                      />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="font-headline font-bold"
                    style={{
                      width: '100%',
                      padding: '16px 28px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      color: '#004ac6',
                      border: 'none',
                      fontSize: '16px',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      opacity: status === 'loading' ? 0.7 : 1,
                      transition: 'background 150ms ease, transform 150ms ease',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                      marginTop: '8px',
                    }}
                    onMouseEnter={(e) => {
                      if (status !== 'loading') {
                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.92)'
                        ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#ffffff'
                      ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                    }}
                  >
                    {status === 'loading' ? 'Joining...' : 'Request early access'}
                  </button>

                  {status === 'error' && (
                    <p className="font-body" style={{ fontSize: '14px', color: 'rgba(255,150,150,1)', marginTop: '12px', textAlign: 'center' }}>
                      Something went wrong. Try again.
                    </p>
                  )}
                </form>

                {/* Privacy block */}
                <div
                  style={{
                    marginTop: '32px',
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <p
                    className="font-label"
                    style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}
                  >
                    Why we ask &amp; how we protect your data
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { icon: 'info', text: 'We collect name, email, age, and ZIP to personalize your early access experience and estimate regional savings.' },
                      { icon: 'block', text: 'Your data is never sold or shared with advertisers, data brokers, or third parties.' },
                      { icon: 'lock', text: 'We never use your information for advertising, profiling, or targeting.' },
                    ].map((item) => (
                      <div key={item.icon} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', flexShrink: 0, marginTop: '1px' }}
                        >
                          {item.icon}
                        </span>
                        <p className="font-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.55', margin: 0 }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="font-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '16px' }}>
                    No credit card required &middot; Invite-only access &middot; Launching summer 2026
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
