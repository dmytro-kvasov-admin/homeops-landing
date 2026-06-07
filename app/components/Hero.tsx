'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type Variant = 'A' | 'B'

const VARIANTS = {
  A: {
    sub: 'Tell HomeOps how many dinners you need and your budget — it picks the meals, builds the list, and ends the "what\'s for dinner?" question before it starts. No typing.',
    badge: 'Voice-first grocery planning',
  },
  B: {
    sub: 'Pick five dinners. See your exact total at Walmart, Kroger, and other major stores before you leave home. The grocery budget app that shows what you\'ll spend before you shop.',
    badge: 'Cross-store price comparison',
  },
} as const

function getOrAssignVariant(): Variant {
  if (typeof window === 'undefined') return 'B'
  const stored = localStorage.getItem('ab_hero_variant') as Variant | null
  if (stored === 'A' || stored === 'B') return stored
  const assigned: Variant = Math.random() < 0.5 ? 'A' : 'B'
  localStorage.setItem('ab_hero_variant', assigned)
  return assigned
}

const avatars = [
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD5DIZ5D4CjnbTNkSszC6a10nRfeXDt5Z-jK9x8UHxkOUIiiPkfkHQt_cz9aRe--Bn6gde9GHHLzKCNL_K43cMKTaz3gPfW8sIdSfZ208HAPzOg22GdNr8DDAvCelShcpKW9_aASERvUUpYIFAxOy3654N7VrTYWIreiyKR5uHCmU8bpkX6_JfTXsmeROL0P-LlH-raCaTz4WOf7VWKzOQAFAnx56jLWtQG7SmqsY3kdexurGf2wydEgZkIOhPGch3GGy_HmIkm8o', alt: 'HomeOps user' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcA2x07Cxf-1jR635ozoXGei8AwHDc2B_LAAJ71mywqHw_nET2sP_kv7rOPuC84Lp0bzf6LNoOuygZMPofSXAuREGQN8UJ6PHCAAPMTwWN4HaH5uP6bWZlVICprPeZjAGKCy_hMiqIj7uRVERrYLSve1V-jl6nFY8ByKlzyb7J6jiJHa4nb8YlGNQkKvM43isCtEcNALeC6UZDShbRrPYV8K7SSNTrzIMWlPTTsmRKEVuTIpL9TUt2_HBhJcjrEO8O332Y0CFKcp8', alt: 'HomeOps user' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ6sr54PJjsNAecPgHoRft_h0Idmdi9WftmG2QrS5QKGWdIDimoreoisWoLnN4UN0dAqMAOBzxrgi2-YOmQDfOeSBxpFWErnGD32uEgrcQbynWuKvu9S9RMQuovKzsbZpZZ8-aoIWpU95ACGH9ubr4RvmoAdmZWvpUowE_aS54TxvDMkW1v4jhTvOdlAYADimEDzDr5g-tuGMHYc9SVOhnY9TW5qpO7hx039DX30zZnBuJqNr5YUMqy6aW5tEZmZw09SpabS1jVc8', alt: 'HomeOps user' },
]

export function Hero() {
  const [variant, setVariant] = useState<Variant>('B')
  const [email, setEmail] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    setVariant(getOrAssignVariant())
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || formStatus === 'loading') return

    setFormStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setFormStatus('success')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const copy = VARIANTS[variant]

  return (
    <section className="relative overflow-hidden py-24 px-8">
      {/* Gradient ambient blob */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,74,198,0.07) 0%, rgba(106,30,219,0.05) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text + form */}
          <div style={{ zIndex: 1 }}>
            {/* Eyebrow */}
            <div style={{ marginBottom: '24px' }}>
              <span className="ai-chip">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                {copy.badge}
              </span>
            </div>

            <h1
              className="font-headline"
              style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                lineHeight: '1.08',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#151c27',
                marginBottom: '24px',
              }}
            >
              The grocery budget app that plans meals, compares prices, and{' '}
              <span style={{ color: '#004ac6' }}>shops by voice</span>
            </h1>

            <p
              className="font-body"
              style={{
                fontSize: 'clamp(17px, 2vw, 20px)',
                lineHeight: '1.6',
                color: '#434655',
                marginBottom: '40px',
                maxWidth: '520px',
              }}
            >
              {copy.sub}
            </p>

            {/* Form */}
            {formStatus === 'success' ? (
              <div
                style={{
                  padding: '24px 32px',
                  background: 'rgba(0,74,198,0.06)',
                  borderRadius: '16px',
                  maxWidth: '480px',
                }}
              >
                <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '18px', fontWeight: 700, color: '#004ac6', margin: '0 0 8px' }}>
                  You&apos;re on the list.
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: '#434655', margin: '0 0 4px' }}>
                  We&apos;ll reach out when early access opens. No spam, ever.
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#6b7280', margin: 0 }}>
                  Confirmation email sent to <strong style={{ color: '#434655' }}>{email}</strong>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
                style={{ maxWidth: '520px', marginBottom: '32px' }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={formStatus === 'loading'}
                  className="font-body flex-grow"
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    background: '#e2e8f8',
                    border: 'none',
                    fontSize: '16px',
                    color: '#151c27',
                    outline: 'none',
                    transition: 'background 150ms ease, box-shadow 150ms ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.background = '#ffffff'
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,74,198,0.2)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.background = '#e2e8f8'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="btn-primary"
                  style={{ padding: '16px 28px', fontSize: '15px', whiteSpace: 'nowrap' }}
                >
                  {formStatus === 'loading' ? 'Joining...' : 'Request early access'}
                </button>
              </form>
            )}

            {formStatus === 'error' && (
              <p className="font-body" style={{ fontSize: '14px', color: '#ba1a1a', marginBottom: '16px' }}>
                Something went wrong. Try again.
              </p>
            )}

            {formStatus !== 'success' && (
              <p className="font-body" style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px', marginTop: '-16px' }}>
                Your email stays private — we never share or sell it.
              </p>
            )}

            {/* Social proof avatars */}
            <div className="flex items-center gap-4">
              <div className="flex" style={{ gap: 0 }}>
                {avatars.map((av, i) => (
                  <div
                    key={i}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '3px solid #f9f9ff',
                      overflow: 'hidden',
                      marginLeft: i > 0 ? '-10px' : '0',
                      position: 'relative',
                      zIndex: 3 - i,
                    }}
                  >
                    <Image src={av.src} alt={av.alt} width={40} height={40} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                ))}
              </div>
              <span className="font-body" style={{ fontSize: '14px', color: '#434655', fontWeight: 500 }}>
                Join <strong style={{ color: '#151c27' }}>500+ households</strong> on the waitlist
              </span>
            </div>
          </div>

          {/* Right — single phone mockup */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Ambient blob */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '140%',
                height: '140%',
                background: 'radial-gradient(ellipse at center, rgba(0,74,198,0.08) 0%, rgba(106,30,219,0.06) 50%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
            <Image
              src="/images/appDesign/home.png"
              alt="HomeOps home screen"
              width={300}
              height={637}
              style={{
                borderRadius: '32px',
                boxShadow: '0px 32px 64px -16px rgba(21, 28, 39, 0.18)',
                display: 'block',
                height: 'auto',
              }}
              unoptimized
            />
          </div>

        </div>
      </div>
    </section>
  )
}
