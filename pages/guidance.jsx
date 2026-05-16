import { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = [
  [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Guidance – Bilan de compétences & orientation professionnelle",
      "url": "https://www.rpam.fr/guidance",
      "serviceType": "Bilan de compétences",
      "description": "Bilan de compétences, définition de projet professionnel, plan d'action personnalisé et accompagnement à la reconversion professionnelle.",
      "areaServed": { "@type": "Country", "name": "France" },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://www.rpam.fr/booking",
        "serviceType": "En ligne et en présentiel"
      },
      "provider": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qu'est-ce qu'un bilan de compétences ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Un bilan de compétences est un accompagnement professionnel qui permet d'analyser vos compétences, aptitudes et motivations pour définir un projet professionnel ou de formation adapté à votre profil. RPAM vous guide à travers ce processus pour clarifier vos objectifs de carrière."
          }
        },
        {
          "@type": "Question",
          "name": "Qui peut bénéficier du service Guidance de RPAM ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le service Guidance de RPAM s'adresse à toute personne souhaitant faire le point sur sa carrière : salariés en reconversion, étudiants en recherche d'orientation, professionnels souhaitant évoluer ou changer de secteur."
          }
        },
        {
          "@type": "Question",
          "name": "Comment se déroule un accompagnement Guidance ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L'accompagnement Guidance chez RPAM se déroule en plusieurs étapes : analyse de votre situation actuelle, bilan de compétences approfondi, définition de vos objectifs professionnels et construction d'un plan d'action concret et personnalisé."
          }
        }
      ]
    }
  ],
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.rpam.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.rpam.fr/services" },
      { "@type": "ListItem", "position": 3, "name": "Guidance – Bilan de compétences", "item": "https://www.rpam.fr/guidance" }
    ]
  }
]

export default function Guidance() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault()
          const target = document.querySelector(this.getAttribute('href'))
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 50,
              behavior: 'smooth'
            })
          }
        })
      })
    }
  }, [])

  return (
    <Layout activePage="guidance">
      <SEOHead
        title="Guidance – Bilan de compétences &amp; orientation professionnelle | RPAM"
        description="Bilan de compétences et orientation professionnelle avec RPAM. Définissez votre projet de reconversion, clarifiez vos objectifs et construisez un plan d'action concret pour booster votre carrière."
        canonical="https://www.rpam.fr/guidance"
        schema={schema}
      />

      {/* Hero Section Moderne */}
      <section className="guidance-hero">
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        <div className="container position-relative">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7">
              <div className="hero-content">
                <span className="hero-badge">
                  <i className="bi bi-compass"></i> Nos Services
                </span>
                <h1 className="hero-title">Guidance – Bilan de Compétences &amp; Orientation Professionnelle</h1>
                <p className="hero-subtitle">Clarifiez votre projet et construisez votre plan de reconversion</p>
                <p className="hero-description">
                  Clarifiez votre projet professionnel et construisez une carrière alignée avec vos
                  aspirations.
                </p>
                <div className="hero-actions">
                  <Link href="/booking" className="btn-hero-primary">
                    <i className="bi bi-calendar-check"></i> Prendre rendez-vous
                  </Link>
                  <a href="#content-start" className="btn-hero-secondary">
                    En savoir plus <i className="bi bi-arrow-down"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="hero-visual">
                <div className="floating-card card-1">
                  <i className="bi bi-bullseye"></i>
                  <span>Objectifs clairs</span>
                </div>
                <div className="floating-card card-2">
                  <i className="bi bi-graph-up-arrow"></i>
                  <span>Plan d&apos;action</span>
                </div>
                <div className="floating-card card-3">
                  <i className="bi bi-person-check"></i>
                  <span>Accompagnement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="guidance-content-section pt-5 pb-5" id="content-start">
        <div className="container">
          <div className="row">
            {/* Sidebar Moderne */}
            <div className="col-lg-4 order-2 order-lg-1">
              <div className="modern-sidebar">
                {/* Navigation sticky */}
                <div className="sidebar-nav-card">
                  <div className="sidebar-nav-header">
                    <i className="bi bi-list-ul"></i>
                    <span>Navigation rapide</span>
                  </div>
                  <ul className="sidebar-nav-list">
                    <li>
                      <a href="#projet-professionnel">
                        <span className="nav-dot"></span>
                        Quand faire appel à ce service?
                      </a>
                    </li>
                    <li>
                      <a href="#valorisation-competences">
                        <span className="nav-dot"></span>
                        Nos Objectifs
                      </a>
                    </li>
                    <li>
                      <a href="#plan-action">
                        <span className="nav-dot"></span>
                        Notre Méthodologie
                      </a>
                    </li>
                    <li>
                      <a href="#emploi-aligné">
                        <span className="nav-dot"></span>
                        Formats Disponibles
                      </a>
                    </li>
                    <li>
                      <a href="#reconversion">
                        <span className="nav-dot"></span>
                        Les Bénéfices
                      </a>
                    </li>
                  </ul>
                </div>

                {/* CTA Card */}
                <div className="sidebar-cta-card">
                  <div className="cta-icon-wrapper">
                    <i className="bi bi-calendar-check"></i>
                  </div>
                  <h6>Besoin d&apos;accompagnement ?</h6>
                  <p>Réservez une consultation gratuite avec nos experts.</p>
                  <Link href="/booking" className="sidebar-cta-btn">
                    Prendre rendez-vous <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>

                {/* Services liés */}
                <div className="sidebar-related">
                  <h6>Autres services</h6>
                  <Link href="/up-training" className="related-link">
                    <i className="bi bi-mortarboard"></i>
                    Up Training
                  </Link>
                  <Link href="/job-getting" className="related-link">
                    <i className="bi bi-briefcase"></i>
                    Job Getting
                  </Link>
                </div>
              </div>
            </div>

            {/* Contenu Principal */}
            <div className="col-lg-8 order-1 order-lg-2 md-mb-50px">
              {/* Introduction */}
              <div className="content-intro">
                <h2 className="section-main-title">
                  Orientation Professionnelle : Trouvez Votre Voie
                </h2>
                <p className="intro-text">
                  L&apos;<strong>orientation professionnelle</strong> est une étape clé pour bâtir une carrière
                  alignée avec vos aspirations et le marché du travail. Chez <strong>RPAM</strong>, nous vous
                  accompagnons pour <strong>clarifier votre projet professionnel, identifier vos compétences
                    et construire un plan d&apos;action concret.</strong>
                </p>
              </div>

              {/* Section Quand faire appel */}
              <div id="projet-professionnel" className="content-section">
                <div className="section-header">
                  <span className="section-number">01</span>
                  <h3 className="section-title">Quand faire appel à ce service ?</h3>
                </div>

                <div className="situation-cards">
                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-question-circle"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Manque de clarté sur votre avenir professionnel</h5>
                      <ul>
                        <li>Vous ne savez pas quelle carrière choisir après vos études ou après une
                          reconversion.</li>
                        <li>Vous hésitez entre plusieurs secteurs ou métiers et avez besoin de conseils
                          personnalisés.</li>
                        <li>Vous souhaitez identifier un projet professionnel réaliste et motivant.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-gem"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Difficulté à valoriser vos compétences</h5>
                      <ul>
                        <li>Vous avez des diplômes ou des formations, mais vous ne savez pas comment les
                          exploiter.</li>
                        <li>Vous avez peu ou pas d&apos;expérience, ce qui vous empêche d&apos;identifier votre
                          valeur sur le marché.</li>
                        <li>Vous souhaitez traduire vos compétences académiques en compétences
                          professionnelles.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-battery-half"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Sensation de stagnation ou de frustration</h5>
                      <ul>
                        <li>Vous avez le sentiment de ne pas évoluer dans votre poste actuel.</li>
                        <li>Vous ressentez une perte de motivation ou d&apos;intérêt pour votre travail.</li>
                        <li>Vous envisagez une reconversion professionnelle, mais ne savez pas comment
                          vous y prendre.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-search"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Difficulté à trouver un emploi aligné avec vos ambitions</h5>
                      <ul>
                        <li>Vous envoyez de nombreuses candidatures, mais ne décrochez pas
                          d&apos;opportunités adaptées.</li>
                        <li>Vous avez l&apos;impression que votre profil ne correspond pas aux attentes du
                          marché.</li>
                        <li>Vous souhaitez accéder à un emploi en accord avec vos valeurs et votre mode
                          de vie.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Objectifs */}
              <div id="valorisation-competences" className="content-section">
                <div className="section-header">
                  <span className="section-number">02</span>
                  <h3 className="section-title">Nos Objectifs</h3>
                </div>

                <div className="objectives-grid">
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-bullseye"></i>
                    </div>
                    <p>Clarifier votre projet professionnel et définir des objectifs réalisables.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-lightbulb"></i>
                    </div>
                    <p>Aligner vos compétences, intérêts et valeurs avec les opportunités du marché.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-book"></i>
                    </div>
                    <p>Identifier les formations et expériences nécessaires pour atteindre votre but.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-list-check"></i>
                    </div>
                    <p>Structurer un plan d&apos;action efficace et mesurable.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-rocket"></i>
                    </div>
                    <p>Vous donner les outils et la confiance pour avancer sereinement.</p>
                  </div>
                </div>
              </div>

              {/* Section Méthodologie */}
              <div id="plan-action" className="content-section">
                <div className="section-header">
                  <span className="section-number">03</span>
                  <h3 className="section-title">Notre Méthodologie</h3>
                </div>

                <div className="methodology-timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>1</span>
                    </div>
                    <div className="timeline-content">
                      <h6>Analyse et Bilan Personnel</h6>
                      <ul>
                        <li>Évaluation de vos compétences, expériences et intérêts professionnels.</li>
                        <li>Tests d&apos;orientation pour mieux comprendre vos préférences.</li>
                        <li>Identification de vos valeurs et aspirations professionnelles.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>2</span>
                    </div>
                    <div className="timeline-content">
                      <h6>Exploration des Possibilités</h6>
                      <ul>
                        <li>Analyse des secteurs porteurs et opportunités du marché.</li>
                        <li>Recherche des métiers en adéquation avec vos compétences et aspirations.</li>
                        <li>Identification des écarts de compétences et solutions pour les combler.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>3</span>
                    </div>
                    <div className="timeline-content">
                      <h6>Construction de Votre Plan d&apos;Action</h6>
                      <ul>
                        <li>Définition d&apos;objectifs clairs et atteignables.</li>
                        <li>Élaboration d&apos;une stratégie de développement professionnel sur le court,
                          moyen et long terme.</li>
                        <li>Conseils sur les formations complémentaires et expériences professionnelles
                          à acquérir.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>4</span>
                    </div>
                    <div className="timeline-content">
                      <h6>Mise en Pratique et Suivi Personnalisé</h6>
                      <ul>
                        <li>Coaching individuel pour structurer votre projet et renforcer votre
                          confiance.</li>
                        <li>Techniques de networking et conseils pour élargir vos opportunités.</li>
                        <li>Ajustements et accompagnement sur la durée pour assurer votre succès.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Formats */}
              <div id="emploi-aligné" className="content-section">
                <div className="section-header">
                  <span className="section-number">04</span>
                  <h3 className="section-title">Formats Disponibles</h3>
                </div>

                <div className="formats-grid">
                  <div className="format-card">
                    <div className="format-icon">
                      <i className="bi bi-person-video3"></i>
                    </div>
                    <h5>Coaching Individuel</h5>
                    <p>Accompagnement personnalisé en one-to-one avec un expert dédié.</p>
                    <span className="format-tag">Personnalisé</span>
                  </div>
                  <div className="format-card">
                    <div className="format-icon">
                      <i className="bi bi-people"></i>
                    </div>
                    <h5>Ateliers Collectifs</h5>
                    <p>Séances interactives en groupe pour échanger et apprendre ensemble.</p>
                    <span className="format-tag">Interactif</span>
                  </div>
                  <div className="format-card">
                    <div className="format-icon">
                      <i className="bi bi-journal-text"></i>
                    </div>
                    <h5>Ressources et Guides</h5>
                    <p>Outils pratiques, fiches métiers, guides d&apos;orientation, tests de compétences.</p>
                    <span className="format-tag">Pratique</span>
                  </div>
                  <div className="format-card">
                    <div className="format-icon">
                      <i className="bi bi-clipboard-check"></i>
                    </div>
                    <h5>Plan d&apos;action structuré</h5>
                    <p>Document personnalisé pour suivre votre évolution et vos objectifs.</p>
                    <span className="format-tag">Sur mesure</span>
                  </div>
                </div>
              </div>

              {/* Section Bénéfices */}
              <div id="reconversion" className="content-section">
                <div className="section-header">
                  <span className="section-number">05</span>
                  <h3 className="section-title">Les Bénéfices de Notre Accompagnement</h3>
                </div>

                <div className="benefits-modern">
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Un projet professionnel clair et réaliste.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Une meilleure confiance en soi et en ses choix.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Une stratégie d&apos;évolution alignée avec vos ambitions.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Une meilleure compréhension du marché et de ses exigences.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Un plan d&apos;action concret pour réussir votre insertion ou reconversion.</span>
                  </div>
                </div>
              </div>

              {/* CTA Final */}
              <div className="final-cta">
                <div className="cta-content">
                  <div className="cta-icon">
                    <i className="bi bi-rocket-takeoff"></i>
                  </div>
                  <h4>Prêt(e) à transformer votre carrière ?</h4>
                  <p>Vous êtes perdu(e) dans votre parcours professionnel ? Vous souhaitez donner un nouveau
                    souffle à votre carrière ?</p>
                  <p className="cta-highlight">RPAM vous accompagne pas à pas !</p>
                  <Link href="/booking" className="cta-button">
                    <i className="bi bi-calendar-check"></i>
                    Réservez votre consultation gratuite
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pour aller plus loin ─────────────────────────────── */}
      <section className="svc-resources-section">
        <div className="container">
          <div className="svc-resources-header" data-aos="fade-up">
            <span className="svc-resources-label">Ressources</span>
            <h2 className="svc-resources-title">Pour aller plus loin</h2>
            <p className="svc-resources-sub">Approfondissez votre démarche d&apos;orientation avec nos articles et nos services complémentaires.</p>
          </div>
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="row g-3">
                {/* Article 1 — Reconversion */}
                <div className="col-12 col-md-6" data-aos="fade-up">
                  <Link href="/blog/reconversion-professionnelle-30-40-50-ans" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#005153,#007a7d)' }}>
                      <i className="fas fa-arrows-rotate"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag">Reconversion &amp; Bilan</span>
                      <h3 className="svc-article-title">Reconversion professionnelle à 30, 40 ou 50 ans</h3>
                      <p className="svc-article-excerpt">Bilan de compétences, CPF et étapes clés pour clarifier votre projet et réussir votre transition.</p>
                      <span className="svc-article-cta">Lire l&apos;article <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
                {/* Article 2 — IA au travail */}
                <div className="col-12 col-md-6" data-aos="fade-up" data-aos-delay="100">
                  <Link href="/blog/se-former-intelligence-artificielle-travail-2025" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#c78f00,#ecab23)' }}>
                      <i className="fas fa-robot"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag svc-article-tag--gold">IA &amp; Marché du travail</span>
                      <h3 className="svc-article-title">Se former à l&apos;IA au travail : guide pratique 2025</h3>
                      <p className="svc-article-excerpt">Comprendre les évolutions du marché et les nouvelles compétences attendues pour orienter votre projet professionnel.</p>
                      <span className="svc-article-cta">Lire l&apos;article <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/blogs" className="svc-all-articles-link">
                  Voir tous les articles du blog <i className="fas fa-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-4" data-aos="fade-left">
              <div className="svc-sidebar">
                <h3 className="svc-sidebar-title">Nos autres services</h3>
                <Link href="/up-training" className="svc-related-card">
                  <div className="svc-related-icon"><i className="fas fa-chart-line"></i></div>
                  <div>
                    <strong>Up Training</strong>
                    <p>Formation sur mesure pour développer vos compétences clés.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
                <Link href="/job-getting" className="svc-related-card">
                  <div className="svc-related-icon"><i className="fas fa-briefcase"></i></div>
                  <div>
                    <strong>Job Getting</strong>
                    <p>Coaching emploi et préparation aux entretiens d&apos;embauche.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
                <Link href="/booking" className="svc-related-card svc-related-card--cta">
                  <div className="svc-related-icon svc-related-icon--cta"><i className="fas fa-calendar-alt"></i></div>
                  <div>
                    <strong>Consultation gratuite</strong>
                    <p>Échangeons sur votre projet d&apos;orientation.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
