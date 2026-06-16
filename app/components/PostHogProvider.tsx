'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
] as const

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname || typeof window === 'undefined') return
    let url = window.location.origin + pathname
    const qs = searchParams?.toString()
    if (qs) url += `?${qs}`
    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[PostHog] NEXT_PUBLIC_POSTHOG_KEY not set — analytics disabled')
      }
      return
    }
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true,
      person_profiles: 'identified_only',
      session_recording: {
        maskAllInputs: true,
        maskInputOptions: { password: true },
      },
      loaded: (ph) => {
        try {
          const params = new URLSearchParams(window.location.search)
          const props: Record<string, string> = {}
          UTM_KEYS.forEach((k) => {
            const v = params.get(k)
            if (v) props[k] = v
          })
          if (Object.keys(props).length > 0) ph.register(props)
          console.log('log');
        } catch {
          console.log('error');
          // querystring parsing failed — ignore
        }
        if (process.env.NODE_ENV === 'development') ph.debug()
      },
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}
