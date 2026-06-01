// MOVED: retention messaging — restore to /onboarding or post-signup flow in cycle 3.
const features = [
  {
    id: 'usage-learning',
    icon: 'psychology',
    title: 'Usage learning',
    body: 'Learns your specific grocery burnout rate — milk, eggs, bread — and adds them back before you run out.',
    offset: false,
  },
  {
    id: 'smart-alerts',
    icon: 'notifications_active',
    title: 'Smart alerts',
    body: '"You\'re running low on milk." Price dropped at Kroger this week? You get that alert too.',
    offset: true,
  },
  {
    id: 'recipe-sync',
    icon: 'cooking',
    title: 'Recipe sync',
    body: 'Save a recipe from anywhere. Every ingredient lands on your AI grocery list, already priced at your nearest store.',
    offset: false,
  },
  {
    id: 'family-hub',
    icon: 'hub',
    title: 'Family hub',
    body: 'One shared grocery plan for the whole household. Everyone sees the same list, budget, and meal schedule.',
    offset: true,
  },
]

export function AIFeatures() {
  return (
    <section
      className="py-32 px-8"
      aria-label="AI features"
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-20 items-center">

          {/* Left — 2×2 staggered card grid */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-2" style={{ gap: '24px' }}>
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-surface-container-lowest premium-shadow"
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(106,30,219,0.08)',
                    marginTop: feature.offset ? '32px' : '0',
                  }}
                >
                  {/* Icon — tertiary-fixed background */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background: '#eaddff',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '22px', color: '#6a1edb' }}
                    >
                      {feature.icon}
                    </span>
                  </div>

                  <h4
                    className="font-headline text-on-surface mb-2"
                    style={{ fontSize: '15px', fontWeight: 800 }}
                  >
                    {feature.title}
                  </h4>
                  <p className="font-body text-on-surface-variant" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — heading + copy + AI bubble */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <span className="font-label font-bold tracking-widest text-xs uppercase mb-4 block" style={{ color: '#6a1edb' }}>
              Artificial intelligence
            </span>
            <h2
              className="font-headline text-on-surface mb-8"
              style={{
                fontSize: 'clamp(32px, 5vw, 60px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: '1.08',
              }}
            >
              It learns your habits
            </h2>
            <p className="font-body text-on-surface-variant mb-10" style={{ fontSize: '18px', lineHeight: '1.65' }}>
              Most apps treat your list as a blank slate every week. HomeOps tracks what you buy, how fast you go through it, and what you skip. Over time it gets more accurate — and less work to manage.
            </p>

            {/* AI message bubble */}
            <div
              style={{
                padding: '24px',
                background: 'rgba(210, 187, 255, 0.2)',
                borderRadius: '16px',
                border: '1px solid rgba(106,30,219,0.15)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  marginTop: '6px',
                  background: '#6a1edb',
                  borderRadius: '50%',
                  flexShrink: 0,
                  animation: 'pulse 2s infinite',
                }}
                aria-hidden="true"
              />
              <p
                className="font-body"
                style={{ fontStyle: 'italic', color: '#5a00c6', fontSize: '15px', lineHeight: '1.6', fontWeight: 500, margin: 0 }}
              >
                &ldquo;Hey Sarah, I&apos;ve added whole milk to your list. Based on your consumption, you&apos;ll run out by Thursday morning.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
