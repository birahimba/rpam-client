import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* CSS locaux — ordre impératif */}
        <link rel="stylesheet" href="/css/vendors.min.css" />
        <link rel="stylesheet" href="/css/icon.min.css" />
        <link rel="stylesheet" href="/css/style.min.css" />
        <link rel="stylesheet" href="/css/responsive.min.css" />
        <link rel="stylesheet" href="/css/corporate.css" />
        <link rel="stylesheet" href="/css/navbar-modern.css" />
        <link rel="stylesheet" href="/css/pages.css" />
        <link rel="stylesheet" href="/css/services-page.css" />
        <link rel="stylesheet" href="/css/typography.css" />

        {/* CDN CSS */}
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
        />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/images/favicon-32x32.png" />
      </Head>
      <body className="custom-cursor" data-mobile-nav-style="classic">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
