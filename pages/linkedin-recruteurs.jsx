import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Être contacté par les recruteurs sur LinkedIn en 2026 | RPAM",
    "description": "Comment optimiser votre profil LinkedIn pour attirer les recruteurs en 2026. Titre, résumé, mots-clés, compétences, publication : le guide complet RPAM pour votre visibilité professionnelle.",
    "url": "https://www.rpam.fr/linkedin-recruteurs",
    "publisher": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.rpam.fr/" },
        { "@type": "ListItem", "position": 2, "name": "LinkedIn & Recruteurs", "item": "https://www.rpam.fr/linkedin-recruteurs" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment être contacté par les recruteurs sur LinkedIn ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Optimisez votre titre professionnel avec des mots-clés métier, complétez toutes les sections de votre profil, publiez régulièrement et activez la mention 'Open to Work' si vous êtes en recherche active." }
      },
      {
        "@type": "Question",
        "name": "Quelle est la fréquence idéale de publication sur LinkedIn ?",
        "acceptedAnswer": { "@type": "Answer", "text": "1 à 3 publications par semaine est optimal pour rester visible sans surcharger votre réseau. La régularité prime sur la fréquence : un post hebdomadaire régulier vaut mieux que 10 posts en une semaine puis le silence." }
      },
      {
        "@type": "Question",
        "name": "LinkedIn Premium est-il indispensable ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Non. Un profil gratuit bien optimisé reste très efficace pour être contacté par les recruteurs. LinkedIn Premium offre des avantages supplémentaires (qui a vu votre profil, InMail...) mais n'est pas indispensable pour commencer." }
      },
      {
        "@type": "Question",
        "name": "Combien de connexions faut-il sur LinkedIn ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Visez 500+ connexions dans votre secteur pour améliorer votre visibilité. Privilégiez la qualité à la quantité : des connexions pertinentes (recruteurs, pairs, clients potentiels) ont plus de valeur qu'un grand nombre de connexions sans lien avec votre domaine." }
      }
    ]
  }
]

const KPIS = [
  { value: '87%', label: 'des recruteurs utilisent LinkedIn' },
  { value: '500+', label: 'connexions recommandées' },
  { value: '3×', label: 'plus de vues avec profil complet' },
  { value: '1/sem.', label: 'fréquence idéale de publication' },
]

const CONTENT_BLOCKS = [
  { icon: 'fa-magnifying-glass', title: 'Moteur de recherche pro', text: 'Les recruteurs utilisent LinkedIn comme un moteur de recherche de candidats. Un profil optimisé avec les bons mots-clés apparaît dans leurs résultats au bon moment.' },
  { icon: 'fa-envelope', title: 'Contact direct recruteurs', text: 'LinkedIn permet aux recruteurs de vous contacter directement, sans que votre CV soit en circulation. C\'est une candidature passive qui travaille pour vous en permanence.' },
  { icon: 'fa-star', title: 'Vitrine permanente', text: 'Contrairement à un CV envoyé à une offre précise, votre profil LinkedIn est visible 24h/24. Il présente votre parcours, vos réalisations et votre valeur ajoutée à tout moment.' },
  { icon: 'fa-network-wired', title: 'Réseau actif', text: 'LinkedIn vous connecte à des recruteurs, des pairs et des décideurs dans votre secteur. Un réseau actif multiplie les opportunités d\'emploi, de partenariat et de recommandation.' },
]

const STEPS = [
  { num: '1', title: 'Photo professionnelle', desc: 'Votre photo est le premier élément vu par les recruteurs. Un fond neutre, une tenue professionnelle et un sourire naturel améliorent significativement le taux de contact.' },
  { num: '2', title: 'Titre avec mots-clés', desc: 'Le titre de votre profil apparaît dans les résultats de recherche. Intégrez votre intitulé de poste exact, vos compétences clés et votre secteur pour être trouvé par les bons recruteurs.' },
  { num: '3', title: 'Résumé impactant (qui / valeur / objectif)', desc: 'La section "À propos" est votre pitch professionnel. Décrivez qui vous êtes, la valeur que vous apportez et vos objectifs professionnels en 3 à 5 phrases percutantes.' },
  { num: '4', title: 'Expériences détaillées avec résultats', desc: 'Ne listez pas vos responsabilités — décrivez vos réalisations avec des chiffres. "Augmenté le CA de 20%" est plus convaincant que "responsable du développement commercial".' },
  { num: '5', title: 'Compétences sélectionnées', desc: 'Choisissez jusqu\'à 5 compétences principales correspondant aux mots-clés recherchés dans votre secteur. Les compétences validées par vos pairs renforcent votre crédibilité.' },
]

const VISIBILITY_TIPS = [
  { icon: 'fa-pen-to-square', label: 'Publier régulièrement', desc: 'Partagez votre expertise, vos réflexions et vos actualités sectorielles. Une publication par semaine suffit pour rester visible dans le fil des recruteurs.', color: '#005153' },
  { icon: 'fa-comment', label: 'Commenter intelligemment', desc: 'Commentez les publications de recruteurs, de leaders d\'opinion et de collègues. Des commentaires pertinents exposent votre profil à de nouveaux réseaux.', color: '#ecab23' },
  { icon: 'fa-user-plus', label: 'Développer son réseau', desc: 'Connectez-vous chaque semaine avec des recruteurs, des pairs et des clients potentiels dans votre secteur. Un message personnalisé augmente le taux d\'acceptation.', color: '#005153' },
  { icon: 'fa-thumbs-up', label: 'Interagir avec les recruteurs', desc: 'Likez et commentez les publications des recruteurs que vous ciblez. Vous restez dans leur radar et créez une relation avant même d\'envoyer une candidature.', color: '#ecab23' },
]

const FAQS = [
  {
    id: 'faq1',
    q: 'Comment être contacté par les recruteurs sur LinkedIn ?',
    a: 'Optimisez votre titre professionnel avec des mots-clés métier, complétez toutes les sections de votre profil, publiez régulièrement et activez la mention \'Open to Work\' si vous êtes en recherche active.',
  },
  {
    id: 'faq2',
    q: 'Quelle est la fréquence idéale de publication sur LinkedIn ?',
    a: '1 à 3 publications par semaine est optimal pour rester visible sans surcharger votre réseau. La régularité prime sur la fréquence : un post hebdomadaire régulier vaut mieux que 10 posts en une semaine puis le silence.',
  },
  {
    id: 'faq3',
    q: 'LinkedIn Premium est-il indispensable ?',
    a: 'Non. Un profil gratuit bien optimisé reste très efficace pour être contacté par les recruteurs. LinkedIn Premium offre des avantages supplémentaires (qui a vu votre profil, InMail...) mais n\'est pas indispensable pour commencer.',
  },
  {
    id: 'faq4',
    q: 'Combien de connexions faut-il sur LinkedIn ?',
    a: 'Visez 500+ connexions dans votre secteur pour améliorer votre visibilité. Privilégiez la qualité à la quantité : des connexions pertinentes (recruteurs, pairs, clients potentiels) ont plus de valeur qu\'un grand nombre de connexions sans lien avec votre domaine.',
  },
]

export default function LinkedinRecruteurs() {
  const [openFaq, setOpenFaq] = useState('faq1')

  return (
    <Layout activePage="job-getting">
      <SEOHead
        title="Être contacté par les recruteurs sur LinkedIn en 2026 | RPAM"
        description="Comment optimiser votre profil LinkedIn pour attirer les recruteurs en 2026. Titre, résumé, mots-clés, compétences, publication : le guide complet RPAM pour votre visibilité professionnelle."
        canonical="https://www.rpam.fr/linkedin-recruteurs"
        schema={schema}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="pillar-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-9 text-center">
              <span className="pillar-hero-badge" data-aos="fade-down">
                <i className="fab fa-linkedin"></i> LinkedIn &amp; Recruteurs
              </span>
              <h1 className="pillar-hero-title" data-aos="fade-up">
                Être contacté par les recruteurs sur LinkedIn en 2026
              </h1>
              <p className="pillar-hero-sub" data-aos="fade-up" data-aos-delay="100">
                87&nbsp;% des recruteurs utilisent LinkedIn pour trouver leurs candidats. Optimisez votre profil, développez votre visibilité et laissez les opportunités venir à vous.
              </p>
              <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
                <Link href="/booking" className="btn btn-base-color btn-rounded btn-medium text-transform-none me-3">
                  Optimiser mon LinkedIn avec RPAM
                </Link>
                <Link href="/job-getting" className="btn btn-outline btn-rounded btn-medium text-transform-none">
                  Découvrir Job Getting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KPI Bar ────────────────────────────────────────── */}
      <div className="pillar-kpi-bar" data-aos="fade-up">
        <div className="container">
          <div className="row justify-content-center">
            {KPIS.map((k, i) => (
              <div key={i} className="col-6 col-md-3 pillar-kpi-item">
                <span className="pillar-kpi-value">{k.value}</span>
                <span className="pillar-kpi-label">{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 1 : Pourquoi LinkedIn est incontournable ─ */}
      <section className="pillar-section bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Comprendre</span>
              <h2 className="pillar-section-title">Pourquoi LinkedIn est incontournable en 2026</h2>
              <p className="pillar-section-sub">LinkedIn est devenu la plateforme de référence pour les recruteurs. Ne pas y être optimisé, c&apos;est manquer des opportunités chaque jour.</p>
            </div>
          </div>
          <div className="row g-4">
            {CONTENT_BLOCKS.map((block, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                <div className="pillar-content-block">
                  <div className="pillar-content-icon">
                    <i className={`fas ${block.icon}`}></i>
                  </div>
                  <h3>{block.title}</h3>
                  <p>{block.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2 : Les 5 éléments clés d'un profil optimisé */}
      <section className="pillar-section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Méthode</span>
              <h2 className="pillar-section-title">Les 5 éléments clés d&apos;un profil optimisé</h2>
              <p className="pillar-section-sub">Un profil LinkedIn complet et optimisé génère trois fois plus de vues et de contacts de la part des recruteurs.</p>
            </div>
          </div>
          <div className="row justify-content-center g-4">
            {STEPS.map((step, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                <div className="pillar-step">
                  <div className="pillar-step-num">{step.num}</div>
                  <div className="pillar-step-body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 : Comment augmenter sa visibilité ? ──── */}
      <section className="pillar-section bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Visibilité</span>
              <h2 className="pillar-section-title">Comment augmenter sa visibilité ?</h2>
              <p className="pillar-section-sub">Un profil optimisé est le point de départ. La régularité et l&apos;engagement sont ce qui vous rend visible aux recruteurs sur le long terme.</p>
            </div>
          </div>
          <div className="row g-4">
            {VISIBILITY_TIPS.map((tip, i) => (
              <div key={i} className="col-12 col-md-6" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                <div className="pillar-content-block">
                  <div className="pillar-content-icon" style={{ color: tip.color, background: tip.color + '15' }}>
                    <i className={`fas ${tip.icon}`}></i>
                  </div>
                  <h3>{tip.label}</h3>
                  <p>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles liés ──────────────────────────────────── */}
      <section className="pillar-section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Ressources</span>
              <h2 className="pillar-section-title">Articles pour aller plus loin</h2>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="pillar-article-grid">
                <div data-aos="fade-up">
                  <Link href="/blog/optimiser-profil-linkedin-recruteurs-2025" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#005153,#007a7d)' }}>
                      <i className="fab fa-linkedin"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag">Guide LinkedIn</span>
                      <h3 className="svc-article-title">Optimiser son profil LinkedIn pour les recruteurs en 2026</h3>
                      <p className="svc-article-excerpt">Titre, résumé, compétences et activité : toutes les clés pour attirer les recruteurs et décrocher des opportunités.</p>
                      <span className="svc-article-cta">Lire l&apos;article <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
                <div data-aos="fade-up" data-aos-delay="100">
                  <Link href="/blog/cv-ats-2025" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#c78f00,#ecab23)' }}>
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag svc-article-tag--gold">CV &amp; Candidature</span>
                      <h3 className="svc-article-title">CV ATS en 2026 : passer les filtres automatiques</h3>
                      <p className="svc-article-excerpt">Complémentaire à votre profil LinkedIn, un CV ATS-optimisé maximise vos chances d&apos;être sélectionné pour un entretien.</p>
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
                <h3 className="svc-sidebar-title">Nos services</h3>
                <Link href="/job-getting" className="svc-related-card">
                  <div className="svc-related-icon"><i className="fas fa-briefcase"></i></div>
                  <div>
                    <strong>Job Getting</strong>
                    <p>CV, LinkedIn et entretiens : un accompagnement complet pour décrocher votre poste.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
                <Link href="/up-training" className="svc-related-card">
                  <div className="svc-related-icon"><i className="fas fa-chart-line"></i></div>
                  <div>
                    <strong>Up Training</strong>
                    <p>Développez les compétences qui valorisent votre profil LinkedIn.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
                <Link href="/booking" className="svc-related-card svc-related-card--cta">
                  <div className="svc-related-icon svc-related-icon--cta"><i className="fas fa-calendar-alt"></i></div>
                  <div>
                    <strong>Consultation gratuite</strong>
                    <p>Auditez votre profil LinkedIn avec un expert RPAM.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="pillar-section news-faq-section">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label" style={{ color: '#ecab23', borderColor: '#ecab23' }}>Questions fréquentes</span>
              <h2 className="pillar-section-title text-white">Tout savoir sur LinkedIn et les recruteurs</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
              {FAQS.map((faq) => (
                <div
                  key={faq.id}
                  className={`news-faq-item${openFaq === faq.id ? ' open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  data-aos="fade-up"
                >
                  <div className="news-faq-question">
                    <span>{faq.q}</span>
                    <i className={`fas fa-chevron-${openFaq === faq.id ? 'up' : 'down'}`}></i>
                  </div>
                  {openFaq === faq.id && (
                    <div className="news-faq-answer">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="pillar-section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="pillar-cta-box" data-aos="fade-up">
            <div className="row align-items-center">
              <div className="col-12 col-lg-8 mb-4 mb-lg-0">
                <h2 className="mb-2">Prêt(e) à être contacté(e) par les recruteurs ?</h2>
                <p className="mb-0 opacity-75">Nos experts RPAM auditent votre profil LinkedIn, l&apos;optimisent avec les bons mots-clés et vous accompagnent jusqu&apos;à votre prochain poste.</p>
              </div>
              <div className="col-12 col-lg-4 text-lg-end">
                <Link href="/booking" className="btn btn-light btn-rounded btn-medium text-transform-none">
                  <i className="fas fa-calendar-alt me-2"></i>Consultation gratuite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}
