import { useEffect } from 'react'
import { useRouter } from 'next/router'

function loadScript(src, attrs = {}) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const el = document.createElement('script')
    el.src = src
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    el.onload = resolve
    el.onerror = resolve
    document.body.appendChild(el)
  })
}

function rerunScript(src) {
  // Remove existing tag and re-add to force re-execution
  const existing = document.querySelector(`script[src^="${src}"]`)
  if (existing) existing.remove()
  return new Promise((resolve) => {
    const el = document.createElement('script')
    el.src = src + '?t=' + Date.now()
    el.onload = resolve
    el.onerror = resolve
    document.body.appendChild(el)
  })
}

function initAOS() {
  if (typeof window !== 'undefined' && window.AOS) {
    window.AOS.init({ duration: 800, easing: 'ease-out', once: true, offset: 50 })
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      await loadScript('/js/jquery.js')
      await loadScript('/js/vendors.min.js')
      await loadScript('/js/main.js')
      await loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js')
      await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js')
      window.dispatchEvent(new Event('swiper-ready'))
      await loadScript('https://unpkg.com/aos@2.3.1/dist/aos.js')
      initAOS()
      await loadScript('https://cdn.jsdelivr.net/npm/flatpickr')
    })()
  }, [])

  // On every client-side navigation: re-run main.js + reinitialize AOS
  useEffect(() => {
    const handleRouteChange = async () => {
      // Re-execute main.js so jQuery plugins (counters, appear, etc.) rebind
      await rerunScript('/js/main.js')
      // Give React a tick to finish rendering, then refresh AOS
      setTimeout(initAOS, 50)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      <div key={router.asPath} className="page-transition">
        <Component {...pageProps} />
      </div>

    </>
  )
}
