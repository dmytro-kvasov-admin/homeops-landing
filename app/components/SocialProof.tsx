import Image from 'next/image'

const retailers = [
  { name: 'Walmart', src: '/images/shopsLogos/walmart.png' },
  { name: 'Kroger', src: '/images/shopsLogos/kroger-logo.png' },
  { name: 'Whole Foods', src: '/images/shopsLogos/whole-foods-logo.jpg' },
  { name: 'Target', src: '/images/shopsLogos/target-logo.jpg' },
  { name: "Trader Joe's", src: '/images/shopsLogos/trader_joes.png' },
  { name: 'Costco', src: '/images/shopsLogos/costco.png' },
]

export function SocialProof() {
  return (
    <section
      className="py-16 px-4 sm:py-24 sm:px-8"
      aria-label="Social proof and supported retailers"
    >
      <div className="container">
        <div className="text-center">

          {/* Waitlist testimonials */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              maxWidth: '900px',
              margin: '0 auto 56px',
            }}
          >
            {[
              {
                quote: 'The one thing I need is an app that tells me: this exact list is $12 cheaper at Kroger this week. Just that. Nothing else.',
                author: 'Marcus D.',
                detail: 'Brooklyn · waitlist member',
              },
              {
                quote: "I had no idea I was wasting $40 every week buying from the wrong store. Something like this would have saved me $2,000 last year.",
                author: 'Rachel T.',
                detail: 'Mom of 3 · Kansas City · waitlist member',
              },
            ].map((t) => (
              <div
                key={t.author}
                style={{
                  textAlign: 'left',
                  background: '#ffffff',
                  border: '1px solid rgba(67,70,85,0.1)',
                  borderRadius: '14px',
                  padding: '28px',
                }}
              >
                <p
                  className="font-body"
                  style={{ fontSize: '15px', lineHeight: '1.65', color: '#434655', marginBottom: '16px', fontStyle: 'italic' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <span className="font-headline" style={{ fontSize: '14px', fontWeight: 700, color: '#151c27' }}>{t.author}</span>
                  <span className="font-body" style={{ fontSize: '13px', color: '#9ca3af', marginLeft: '8px' }}>{t.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <h3
            className="font-headline text-on-surface mb-12"
            style={{ fontSize: '24px', fontWeight: 800 }}
          >
            Real prices from the stores you already shop
          </h3>

          {/* Retailer logos — auto-fit grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))',
              gap: '12px',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            {retailers.map((retailer) => (
              <div
                key={retailer.name}
                style={{
                  height: 'clamp(96px, 18vw, 180px)',
                  borderRadius: '14px',
                  border: '1px solid rgba(67,70,85,0.1)',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 16px',
                }}
              >
                <Image
                  src={retailer.src}
                  alt={retailer.name}
                  width={140}
                  height={52}
                  style={{ objectFit: 'contain', mixBlendMode: 'multiply', maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
