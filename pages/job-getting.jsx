import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = [
  [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Job Getting – Coaching emploi & entretiens",
      "url": "https://www.rpam.fr/job-getting",
      "serviceType": "Coaching emploi",
      "description": "Accompagnement complet à la recherche d'emploi : optimisation CV et profil LinkedIn, préparation aux entretiens d'embauche, stratégie de recherche d'emploi personnalisée.",
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
          "name": "Comment optimiser son CV pour trouver un emploi ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "RPAM vous accompagne dans l'optimisation de votre CV : mise en valeur de vos expériences, adaptation au poste ciblé, rédaction percutante et personnalisation selon les standards du marché de l'emploi français."
          }
        },
        {
          "@type": "Question",
          "name": "Comment se préparer à un entretien d'embauche ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le coaching entretien RPAM vous prépare à répondre aux questions types, valoriser vos compétences, gérer votre stress et adopter la bonne posture. Des simulations d'entretiens personnalisées sont réalisées pour maximiser vos chances de succès."
          }
        },
        {
          "@type": "Question",
          "name": "Comment améliorer son profil LinkedIn pour trouver un emploi ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "RPAM optimise votre profil LinkedIn pour augmenter votre visibilité auprès des recruteurs : photo professionnelle, titre accrocheur, résumé percutant, mots-clés stratégiques et développement de votre réseau professionnel."
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
      { "@type": "ListItem", "position": 3, "name": "Job Getting – Coaching Emploi", "item": "https://www.rpam.fr/job-getting" }
    ]
  }
]

export default function JobGetting() {
  return (
    <Layout activePage="job-getting">
      <SEOHead
        title="Job Getting – Coaching emploi, CV &amp; entretiens | RPAM"
        description="Coaching emploi et recherche d'emploi avec RPAM : optimisation CV et profil LinkedIn, préparation aux entretiens d'embauche, reconversion professionnelle. Trouvez votre emploi idéal."
        canonical="https://www.rpam.fr/job-getting"
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
                  <i className="bi bi-briefcase"></i> Nos Services
                </span>
                <h1 className="hero-title">Job Getting – Coaching Emploi, CV &amp; Entretiens</h1>
                <p className="hero-subtitle">Optimisez votre candidature et décrochez le poste idéal</p>
                <p className="hero-description">
                  Boostez votre candidature et décrochez des opportunités adaptées à votre projet
                  professionnel.
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
                  <i className="bi bi-file-earmark-text"></i>
                  <span>CV optimisé</span>
                </div>
                <div className="floating-card card-2">
                  <i className="bi bi-person-check"></i>
                  <span>Entretiens réussis</span>
                </div>
                <div className="floating-card card-3">
                  <i className="bi bi-linkedin"></i>
                  <span>Réseau activé</span>
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
                  <Link href="/guidance" className="related-link">
                    <i className="bi bi-compass"></i>
                    Guidance
                  </Link>
                  <Link href="/up-training" className="related-link">
                    <i className="bi bi-mortarboard"></i>
                    Up Training
                  </Link>
                </div>
              </div>
            </div>

            {/* Contenu Principal */}
            <div className="col-lg-8 order-1 order-lg-2 md-mb-50px">
              {/* Introduction */}
              <div className="content-intro">
                <h2 className="section-main-title">
                  Coaching à la Recherche d&apos;Emploi : Boostez Votre Candidature avec RPAM
                </h2>
                <p className="intro-text">
                  Trouver un emploi peut être un parcours long et frustrant, surtout sans stratégie efficace.
                  Chez <strong>RPAM</strong>, nous vous aidons
                  à <strong>structurer votre recherche, valoriser votre profil et décrocher des opportunités
                    adaptées</strong> à votre projet professionnel.
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
                      <i className="bi bi-eye-slash"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Manque de visibilité sur le marché de l&apos;emploi</h5>
                      <ul>
                        <li>Vous postulez sans succès et avez du mal à vous démarquer des autres
                          candidats.</li>
                        <li>Vous ne savez pas où chercher les offres adaptées à votre profil.</li>
                        <li>Votre réseau professionnel est limité ou inexploité.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-file-earmark-x"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Candidatures inefficaces et peu de retours</h5>
                      <ul>
                        <li>Vos CV et lettres de motivation n&apos;attirent pas l&apos;attention des recruteurs.
                        </li>
                        <li>Vous obtenez peu ou pas de réponses à vos candidatures.</li>
                        <li>Vos candidatures sont rejetées par les algorithmes des plateformes de
                          recrutement.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-emoji-frown"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Difficultés à réussir vos entretiens</h5>
                      <ul>
                        <li>Vous ressentez un stress important avant ou pendant les entretiens.</li>
                        <li>Vous avez du mal à vous exprimer avec clarté et confiance.</li>
                        <li>Vous n&apos;arrivez pas à convaincre les recruteurs de votre valeur ajoutée.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-hourglass-split"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Recherches infructueuses et perte de motivation</h5>
                      <ul>
                        <li>Votre recherche d&apos;emploi dure depuis des mois sans résultat.</li>
                        <li>Vous enchaînez les refus et cela impacte votre confiance et motivation.</li>
                        <li>Vous êtes prêt(e) à abandonner ou à accepter un poste qui ne vous correspond
                          pas.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="situation-card">
                    <div className="situation-icon">
                      <i className="bi bi-cash-stack"></i>
                    </div>
                    <div className="situation-content">
                      <h5>Difficulté à négocier votre salaire et vos conditions</h5>
                      <ul>
                        <li>Vous n&apos;osez pas négocier par peur de perdre une opportunité.</li>
                        <li>Vous acceptez des conditions peu avantageuses par manque d&apos;assurance.</li>
                        <li>Vous souhaitez obtenir un salaire à la hauteur de vos compétences.</li>
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
                      <i className="bi bi-search"></i>
                    </div>
                    <p>Optimiser votre recherche d&apos;emploi avec une méthode efficace.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-file-earmark-text"></i>
                    </div>
                    <p>Améliorer vos candidatures pour capter l&apos;attention des recruteurs.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-person-check"></i>
                    </div>
                    <p>Renforcer votre confiance pour briller en entretien.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-people"></i>
                    </div>
                    <p>Développer votre réseau pour accéder à plus d&apos;opportunités.</p>
                  </div>
                  <div className="objective-item">
                    <div className="objective-icon-modern">
                      <i className="bi bi-cash-coin"></i>
                    </div>
                    <p>Maîtriser la négociation salariale pour une rémunération juste.</p>
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
                      <h5>Diagnostic et Stratégie Personnalisée</h5>
                      <ul>
                        <li>Analyse de votre parcours, compétences et objectifs professionnels.</li>
                        <li>Évaluation de vos forces et axes d&apos;amélioration pour structurer votre
                          recherche.</li>
                        <li>Définition d&apos;un plan d&apos;action ciblé pour postuler plus efficacement.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>2</span>
                    </div>
                    <div className="timeline-content">
                      <h5>Optimisation de votre Candidature</h5>
                      <ul>
                        <li>Création d&apos;un CV percutant et optimisé pour les recruteurs et les
                          algorithmes ATS.</li>
                        <li>Rédaction de lettres de motivation convaincantes, adaptées à chaque offre.
                        </li>
                        <li>Optimisation de votre profil LinkedIn pour maximiser votre visibilité.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>3</span>
                    </div>
                    <div className="timeline-content">
                      <h5>Préparation aux Entretiens</h5>
                      <ul>
                        <li>Techniques pour gérer le stress et gagner en assurance.</li>
                        <li>Mises en situation et simulations d&apos;entretiens avec des feedbacks
                          personnalisés.</li>
                        <li>Travail sur votre posture, votre discours et votre impact face aux
                          recruteurs.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>4</span>
                    </div>
                    <div className="timeline-content">
                      <h5>Développement de votre Réseau et Opportunités Cachées</h5>
                      <ul>
                        <li>Stratégies pour se connecter avec les bons contacts et développer son
                          réseau.</li>
                        <li>Techniques de candidature spontanée et approche directe des recruteurs.</li>
                        <li>Utilisation des plateformes et outils de networking pour maximiser les
                          chances d&apos;embauche.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <span>5</span>
                    </div>
                    <div className="timeline-content">
                      <h5>Négociation Salariale et Conditions de Travail</h5>
                      <ul>
                        <li>Comment évaluer sa valeur sur le marché de l&apos;emploi ?</li>
                        <li>Méthodes de négociation efficaces pour obtenir un meilleur package salarial.
                        </li>
                        <li>Simulation d&apos;entretiens pour apprendre à défendre vos intérêts avec
                          assurance.</li>
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
                    <p>Séances personnalisées pour répondre à vos défis spécifiques.</p>
                    <span className="format-tag">Personnalisé</span>
                  </div>
                  <div className="format-card">
                    <div className="format-icon">
                      <i className="bi bi-people"></i>
                    </div>
                    <h5>Ateliers Collectifs</h5>
                    <p>Sessions interactives en groupe pour partager et apprendre ensemble.</p>
                    <span className="format-tag">Interactif</span>
                  </div>
                  <div className="format-card">
                    <div className="format-icon">
                      <i className="bi bi-camera-video"></i>
                    </div>
                    <h5>Simulations d&apos;Entretiens</h5>
                    <p>Entraînement intensif avec mise en situation réelle et retours détaillés.</p>
                    <span className="format-tag">Pratique</span>
                  </div>
                  <div className="format-card">
                    <div className="format-icon">
                      <i className="bi bi-journal-text"></i>
                    </div>
                    <h5>Ressources et Guides</h5>
                    <p>Templates de CV, fiches pratiques, stratégies de recherche d&apos;emploi.</p>
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
                    <span>Une recherche d&apos;emploi plus efficace et ciblée.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Un CV et un profil LinkedIn optimisés pour les recruteurs.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Une préparation aux entretiens qui booste votre confiance.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Des techniques de réseautage pour accéder aux opportunités cachées.</span>
                  </div>
                  <div className="benefit-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Une meilleure capacité à négocier votre salaire et vos conditions.</span>
                  </div>
                </div>
              </div>

              {/* CTA Final */}
              <div className="final-cta">
                <div className="cta-content">
                  <div className="cta-icon">
                    <i className="bi bi-briefcase-fill"></i>
                  </div>
                  <h4>Ne laissez plus votre recherche d&apos;emploi au hasard !</h4>
                  <p>Avec RPAM, maximisez vos chances de décrocher le job qui vous correspond !</p>
                  <p className="cta-highlight">Réservez votre consultation gratuite dès maintenant !</p>
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
            <p className="svc-resources-sub">Conseils pratiques pour optimiser vos candidatures et décrocher le poste qui vous correspond.</p>
          </div>
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="row g-3">
                {/* Article 1 — CV & ATS */}
                <div className="col-12 col-md-6" data-aos="fade-up">
                  <Link href="/blog/cv-ats-2025" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#005153,#007a7d)' }}>
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag">CV &amp; Candidature</span>
                      <h3 className="svc-article-title">Comment rédiger un CV qui passe les filtres ATS en 2025 ?</h3>
                      <p className="svc-article-excerpt">Mots-clés, structure, format : optimisez votre CV pour les logiciels de recrutement et décrochez plus d&apos;entretiens.</p>
                      <span className="svc-article-cta">Lire l&apos;article <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
                {/* Article 2 — IA & Recrutement */}
                <div className="col-12 col-md-6" data-aos="fade-up" data-aos-delay="100">
                  <Link href="/blog/se-former-intelligence-artificielle-travail-2025" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#c78f00,#ecab23)' }}>
                      <i className="fas fa-robot"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag svc-article-tag--gold">IA &amp; Recrutement</span>
                      <h3 className="svc-article-title">IA et marché de l&apos;emploi : les compétences qui font la différence</h3>
                      <p className="svc-article-excerpt">Comprendre les outils IA pour mieux valoriser votre profil et répondre aux attentes des recruteurs en 2025.</p>
                      <span className="svc-article-cta">Lire l&apos;article <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="mt-4 d-flex flex-wrap gap-3 align-items-center">
                <Link href="/blogs" className="svc-all-articles-link">
                  Voir tous les articles du blog <i className="fas fa-arrow-right ms-1"></i>
                </Link>
                <Link href="/cv-ats" className="svc-all-articles-link" style={{ color: '#ecab23' }}>
                  <i className="fas fa-book-open me-1"></i> Guide CV &amp; ATS <i className="fas fa-arrow-right ms-1"></i>
                </Link>
                <Link href="/linkedin-recruteurs" className="svc-all-articles-link" style={{ color: '#ecab23' }}>
                  <i className="fab fa-linkedin me-1"></i> Guide LinkedIn recruteurs <i className="fas fa-arrow-right ms-1"></i>
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
                <Link href="/up-training" className="svc-related-card">
                  <div className="svc-related-icon"><i className="fas fa-chart-line"></i></div>
                  <div>
                    <strong>Up Training</strong>
                    <p>Formation sur mesure pour développer vos compétences clés.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
                <Link href="/booking" className="svc-related-card svc-related-card--cta">
                  <div className="svc-related-icon svc-related-icon--cta"><i className="fas fa-calendar-alt"></i></div>
                  <div>
                    <strong>Consultation gratuite</strong>
                    <p>Préparez votre stratégie de recherche d&apos;emploi avec un expert.</p>
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
