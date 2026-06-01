import Link from 'next/link'
import { Hero } from './components/Hero'
import { PainProof } from './components/PainProof'
import { HowItWorks } from './components/HowItWorks'
import { ValueHighlight } from './components/ValueHighlight'
import { SavingsMetrics } from './components/SavingsMetrics'
import { ProductPreview } from './components/ProductPreview'
import { SocialProof } from './components/SocialProof'
import { WaitlistForm } from './components/WaitlistForm'

export default function Home() {
  return (
    <>
      {/* Glass nav — matches Stitch TopAppBar */}
      <header className="fixed top-0 w-full z-50 glass-header premium-shadow">
        <nav
          className="container flex items-center justify-between"
          style={{ height: '80px' }}
          aria-label="Main navigation"
        >
          {/* Logo with roofing icon */}
          <Link
            href="/"
            className="flex items-center gap-3"
            style={{ textDecoration: 'none' }}
            aria-label="HomeOps home"
          >
            <span
              className="material-symbols-outlined material-symbols-filled"
              style={{ fontSize: '28px', color: '#004ac6' }}
            >
              roofing
            </span>
            <span
              className="font-headline"
              style={{
                fontSize: '22px',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#151c27',
              }}
            >
              HomeOps
            </span>
          </Link>

          {/* Primary CTA */}
          <a
            href="#waitlist"
            className="btn-primary"
            style={{ padding: '10px 22px', fontSize: '14px', textDecoration: 'none' }}
          >
            Request early access
          </a>
        </nav>
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: '80px' }} aria-hidden="true" />

      <main>
        <Hero />

        {/* Yummly replacement callout */}
        <div className="px-8" style={{ paddingBottom: '8px' }}>
          <div className="container">
            <div
              style={{
                background: 'rgba(0,74,198,0.04)',
                borderRadius: '12px',
                padding: '18px 28px',
                border: '1px solid rgba(0,74,198,0.1)',
                maxWidth: '680px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <p className="font-body" style={{ fontSize: '15px', color: '#434655', lineHeight: '1.6' }}>
                <strong style={{ color: '#004ac6' }}>Used Yummly?</strong>{' '}
                It shut down in December 2024. HomeOps is being built to do what Yummly never did — connect your meal plan to your actual grocery bill.{' '}
                  <br />
                <a href="#waitlist" style={{ color: '#004ac6', fontWeight: 600, textDecoration: 'none', marginTop: '12px', display: 'inline-block' }}>Join the waitlist →</a>
              </p>
            </div>
          </div>
        </div>

        <SocialProof />
        <HowItWorks />
        <SavingsMetrics />
        <ValueHighlight />
        <PainProof />
        <ProductPreview />

        {/* FAQ section */}
        <section id="faq" className="py-24 px-8" aria-label="Frequently asked questions">
          <div className="container">
            <h2
              className="font-headline text-on-surface"
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '48px',
                textAlign: 'center',
              }}
            >
              Common questions
            </h2>
            <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                {
                  q: 'How do I plan meals for the week on a budget?',
                  a: "Tell HomeOps how many dinners you need and your spending target for the week. It picks the meals, builds the grocery list, and shows you the total cost at Walmart vs Kroger before you shop — so you know exactly what you'll spend before you leave home.",
                },
                {
                  q: 'How does HomeOps compare grocery prices?',
                  a: 'HomeOps pulls real prices from Walmart and Kroger for every item on your list and shows you a side-by-side total. You see exactly which store is cheaper for your specific list this week — not generic estimates. Most families find a $10–$20 difference per trip.',
                },
                {
                  q: 'Is HomeOps free?',
                  a: 'Yes — HomeOps has a free plan with 3 AI meal plans per month. The Pro plan at $4.99/month adds unlimited meal plans, voice input, grocery price comparison, and weekly budget tracking. No credit card required to join the waitlist.',
                },
                {
                  q: "What's the difference between HomeOps and Mealime or AnyList?",
                  a: "Mealime plans meals but never shows you the price — you find out what you spent after checkout. AnyList builds lists but can't compare store prices. HomeOps is the first app to connect all three: meal planning, grocery list, and real-time price comparison.",
                },
              ].map((item, i, arr) => (
                <div
                  key={item.q}
                  style={{
                    padding: '28px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(67,70,85,0.1)' : 'none',
                  }}
                >
                  <h3
                    className="font-headline text-on-surface"
                    style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', letterSpacing: '-0.01em' }}
                  >
                    {item.q}
                  </h3>
                  <p className="font-body text-on-surface-variant" style={{ fontSize: '16px', lineHeight: '1.65' }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WaitlistForm />
      </main>

      {/* Footer — matches Stitch */}
      <footer className="bg-surface-container-low py-16 px-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center" style={{ gap: '32px' }}>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined material-symbols-filled"
                style={{ fontSize: '22px', color: '#004ac6' }}
              >
                roofing
              </span>
              <span className="font-headline font-bold text-on-surface" style={{ fontSize: '18px', letterSpacing: '-0.02em' }}>
                HomeOps
              </span>
            </div>

            {/* Copyright */}
            <p className="font-body text-on-surface-variant" style={{ fontSize: '13px' }}>
              &copy; 2026 HomeOps. US early access &middot; Launching summer 2026.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
