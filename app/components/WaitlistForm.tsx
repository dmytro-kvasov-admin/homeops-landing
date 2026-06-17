'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import posthog from 'posthog-js'

const ERROR_BORDER = 'rgba(255,120,120,0.9)'
const ERROR_SHADOW = '0 0 0 3px rgba(255,90,90,0.18)'

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

const errorStyle: React.CSSProperties = {
  borderColor: ERROR_BORDER,
  boxShadow: ERROR_SHADOW,
  background: 'rgba(255,80,80,0.08)',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ClientMetadata = {
  userAgent?: string
  language?: string
  timezone?: string
  viewport?: { width: number; height: number }
  screen?: { width: number; height: number; dpr: number }
  referrer?: string
  landingUrl?: string
  submitUrl?: string
  utm?: {
    source?: string
    medium?: string
    campaign?: string
    term?: string
    content?: string
  }
  gclid?: string
  fbclid?: string
  connection?: string
  timeOnPageMs?: number
}

function collectMetadata(landingUrl: string, mountedAt: number, landingReferrer: string): ClientMetadata {
  if (typeof window === 'undefined') return {}
  const nav = window.navigator

  let timezone: string | undefined
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    // older browsers / blocked APIs — leave undefined
  }

  let connection: string | undefined
  const conn = (nav as Navigator & { connection?: { effectiveType?: string } }).connection
  if (conn && typeof conn.effectiveType === 'string') connection = conn.effectiveType

  let utm: ClientMetadata['utm']
  let gclid: string | undefined
  let fbclid: string | undefined
  try {
    const initial = new URL(landingUrl)
    const params = initial.searchParams
    const candidate = {
      source: params.get('utm_source') || undefined,
      medium: params.get('utm_medium') || undefined,
      campaign: params.get('utm_campaign') || undefined,
      term: params.get('utm_term') || undefined,
      content: params.get('utm_content') || undefined,
    }
    if (Object.values(candidate).some(Boolean)) utm = candidate
    gclid = params.get('gclid') || undefined
    fbclid = params.get('fbclid') || undefined
  } catch {
    // invalid URL — ignore
  }

  return {
    userAgent: nav.userAgent,
    language: nav.language,
    timezone,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      dpr: window.devicePixelRatio,
    },
    referrer: landingReferrer || undefined,
    landingUrl,
    submitUrl: window.location.href,
    utm,
    gclid,
    fbclid,
    connection,
    timeOnPageMs: Date.now() - mountedAt,
  }
}

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(true)

  const mountedAtRef = useRef<number>(0)
  const landingUrlRef = useRef<string>('')
  const landingReferrerRef = useRef<string>('')
  const focusedOnceRef = useRef(false)

  useEffect(() => {
    mountedAtRef.current = Date.now()
    landingUrlRef.current = window.location.href
    landingReferrerRef.current = document.referrer
    posthog.capture('waitlist_form_viewed')
  }, [])

  const emailError = useMemo(() => {
    if (!email.trim()) return 'Email is required'
    if (!EMAIL_RE.test(email.trim())) return 'Enter a valid email address'
    return null
  }, [email])

  const isValid = emailError === null
  const showError = Boolean(emailError) && (touched || submitAttempted)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitAttempted(true)

    posthog.capture('waitlist_submit_clicked', {
      valid: isValid,
      time_on_page_ms: Date.now() - (mountedAtRef.current || Date.now()),
    })

    if (status === 'loading') return
    if (!isValid) {
      posthog.capture('waitlist_submit_invalid', { reason: emailError ?? 'unknown' })
      return
    }

    setStatus('loading')
    setErrorMessage(null)

    const trimmedEmail = email.trim()
    const metadata = collectMetadata(
      landingUrlRef.current || (typeof window !== 'undefined' ? window.location.href : ''),
      mountedAtRef.current || Date.now(),
      landingReferrerRef.current,
    )

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, metadata }),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setConfirmationEmailSent(data?.confirmationEmailSent !== false)
        setStatus('success')
        posthog.identify(trimmedEmail, { email: trimmedEmail })
        posthog.capture('waitlist_signup_success', {
          time_on_page_ms: Date.now() - (mountedAtRef.current || Date.now()),
        })
      } else {
        setStatus('error')
        const message = typeof data?.error === 'string' ? data.error : `Request failed (${res.status})`
        setErrorMessage(message)
        posthog.capture('waitlist_signup_failed', {
          status: res.status,
          error: message,
        })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error'
      setStatus('error')
      setErrorMessage(message)
      posthog.capture('waitlist_signup_failed', { status: 0, error: message })
    }
  }

  return (
    <section
      id="waitlist"
      className="py-16 px-4 sm:py-32 sm:px-8"
      aria-label="Join the waitlist"
    >
      <div className="container">
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #004ac6 0%, #2563eb 60%, #6a1edb 100%)',
            borderRadius: '24px',
            padding: 'clamp(28px, 7vw, 80px) clamp(20px, 6vw, 64px)',
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
                  style={{ fontSize: 'clamp(22px, 5vw, 48px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '16px' }}
                >
                  You&apos;re on the list
                </h2>
                <p className="font-body" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '12px' }}>
                  We&apos;ll reach out at <strong style={{ color: 'rgba(255,255,255,0.95)' }}>{email}</strong> when early access opens. No spam, ever.
                </p>
                {confirmationEmailSent && (
                  <p className="font-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6' }}>
                    A confirmation email is on its way.
                  </p>
                )}
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h2
                    className="font-headline"
                    style={{
                      fontSize: 'clamp(20px, 4vw, 44px)',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '-0.03em',
                      marginBottom: '16px',
                      lineHeight: '1.15',
                      overflowWrap: 'break-word',
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    <label
                      htmlFor="waitlist-email"
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: showError ? '#ffb4b4' : 'rgba(255,255,255,0.6)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-inter)',
                      }}
                    >
                      Email
                      <span style={{ color: '#ff8a8a', marginLeft: '4px' }}>*</span>
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={(e) => {
                        setTouched(true)
                        Object.assign(e.currentTarget.style, showError ? errorStyle : blurStyle)
                      }}
                      placeholder="sarah@example.com"
                      autoComplete="email"
                      required
                      aria-invalid={showError || undefined}
                      disabled={status === 'loading'}
                      style={{ ...inputStyle, ...(showError ? errorStyle : null) }}
                      onFocus={(e) => {
                        Object.assign(e.currentTarget.style, focusStyle)
                        if (!focusedOnceRef.current) {
                          focusedOnceRef.current = true
                          posthog.capture('waitlist_email_focused')
                        }
                      }}
                    />
                    {showError && emailError && (
                      <p
                        role="alert"
                        style={{
                          margin: 0,
                          fontSize: '12px',
                          color: '#ffb4b4',
                          fontFamily: 'var(--font-inter)',
                          lineHeight: 1.4,
                        }}
                      >
                        {emailError}
                      </p>
                    )}
                  </div>

                  {(() => {
                    const submitDisabled = status === 'loading' || !isValid
                    return (
                      <button
                        type="submit"
                        disabled={submitDisabled}
                        className="font-headline font-bold"
                        style={{
                          width: '100%',
                          padding: '16px 28px',
                          borderRadius: '12px',
                          background: '#ffffff',
                          color: '#004ac6',
                          border: 'none',
                          fontSize: '16px',
                          cursor: submitDisabled ? 'not-allowed' : 'pointer',
                          opacity: submitDisabled ? 0.55 : 1,
                          transition: 'background 150ms ease, transform 150ms ease',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                          marginTop: '8px',
                        }}
                        onMouseEnter={(e) => {
                          if (!submitDisabled) {
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
                    )
                  })()}

                  {status === 'error' && (
                    <p className="font-body" style={{ fontSize: '14px', color: 'rgba(255,150,150,1)', marginTop: '12px', textAlign: 'center' }}>
                      {errorMessage || 'Something went wrong. Try again.'}
                    </p>
                  )}
                </form>

                <p
                  className="font-body"
                  style={{
                    marginTop: '24px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'center',
                    lineHeight: 1.6,
                  }}
                >
                  Email only. No name, address, or phone. Unsubscribe anytime — we don&apos;t sell or share your data.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
