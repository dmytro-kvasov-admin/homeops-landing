const metrics = [
  {
    id: 'money',
    icon: 'savings',
    label: 'Annual grocery savings',
    value: '$1,200+',
    percent: '~20%',
    direction: 'down',
    subtitle: 'less grocery spend per year',
  },
  {
    id: 'time',
    icon: 'schedule',
    label: 'Planning time per week',
    value: '40 min+',
    percent: '90%+',
    direction: 'down',
    subtitle: 'less time on grocery planning',
  },
  {
    id: 'meals',
    icon: 'restaurant_menu',
    label: 'Meals auto-scheduled',
    value: '7 dinners',
    percent: '100%',
    direction: 'up',
    subtitle: 'automated every week',
  },
]

export function SavingsMetrics() {
  return (
    <section
      id="metrics"
      className="py-32 px-8"
      aria-label="Savings metrics"
    >
      <div className="container">
        <h2
          className="font-headline text-on-surface"
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            marginBottom: '64px',
            lineHeight: '1.1',
          }}
        >
          The numbers that matter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-surface-container-lowest premium-shadow"
              style={{
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(0,74,198,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-hidden="true"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '24px', color: '#004ac6' }}
                >
                  {metric.icon}
                </span>
              </div>

              {/* Label */}
              <div
                className="font-label"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#6b7280',
                }}
              >
                {metric.label}
              </div>

              {/* Main value */}
              <div
                className="font-headline"
                style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 800,
                  color: '#151c27',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.05',
                }}
              >
                {metric.value}
              </div>

              {/* Percentage + arrow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  alignSelf: 'flex-start',
                  background: metric.direction === 'up' ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.12)',
                  color: '#22c55e',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                <span aria-hidden="true">
                  {metric.direction === 'up' ? '↑' : '↓'}
                </span>
                {metric.percent}
              </div>

              {/* Subtitle */}
              <p
                className="font-body text-on-surface-variant"
                style={{ fontSize: '14px', lineHeight: '1.55' }}
              >
                {metric.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
