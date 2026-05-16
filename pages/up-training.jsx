import { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = [
  [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Up Training – Formation professionnelle sur mesure",
      "url": "https://www.rpam.fr/up-training",
      "serviceType": "Formation professionnelle",
      "description": "Formations professionnelles sur mesure pour développer vos compétences techniques et comportementales (soft skills), avec un coaching personnalisé adapté à votre secteur.",
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
          "name": "Qu'est-ce qu'une formation sur mesure ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Une formation sur mesure chez RPAM est un programme de développement des compétences entièrement personnalisé selon votre profil, vos objectifs et votre secteur d'activité. Contrairement aux formations standard, elle s'adapte à votre rythme et à vos besoins spécifiques."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les soft skills les plus importants en entreprise ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les soft skills les plus valorisés sur le marché de l'emploi incluent : la communication, la gestion du stress, le leadership, l'adaptabilité, le travail en équipe et la résolution de problèmes. RPAM vous aide à identifier et développer ces compétences comportementales clés."
          }
        },
        {
          "@type": "Question",
          "name": "Comment fonctionne le coaching personnalisé Up Training ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le coaching Up Training démarre par une analyse de vos compétences actuelles et de vos objectifs professionnels. RPAM construit ensuite un programme de formation individualisé combinant apports théoriques, exercices pratiques et suivi régulier pour garantir votre progression."
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
      { "@type": "ListItem", "position": 3, "name": "Up Training – Formations sur Mesure", "item": "https://www.rpam.fr/up-training" }
    ]
  }
]

export default function UpTraining() {
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
    <Layout activePage="up-training">
      <SEOHead
        title="Up Training – Formations sur mesure &amp; développement de compétences | RPAM"
        description="Formation professionnelle sur mesure avec RPAM : développement des compétences techniques et soft skills, coaching personnalisé. Montez en compétences et restez compétitif sur le marché de l'emploi."
        canonical="https://www.rpam.fr/up-training"
        schema={schema}
      />

      {/* Hero Section Moderne */}
      <section className="uptraining-hero">
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        <div className="container position-relative">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7">
              <div className="hero-content">
                <span className="hero-badge">
                  <i className="bi bi-mortarboard"></i> Nos Services
                </span>
                <h1 className="hero-title">Up Training – Formations Professionnelles sur Mesure</h1>
                <p className="hero-subtitle">Développez vos compétences techniques et soft skills</p>
                <p className="hero-description">
                  Renforcez vos compétences et restez compétitif sur le marché du travail avec un
                  accompagnement personnalisé.
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
                  <i className="bi bi-graph-up-arrow"></i>
                  <span>Montée en compétences</span>
                </div>
                <div className="floating-card card-2">
                  <i className="bi bi-award"></i>
                  <span>Certifications</span>
                </div>
                <div className="floating-card card-3">
                  <i className="bi bi-lightning"></i>
                  <span>Soft Skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="uptraining-content-section pt-5 pb-5" id="content-start">
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
                  <Link href="/guidance" className="related-link">
                    <i className="bi bi-compass"></i>
                    Guidance
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
                  Développement de Compétences : Évoluez et Restez Compétitif
                </h2>
                <p className="intro-text">
                  Le marché du travail évolue constamment et les compétences d&apos;aujourd&apos;hui ne suffisent pas
                  toujours pour demain. Que vous souhaitiez <strong>renforcer vos capacités</strong>, vous
                  adapter aux nouvelles exigences professionnelles ou évoluer vers un nouveau poste,
                  <strong>RPAM</strong> vous accompagne dans votre <strong>montée en compétences</strong> avec
                  une approche ciblée et efficace.
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
                      <i className="bi bi-tools"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Manque de compétences techniques ou comportementales</h5>
                      <ul>
                        <li>Vous avez l&apos;impression que vos compétences actuelles sont insuffisantes pour
                          évoluer dans votre carrière.</li>
                        <li>Vous voulez acquérir de nouvelles compétences techniques (logiciels, outils
                          digitaux, méthodologies...).</li>
                        <li>Vous avez besoin de développer vos soft skills (communication, leadership,
                          gestion du stress...).</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-pause-circle"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Stagnation professionnelle</h5>
                      <ul>
                        <li>Vous occupez le même poste depuis plusieurs années et avez l&apos;impression de
                          ne plus progresser.</li>
                        <li>Vos compétences ne vous permettent pas d&apos;accéder à des responsabilités plus
                          élevées.</li>
                        <li>Vous souhaitez évoluer vers un nouveau rôle, mais vous manquez des
                          qualifications nécessaires.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-arrow-repeat"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Difficultés à s&apos;adapter aux évolutions du marché</h5>
                      <ul>
                        <li>Votre secteur évolue rapidement et vous avez du mal à suivre les nouvelles
                          tendances.</li>
                        <li>Vous constatez que les recruteurs recherchent des compétences que vous ne
                          maîtrisez pas encore.</li>
                        <li>Vous ressentez une insécurité professionnelle face aux mutations
                          technologiques.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-shuffle"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Transition professionnelle</h5>
                      <ul>
                        <li>Vous voulez changer de métier ou de secteur, mais vous ne savez pas quelles
                          compétences développer.</li>
                        <li>Vous avez besoin d&apos;un plan structuré pour acquérir les compétences
                          nécessaires à votre reconversion.</li>
                        <li>Vous souhaitez valoriser vos compétences transférables pour un nouvel
                          emploi.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-person-raised-hand"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Difficultés à s&apos;affirmer professionnellement</h5>
                      <ul>
                        <li>Vous manquez de confiance en vous pour exprimer vos idées en réunion.</li>
                        <li>Vous voulez améliorer votre capacité à négocier, gérer des conflits ou
                          prendre la parole en public.</li>
                        <li>Vous souhaitez devenir un meilleur leader ou manager dans votre entreprise.</li>
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
                    <p>Renforcer vos compétences clés pour répondre aux exigences du marché.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-lightbulb"></i>
                    </div>
                    <p>Développer vos soft skills pour mieux interagir et progresser en entreprise.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-graph-up"></i>
                    </div>
                    <p>Faciliter votre évolution professionnelle et votre employabilité.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-arrow-clockwise"></i>
                    </div>
                    <p>Améliorer votre capacité à vous adapter aux nouvelles tendances du marché.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-rocket"></i>
                    </div>
                    <p>Booster votre confiance en vous pour vous affirmer dans votre carrière.</p>
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
                      <h6>Diagnostic et Bilan de Compétences</h6>
                      <ul>
                        <li>Analyse de vos compétences actuelles et identification des lacunes.</li>
                        <li>Définition d&apos;un plan de formation adapté à vos objectifs professionnels.</li>
                        <li>Évaluation des opportunités d&apos;évolution en fonction du marché du travail.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>2</span>
                    </div>
                    <div className="timeline-content">
                      <h6>Formation et Acquisition de Nouvelles Compétences</h6>
                      <ul>
                        <li>Formations sur les compétences techniques et numériques nécessaires à votre
                          métier.</li>
                        <li>Ateliers pratiques pour développer des compétences comportementales clés
                          (communication, gestion du stress, leadership...).</li>
                        <li>Accompagnement dans l&apos;application immédiate des nouvelles compétences en
                          entreprise.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>3</span>
                    </div>
                    <div className="timeline-content">
                      <h6>Développement du Leadership et des Soft Skills</h6>
                      <ul>
                        <li>Coaching en prise de parole en public et gestion des interactions
                          professionnelles.</li>
                        <li>Stratégies pour gagner en assurance et en impact dans vos interventions.</li>
                        <li>Formation à la gestion des conflits, négociation et management d&apos;équipe.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>4</span>
                    </div>
                    <div className="timeline-content">
                      <h6>Plan de Progression et Suivi</h6>
                      <ul>
                        <li>Élaboration d&apos;un plan de montée en compétences à court et moyen terme.</li>
                        <li>Sessions de coaching et d&apos;évaluation régulières pour mesurer vos progrès.</li>
                        <li>Accompagnement dans l&apos;application concrète de vos nouvelles compétences sur
                          le terrain.</li>
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
                    <p>Accompagnement personnalisé en fonction de vos besoins spécifiques.</p>
                    <span className="format-tag">Personnalisé</span>
                  </div>
                  <div className="format-card">
                    <div className="format-icon">
                      <i className="bi bi-people"></i>
                    </div>
                    <h5>Ateliers Collectifs</h5>
                    <p>Sessions interactives pour apprendre en groupe et échanger des expériences.</p>
                    <span className="format-tag">Interactif</span>
                  </div>
                  <div className="format-card">
                    <div className="format-icon">
                      <i className="bi bi-mortarboard"></i>
                    </div>
                    <h5>Formations sur mesure</h5>
                    <p>Modules ciblés pour le développement des compétences techniques et soft skills.</p>
                    <span className="format-tag">Sur mesure</span>
                  </div>
                  <div className="format-card">
                    <div className="format-icon">
                      <i className="bi bi-laptop"></i>
                    </div>
                    <h5>Webinaires et Ressources</h5>
                    <p>Supports pédagogiques et outils pratiques accessibles en ligne.</p>
                    <span className="format-tag">En ligne</span>
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
                    <span>Une montée en compétences rapide et efficace.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Une meilleure employabilité et des opportunités de carrière élargies.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Une capacité renforcée à s&apos;adapter aux évolutions du marché.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Un développement personnel et professionnel durable.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Une plus grande confiance en soi et en ses compétences.</span>
                  </div>
                </div>
              </div>

              {/* CTA Final */}
              <div className="final-cta">
                <div className="cta-content">
                  <div className="cta-icon">
                    <i className="bi bi-rocket-takeoff"></i>
                  </div>
                  <h4>Ne laissez pas votre carrière stagner !</h4>
                  <p>Avec RPAM, boostez vos compétences et atteignez vos objectifs professionnels !</p>
                  <p className="cta-highlight">Réservez une consultation gratuite.</p>
                  <Link href="/booking" className="cta-button">
                    <i className="bi bi-calendar-check"></i>
                    Réservez maintenant
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
            <p className="svc-resources-sub">Explorez nos articles sur la formation et les compétences, et découvrez comment nos services se complètent.</p>
          </div>
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="row g-3">
                {/* Article 1 — IA au travail */}
                <div className="col-12 col-md-6" data-aos="fade-up">
                  <Link href="/blog/se-former-intelligence-artificielle-travail-2025" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#005153,#007a7d)' }}>
                      <i className="fas fa-robot"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag">Formation &amp; IA</span>
                      <h3 className="svc-article-title">Se former à l&apos;intelligence artificielle au travail</h3>
                      <p className="svc-article-excerpt">Quels outils maîtriser, quelles compétences développer ? Guide pratique pour intégrer l&apos;IA dans votre quotidien professionnel.</p>
                      <span className="svc-article-cta">Lire l&apos;article <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
                {/* Article 2 — Reconversion & CPF */}
                <div className="col-12 col-md-6" data-aos="fade-up" data-aos-delay="100">
                  <Link href="/blog/reconversion-professionnelle-30-40-50-ans" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#c78f00,#ecab23)' }}>
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag svc-article-tag--gold">Compétences &amp; CPF</span>
                      <h3 className="svc-article-title">Reconversion professionnelle : formations et stratégies 2025</h3>
                      <p className="svc-article-excerpt">CPF, formations qualifiantes, secteurs porteurs : toutes les ressources pour financer et réussir votre montée en compétences.</p>
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
                <Link href="/guidance" className="svc-related-card">
                  <div className="svc-related-icon"><i className="fas fa-compass"></i></div>
                  <div>
                    <strong>Guidance</strong>
                    <p>Bilan de compétences et orientation professionnelle personnalisée.</p>
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
                    <p>Définissons ensemble votre plan de formation.</p>
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
