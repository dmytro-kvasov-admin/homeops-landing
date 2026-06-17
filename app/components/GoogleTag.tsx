import Script from 'next/script'

const GOOGLE_ADS_ID = 'AW-18225665896'

declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean
  }
}


export function GoogleTag() {
  return (
    <>
      <Script
        id="google-tag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
      <Script id="google-tag-conversion" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-18225665896/DmwsCJzA2sAcEOiu1vJD',
                'event_callback': callback
            });
            return false;
          }
        `}
      </Script>
      <Script id="google-tag-waitlist-cta" strategy="afterInteractive">
        {`
          document.addEventListener('click', function (e) {
            var t = e.target;
            if (!t || typeof t.closest !== 'function') return;
            var link = t.closest('a[href="#waitlist"]');
            if (link && typeof gtag_report_conversion === 'function') {
              gtag_report_conversion();
            }
          });
        `}
      </Script>
    </>
  )
}
