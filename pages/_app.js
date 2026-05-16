import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  // Ré-initialise AOS à chaque navigation SPA
  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.refresh()
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Component {...pageProps} />

      {/* Scripts locaux — ordre impératif : jquery → vendors → main */}
      <Script src="/js/jquery.js" strategy="afterInteractive" />
      <Script src="/js/vendors.min.js" strategy="afterInteractive" />
      <Script src="/js/main.js" strategy="afterInteractive" />

      {/* CDN JS */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
        strategy="afterInteractive"
      />
      <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/flatpickr" strategy="afterInteractive" />
    </>
  )
}
