const steps = [
  {
    number: '01',
    icon: 'add_circle',
    iconColor: '#004ac6',
    title: 'Add items',
    body: 'Tell HomeOps how many dinners you need and your budget for the week. It picks the meals, builds the list, and ends the "what\'s for dinner?" conversation before it starts.',
    alt: false,
  },
  {
    number: '02',
    icon: 'smart_toy',
    iconColor: '#6a1edb',
    title: 'AI builds your list',
    body: 'Items cluster by aisle. Real prices load from Walmart, Kroger, and other major stores automatically. See the grocery price comparison before you leave — down to the cent.',
    alt: false,
  },
  {
    number: '03',
    icon: 'shopping_basket',
    iconColor: '#575e70',
    title: 'Shop in-store',
    body: 'Your list lands on your phone sorted by aisle, with the cheaper store already selected. Most families cut their trip to under 10 minutes.',
    alt: false,
  },
  {
    number: '04',
    icon: 'local_shipping',
    iconColor: '#f59e0b',
    title: 'Or get it delivered',
    body: 'Prefer delivery? We show you real store prices first — then surface delivery options with full markup costs visible. No 15% service fee hiding in your subtotal.',
    alt: false,
  },
]

export function HowItWorks() {
  return (
    <section
      id="features"
      className="py-16 px-4 sm:py-32 sm:px-8"
      aria-label="How it works"
    >
      <div className="container">
        <div className="text-center mb-20">
          <h2
            className="font-headline text-on-surface"
            style={{
              fontSize: 'clamp(24px, 5vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            From voice command to grocery list in four steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '24px' }}>
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                padding: 'clamp(20px, 4vw, 32px)',
                borderRadius: '16px',
                background: step.alt ? 'rgba(34,197,94,0.06)' : undefined,
                border: step.alt ? '1px solid rgba(34,197,94,0.18)' : undefined,
              }}
              className={step.alt ? undefined : 'bg-surface-container-low'}
            >
              {/* OR badge for delivery card */}
              {step.alt && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '9999px',
                    background: 'rgba(34,197,94,0.15)',
                    color: '#22c55e',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    fontFamily: 'var(--font-manrope)',
                    marginBottom: '16px',
                  }}
                  aria-label="alternative step"
                >
                  OR
                </div>
              )}

              {/* Step number + icon row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                <span
                  className="font-label"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#9ca3af',
                    letterSpacing: '0.08em',
                  }}
                >
                  {step.number}
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '22px', color: step.iconColor }}
                >
                  {step.icon}
                </span>
              </div>

              <h3
                className="font-headline text-on-surface"
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  marginBottom: '12px',
                  letterSpacing: '-0.01em',
                }}
              >
                {step.title}
              </h3>

              <p
                className="font-body text-on-surface-variant"
                style={{ fontSize: '15px', lineHeight: '1.65' }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
