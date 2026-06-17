'use client'

import { useState } from 'react'

export function ValueHighlight() {
  const [months, setMonths] = useState(6)
  const savings = months * 95

  return (
    <section
      className="py-16 px-4 sm:py-24 sm:px-8 overflow-hidden"
      aria-label="Savings highlight"
      id="savings"
    >
      <div className="container">
        <div
          style={{
            background: 'rgba(251, 191, 36, 0.05)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '20px',
            padding: 'clamp(24px, 6vw, 96px) clamp(18px, 5vw, 64px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Amber glow blob */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              transform: 'translate(25%, -50%)',
              width: '384px',
              height: '384px',
              background: 'rgba(245, 158, 11, 0.15)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Left column — existing content */}
            <div>
              <h2
                className="font-headline text-on-surface mb-8"
                style={{
                  fontSize: 'clamp(22px, 4vw, 48px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: '1.15',
                }}
              >
                Save money without thinking about it
              </h2>
              <p
                className="font-body text-on-surface-variant mb-10"
                style={{ fontSize: '19px', lineHeight: '1.65' }}
              >
                The grocery budget app that scans prices at Walmart, Kroger, and other major stores before you shop, then picks the cheapest store automatically. Most households save $1,000+ a year.
              </p>

              {/* Savings badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#F59E0B',
                  color: '#ffffff',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-manrope)',
                  boxShadow: '0px 8px 24px -4px rgba(245, 158, 11, 0.4)',
                }}
              >
                <span
                  className="material-symbols-outlined material-symbols-filled"
                  style={{ fontSize: '22px', color: '#ffffff' }}
                >
                  savings
                </span>
                <span>You saved $53 this week</span>
              </div>
            </div>

            {/* Right column — interactive calculator */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,74,198,0.1)',
                borderRadius: '16px',
                padding: 'clamp(20px, 4vw, 32px)',
                boxShadow: '0px 16px 40px -16px rgba(21, 28, 39, 0.12)',
              }}
            >
              <h3
                className="font-headline"
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#151c27',
                  marginBottom: '8px',
                }}
              >
                Estimate your savings
              </h3>
              <p
                className="font-body"
                style={{ fontSize: '12px', color: '#6b7280', marginBottom: '24px' }}
              >
                Drag to see your projected savings
              </p>

              <div
                className="font-headline"
                style={{
                  textAlign: 'center',
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  fontWeight: 800,
                  color: '#004ac6',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.05',
                  marginBottom: '16px',
                }}
              >
                {months} month{months === 1 ? '' : 's'}
              </div>

              <input
                type="range"
                min={1}
                max={12}
                step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                aria-label="Months of usage"
                style={{
                  width: '100%',
                  accentColor: '#004ac6',
                  cursor: 'pointer',
                  marginBottom: '24px',
                }}
              />

              <div style={{ textAlign: 'center' }}>
                <div
                  className="font-headline"
                  style={{
                    fontSize: '48px',
                    fontWeight: 800,
                    color: '#22c55e',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.1',
                  }}
                >
                  ${savings.toLocaleString('en-US')}+
                </div>
                <div
                  className="font-body"
                  style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}
                >
                  estimated annual savings
                </div>
                <div
                  className="font-body"
                  style={{ fontSize: '11px', color: '#9ca3af', marginTop: '12px' }}
                >
                  Based on avg. US household grocery spend
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
