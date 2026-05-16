import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RPAM",
  "url": "https://www.rpam.fr",
  "logo": "https://www.rpam.fr/images/logo-rpam.png",
  "description": "RPAM est un cabinet de coaching professionnel en France spécialisé en bilan de compétences, reconversion professionnelle, formation sur mesure et coaching emploi.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@rpam.fr",
    "contactType": "customer service",
    "areaServed": "FR",
    "availableLanguage": "French"
  },
  "sameAs": [
    "https://www.facebook.com/",
    "https://www.linkedin.com",
    "https://www.instagram.com"
  ]
}

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const r = await fetch('https://formspree.io/f/mojpjpwq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'RPAM Connect waitlist' }),
      })
      setStatus(r.ok ? 'success' : 'error')
      if (r.ok) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto 20px' }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          required
          style={{ flex: 1, minWidth: '220px', padding: '14px 20px', borderRadius: '50px', border: 'none', fontSize: '15px', outline: 'none', background: 'rgba(255,255,255,0.95)', color: '#0d2535', fontWeight: 500 }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{ padding: '14px 28px', borderRadius: '50px', border: 'none', background: '#005153', color: '#fff', fontWeight: 700, fontSize: '15px', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          {status === 'loading' ? 'Inscription...' : "Rejoindre la liste d'attente"}
        </button>
      </div>
      {status === 'success' && (
        <div style={{ marginTop: '16px', color: '#6ee7b7', fontWeight: 600, fontSize: '15px' }}>
          ✓ Vous êtes inscrit(e) ! Nous vous contacterons en priorité lors du lancement.
        </div>
      )}
      {status === 'error' && (
        <div style={{ marginTop: '16px', color: '#fca5a5', fontSize: '14px' }}>
          Une erreur s&apos;est produite. Contactez-nous à contact@rpam.fr
        </div>
      )}
    </form>
  )
}

export default function Home() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.Swiper) return
    new window.Swiper('.hero-swiper', {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.hero-pagination', clickable: true },
      navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
    })
  }, [])

  return (
    <Layout activePage="home">
      <SEOHead
        title="RPAM – Coaching professionnel, bilan de compétences et orientation | France"
        description="RPAM : cabinet de coaching professionnel en France. Bilan de compétences, reconversion, coaching emploi et formation sur mesure. Consultation gratuite — réponse sous 24h."
        canonical="https://www.rpam.fr"
        schema={schema}
      />

      {/* Hero Slider */}
      <section id="slider" className="hero-slider-section">
        <div className="swiper hero-swiper">
          <div className="swiper-wrapper">

            <div className="swiper-slide">
              <div className="slide-bg" style={{ backgroundImage: "url('/images/slide1.jpg')" }}></div>
              <div className="slide-overlay-dark"></div>
              <div className="container">
                <div className="hero-content">
                  <span className="hero-identity-badge">
                    <i className="fas fa-briefcase"></i>
                    coaching &amp; orientation professionnelle
                  </span>
                  <h1 className="hero-title">Vous ne savez pas quelle direction donner à votre carrière ?</h1>
                  <p className="hero-subtitle">RPAM vous accompagne pour clarifier votre projet, développer vos compétences et décrocher l&apos;emploi qui vous correspond — que vous soyez étudiant, salarié ou en reconversion.</p>
                  <div className="hero-buttons">
                    <Link href="/booking" className="hero-btn-primary">
                      Consultation gratuite
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link href="/about" className="hero-btn-secondary">Qui sommes-nous ?</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="slide-bg" style={{ backgroundImage: "url('/images/slide2.jpg')" }}></div>
              <div className="slide-overlay-dark"></div>
              <div className="container">
                <div className="hero-content">
                  <span className="hero-identity-badge">
                    <i className="fas fa-chart-line"></i>
                    Up Training — Développement de compétences
                  </span>
                  <h2 className="hero-title">Vos compétences actuelles suffisent-elles pour le marché d&apos;aujourd&apos;hui ?</h2>
                  <p className="hero-subtitle">Des formations sur mesure, techniques et comportementales, pour vous démarquer et rester compétitif face aux exigences du marché.</p>
                  <div className="hero-buttons">
                    <Link href="/booking" className="hero-btn-primary">
                      Prendre rendez-vous
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link href="/up-training" className="hero-btn-secondary">Découvrir Up Training</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="slide-bg" style={{ backgroundImage: "url('/images/slide3.jpg')" }}></div>
              <div className="slide-overlay-dark"></div>
              <div className="container">
                <div className="hero-content">
                  <span className="hero-identity-badge">
                    <i className="fas fa-search"></i>
                    Job Getting — Coaching recherche d&apos;emploi
                  </span>
                  <h2 className="hero-title">Vous postulez sans obtenir de réponses ?</h2>
                  <p className="hero-subtitle">Nous optimisons votre CV, votre profil LinkedIn, vous préparons aux entretiens et vous aidons à construire une stratégie de recherche qui fonctionne.</p>
                  <div className="hero-buttons">
                    <Link href="/booking" className="hero-btn-primary">
                      Prendre rendez-vous
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link href="/job-getting" className="hero-btn-secondary">Découvrir Job Getting</Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="hero-navigation">
            <div className="swiper-pagination hero-pagination"></div>
            <div className="hero-nav-buttons">
              <button className="hero-nav-btn hero-prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="hero-nav-btn hero-next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="for-who-strip">
        <div className="container">
          <p className="for-who-label">RPAM s&apos;adresse à vous si vous êtes :</p>
          <div className="for-who-items">
            <div className="for-who-item"><i className="fas fa-user-graduate"></i><span>Étudiant en fin de cursus</span></div>
            <div className="for-who-separator"></div>
            <div className="for-who-item"><i className="fas fa-sync-alt"></i><span>En reconversion professionnelle</span></div>
            <div className="for-who-separator"></div>
            <div className="for-who-item"><i className="fas fa-search"></i><span>En recherche active d&apos;emploi</span></div>
            <div className="for-who-separator"></div>
            <div className="for-who-item"><i className="fas fa-chart-line"></i><span>Salarié souhaitant évoluer</span></div>
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d2535 0%, #1a3a50 100%)', padding: '80px 0' }}>
        <div className="position-absolute" style={{ top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(236,171,35,0.1)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
        <div className="position-absolute" style={{ bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(236,171,35,0.08)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-10" data-aos="fade-up" data-aos-duration="800">
              <div className="text-center mb-5">
                <span className="d-inline-block px-4 py-2 mb-4" style={{ background: 'rgba(236,171,35,0.15)', borderRadius: '30px', color: '#ecab23', fontWeight: 600, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Ce que nous réglons concrètement
                </span>
                <h2 className="text-white fw-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.2 }}>
                  Trois problèmes courants, <br />
                  <span style={{ color: '#ecab23' }}>trois solutions sur mesure</span>
                </h2>
                <p className="text-white-50 fs-18 mb-0 mx-auto" style={{ maxWidth: '700px', lineHeight: 1.8 }}>
                  Vous ne savez pas où vous en êtes professionnellement, vous manquez de compétences demandées ou vous peinez à trouver un emploi ? RPAM intervient à chaque étape.
                </p>
              </div>
              <div className="row g-4 mt-4">
                {[
                  { icon: 'fa-compass', title: '« Je ne sais pas quoi faire »', desc: "Bilan de compétences + plan d'action personnalisé pour clarifier votre projet professionnel", delay: '100' },
                  { icon: 'fa-graduation-cap', title: '« Je manque de compétences »', desc: 'Formations techniques et soft skills ciblées pour répondre aux exigences du marché', delay: '200' },
                  { icon: 'fa-file-alt', title: '« Je postule sans réponses »', desc: "Optimisation CV & LinkedIn, préparation entretiens et stratégie de recherche d'emploi", delay: '300' },
                ].map(({ icon, title, desc, delay }) => (
                  <div key={title} className="col-md-4 d-flex" data-aos="fade-up" data-aos-delay={delay}>
                    <div className="text-center p-4 w-100" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                      <div className="mb-3" style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                        <i className={`fas ${icon} text-white fs-22`}></i>
                      </div>
                      <h6 className="text-white fw-700 mb-2">{title}</h6>
                      <p className="text-white-50 fs-14 mb-0">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="400">
                <Link href="/services" className="btn px-5 py-3 fw-600" style={{ background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', color: 'white', borderRadius: '50px', border: 'none' }}>
                  <i className="fas fa-arrow-right me-2"></i>Voir tous nos services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-showcase-section" id="services">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <span className="services-badge">Nos expertises</span>
              <h2 className="services-main-title">Trois leviers pour booster votre carrière</h2>
              <p className="services-subtitle">Découvrez comment nous pouvons vous aider à clarifier votre projet, renforcer vos atouts et décrocher les opportunités qui vous correspondent.</p>
            </div>
          </div>
          <div className="services-grid">

            <div className="service-card-modern" data-aos="fade-up" data-aos-delay="100">
              <div className="service-card-image">
                <img src="/images/self-know.jpg" alt="Guidance - Orientation professionnelle" loading="lazy" />
                <div className="service-card-overlay"></div>
                <span className="service-number">01</span>
              </div>
              <div className="service-card-content">
                <div className="service-icon-badge"><i className="bi bi-compass"></i></div>
                <h3 className="service-card-title">Guidance</h3>
                <h4 className="service-card-subtitle">Orientation professionnelle</h4>
                <p className="service-card-description">Nous vous guidons pour révéler vos atouts, clarifier vos objectifs professionnels et bâtir ensemble un plan d&apos;action personnalisé pour booster votre employabilité.</p>
                <ul className="service-features">
                  <li><i className="bi bi-check2"></i> Bilan de compétences</li>
                  <li><i className="bi bi-check2"></i> Définition du projet professionnel</li>
                  <li><i className="bi bi-check2"></i> Plan d&apos;action personnalisé</li>
                </ul>
                <Link href="/guidance" className="service-card-btn">Découvrir ce service <i className="bi bi-arrow-right"></i></Link>
              </div>
            </div>

            <div className="service-card-modern featured" data-aos="fade-up" data-aos-delay="200">
              <div className="featured-badge-corner">Populaire</div>
              <div className="service-card-image">
                <img src="/images/up-training.jpg" alt="Up Training - Développement de compétences" loading="lazy" />
                <div className="service-card-overlay"></div>
                <span className="service-number">02</span>
              </div>
              <div className="service-card-content">
                <div className="service-icon-badge"><i className="bi bi-graph-up-arrow"></i></div>
                <h3 className="service-card-title">Up Training</h3>
                <h4 className="service-card-subtitle">Développement de compétences</h4>
                <p className="service-card-description">Nous vous accompagnons dans l&apos;acquisition des savoir-faire qui vous démarquent grâce à des formations sur mesure, ciblées et collaboratives.</p>
                <ul className="service-features">
                  <li><i className="bi bi-check2"></i> Formations techniques</li>
                  <li><i className="bi bi-check2"></i> Développement des soft skills</li>
                  <li><i className="bi bi-check2"></i> Coaching personnalisé</li>
                </ul>
                <Link href="/up-training" className="service-card-btn">Découvrir ce service <i className="bi bi-arrow-right"></i></Link>
              </div>
            </div>

            <div className="service-card-modern" data-aos="fade-up" data-aos-delay="300">
              <div className="service-card-image">
                <img src="/images/job-getting.jpg" alt="Job Getting - Coaching recherche d'emploi" loading="lazy" />
                <div className="service-card-overlay"></div>
                <span className="service-number">03</span>
              </div>
              <div className="service-card-content">
                <div className="service-icon-badge"><i className="bi bi-briefcase"></i></div>
                <h3 className="service-card-title">Job Getting</h3>
                <h4 className="service-card-subtitle">Coaching recherche d&apos;emploi</h4>
                <p className="service-card-description">À vos côtés à chaque étape de votre recherche d&apos;emploi, nous optimisons votre CV, vous préparons aux entretiens et vous aidons à décrocher le poste idéal.</p>
                <ul className="service-features">
                  <li><i className="bi bi-check2"></i> Optimisation CV et LinkedIn</li>
                  <li><i className="bi bi-check2"></i> Préparation aux entretiens</li>
                  <li><i className="bi bi-check2"></i> Stratégie de recherche</li>
                </ul>
                <Link href="/job-getting" className="service-card-btn">Découvrir ce service <i className="bi bi-arrow-right"></i></Link>
              </div>
            </div>

          </div>
          <div className="services-cta-banner" data-aos="fade-up" data-aos-delay="400">
            <div className="cta-banner-content">
              <div className="cta-banner-icon"><i className="bi bi-rocket-takeoff"></i></div>
              <div className="cta-banner-text">
                <h4>Prêt à donner un nouvel élan à votre carrière ?</h4>
                <p>Réservez une consultation gratuite avec nos experts</p>
              </div>
            </div>
            <Link href="/booking" className="cta-banner-btn">
              <i className="bi bi-calendar-check"></i> Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="why-choose-section pt-5 pb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="why-choose-header">
                <span className="section-badge">Nos atouts</span>
                <h3 className="fw-bold text-dark mb-3">Pourquoi nous choisir ?</h3>
                <p className="text-muted">Nous vous offrons un accompagnement sur-mesure pour maximiser votre réussite.</p>
                <Link href="/about" className="why-choose-link">En savoir plus <i className="bi bi-arrow-right"></i></Link>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="why-choose-list">
                {[
                  { num: '01', icon: 'bi-person-check', title: 'Accompagnement personnalisé', desc: 'Pour définir et clarifier votre projet professionnel.' },
                  { num: '02', icon: 'bi-mortarboard', title: 'Formations sur-mesure', desc: 'Pour développer vos compétences techniques et comportementales.' },
                  { num: '03', icon: 'bi-people', title: 'Un réseau dynamique', desc: 'Pour accéder à des mentors et experts du secteur.' },
                  { num: '04', icon: 'bi-tools', title: 'Outils pratiques', desc: "Test d'employabilité, simulations d'entretiens et plus encore." },
                  { num: '05', icon: 'bi-globe', title: 'Évolution professionnelle', desc: 'En France avec une approche adaptée au marché local.' },
                ].map(({ num, icon, title, desc }) => (
                  <div key={num} className="why-choose-item">
                    <span className="item-number">{num}</span>
                    <div className="item-content">
                      <div className="item-icon"><i className={`bi ${icon}`}></i></div>
                      <div className="item-text"><h6>{title}</h6><p>{desc}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="values-section pt-5 pb-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h3 className="text-base-color fw-700 ls-minus-1px mb-3">Nos valeurs</h3>
              <p className="text-muted fs-18">Nous nous engageons à offrir un service de qualité en mettant l&apos;humain et l&apos;excellence au cœur de notre mission.</p>
            </div>
          </div>
          <div className="row g-4">
            {[
              { icon: 'bi-people-fill', title: "Esprit d'équipe", desc: 'Notre équipe se mobilise dans un esprit de cohésion et de confiance afin de vous offrir un service de qualité.' },
              { icon: 'bi-ear-fill', title: 'Écoute', desc: 'Nous adoptons une posture de service et collectons avec attention et professionnalisme chacun de vos besoins.' },
              { icon: 'bi-heart-fill', title: 'Proximité', desc: "Nous favorisons une approche agile. Durant toutes les phases de l'objectif à atteindre, nous sommes à vos côtés." },
              { icon: 'bi-award-fill', title: 'Professionnalisme', desc: 'Nous agissons avec intégrité, responsabilité, respect et compétence dans tous les aspects de votre projet.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="col-lg-3 col-md-6 d-flex">
                <div className="value-card w-100">
                  <div className="value-icon"><i className={`bi ${icon}`}></i></div>
                  <h5 className="value-title">{title}</h5>
                  <p className="value-description">{desc}</p>
                  <div className="value-decoration"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article à la une */}
      <section className="bg-very-light-gray pt-5 pb-5">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-12 text-center">
              <h3 className="text-base-color fw-700 ls-minus-1px">Article à la une</h3>
              <p className="text-black">Découvrez nos dernières inspirations pour booster votre carrière</p>
            </div>
          </div>
          <div className="featured-article-container">
            <article className="featured-article">
              <Link href="/blog/reconversion-professionnelle-30-40-50-ans">
                <img
                  src="/images/blog/reconversion-professionnelle-cover.jpg"
                  alt="Reconversion professionnelle à 30, 40 ou 50 ans"
                  className="featured-image"
                  onError={(e) => { e.target.src = '/images/default-blog-cover.jpg' }}
                />
              </Link>
              <div className="featured-content">
                <span className="featured-badge">
                  <i className="feather icon-feather-star"></i> Article à la une
                </span>
                <h2 className="featured-title">
                  <Link href="/blog/reconversion-professionnelle-30-40-50-ans">
                    Reconversion professionnelle à 30, 40 ou 50 ans : par où commencer en 2025 ?
                  </Link>
                </h2>
                <p className="featured-excerpt">Guide complet pour réussir votre reconversion professionnelle à tout âge. Étapes clés, financements CPF, secteurs porteurs et conseils pour changer de métier avec succès.</p>
                <div className="featured-meta">
                  <span><i className="feather icon-feather-calendar"></i> 11 mai 2025</span>
                  <span><i className="feather icon-feather-clock"></i> 10 min de lecture</span>
                </div>
                <Link href="/blog/reconversion-professionnelle-30-40-50-ans" className="read-more-btn">
                  Lire l&apos;article <i className="feather icon-feather-arrow-right"></i>
                </Link>
              </div>
            </article>
          </div>
          <div className="text-center mt-4">
            <Link href="/blogs" className="btn btn-base-color btn-rounded btn-box-shadow text-transform-none fw-600">
              Voir tous les articles
            </Link>
          </div>
        </div>
      </section>

      {/* RPAM Connect */}
      <section id="rpam-connect" style={{ background: 'linear-gradient(135deg, #0d2535 0%, #003d3f 50%, #0d2535 100%)', padding: '90px 0' }}>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 col-md-10">
              <div className="mb-4">
                <span style={{ display: 'inline-block', background: 'rgba(236,171,35,0.15)', color: '#ecab23', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', padding: '6px 18px', borderRadius: '50px', border: '1px solid rgba(236,171,35,0.35)' }}>
                  Bientôt disponible
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: '8px', lineHeight: 1.1 }}>
                RPAM <span style={{ color: '#ecab23' }}>Connect</span>
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {['HRTech', 'IA + Coaching humain', 'France & Afrique francophone'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(0,81,83,0.5)', color: '#7ecece', fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(0,81,83,0.8)' }}>{tag}</span>
                ))}
              </div>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', marginBottom: '12px', lineHeight: 1.7 }}>
                La première plateforme combinant <strong style={{ color: '#fff' }}>intelligence artificielle et coaching humain</strong> pour accompagner chaque actif dans son évolution professionnelle.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'rgba(236,171,35,0.85)', marginBottom: '40px', fontStyle: 'italic' }}>
                &quot;L&apos;IA ne remplace pas le coach humain — elle le rend 4 fois plus efficace.&quot;
              </p>
              <WaitlistForm />
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>
                Aucun spam. Nous vous notifions uniquement lors du lancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Derniers articles */}
      <section className="pt-5 pb-5 bg-very-light-gray">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-12 text-center">
              <span className="fw-600 text-base-color fs-14 ls-1px text-uppercase d-block mb-2">Ressources gratuites</span>
              <h2 className="fw-700 text-dark-gray ls-minus-1px mb-2">Nos derniers articles</h2>
              <p className="text-medium-gray fs-17">Conseils pratiques pour booster votre carrière, réussir votre reconversion et décrocher le poste idéal.</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <Link href="/blog/reconversion-professionnelle-30-40-50-ans" className="d-block text-decoration-none h-100">
                <div className="p-4 bg-white border-radius-12px h-100 shadow-extra-small">
                  <span className="d-inline-block bg-base-color text-white fs-12 fw-600 px-3 py-1 border-radius-20px mb-3">Reconversion</span>
                  <h3 className="fw-600 fs-18 text-dark-gray mb-2">Reconversion professionnelle à 30, 40 ou 50 ans : par où commencer en 2025 ?</h3>
                  <p className="text-medium-gray fs-15 mb-3">Guide complet pour réussir votre reconversion professionnelle à tout âge. Étapes clés, financements CPF et conseils pratiques.</p>
                  <span className="text-base-color fw-600 fs-14">Lire l&apos;article <i className="fas fa-arrow-right ms-1"></i></span>
                </div>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link href="/blogs" className="d-block text-decoration-none h-100">
                <div className="p-4 bg-white border-radius-12px h-100 shadow-extra-small d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '180px' }}>
                  <i className="feather icon-feather-book-open" style={{ fontSize: '2.5rem', color: '#005153', marginBottom: '16px' }}></i>
                  <h3 className="fw-600 fs-18 text-dark-gray mb-2">D&apos;autres articles arrivent bientôt</h3>
                  <p className="text-medium-gray fs-15 mb-3">Nos conseillers partagent régulièrement leurs conseils et expertises sur le blog RPAM.</p>
                  <span className="text-base-color fw-600 fs-14">Voir le blog <i className="fas fa-arrow-right ms-1"></i></span>
                </div>
              </Link>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <Link href="/blogs" className="btn btn-outline btn-rounded btn-medium text-transform-none">
                Voir tous les articles
              </Link>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}
