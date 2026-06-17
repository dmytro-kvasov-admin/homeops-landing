import Image from 'next/image'

export function ProductPreview() {
  return (
    <section
      className="py-16 px-4 sm:py-32 sm:px-8 bg-surface-container-low"
      aria-label="App interface preview"
    >
      <div className="container">
        <div className="text-center mb-24">
          <h2
            className="font-headline text-on-surface mb-6"
            style={{
              fontSize: 'clamp(22px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            Designed for precision
          </h2>
          <p className="font-body text-on-surface-variant" style={{ fontSize: 'clamp(15px, 2vw, 19px)', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto' }}>
            The cleanest interface ever built for grocery management. Zero clutter, 100% utility.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
          <Image
            src="/images/appDesign/home.png"
            alt="HomeOps home screen — weekly meal plan view"
            width={462}
            height={1259}
            sizes="280px"
            style={{
              width: 'min(280px, 100%)',
              height: 'auto',
              display: 'block',
              borderRadius: '28px',
              boxShadow: '0px 24px 48px -12px rgba(21, 28, 39, 0.14)',
              marginTop: '48px',
            }}
          />

          <Image
            src="/images/appDesign/ai-notification-center.png"
            alt="HomeOps AI smart-restock notification center"
            width={452}
            height={1513}
            sizes="280px"
            style={{
              width: 'min(280px, 100%)',
              height: 'auto',
              display: 'block',
              borderRadius: '28px',
              boxShadow: '0px 24px 48px -12px rgba(21, 28, 39, 0.14)',
            }}
          />

          <Image
            src="/images/appDesign/basket.png"
            alt="HomeOps basket — price comparison at checkout"
            width={462}
            height={1342}
            sizes="280px"
            style={{
              width: 'min(280px, 100%)',
              height: 'auto',
              display: 'block',
              borderRadius: '28px',
              boxShadow: '0px 24px 48px -12px rgba(21, 28, 39, 0.14)',
              marginTop: '48px',
            }}
          />
        </div>
      </div>
    </section>
  )
}
