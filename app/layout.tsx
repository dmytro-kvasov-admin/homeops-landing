import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeopsapp.com'

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteUrl),
    title: 'HomeOps: AI Meal Planner + Grocery Budget App',
    description:
      'Plan weekly meals by voice, compare Walmart vs Kroger prices, and hit your grocery budget. Families save $800–$1,200 a year. Free to join — no credit card.',
    keywords: [
      'grocery budget app',
      'meal planning app',
      'meal plan generator',
      'AI grocery list',
      'grocery price comparison',
      'weekly meal planner',
      'meal planner',
      'free meal planning app',
      'best meal planning app',
      'yummly alternative',
      'plan meals on a budget',
      'grocery prices Walmart vs Kroger',
      'how to budget groceries',
    ],
    robots: 'index, follow',
    alternates: { canonical: siteUrl },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: 'HomeOps',
      title: 'HomeOps: AI Meal Planner + Grocery Budget App',
      description:
        'Plan weekly meals by voice. Compare Walmart vs Kroger prices. Hit your grocery budget. Families save $800–$1,200 a year. Free to join — no credit card.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'HomeOps — AI meal planner + grocery budget app',
      description:
        'Plan meals by voice. Compare prices at Walmart vs Kroger. Save $800–$1,200 a year. Free to join.',
    },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'HomeOps',
      url: siteUrl,
      description:
        'AI-powered grocery planning app. Plan meals, build lists by voice, compare prices at Walmart vs Kroger, and track your weekly budget.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'HomeOps',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'HomeOps',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'iOS, Android',
      description:
        'AI meal planner and grocery budget app. Plan meals by voice, compare prices at Walmart vs Kroger, and track your weekly grocery budget.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free plan available. Pro plan at $4.99/month.',
      },
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I plan meals for the week on a budget?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "HomeOps lets you set a weekly grocery budget, then builds a meal plan that fits it. Tell the app how many dinners you need and your spending target — it picks the meals, builds the list, and shows you the total cost at Walmart vs Kroger before you shop.",
          },
        },
        {
          '@type': 'Question',
          name: 'How does HomeOps compare grocery prices?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'HomeOps pulls real prices from Walmart and Kroger for every item on your list and shows you a side-by-side total before you leave home. You see exactly which store is cheaper for your specific list — not generic estimates.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is HomeOps free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — HomeOps has a free plan with 3 AI meal plans per month. The Pro plan at $4.99/month adds unlimited meal plans, voice input, grocery price comparison, and weekly budget tracking. No credit card required to join the waitlist.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- Material Symbols variable icon font; not supported by next/font/google */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
