export function FeatureBlock() {
  return (
    <section
      className="py-16 px-4 sm:py-32 sm:px-8"
      id="features"
      aria-label="Features"
    >
      <div className="container">
        {/* Section label */}
        <div
          className="font-label"
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#004ac6',
            marginBottom: '16px',
          }}
        >
          Features
        </div>

        {/*
          Asymmetric bento grid:
          Left: large Voice card (spans 2 rows, dark background)
          Right top: Price comparison card (white bg)
          Right bottom: Budget tracking card (surface-container-low bg)

          Mobile: single column stack
          Desktop (md+): grid-cols-[3fr_2fr] — NOT equal columns
        */}
        <div
          className="grid grid-cols-1 md:grid-cols-[3fr_2fr]"
          style={{ gap: '24px' }}
        >
          {/* Block 1 — Voice Input */}
          <div
            className="md:row-span-2 font-body"
            style={{
              background: '#151c27',
              color: '#f9f9ff',
              borderRadius: '16px',
              padding: 'clamp(24px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '380px',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: '52px',
                height: '52px',
                background: 'rgba(249,249,255,0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f9f9ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </div>

            <h3
              className="font-headline"
              style={{
                fontSize: '24px',
                lineHeight: '1.2',
                fontWeight: 800,
                color: '#f9f9ff',
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              Just say what you need. Done.
            </h3>

            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.65',
                color: 'rgba(249,249,255,0.7)',
                flex: 1,
              }}
            >
              Your grocery list builds itself. Say &ldquo;add chicken thighs&rdquo; and it&apos;s
              added. Say &ldquo;plan dinners under $50 this week&rdquo; and the app schedules meals
              and prices them against your budget. No typing, no searching, no correcting
              autocomplete.
            </p>

            <div
              style={{
                marginTop: '32px',
                padding: '16px 20px',
                background: 'rgba(249,249,255,0.08)',
                borderRadius: '12px',
                fontSize: '14px',
                color: 'rgba(249,249,255,0.9)',
                fontStyle: 'italic',
                borderLeft: '3px solid rgba(0,74,198,0.6)',
              }}
            >
              &ldquo;Add chicken thighs&rdquo; — done.
            </div>
          </div>

          {/* Block 2 — Cross-store price comparison */}
          <div
            className="font-body bg-surface-container-lowest premium-shadow"
            style={{
              border: '1px solid rgba(0,74,198,0.1)',
              borderRadius: '16px',
              padding: 'clamp(20px, 4vw, 32px)',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: '52px',
                height: '52px',
                background: 'rgba(0,74,198,0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004ac6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>

            <h3
              className="font-headline text-on-surface"
              style={{
                fontSize: '22px',
                lineHeight: '1.2',
                fontWeight: 800,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
              }}
            >
              See real prices before you leave home.
            </h3>

            <p className="text-on-surface-variant" style={{ fontSize: '15px', lineHeight: '1.65' }}>
              Pick five dinners. The app shows the total at Walmart vs Kroger before you drive anywhere.
            </p>

            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                gap: '12px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'rgba(0,74,198,0.06)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '11px', color: '#434655', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Walmart</div>
                <div className="font-headline" style={{ fontSize: '24px', fontWeight: 800, color: '#004ac6' }}>$47</div>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'rgba(67,70,85,0.06)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '11px', color: '#434655', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Kroger</div>
                <div className="font-headline" style={{ fontSize: '24px', fontWeight: 800, color: '#151c27' }}>$52</div>
              </div>
            </div>
          </div>

          {/* Block 3 — Budget tracking */}
          <div
            className="font-body bg-surface-container-low"
            style={{
              borderRadius: '16px',
              padding: 'clamp(20px, 4vw, 32px)',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: '52px',
                height: '52px',
                background: 'rgba(0,74,198,0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004ac6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>

            <h3
              className="font-headline text-on-surface"
              style={{
                fontSize: '22px',
                lineHeight: '1.2',
                fontWeight: 800,
                marginBottom: '12px',
                letterSpacing: '-0.02em',
              }}
            >
              Set a weekly budget. We help you hit it.
            </h3>

            <p className="text-on-surface-variant" style={{ fontSize: '15px', lineHeight: '1.65' }}>
              Tell the app your weekly grocery number. It tracks every item against that total as your plan comes together — you see it before checkout, not after.
            </p>

            <div
              style={{
                marginTop: '20px',
                fontSize: '13px',
                color: '#434655',
                padding: '12px 16px',
                background: 'rgba(0,74,198,0.06)',
                borderRadius: '12px',
                borderLeft: '3px solid #004ac6',
              }}
            >
              Families save $1,000+ a year. Most start seeing savings in the first week.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
