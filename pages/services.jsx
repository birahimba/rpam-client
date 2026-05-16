import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Bilan de Compétences, Formation & Coaching Emploi – RPAM",
    "url": "https://www.rpam.fr/services",
    "description": "Découvrez les 3 services RPAM : bilan de compétences et orientation professionnelle (Guidance), formation sur mesure (Up Training) et coaching emploi (Job Getting).",
    "publisher": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quels services propose RPAM ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RPAM propose 3 services complémentaires : Guidance (bilan de compétences et orientation professionnelle), Up Training (formations sur mesure et développement des compétences), et Job Getting (coaching emploi, optimisation CV et préparation aux entretiens)."
        }
      },
      {
        "@type": "Question",
        "name": "RPAM propose-t-il des consultations gratuites ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, RPAM propose une consultation gratuite pour discuter de votre projet professionnel et identifier le service le plus adapté à votre situation. Vous pouvez réserver directement sur le site avec une réponse sous 24h."
        }
      },
      {
        "@type": "Question",
        "name": "Les services RPAM sont-ils disponibles à distance ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, tous les services RPAM (bilan de compétences, formation et coaching emploi) sont disponibles en ligne, ce qui permet un accompagnement personnalisé depuis toute la France et les pays francophones."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.rpam.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Nos Services", "item": "https://www.rpam.fr/services" }
    ]
  }
]

export default function Services() {
  return (
    <Layout activePage="services">
      <SEOHead
        title="Bilan de Compétences, Formation & Coaching Emploi | RPAM"
        description="RPAM propose 3 services pour booster votre carrière : bilan de compétences et orientation professionnelle, formation sur mesure, coaching emploi et préparation aux entretiens. Consultation gratuite."
        canonical="https://www.rpam.fr/services"
        schema={schema}
      />

      {/* ===================== HERO ===================== */}
      <section className="sp-hero">
        <div className="sp-hero-bg"></div>
        <div className="sp-hero-overlay"></div>
        <div className="container sp-hero-content">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="sp-hero-badge">
                <i className="fas fa-th-large"></i> RPAM
              </span>
              <h1 className="sp-hero-title">Nos <span className="sp-hero-highlight">Services</span></h1>
              <p className="sp-hero-subtitle">
                Trois expertises complémentaires pour vous accompagner à chaque étape de votre parcours professionnel.
              </p>
              <div className="sp-hero-actions">
                <a href="#services-grid" className="sp-btn-primary">
                  <i className="fas fa-arrow-down"></i> Découvrir nos services
                </a>
                <Link href="/booking" className="sp-btn-secondary">
                  <i className="fas fa-calendar-alt"></i> Prendre rendez-vous
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-end align-items-center">
              <div className="sp-hero-cards">
                <div className="sp-hero-card sp-hcard-1">
                  <div className="sp-hcard-icon"><i className="fas fa-compass"></i></div>
                  <div className="sp-hcard-body">
                    <span className="sp-hcard-label">Orientation</span>
                    <strong>Guidance</strong>
                    <p>Clarifiez votre projet professionnel</p>
                  </div>
                  <span className="sp-hcard-badge">Populaire</span>
                </div>
                <div className="sp-hero-card sp-hcard-2">
                  <div className="sp-hcard-icon"><i className="fas fa-chart-line"></i></div>
                  <div className="sp-hcard-body">
                    <span className="sp-hcard-label">Formation</span>
                    <strong>Up Training</strong>
                    <p>Développez vos compétences clés</p>
                  </div>
                </div>
                <div className="sp-hero-card sp-hcard-3">
                  <div className="sp-hcard-icon"><i className="fas fa-briefcase"></i></div>
                  <div className="sp-hcard-body">
                    <span className="sp-hcard-label">Coaching</span>
                    <strong>Job Getting</strong>
                    <p>Décrochez le poste idéal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sp-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f8f9fa" />
          </svg>
        </div>
      </section>

      {/* ===================== STATS BAR ===================== */}
      <section className="sp-stats">
        <div className="container">
          <div className="sp-stats-grid">
            <div className="sp-stat-item">
              <span className="sp-stat-number">+200</span>
              <span className="sp-stat-label">Clients accompagnés</span>
            </div>
            <div className="sp-stat-divider"></div>
            <div className="sp-stat-item">
              <span className="sp-stat-number">3</span>
              <span className="sp-stat-label">Services spécialisés</span>
            </div>
            <div className="sp-stat-divider"></div>
            <div className="sp-stat-item">
              <span className="sp-stat-number">96%</span>
              <span className="sp-stat-label">Taux de satisfaction</span>
            </div>
            <div className="sp-stat-divider"></div>
            <div className="sp-stat-item">
              <span className="sp-stat-number">5+</span>
              <span className="sp-stat-label">Années d&apos;expérience</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES GRID ===================== */}
      <section className="sp-services-section" id="services-grid">
        <div className="container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Ce que nous proposons</span>
            <h2 className="sp-section-title">Un accompagnement sur mesure<br />à chaque étape</h2>
            <p className="sp-section-desc">Chaque service est conçu pour répondre à une problématique précise de votre parcours, avec une approche 100 % personnalisée.</p>
          </div>

          <div className="sp-services-grid">

            {/* SERVICE 1 - GUIDANCE */}
            <div className="sp-service-card sp-card-featured" data-service="guidance">
              <div className="sp-card-featured-label">
                <i className="fas fa-star"></i> Le plus populaire
              </div>
              <div className="sp-card-top">
                <div className="sp-card-number">01</div>
                <div className="sp-card-icon-wrap">
                  <div className="sp-card-icon">
                    <i className="fas fa-compass"></i>
                  </div>
                </div>
              </div>
              <div className="sp-card-badge">Orientation Professionnelle</div>
              <h3 className="sp-card-title">GUIDANCE</h3>
              <p className="sp-card-desc">
                Vous vous interrogez sur votre avenir professionnel ? Notre service Guidance vous aide à clarifier votre projet, valoriser vos compétences et construire un parcours aligné avec vos aspirations.
              </p>
              <ul className="sp-card-features">
                <li><i className="fas fa-check-circle"></i> Bilan de compétences approfondi</li>
                <li><i className="fas fa-check-circle"></i> Définition d&apos;objectifs de carrière</li>
                <li><i className="fas fa-check-circle"></i> Plan d&apos;action concret et réaliste</li>
                <li><i className="fas fa-check-circle"></i> Accompagnement personnalisé</li>
              </ul>
              <div className="sp-card-tags">
                <span>Bilan</span>
                <span>Reconversion</span>
                <span>Orientation</span>
              </div>
              <Link href="/guidance" className="sp-card-cta">
                Découvrir Guidance <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* SERVICE 2 - UP TRAINING */}
            <div className="sp-service-card" data-service="uptraining">
              <div className="sp-card-top">
                <div className="sp-card-number">02</div>
                <div className="sp-card-icon-wrap">
                  <div className="sp-card-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                </div>
              </div>
              <div className="sp-card-badge">Développement de Compétences</div>
              <h3 className="sp-card-title">UP TRAINING</h3>
              <p className="sp-card-desc">
                Le marché évolue vite. Notre service Up Training vous permet de renforcer vos compétences techniques et comportementales pour rester compétitif et décrocher les meilleures opportunités.
              </p>
              <ul className="sp-card-features">
                <li><i className="fas fa-check-circle"></i> Formations sur mesure et ciblées</li>
                <li><i className="fas fa-check-circle"></i> Hard skills &amp; soft skills</li>
                <li><i className="fas fa-check-circle"></i> Préparation aux certifications</li>
                <li><i className="fas fa-check-circle"></i> Suivi de progression continu</li>
              </ul>
              <div className="sp-card-tags">
                <span>Formation</span>
                <span>Compétences</span>
                <span>Certifications</span>
              </div>
              <Link href="/up-training" className="sp-card-cta">
                Découvrir Up Training <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* SERVICE 3 - JOB GETTING */}
            <div className="sp-service-card" data-service="jobgetting">
              <div className="sp-card-top">
                <div className="sp-card-number">03</div>
                <div className="sp-card-icon-wrap">
                  <div className="sp-card-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                </div>
              </div>
              <div className="sp-card-badge">Coaching Emploi</div>
              <h3 className="sp-card-title">JOB GETTING</h3>
              <p className="sp-card-desc">
                Prêt(e) à postuler mais vous ne savez pas comment vous démarquer ? Job Getting vous arme d&apos;un CV percutant, d&apos;une présence LinkedIn optimisée et d&apos;une préparation aux entretiens.
              </p>
              <ul className="sp-card-features">
                <li><i className="fas fa-check-circle"></i> CV et lettre de motivation optimisés</li>
                <li><i className="fas fa-check-circle"></i> Profil LinkedIn stratégique</li>
                <li><i className="fas fa-check-circle"></i> Simulation d&apos;entretiens</li>
                <li><i className="fas fa-check-circle"></i> Activation du réseau professionnel</li>
              </ul>
              <div className="sp-card-tags">
                <span>CV</span>
                <span>Entretiens</span>
                <span>Réseau</span>
              </div>
              <Link href="/job-getting" className="sp-card-cta">
                Découvrir Job Getting <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section className="sp-process-section">
        <div className="container">
          <div className="sp-section-header">
            <span className="sp-section-tag">Notre approche</span>
            <h2 className="sp-section-title">Comment ça marche ?</h2>
            <p className="sp-section-desc">Un accompagnement structuré en 3 étapes simples pour transformer votre carrière.</p>
          </div>

          <div className="sp-process-grid">
            <div className="sp-process-step">
              <div className="sp-process-icon">
                <i className="fas fa-search"></i>
                <span className="sp-process-num">1</span>
              </div>
              <div className="sp-process-connector"></div>
              <h4 className="sp-process-title">Diagnostic initial</h4>
              <p className="sp-process-desc">Un premier entretien gratuit pour cerner votre situation, vos objectifs et identifier le service le plus adapté à vos besoins.</p>
            </div>

            <div className="sp-process-step">
              <div className="sp-process-icon">
                <i className="fas fa-map-marked-alt"></i>
                <span className="sp-process-num">2</span>
              </div>
              <div className="sp-process-connector"></div>
              <h4 className="sp-process-title">Plan personnalisé</h4>
              <p className="sp-process-desc">Nous construisons ensemble un programme sur mesure avec des objectifs clairs, un calendrier défini et des outils adaptés.</p>
            </div>

            <div className="sp-process-step">
              <div className="sp-process-icon">
                <i className="fas fa-rocket"></i>
                <span className="sp-process-num">3</span>
              </div>
              <h4 className="sp-process-title">Accompagnement &amp; Résultats</h4>
              <p className="sp-process-desc">Séances régulières, suivi continu et ajustements pour garantir votre progression vers vos objectifs professionnels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY RPAM ===================== */}
      <section className="sp-why-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span className="sp-section-tag">Pourquoi RPAM ?</span>
              <h2 className="sp-section-title sp-title-left">Ce qui nous distingue</h2>
              <p className="sp-section-desc sp-desc-left">
                Chez RPAM, nous croyons que chaque parcours est unique. Notre approche humaine, rigoureuse et centrée sur vos résultats fait toute la différence.
              </p>
              <Link href="/about" className="sp-btn-outline">
                En savoir plus sur RPAM <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="col-lg-7">
              <div className="sp-why-grid">
                <div className="sp-why-card">
                  <div className="sp-why-icon">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <h5>Expertise reconnue</h5>
                  <p>Des consultants certifiés avec des années d&apos;expérience dans l&apos;accompagnement professionnel.</p>
                </div>
                <div className="sp-why-card">
                  <div className="sp-why-icon">
                    <i className="fas fa-fingerprint"></i>
                  </div>
                  <h5>100 % personnalisé</h5>
                  <p>Pas de programme générique. Chaque accompagnement est construit autour de votre profil unique.</p>
                </div>
                <div className="sp-why-card">
                  <div className="sp-why-icon">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <h5>Orienté résultats</h5>
                  <p>Des objectifs mesurables, un suivi rigoureux et une méthode éprouvée pour atteindre vos ambitions.</p>
                </div>
                <div className="sp-why-card">
                  <div className="sp-why-icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <h5>Suivi continu</h5>
                  <p>Un accompagnement dans la durée, avec un accès à votre consultant entre les séances.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIAL BANNER ===================== */}
      <section className="sp-quote-section">
        <div className="container">
          <div className="sp-quote-inner">
            <div className="sp-quote-icon">
              <i className="fas fa-quote-left"></i>
            </div>
            <blockquote className="sp-quote-text">
              &quot;RPAM m&apos;a aidé à clarifier mon projet professionnel en quelques semaines. Aujourd&apos;hui, j&apos;ai décroché un poste qui correspond vraiment à mes ambitions.&quot;
            </blockquote>
            <div className="sp-quote-author">
              <div className="sp-quote-avatar">M.L.</div>
              <div>
                <strong>Marie L.</strong>
                <span>Reconversion réussie – Service Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="sp-cta-section">
        <div className="container">
          <div className="sp-cta-inner">
            <div className="sp-cta-deco sp-cta-deco-1"></div>
            <div className="sp-cta-deco sp-cta-deco-2"></div>
            <div className="sp-cta-content">
              <span className="sp-cta-tag"><i className="fas fa-rocket"></i> Passez à l&apos;action</span>
              <h2 className="sp-cta-title">Prêt(e) à transformer votre carrière ?</h2>
              <p className="sp-cta-desc">Réservez dès maintenant votre consultation gratuite et découvrez comment RPAM peut vous accompagner vers le succès professionnel.</p>
              <div className="sp-cta-actions">
                <Link href="/booking" className="sp-cta-btn-primary">
                  <i className="fas fa-calendar-alt"></i>
                  Réserver ma consultation gratuite
                </Link>
                <Link href="/about" className="sp-cta-btn-secondary">
                  Qui sommes-nous
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
