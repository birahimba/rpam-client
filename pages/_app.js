import { useEffect } from 'react'
import { useRouter } from 'next/router'

function loadScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const el = document.createElement('script')
    el.src = src
    el.onload = resolve
    el.onerror = resolve
    document.body.appendChild(el)
  })
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      // Load in strict order: jQuery must be first, then vendors, then main
      await loadScript('/js/jquery.js')
      await loadScript('/js/vendors.min.js')
      await loadScript('/js/main.js')
      await loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js')
      await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js')
      window.dispatchEvent(new Event('swiper-ready'))
      await loadScript('https://unpkg.com/aos@2.3.1/dist/aos.js')
      if (window.AOS) {
        window.AOS.init({ duration: 800, easing: 'ease-out', once: true, offset: 50 })
      }
      await loadScript('https://cdn.jsdelivr.net/npm/flatpickr')
    })()
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.AOS) window.AOS.refresh()
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return <Component {...pageProps} />
}
