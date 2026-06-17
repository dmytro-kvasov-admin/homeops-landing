export function PainProof() {
  return (
    <section
      className="py-16 px-4 sm:py-24 sm:px-8 bg-surface-container-low"
      aria-label="The problem and solution"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left — The Friction */}
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block font-label">
              The friction
            </span>
            <h2
              className="font-headline text-on-surface mb-8 leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              Most grocery list apps fail at the one thing you need
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                'Mealime plans your meals — but never shows you the price. You only find out what you spent after checkout.',
                "AnyList looks fine in the demo. In real life, it can't tell you which store is $15 cheaper for your actual list this week.",
                'Instacart has real prices — plus a 15–20% service markup baked in before you even see your total.',
              ].map((text) => (
                <div key={text} className="flex items-start gap-4">
                  <div
                    style={{
                      background: 'rgba(186,26,26,0.1)',
                      padding: '8px',
                      borderRadius: '8px',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '20px', color: '#ba1a1a', display: 'block' }}
                    >
                      close
                    </span>
                  </div>
                  <p className="font-body text-on-surface-variant" style={{ fontSize: '17px', lineHeight: '1.6', fontWeight: 500 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — The Evolution card */}
          <div
            className="bg-surface-container-lowest premium-shadow"
            style={{
              padding: 'clamp(24px, 5vw, 56px)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.6)',
            }}
          >
            <span className="font-label font-bold tracking-widest text-xs uppercase mb-4 block" style={{ color: '#6a1edb' }}>
              The evolution
            </span>
            <h3
              className="font-headline text-on-surface mb-6"
              style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              HomeOps automates it
            </h3>
            <p className="font-body text-on-surface-variant mb-6" style={{ fontSize: '17px', lineHeight: '1.65' }}>
              People have been asking for years: &ldquo;Is there one app that does meal planning, grocery list, <em>and</em> budget tracking?&rdquo; The answer has always been no. HomeOps is the first app that connects all three.
            </p>
            <p className="font-body text-on-surface-variant mb-8" style={{ fontSize: '15px', lineHeight: '1.65', color: '#6b7280' }}>
              Plan meals on a budget, compare grocery prices at Walmart, Kroger, and nearby stores — and stop wasting food — all in one place.
            </p>

            {/* AI insight chip */}
            <div
              style={{
                background: 'rgba(106,30,219,0.07)',
                padding: '20px 24px',
                borderRadius: '12px',
                border: '1px solid rgba(106,30,219,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <span
                className="material-symbols-outlined material-symbols-filled"
                style={{ fontSize: '28px', color: '#6a1edb', flexShrink: 0 }}
              >
                auto_awesome
              </span>
              <div>
                <span className="font-headline font-bold block" style={{ color: '#6a1edb', fontSize: '15px' }}>
                  Knows before you run out
                </span>
                <span className="font-body" style={{ fontSize: '13px', color: '#5a00c6' }}>
                  Tracks your usage and adds items back before you notice they&apos;re gone.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
