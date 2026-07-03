import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Actualités professionnelles – RPAM",
    "description": "Tendances du marché de l'emploi, reconversion professionnelle, CPF, formation et coaching carrière en France. Conseils et actualités par RPAM.",
    "url": "https://www.rpam.fr/news",
    "publisher": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.rpam.fr/" },
        { "@type": "ListItem", "position": 2, "name": "Actualités", "item": "https://www.rpam.fr/news" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment fonctionne le CPF en 2026 ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Le Compte Personnel de Formation (CPF) permet à chaque actif de financer des formations qualifiantes. Depuis 2023, une participation de 100 € est demandée sauf cas d'exonération. RPAM accompagne ses clients dans l'activation et l'utilisation optimale de leur CPF." }
      },
      {
        "@type": "Question",
        "name": "Quelles sont les compétences les plus recherchées par les employeurs en France en 2026 ?",
        "acceptedAnswer": { "@type": "Answer", "text": "En 2026, les employeurs recherchent : compétences numériques (IA, data, cybersécurité), soft skills (communication, adaptabilité, intelligence émotionnelle), management de projet et expertises en santé, green tech et digital." }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que France Travail et comment peut-il m'aider ?",
        "acceptedAnswer": { "@type": "Answer", "text": "France Travail (anciennement Pôle Emploi) propose accompagnement, formations, aides financières et mise en relation avec les employeurs. RPAM travaille en complémentarité avec France Travail pour un accompagnement personnalisé plus intensif." }
      },
      {
        "@type": "Question",
        "name": "Comment réussir une reconversion professionnelle en France ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Une reconversion réussie : 1) Bilan de compétences, 2) Formation aux nouvelles compétences, 3) Réseau professionnel, 4) Préparation candidature. RPAM accompagne chaque étape avec Guidance, Up Training et Job Getting." }
      }
    ]
  }
]

const TRENDS = [
  {
    icon: 'fa-chart-line',
    color: '#005153',
    label: 'Marché',
    title: "L'emploi en tension",
    text: "Santé, numérique, logistique et industrie verte peinent à recruter. Ces tensions créent de réelles opportunités pour les candidats prêts à se former et à évoluer. RPAM vous aide à identifier les secteurs porteurs et à construire votre repositionnement stratégique.",
  },
  {
    icon: 'fa-robot',
    color: '#ecab23',
    label: 'Innovation',
    title: 'IA et transformation des métiers',
    text: "L'intelligence artificielle transforme profondément les métiers. 40 % des emplois sont concernés par des changements majeurs de compétences. Savoir s'adapter et monter en compétences sur les outils IA devient un avantage concurrentiel décisif.",
  },
  {
    icon: 'fa-leaf',
    color: '#28a745',
    label: 'Green tech',
    title: 'Emplois verts en plein essor',
    text: "La transition écologique génère des milliers d'emplois en France : énergies renouvelables, rénovation thermique, mobilité durable, agriculture responsable. Un bilan de compétences RPAM peut révéler votre potentiel dans ces filières d'avenir.",
  },
]

const STATS = [
  { value: '58%', label: "des actifs envisagent une reconversion dans les 5 prochaines années" },
  { value: '3 mois', label: "durée moyenne d'un bilan de compétences accompagné" },
  { value: '85%', label: "des personnes accompagnées retrouvent un emploi adapté" },
  { value: '+12%', label: "de salaire moyen après reconversion réussie" },
]

const HARD_SKILLS = [
  { icon: 'fa-brain', label: 'Intelligence artificielle & data', desc: 'Utiliser ChatGPT, Copilot et outils IA sectoriels.' },
  { icon: 'fa-laptop-code', label: 'Compétences digitales', desc: 'Marketing digital, CRM, analytics, gestion de projet agile.' },
  { icon: 'fa-language', label: 'Langues étrangères', desc: "L'anglais professionnel reste un critère de sélection majeur." },
]

const SOFT_SKILLS = [
  { icon: 'fa-arrows-rotate', label: 'Adaptabilité & résilience', desc: "Apprendre, désapprendre et réapprendre vite." },
  { icon: 'fa-heart', label: 'Intelligence émotionnelle', desc: "Gestion du stress, empathie, leadership bienveillant." },
  { icon: 'fa-bolt', label: 'Autonomie & proactivité', desc: "Le télétravail hybride a renforcé l'exigence d'autonomie." },
]

const FAQS = [
  {
    id: 'faq1',
    q: 'Comment fonctionne le CPF en 2026 ?',
    a: "Le Compte Personnel de Formation (CPF) permet à chaque actif de financer des formations qualifiantes. Depuis 2023, une participation de 100 € est demandée sauf pour les demandeurs d'emploi, les travailleurs handicapés et certains cas d'exonération. RPAM accompagne ses clients dans l'activation et l'utilisation optimale de leur CPF.",
  },
  {
    id: 'faq2',
    q: 'Quelles compétences sont les plus recherchées par les employeurs en 2026 ?',
    a: "Les employeurs français recherchent principalement des compétences numériques (IA, data, cybersécurité), des soft skills (communication, adaptabilité, intelligence émotionnelle), des compétences en management de projet et des expertises dans les secteurs de la santé, du green tech et du digital.",
  },
  {
    id: 'faq3',
    q: 'Comment réussir une reconversion professionnelle en France ?',
    a: "Une reconversion réussie passe par 4 étapes : 1) Faire un bilan de compétences pour clarifier son projet, 2) Se former aux nouvelles compétences nécessaires, 3) Construire son réseau dans le nouveau secteur, 4) Préparer sa candidature et ses entretiens. RPAM accompagne chaque étape avec ses services Guidance, Up Training et Job Getting.",
  },
  {
    id: 'faq4',
    q: 'Quels secteurs recrutent le plus en France en 2026 ?',
    a: "Les secteurs en forte croissance : le numérique et la tech (développeurs, data scientists, cybersécurité), la santé et le médico-social, le BTP et la rénovation énergétique, la logistique et le transport, ainsi que le tourisme et l'hôtellerie. L'IA génère également de nombreux métiers émergents.",
  },
]

export default function News() {
  const [openFaq, setOpenFaq] = useState('faq1')

  return (
    <Layout activePage="news">
      <SEOHead
        title="Actualités professionnelles – Conseils &amp; tendances | RPAM"
        description="Restez informé des dernières actualités sur l'emploi, la formation et le coaching professionnel. RPAM vous partage conseils et tendances du marché."
        canonical="https://www.rpam.fr/news"
        schema={schema}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="news-hero">
        <div className="news-hero-bg" />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-9 text-center">
              <span className="news-hero-badge" data-aos="fade-down">
                <i className="feather icon-feather-radio"></i> Actualités &amp; Tendances
              </span>
              <h1 className="news-hero-title" data-aos="fade-up">
                Votre hub d&apos;actualités <span className="news-accent">professionnelles</span>
              </h1>
              <p className="news-hero-subtitle" data-aos="fade-up" data-aos-delay="100">
                Explorez nos actualités pour rester connecté, inspiré et prêt à saisir de nouvelles opportunités professionnelles.
              </p>
              <div className="news-hero-pills" data-aos="fade-up" data-aos-delay="200">
                <Link href="/reconversion-professionnelle" className="news-pill"><i className="fas fa-chart-line"></i> Reconversion professionnelle</Link>
                <Link href="/formation-ia" className="news-pill"><i className="fas fa-robot"></i> Formation à l&apos;IA</Link>
                <Link href="/cv-ats" className="news-pill"><i className="fas fa-file-alt"></i> CV &amp; ATS</Link>
                <Link href="/linkedin-recruteurs" className="news-pill"><i className="fab fa-linkedin"></i> LinkedIn recruteurs</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="news-hero-shape news-shape-1" />
        <div className="news-hero-shape news-shape-2" />
      </section>

      {/* ── Tendances ─────────────────────────────────────── */}
      <section className="news-section bg-white">
        <div className="container">
          <div className="news-section-header" data-aos="fade-up">
            <span className="news-section-label">En ce moment</span>
            <h2 className="news-section-title">Tendances du marché de l&apos;emploi</h2>
            <p className="news-section-sub">Comprendre les évolutions du marché pour mieux orienter votre carrière.</p>
          </div>
          <div className="row g-4">
            {TRENDS.map((t, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={String(i * 100)}>
                <div className="news-trend-card">
                  <div className="news-trend-icon" style={{ background: t.color + '15', color: t.color }}>
                    <i className={`fas ${t.icon}`}></i>
                  </div>
                  <span className="news-trend-label" style={{ color: t.color }}>{t.label}</span>
                  <h3 className="news-trend-title">{t.title}</h3>
                  <p className="news-trend-text">{t.text}</p>
                  <div className="news-trend-bar" style={{ background: t.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reconversion + Stats ──────────────────────────── */}
      <section className="news-section news-reconversion-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6" data-aos="fade-right">
              <span className="news-section-label">Dossier</span>
              <h2 className="news-section-title text-white">Reconversion professionnelle : ce qui change en 2026</h2>
              <p className="news-reconversion-text">Le marché du travail français évolue à un rythme sans précédent. En 2026, la reconversion n&apos;est plus une exception — c&apos;est une stratégie de carrière adoptée par des millions d&apos;actifs.</p>
              <div className="news-topic">
                <div className="news-topic-dot" />
                <div>
                  <strong>Le CPF et ses nouvelles règles</strong>
                  <p>Depuis la réforme de 2023, une participation de 100 € est demandée aux salariés. Le CPF reste un levier puissant pour financer bilan de compétences, certifications et formations qualifiantes.</p>
                </div>
              </div>
              <div className="news-topic">
                <div className="news-topic-dot" />
                <div>
                  <strong>France Travail : un accompagnement renforcé</strong>
                  <p>Parcours individualisés, formations accélérées, aides à la mobilité. RPAM complète ce dispositif avec un coaching personnalisé et une approche humaine.</p>
                </div>
              </div>
              <Link href="/guidance" className="news-cta-link">
                Découvrir nos services d&apos;orientation <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
            <div className="col-12 col-lg-6" data-aos="fade-left">
              <div className="news-stats-grid">
                {STATS.map((s, i) => (
                  <div key={i} className="news-stat-card">
                    <span className="news-stat-value">{s.value}</span>
                    <p className="news-stat-label">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Compétences ───────────────────────────────────── */}
      <section className="news-section bg-white">
        <div className="container">
          <div className="news-section-header" data-aos="fade-up">
            <span className="news-section-label">Recrutement 2026</span>
            <h2 className="news-section-title">Ce que cherchent vraiment les employeurs</h2>
            <p className="news-section-sub">Au-delà des diplômes, les recruteurs évaluent des compétences comportementales décisives.</p>
          </div>
          <div className="row g-5">
            <div className="col-12 col-lg-6" data-aos="fade-right">
              <div className="news-skills-panel">
                <div className="news-skills-header">
                  <i className="fas fa-laptop-code"></i>
                  <h3>Hard Skills</h3>
                </div>
                {HARD_SKILLS.map((s, i) => (
                  <div key={i} className="news-skill-item">
                    <div className="news-skill-icon">
                      <i className={`fas ${s.icon}`}></i>
                    </div>
                    <div>
                      <strong>{s.label}</strong>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-lg-6" data-aos="fade-left">
              <div className="news-skills-panel news-skills-panel--accent">
                <div className="news-skills-header">
                  <i className="fas fa-heart"></i>
                  <h3>Soft Skills</h3>
                </div>
                {SOFT_SKILLS.map((s, i) => (
                  <div key={i} className="news-skill-item">
                    <div className="news-skill-icon news-skill-icon--accent">
                      <i className={`fas ${s.icon}`}></i>
                    </div>
                    <div>
                      <strong>{s.label}</strong>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-5" data-aos="fade-up">
            <Link href="/up-training" className="btn btn-base-color btn-rounded btn-medium text-transform-none me-3">Développer mes compétences</Link>
            <Link href="/job-getting" className="btn btn-outline btn-rounded btn-medium text-transform-none">Préparer mes entretiens</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="news-section news-faq-section">
        <div className="container">
          <div className="news-section-header" data-aos="fade-up">
            <span className="news-section-label" style={{ color: '#ecab23', borderColor: '#ecab23' }}>Questions fréquentes</span>
            <h2 className="news-section-title text-white">Tout savoir sur l&apos;actualité professionnelle</h2>
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
      <section className="news-cta-section">
        <div className="container">
          <div className="news-cta-box" data-aos="fade-up">
            <div className="news-cta-content">
              <span className="news-cta-eyebrow">Passez à l&apos;action</span>
              <h2>Prêt à transformer ces tendances en opportunités ?</h2>
              <p>Nos experts RPAM vous accompagnent pour faire de l&apos;actualité du marché un levier concret pour votre carrière.</p>
            </div>
            <div className="news-cta-actions">
              <Link href="/booking" className="news-cta-btn-primary">
                <i className="fas fa-calendar-alt"></i>
                Réserver ma consultation gratuite
              </Link>
              <Link href="/services" className="news-cta-btn-secondary">
                Voir nos services
              </Link>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}
