import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'HomeOps — AI Meal Planner + Grocery Budget App'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f9f9ff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              background: '#004ac6',
              borderRadius: '12px',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ color: '#ffffff', fontSize: '28px', fontWeight: 900 }}>H</div>
          </div>
          <div style={{ color: '#151c27', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            HomeOps
          </div>
        </div>

        <div style={{ color: '#004ac6', fontSize: '16px', marginBottom: '20px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Early access — summer 2026
        </div>

        <div style={{ color: '#151c27', fontSize: '52px', fontWeight: 900, lineHeight: 1.06, maxWidth: '960px', letterSpacing: '-1px' }}>
          Plan meals, compare Walmart vs Kroger prices, and hit your grocery budget — by voice.
        </div>

        <div style={{ color: '#434655', fontSize: '22px', marginTop: '28px' }}>
          homeopsapp.com · Families save $800–$1,200/year
        </div>
      </div>
    ),
    { ...size }
  )
}
