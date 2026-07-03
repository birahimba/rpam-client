import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Se former à l'intelligence artificielle au travail en 2026 | RPAM",
    "description": "Guide complet pour se former à l'IA sans être développeur. Outils, compétences, formations : RPAM vous accompagne dans votre montée en compétences sur l'intelligence artificielle.",
    "url": "https://www.rpam.fr/formation-ia",
    "publisher": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.rpam.fr/" },
        { "@type": "ListItem", "position": 2, "name": "Formation IA", "item": "https://www.rpam.fr/formation-ia" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Faut-il savoir coder pour utiliser l'IA au travail ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Non. La majorité des outils IA professionnels sont accessibles sans compétences techniques. Le prompt engineering, l'utilisation d'assistants conversationnels et les outils IA sectoriels ne nécessitent pas de programmation." }
      },
      {
        "@type": "Question",
        "name": "Combien de temps faut-il pour se former à l'IA ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Quelques semaines de pratique régulière suffisent pour maîtriser les usages essentiels : rédaction assistée, analyse de documents, automatisation simple. RPAM propose des formations adaptées à votre niveau et votre secteur." }
      },
      {
        "@type": "Question",
        "name": "L'IA va-t-elle remplacer mon métier ?",
        "acceptedAnswer": { "@type": "Answer", "text": "L'IA transforme les métiers plutôt qu'elle ne les remplace entièrement. Les professionnels qui maîtrisent ces outils ont un avantage concurrentiel. Mieux vaut apprendre à travailler avec l'IA qu'attendre que l'adaptation soit forcée." }
      },
      {
        "@type": "Question",
        "name": "Quels secteurs sont les plus concernés par l'IA ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Le marketing, les RH, la formation, la communication, le commerce, la gestion et bien d'autres secteurs utilisent déjà des outils IA au quotidien. Quasi tous les métiers sont impactés à des degrés divers." }
      }
    ]
  }
]

const KPIS = [
  { value: '40%', label: 'des emplois transformés par l\'IA d\'ici 2030' },
  { value: '3 sem.', label: 'pour maîtriser les bases' },
  { value: '85%', label: 'des entreprises utilisent déjà l\'IA' },
  { value: '2× plus', label: 'productif avec les bons outils IA' },
]

const CONTENT_BLOCKS = [
  { icon: 'fa-rocket', title: 'Productivité', text: 'Les outils IA automatisent les tâches répétitives et amplifient votre capacité de production. Rédigez, analysez et organisez deux fois plus vite.' },
  { icon: 'fa-trophy', title: 'Avantage concurrentiel', text: 'Les professionnels qui maîtrisent l\'IA se démarquent sur le marché du travail et apportent une valeur ajoutée immédiatement perceptible par leurs employeurs et clients.' },
  { icon: 'fa-chart-line', title: 'Adaptation au marché', text: 'Le marché du travail évolue vite. Se former à l\'IA aujourd\'hui, c\'est anticiper les exigences de demain et rester employable dans tous les secteurs.' },
  { icon: 'fa-lightbulb', title: 'Créer de la valeur', text: 'L\'IA ne remplace pas la créativité humaine : elle l\'amplifie. Apprenez à combiner votre expertise métier avec les capacités des outils pour créer plus de valeur.' },
]

const STEPS = [
  { num: '1', title: 'Prompt engineering', desc: 'Formuler des instructions précises est la compétence clé de l\'IA. Apprendre à structurer vos demandes vous permet d\'obtenir des résultats pertinents, fiables et réutilisables rapidement.' },
  { num: '2', title: 'Outils IA sectoriels', desc: 'Chaque secteur dispose d\'outils IA adaptés : rédaction et marketing, analyse de données RH, design assisté, gestion de projet. Identifiez et maîtrisez ceux qui correspondent à votre métier.' },
  { num: '3', title: 'Esprit critique', desc: 'Vérifier, affiner et adapter les résultats générés par l\'IA est une compétence essentielle. L\'IA se trompe — votre jugement professionnel reste la meilleure garantie de qualité.' },
]

const TOOLS = [
  { icon: 'fa-comments', label: 'Assistants conversationnels', desc: 'ChatGPT, Claude, Gemini : posez des questions, rédigez des documents, analysez des textes et obtenez de l\'aide en langage naturel.', color: '#005153' },
  { icon: 'fa-pen-to-square', label: 'Outils de rédaction', desc: 'Jasper, Copy.ai, Notion AI : générez des contenus marketing, des emails professionnels et des rapports en quelques secondes.', color: '#ecab23' },
  { icon: 'fa-table', label: 'Analyse de données', desc: 'Excel IA, Google Sheets IA, Julius : interprétez vos données, générez des graphiques et des synthèses sans maîtriser les formules complexes.', color: '#005153' },
  { icon: 'fa-image', label: 'Création visuelle', desc: 'Midjourney, DALL·E, Adobe Firefly : générez des visuels professionnels pour vos présentations, réseaux sociaux et communications.', color: '#ecab23' },
]

const FAQS = [
  {
    id: 'faq1',
    q: 'Faut-il savoir coder pour utiliser l\'IA au travail ?',
    a: 'Non. La majorité des outils IA professionnels sont accessibles sans compétences techniques. Le prompt engineering, l\'utilisation d\'assistants conversationnels et les outils IA sectoriels ne nécessitent pas de programmation.',
  },
  {
    id: 'faq2',
    q: 'Combien de temps faut-il pour se former à l\'IA ?',
    a: 'Quelques semaines de pratique régulière suffisent pour maîtriser les usages essentiels : rédaction assistée, analyse de documents, automatisation simple. RPAM propose des formations adaptées à votre niveau et votre secteur.',
  },
  {
    id: 'faq3',
    q: 'L\'IA va-t-elle remplacer mon métier ?',
    a: 'L\'IA transforme les métiers plutôt qu\'elle ne les remplace entièrement. Les professionnels qui maîtrisent ces outils ont un avantage concurrentiel. Mieux vaut apprendre à travailler avec l\'IA qu\'attendre que l\'adaptation soit forcée.',
  },
  {
    id: 'faq4',
    q: 'Quels secteurs sont les plus concernés par l\'IA ?',
    a: 'Le marketing, les RH, la formation, la communication, le commerce, la gestion et bien d\'autres secteurs utilisent déjà des outils IA au quotidien. Quasi tous les métiers sont impactés à des degrés divers.',
  },
]

export default function FormationIa() {
  const [openFaq, setOpenFaq] = useState('faq1')

  return (
    <Layout activePage="up-training">
      <SEOHead
        title="Se former à l'intelligence artificielle au travail en 2026 | RPAM"
        description="Guide complet pour se former à l'IA sans être développeur. Outils, compétences, formations : RPAM vous accompagne dans votre montée en compétences sur l'intelligence artificielle."
        canonical="https://www.rpam.fr/formation-ia"
        schema={schema}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="pillar-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-9 text-center">
              <span className="pillar-hero-badge" data-aos="fade-down">
                <i className="fas fa-robot"></i> Intelligence artificielle
              </span>
              <h1 className="pillar-hero-title" data-aos="fade-up">
                Se former à l&apos;intelligence artificielle au travail en 2026
              </h1>
              <p className="pillar-hero-sub" data-aos="fade-up" data-aos-delay="100">
                Aucune compétence technique requise. Découvrez les outils, les compétences et la méthode pour intégrer l&apos;IA dans votre quotidien professionnel et prendre une longueur d&apos;avance.
              </p>
              <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
                <Link href="/booking" className="btn btn-base-color btn-rounded btn-medium text-transform-none me-3">
                  Me former à l&apos;IA avec RPAM
                </Link>
                <Link href="/up-training" className="btn btn-outline btn-rounded btn-medium text-transform-none">
                  Découvrir Up Training
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

      {/* ── Section 1 : Pourquoi se former à l'IA ? ────────── */}
      <section className="pillar-section bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Enjeux</span>
              <h2 className="pillar-section-title">Pourquoi se former à l&apos;IA ?</h2>
              <p className="pillar-section-sub">L&apos;intelligence artificielle transforme tous les secteurs. Se former aujourd&apos;hui n&apos;est plus un luxe — c&apos;est un avantage concurrentiel décisif pour votre carrière.</p>
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

      {/* ── Section 2 : Les compétences IA à développer ────── */}
      <section className="pillar-section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Compétences</span>
              <h2 className="pillar-section-title">Les compétences IA à développer</h2>
              <p className="pillar-section-sub">Trois compétences fondamentales vous permettront de tirer parti de l&apos;IA dans n&apos;importe quel contexte professionnel.</p>
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

      {/* ── Section 3 : Quels outils maîtriser en priorité ? ── */}
      <section className="pillar-section bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Outils 2026</span>
              <h2 className="pillar-section-title">Quels outils IA maîtriser en priorité ?</h2>
              <p className="pillar-section-sub">Quatre catégories d&apos;outils IA couvrent l&apos;essentiel des besoins professionnels, quel que soit votre secteur.</p>
            </div>
          </div>
          <div className="row g-4">
            {TOOLS.map((tool, i) => (
              <div key={i} className="col-12 col-md-6" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                <div className="pillar-content-block">
                  <div className="pillar-content-icon" style={{ color: tool.color, background: tool.color + '15' }}>
                    <i className={`fas ${tool.icon}`}></i>
                  </div>
                  <h3>{tool.label}</h3>
                  <p>{tool.desc}</p>
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
                  <Link href="/blog/se-former-intelligence-artificielle-travail-2025" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#005153,#007a7d)' }}>
                      <i className="fas fa-robot"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag">Guide IA</span>
                      <h3 className="svc-article-title">Se former à l&apos;intelligence artificielle au travail</h3>
                      <p className="svc-article-excerpt">Les outils IA indispensables, les compétences à acquérir et la méthode pour progresser rapidement sans bagage technique.</p>
                      <span className="svc-article-cta">Lire l&apos;article <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
                <div data-aos="fade-up" data-aos-delay="100">
                  <Link href="/blog/reconversion-professionnelle-30-40-50-ans" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#c78f00,#ecab23)' }}>
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag svc-article-tag--gold">Compétences &amp; Carrière</span>
                      <h3 className="svc-article-title">Reconversion professionnelle à 30, 40 ou 50 ans</h3>
                      <p className="svc-article-excerpt">Comment réorienter sa carrière à tout âge et intégrer les nouvelles compétences numériques dans son projet professionnel.</p>
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
                <Link href="/up-training" className="svc-related-card">
                  <div className="svc-related-icon"><i className="fas fa-chart-line"></i></div>
                  <div>
                    <strong>Up Training</strong>
                    <p>Formations sur mesure pour développer vos compétences clés, y compris l&apos;IA.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
                <Link href="/guidance" className="svc-related-card">
                  <div className="svc-related-icon"><i className="fas fa-compass"></i></div>
                  <div>
                    <strong>Guidance</strong>
                    <p>Bilan de compétences et orientation pour intégrer l&apos;IA dans votre projet de carrière.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
                <Link href="/booking" className="svc-related-card svc-related-card--cta">
                  <div className="svc-related-icon svc-related-icon--cta"><i className="fas fa-calendar-alt"></i></div>
                  <div>
                    <strong>Consultation gratuite</strong>
                    <p>Échangeons sur votre projet de montée en compétences IA.</p>
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
              <h2 className="pillar-section-title text-white">Tout savoir sur la formation IA</h2>
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
                <h2 className="mb-2">Prêt(e) à intégrer l&apos;IA dans votre quotidien professionnel ?</h2>
                <p className="mb-0 opacity-75">Nos formateurs RPAM vous accompagnent avec un programme adapté à votre niveau, votre secteur et vos objectifs concrets.</p>
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
