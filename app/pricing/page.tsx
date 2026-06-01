import type { Metadata } from 'next'
import { WaitlistForm } from '@/app/components/WaitlistForm'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Pricing — HomeOps: AI Meal Planner + Grocery Budget App',
  description:
    'Start free with 3 AI meal plans per month. Pro at $4.99/month adds voice input, Walmart vs Kroger price comparison, and weekly budget tracking. Pays for itself after one shopping trip.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'HomeOps Pricing — Start Free, Go Pro for $4.99/mo',
    description:
      'Free plan available. Pro at $4.99/month: unlimited meal plans, voice input, grocery price comparison, weekly budget tracker. No credit card to join the waitlist.',
  },
}

export default function PricingPage() {
  return (
    <main className="container" style={{ paddingTop: '64px', paddingBottom: '96px' }}>
      <div style={{ marginBottom: '56px', maxWidth: '520px' }}>
        <div className="section-label" style={{ marginBottom: '16px' }}>
          Pricing
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-manrope), system-ui, sans-serif',
            fontSize: 'clamp(36px, 4vw, 56px)',
            lineHeight: '1.05',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: '#151c27',
            marginBottom: '12px',
          }}
        >
          Simple pricing
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#434655',
          }}
        >
          Start free. Upgrade when you&apos;re ready.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr]"
        style={{ gap: '24px', alignItems: 'start' }}
      >
        {/* Free tier */}
        <div
          style={{
            padding: '32px',
            border: '1.5px solid rgba(195, 198, 215, 0.5)',
            borderRadius: '16px',
            background: '#ffffff',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-manrope), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: '#434655',
              marginBottom: '8px',
            }}
          >
            Free
          </div>
          <div style={{ marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '40px',
                fontWeight: 900,
                color: '#151c27',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              $0
            </span>
            <span
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '14px',
                color: '#434655',
              }}
            >
              /month
            </span>
          </div>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 20px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {[
              { text: '3 AI meal plans per month', included: true },
              { text: 'Basic grocery list', included: true },
              { text: 'No credit card needed', included: true },
              { text: 'No store price comparison', included: false },
              { text: 'No budget tracking', included: false },
            ].map((feature) => (
              <li
                key={feature.text}
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '15px',
                  lineHeight: '1.5',
                  color: feature.included ? '#434655' : '#9ca3af',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ color: feature.included ? '#004ac6' : '#d1d5db', fontWeight: 700, flexShrink: 0 }}>—</span>
                {feature.text}
              </li>
            ))}
          </ul>

          <a
            href="#waitlist"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '14px',
              color: '#004ac6',
              textDecoration: 'underline',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            Start free
          </a>
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '12px',
              color: '#9ca3af',
              lineHeight: '1.5',
            }}
          >
            Price comparison — the feature that saves $80+/month — is Pro only.
          </p>
        </div>

        {/* Pro tier — recommended */}
        <div
          style={{
            padding: '40px',
            background: '#151c27',
            color: '#f9f9ff',
            borderRadius: '20px',
            position: 'relative',
            boxShadow: '0px 24px 48px -12px rgba(21, 28, 39, 0.20)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-1px',
              right: '24px',
              background: 'linear-gradient(180deg, #004ac6 0%, #2563eb 100%)',
              color: '#ffffff',
              fontFamily: 'var(--font-manrope), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              padding: '4px 12px',
              borderRadius: '0 0 10px 10px',
            }}
          >
            Recommended
          </div>

          <div
            style={{
              fontFamily: 'var(--font-manrope), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: 'rgba(249, 249, 255, 0.5)',
              marginBottom: '8px',
            }}
          >
            Pro
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '48px',
                fontWeight: 900,
                color: '#f9f9ff',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              $4.99
            </span>
            <span
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '14px',
                color: 'rgba(249, 249, 255, 0.5)',
              }}
            >
              /month
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '13px',
              color: 'rgba(249,249,255,0.5)',
              marginBottom: '20px',
            }}
          >
            Pays for itself after one shopping trip.
          </p>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 32px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {[
              'Unlimited meal plans',
              'Voice input',
              'Grocery price comparison (Walmart vs Kroger)',
              'Weekly budget tracker',
              'Multi-store price split — lowest price on every item',
            ].map((feature) => (
              <li
                key={feature}
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '15px',
                  lineHeight: '1.5',
                  color: 'rgba(249, 249, 255, 0.8)',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ color: '#2563eb', fontWeight: 700, flexShrink: 0 }}>—</span>
                {feature}
              </li>
            ))}
          </ul>

          <a
            href="#waitlist"
            className="btn-primary"
            style={{ width: '100%', padding: '16px 32px', fontSize: '16px', textDecoration: 'none', display: 'block', textAlign: 'center', boxSizing: 'border-box' }}
          >
            Get Pro access — free while in beta
          </a>
        </div>

        {/* Family tier */}
        <div
          style={{
            padding: '32px',
            border: '1.5px solid rgba(195, 198, 215, 0.5)',
            borderRadius: '16px',
            background: '#ffffff',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-manrope), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: '#434655',
              marginBottom: '8px',
            }}
          >
            Family
          </div>
          <div style={{ marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                fontSize: '40px',
                fontWeight: 900,
                color: '#151c27',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              $7.99
            </span>
            <span
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '14px',
                color: '#434655',
              }}
            >
              /month
            </span>
          </div>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 28px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {[
              'Everything in Pro',
              'Household sharing',
              'Shop two stores in one trip',
            ].map((feature) => (
              <li
                key={feature}
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '15px',
                  lineHeight: '1.5',
                  color: '#434655',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ color: '#004ac6', fontWeight: 700, flexShrink: 0 }}>—</span>
                {feature}
              </li>
            ))}
          </ul>

          <a
            href="#waitlist"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '14px',
              color: '#004ac6',
              textDecoration: 'underline',
            }}
          >
            Get the family plan
          </a>
        </div>
      </div>

      <div style={{ marginTop: '80px' }}>
        <WaitlistForm />
      </div>
    </main>
  )
}
