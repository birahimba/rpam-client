import { useEffect } from 'react'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Réserver un rendez-vous – RPAM",
  "url": "https://www.rpam.fr/booking",
  "description": "Consultation gratuite avec un conseiller RPAM",
  "publisher": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" }
}

export default function Booking() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    ;(function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar)
      }
      let d = C.document
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal
          let ar = arguments
          if (!cal.loaded) {
            cal.ns = {}
            cal.q = cal.q || []
            d.head.appendChild(d.createElement('script')).src = A
            cal.loaded = true
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments)
            }
            const namespace = ar[1]
            api.q = api.q || []
            typeof namespace === 'string'
              ? (cal.ns[namespace] = api) && p(api, ar)
              : p(cal, ar)
            return
          }
          p(cal, ar)
        }
    })(window, 'https://app.cal.eu/embed/embed.js', 'init')

    window.Cal('init', { origin: 'https://app.cal.eu' })

    window.Cal('inline', {
      elementOrSelector: '#cal-booking-container',
      calLink: 'rpamcontact',
      config: {
        layout: 'month_view',
        theme: 'light',
      },
    })

    window.Cal('ui', {
      theme: 'light',
      styles: {
        branding: {
          brandColor: '#005153',
        },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
  }, [])

  return (
    <Layout activePage="booking">
      <SEOHead
        title="Réserver un rendez-vous – Consultation gratuite | RPAM"
        description="Réservez votre consultation gratuite avec un conseiller RPAM. Orientation professionnelle, formation sur mesure ou coaching emploi — réponse sous 24h."
        canonical="https://www.rpam.fr/booking"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="booking-hero">
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hero-content">
                <span className="hero-badge">
                  <i className="bi bi-calendar-check"></i> Consultation gratuite
                </span>
                <h1 className="hero-title">Réservez votre rendez-vous</h1>
                <p className="hero-subtitle">
                  Prenez rendez-vous avec un conseiller RPAM pour discuter de vos objectifs professionnels
                  et découvrir comment nous pouvons vous accompagner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Booking Section */}
      <section className="booking-main-section">
        <div className="container">
          <div className="booking-container">
            {/* Sidebar */}
            <div className="booking-sidebar">
              {/* How it works */}
              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-card-icon">
                    <i className="bi bi-list-check"></i>
                  </div>
                  <h3>Comment ça marche ?</h3>
                </div>
                <div className="booking-steps">
                  <div className="step-item">
                    <span className="step-number">1</span>
                    <div className="step-content">
                      <h4>Choisissez un creneau</h4>
                      <p>Selectionnez la date et l&apos;heure qui vous conviennent dans le calendrier.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <span className="step-number">2</span>
                    <div className="step-content">
                      <h4>Remplissez vos informations</h4>
                      <p>Indiquez vos coordonnees et decrivez brievement votre besoin.</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <span className="step-number">3</span>
                    <div className="step-content">
                      <h4>Recevez la confirmation</h4>
                      <p>Un email de confirmation avec le lien de la visio vous sera envoye.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="benefits-card">
                <h3><i className="bi bi-star-fill"></i> Ce que vous obtenez</h3>
                <ul className="benefit-list">
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Consultation 100% gratuite
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Echange personnalise de 30 min
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Conseils adaptes a votre situation
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Sans engagement
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Reponse sous 24h
                  </li>
                </ul>
              </div>

              {/* Testimonial */}
              <div className="testimonial-mini">
                <div className="testimonial-mini-content">
                  <div className="testimonial-avatar">
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <div className="testimonial-text">
                    <p>&quot;Le premier rendez-vous m&apos;a permis de clarifier mes objectifs. L&apos;equipe est tres a l&apos;ecoute !&quot;</p>
                    <span className="testimonial-author">— Marie L., Paris</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="calendar-card">
              <div className="calendar-header">
                <div className="calendar-header-content">
                  <h2><i className="bi bi-calendar3 me-2"></i>Selectionnez votre creneau</h2>
                  <p>Choisissez la date et l&apos;heure qui vous conviennent le mieux</p>
                </div>
              </div>
              <div className="calendar-body">
                {/* Cal.com Inline Embed */}
                <div id="cal-booking-container"></div>
              </div>

              {/* Contact Alternative */}
              <div className="contact-alternative">
                <div className="contact-alternative-text">
                  <h4>Vous preferez nous contacter directement ?</h4>
                  <p>Notre equipe est disponible pour repondre a vos questions.</p>
                </div>
                <div className="contact-methods">
                  <a href="mailto:contact@rpam.fr" className="contact-btn" title="Email">
                    <i className="bi bi-envelope-fill"></i>
                  </a>
                  <a href="https://wa.me/33636415370" className="contact-btn" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                    <i className="bi bi-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
