import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Reconversion professionnelle en 2025 – Guide complet | RPAM",
    "description": "Tout savoir sur la reconversion professionnelle : étapes, financement CPF, secteurs porteurs, bilan de compétences. RPAM vous accompagne à 30, 40 ou 50 ans.",
    "url": "https://www.rpam.fr/reconversion-professionnelle",
    "publisher": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.rpam.fr/" },
        { "@type": "ListItem", "position": 2, "name": "Reconversion professionnelle", "item": "https://www.rpam.fr/reconversion-professionnelle" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce qu'un bilan de compétences ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Le bilan de compétences est un dispositif permettant d'analyser vos compétences, aptitudes et motivations pour définir un projet professionnel réaliste. D'une durée de 3 mois maximum, il peut être financé par votre CPF. RPAM vous accompagne tout au long de cette démarche." }
      },
      {
        "@type": "Question",
        "name": "À quel âge peut-on se reconvertir ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Il n'y a pas d'âge idéal pour se reconvertir. RPAM accompagne des professionnels à 30, 40, 50 ans et plus. La clé est d'avoir un projet clair et un accompagnement adapté." }
      },
      {
        "@type": "Question",
        "name": "Comment financer sa reconversion avec le CPF ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Le Compte Personnel de Formation (CPF) permet de financer des formations certifiantes, des bilans de compétences et des VAE. Depuis 2023, une participation de 100 € est demandée aux salariés, sauf cas d'exonération. RPAM vous aide à maximiser votre CPF." }
      },
      {
        "@type": "Question",
        "name": "Combien de temps dure une reconversion professionnelle ?",
        "acceptedAnswer": { "@type": "Answer", "text": "La durée varie selon la formation et le secteur visé : de quelques mois pour une montée en compétences à 1-2 ans pour un changement de métier complet. Un bilan de compétences dure 3 mois maximum." }
      }
    ]
  }
]

const KPIS = [
  { value: '58%', label: 'des actifs envisagent une reconversion' },
  { value: '3 mois', label: 'durée bilan de compétences' },
  { value: '85%', label: 'retrouvent un emploi adapté' },
  { value: '+12%', label: 'salaire moyen après reconversion' },
]

const CONTENT_BLOCKS = [
  { icon: 'fa-search', title: 'Bilan de compétences', text: 'Analysez vos compétences, aptitudes et motivations pour définir un projet professionnel réaliste et financé par votre CPF.' },
  { icon: 'fa-graduation-cap', title: 'Formation qualifiante', text: 'Accédez aux formations certifiantes adaptées à votre nouveau projet grâce à un plan de financement personnalisé.' },
  { icon: 'fa-users', title: 'Réseau professionnel', text: 'Construisez votre réseau dans le nouveau secteur ciblé pour accélérer votre insertion et multiplier vos opportunités.' },
  { icon: 'fa-handshake', title: 'Accompagnement personnalisé', text: 'Bénéficiez d\'un suivi individuel avec un expert RPAM à chaque étape de votre transition professionnelle.' },
]

const STEPS = [
  { num: '1', title: 'Activer son CPF', desc: 'Connectez-vous sur moncompteformation.gouv.fr pour connaître votre solde et identifier les formations éligibles correspondant à votre projet.' },
  { num: '2', title: 'Contacter France Travail', desc: 'France Travail (ex Pôle Emploi) propose des aides complémentaires : AIF, POEI, formations accélérées. Un conseiller peut compléter votre plan de financement.' },
  { num: '3', title: 'Faire appel à un organisme agréé', desc: 'RPAM, organisme certifié Qualiopi, vous accompagne pour optimiser votre CPF, monter votre dossier et piloter votre reconversion de A à Z.' },
]

const SECTORS = [
  { icon: 'fa-laptop-code', label: 'Numérique & IA', color: '#005153' },
  { icon: 'fa-heartbeat', label: 'Santé & médico-social', color: '#ecab23' },
  { icon: 'fa-leaf', label: 'Green tech & énergie', color: '#28a745' },
  { icon: 'fa-truck', label: 'Logistique & mobilité', color: '#005153' },
]

const FAQS = [
  {
    id: 'faq1',
    q: 'Qu\'est-ce qu\'un bilan de compétences ?',
    a: 'Le bilan de compétences est un dispositif permettant d\'analyser vos compétences, aptitudes et motivations pour définir un projet professionnel réaliste. D\'une durée de 3 mois maximum, il peut être financé par votre CPF. RPAM vous accompagne tout au long de cette démarche.',
  },
  {
    id: 'faq2',
    q: 'À quel âge peut-on se reconvertir ?',
    a: 'Il n\'y a pas d\'âge idéal pour se reconvertir. RPAM accompagne des professionnels à 30, 40, 50 ans et plus. La clé est d\'avoir un projet clair et un accompagnement adapté.',
  },
  {
    id: 'faq3',
    q: 'Comment financer sa reconversion avec le CPF ?',
    a: 'Le Compte Personnel de Formation (CPF) permet de financer des formations certifiantes, des bilans de compétences et des VAE. Depuis 2023, une participation de 100 € est demandée aux salariés, sauf cas d\'exonération. RPAM vous aide à maximiser votre CPF.',
  },
  {
    id: 'faq4',
    q: 'Combien de temps dure une reconversion professionnelle ?',
    a: 'La durée varie selon la formation et le secteur visé : de quelques mois pour une montée en compétences à 1-2 ans pour un changement de métier complet. Un bilan de compétences dure 3 mois maximum.',
  },
]

export default function ReconversionProfessionnelle() {
  const [openFaq, setOpenFaq] = useState('faq1')

  return (
    <Layout activePage="guidance">
      <SEOHead
        title="Reconversion professionnelle en 2025 : guide complet | RPAM"
        description="Tout savoir sur la reconversion professionnelle : étapes, financement CPF, secteurs porteurs, bilan de compétences. RPAM vous accompagne à 30, 40 ou 50 ans."
        canonical="https://www.rpam.fr/reconversion-professionnelle"
        schema={schema}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="pillar-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-9 text-center">
              <span className="pillar-hero-badge" data-aos="fade-down">
                <i className="fas fa-arrows-rotate"></i> Reconversion professionnelle
              </span>
              <h1 className="pillar-hero-title" data-aos="fade-up">
                Réussir sa reconversion professionnelle en 2025
              </h1>
              <p className="pillar-hero-sub" data-aos="fade-up" data-aos-delay="100">
                Bilan de compétences, financement CPF, secteurs porteurs et accompagnement personnalisé : tout ce qu&apos;il faut savoir pour changer de cap à 30, 40 ou 50 ans.
              </p>
              <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
                <Link href="/booking" className="btn btn-base-color btn-rounded btn-medium text-transform-none me-3">
                  Réserver ma consultation gratuite
                </Link>
                <Link href="/guidance" className="btn btn-outline btn-rounded btn-medium text-transform-none">
                  Découvrir Guidance
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

      {/* ── Section 1 : Qu'est-ce que la reconversion ? ────── */}
      <section className="pillar-section bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Comprendre</span>
              <h2 className="pillar-section-title">Qu&apos;est-ce que la reconversion professionnelle ?</h2>
              <p className="pillar-section-sub">La reconversion professionnelle désigne tout changement significatif de métier, de secteur ou de statut. Elle repose sur 4 piliers fondamentaux.</p>
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

      {/* ── Section 2 : Comment financer sa reconversion ? ─── */}
      <section className="pillar-section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Financement</span>
              <h2 className="pillar-section-title">Comment financer sa reconversion ?</h2>
              <p className="pillar-section-sub">Plusieurs dispositifs publics vous permettent de financer votre projet sans avancer la totalité des coûts.</p>
            </div>
          </div>
          <div className="row justify-content-center g-4">
            {STEPS.map((step, i) => (
              <div key={i} className="col-12 col-md-4" data-aos="fade-up" data-aos-delay={String(i * 100)}>
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

      {/* ── Section 3 : Secteurs porteurs ─────────────────── */}
      <section className="pillar-section bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Opportunités 2025</span>
              <h2 className="pillar-section-title">Secteurs porteurs en 2025</h2>
              <p className="pillar-section-sub">Certains secteurs recrutent massivement et offrent de réelles perspectives pour les candidats à la reconversion.</p>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {SECTORS.map((s, i) => (
              <div key={i} className="col-6 col-md-3" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                <div className="pillar-content-block text-center">
                  <div className="pillar-content-icon" style={{ color: s.color, background: s.color + '15' }}>
                    <i className={`fas ${s.icon}`}></i>
                  </div>
                  <h3>{s.label}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5" data-aos="fade-up">
            <p className="text-muted" style={{ maxWidth: 680, margin: '0 auto' }}>
              Le numérique, la santé, la green tech et la logistique concentrent des milliers d&apos;offres non pourvues chaque année. Un bilan de compétences RPAM vous aide à identifier le secteur le plus adapté à votre profil.
            </p>
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
                  <Link href="/blog/reconversion-professionnelle-30-40-50-ans" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#005153,#007a7d)' }}>
                      <i className="fas fa-arrows-rotate"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag">Guide complet</span>
                      <h3 className="svc-article-title">Reconversion professionnelle à 30, 40 ou 50 ans</h3>
                      <p className="svc-article-excerpt">Bilan de compétences, CPF et étapes clés pour clarifier votre projet et réussir votre transition à tout âge.</p>
                      <span className="svc-article-cta">Lire l&apos;article <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
                <div data-aos="fade-up" data-aos-delay="100">
                  <Link href="/blog/se-former-intelligence-artificielle-travail-2025" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#c78f00,#ecab23)' }}>
                      <i className="fas fa-robot"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag svc-article-tag--gold">Compétences 2025</span>
                      <h3 className="svc-article-title">Se former à l&apos;intelligence artificielle au travail</h3>
                      <p className="svc-article-excerpt">Les nouvelles compétences IA indispensables pour rester compétitif et orienter votre reconversion vers les métiers de demain.</p>
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
                    <p>Formations sur mesure pour développer vos compétences clés.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
                <Link href="/booking" className="svc-related-card svc-related-card--cta">
                  <div className="svc-related-icon svc-related-icon--cta"><i className="fas fa-calendar-alt"></i></div>
                  <div>
                    <strong>Consultation gratuite</strong>
                    <p>Échangeons sur votre projet de reconversion.</p>
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
              <h2 className="pillar-section-title text-white">Tout savoir sur la reconversion professionnelle</h2>
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
                <h2 className="mb-2">Prêt(e) à lancer votre reconversion ?</h2>
                <p className="mb-0 opacity-75">Nos experts RPAM vous accompagnent de la réflexion au premier jour dans votre nouveau métier.</p>
              </div>
              <div className="col-12 col-lg-4 text-lg-end">
                <Link href="/booking" className="btn btn-light btn-rounded btn-medium text-transform-none me-2">
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
