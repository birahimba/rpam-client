import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "CV et ATS en 2026 – comment être sélectionné par les recruteurs | RPAM",
    "description": "Comprendre les logiciels ATS et optimiser votre CV pour passer les filtres automatiques. Mots-clés, format, structure : le guide complet RPAM pour décrocher plus d'entretiens.",
    "url": "https://www.rpam.fr/cv-ats",
    "publisher": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.rpam.fr/" },
        { "@type": "ListItem", "position": 2, "name": "CV et ATS", "item": "https://www.rpam.fr/cv-ats" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce qu'un ATS ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Un ATS (Applicant Tracking System) est un logiciel utilisé par les recruteurs pour gérer et filtrer les candidatures. Il analyse les CV automatiquement avant qu'un humain les lise, en recherchant des mots-clés correspondant à l'offre d'emploi." }
      },
      {
        "@type": "Question",
        "name": "Comment savoir si mon CV passe l'ATS ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Utilisez un format simple (Word ou PDF texte sans colonnes), intégrez les mots-clés exacts de l'offre, évitez les tableaux, images et polices exotiques. Adaptez votre CV à chaque offre pour maximiser votre score ATS." }
      },
      {
        "@type": "Question",
        "name": "Faut-il un CV différent pour chaque offre ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oui. Il est recommandé d'adapter les mots-clés, le titre de poste et certaines formulations à chaque offre pour maximiser votre score ATS et attirer l'attention du recruteur." }
      },
      {
        "@type": "Question",
        "name": "Le CV ATS remplace-t-il le CV classique ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Non. Un CV ATS-compatible doit aussi être lisible et convaincant pour le recruteur humain. L'optimisation ATS garantit d'abord que votre CV est lu — ensuite votre contenu doit convaincre." }
      }
    ]
  }
]

const KPIS = [
  { value: '75%', label: 'des CV filtrés par ATS avant lecture humaine' },
  { value: '6 sec', label: 'temps moyen de lecture d\'un CV' },
  { value: '3×', label: 'plus de chances avec un CV ATS-optimisé' },
  { value: '80%', label: 'des offres traitées par ATS' },
]

const CONTENT_BLOCKS = [
  { icon: 'fa-filter', title: 'Filtre automatique', text: 'L\'ATS trie les candidatures avant toute lecture humaine. Un CV mal structuré est éliminé automatiquement, même si votre profil est excellent.' },
  { icon: 'fa-magnifying-glass', title: 'Analyse des mots-clés', text: 'Le logiciel compare les termes de votre CV avec ceux de l\'offre. Chaque mot-clé absent réduit votre score et vos chances d\'être sélectionné.' },
  { icon: 'fa-chart-bar', title: 'Score de pertinence', text: 'Chaque candidature reçoit un score. Seuls les CV dépassant le seuil défini par le recruteur sont transmis à un lecteur humain.' },
]

const STEPS = [
  { num: '1', title: 'Format simple (Word/PDF sans colonnes)', desc: 'Utilisez un document texte standard. Les mises en page complexes (colonnes, tableaux, zones de texte) perturbent la lecture automatique et font chuter votre score.' },
  { num: '2', title: 'Titre de poste identique à l\'offre', desc: 'Reprenez exactement l\'intitulé du poste mentionné dans l\'annonce. Un titre différent, même proche, peut ne pas être reconnu par l\'ATS.' },
  { num: '3', title: 'Mots-clés de l\'annonce intégrés', desc: 'Identifiez les compétences, outils et certifications cités dans l\'offre et intégrez-les naturellement dans vos expériences et votre résumé professionnel.' },
  { num: '4', title: 'Expériences en ordre chronologique inverse', desc: 'L\'ATS s\'attend à une structure standard : poste le plus récent en premier. Respectez ce format pour maximiser la lisibilité de votre parcours.' },
  { num: '5', title: 'Pas d\'images ni de tableaux complexes', desc: 'Photos, graphiques, icônes et tableaux ne sont pas lus par l\'ATS. Tout ce qui n\'est pas du texte pur est ignoré — ou pire, cause des erreurs de parsing.' },
]

const ERRORS = [
  { icon: 'fa-image', title: 'Photo intégrée dans le design', text: 'Une photo incorporée comme élément graphique bloque la lecture de l\'ATS. Si vous souhaitez inclure une photo, utilisez uniquement un simple fichier image standard en dehors du flux texte.' },
  { icon: 'fa-table-columns', title: 'Colonnes multiples', text: 'Les ATS lisent les CV de gauche à droite et de haut en bas, comme un flux de texte simple. Les mises en page à deux colonnes mélangent les informations et produisent un résultat illisible.' },
  { icon: 'fa-palette', title: 'Format graphique élaboré', text: 'Les templates visuels très travaillés (Canva, Indesign) sont esthétiques pour l\'œil humain mais incompatibles avec la lecture automatisée. Privilégiez la clarté au design.' },
  { icon: 'fa-ban', title: 'Manque de mots-clés', text: 'Ne pas reprendre les termes exacts de l\'offre est l\'erreur la plus fréquente. L\'ATS ne déduit pas les synonymes : si l\'offre dit « gestion de projet », votre CV doit contenir ces mots précis.' },
]

const FAQS = [
  {
    id: 'faq1',
    q: 'Qu\'est-ce qu\'un ATS ?',
    a: 'Un ATS (Applicant Tracking System) est un logiciel utilisé par les recruteurs pour gérer et filtrer les candidatures. Il analyse les CV automatiquement avant qu\'un humain les lise, en recherchant des mots-clés correspondant à l\'offre d\'emploi.',
  },
  {
    id: 'faq2',
    q: 'Comment savoir si mon CV passe l\'ATS ?',
    a: 'Utilisez un format simple (Word ou PDF texte sans colonnes), intégrez les mots-clés exacts de l\'offre, évitez les tableaux, images et polices exotiques. Adaptez votre CV à chaque offre pour maximiser votre score ATS.',
  },
  {
    id: 'faq3',
    q: 'Faut-il un CV différent pour chaque offre ?',
    a: 'Oui. Il est recommandé d\'adapter les mots-clés, le titre de poste et certaines formulations à chaque offre pour maximiser votre score ATS et attirer l\'attention du recruteur.',
  },
  {
    id: 'faq4',
    q: 'Le CV ATS remplace-t-il le CV classique ?',
    a: 'Non. Un CV ATS-compatible doit aussi être lisible et convaincant pour le recruteur humain. L\'optimisation ATS garantit d\'abord que votre CV est lu — ensuite votre contenu doit convaincre.',
  },
]

export default function CvAts() {
  const [openFaq, setOpenFaq] = useState('faq1')

  return (
    <Layout activePage="job-getting">
      <SEOHead
        title="CV et ATS en 2026 : comment être sélectionné par les recruteurs | RPAM"
        description="Comprendre les logiciels ATS et optimiser votre CV pour passer les filtres automatiques. Mots-clés, format, structure : le guide complet RPAM pour décrocher plus d'entretiens."
        canonical="https://www.rpam.fr/cv-ats"
        schema={schema}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="pillar-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-9 text-center">
              <span className="pillar-hero-badge" data-aos="fade-down">
                <i className="fas fa-file-alt"></i> CV &amp; ATS
              </span>
              <h1 className="pillar-hero-title" data-aos="fade-up">
                CV et ATS en 2026 : être sélectionné par les recruteurs
              </h1>
              <p className="pillar-hero-sub" data-aos="fade-up" data-aos-delay="100">
                75&nbsp;% des CV ne sont jamais lus par un humain. Apprenez à optimiser votre candidature pour passer les filtres automatiques et décrocher plus d&apos;entretiens.
              </p>
              <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
                <Link href="/booking" className="btn btn-base-color btn-rounded btn-medium text-transform-none me-3">
                  Optimiser mon CV avec RPAM
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

      {/* ── Section 1 : Qu'est-ce qu'un ATS ? ─────────────── */}
      <section className="pillar-section bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Comprendre</span>
              <h2 className="pillar-section-title">Qu&apos;est-ce qu&apos;un ATS ?</h2>
              <p className="pillar-section-sub">Un ATS (Applicant Tracking System) est un logiciel de gestion des candidatures qui analyse et filtre les CV automatiquement selon des critères prédéfinis.</p>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {CONTENT_BLOCKS.map((block, i) => (
              <div key={i} className="col-12 col-md-4" data-aos="fade-up" data-aos-delay={String(i * 80)}>
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

      {/* ── Section 2 : Les 5 règles d'un CV ATS-compatible ── */}
      <section className="pillar-section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Méthode</span>
              <h2 className="pillar-section-title">Les 5 règles d&apos;un CV ATS-compatible</h2>
              <p className="pillar-section-sub">Suivez ces règles pour maximiser votre score et garantir que votre candidature atteigne un recruteur humain.</p>
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

      {/* ── Section 3 : Les erreurs qui bloquent votre CV ─── */}
      <section className="pillar-section bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="pillar-section-label">Erreurs fréquentes</span>
              <h2 className="pillar-section-title">Les erreurs qui bloquent votre CV</h2>
              <p className="pillar-section-sub">Ces erreurs courantes font chuter votre score ATS et empêchent votre candidature d&apos;être transmise à un recruteur.</p>
            </div>
          </div>
          <div className="row g-4">
            {ERRORS.map((err, i) => (
              <div key={i} className="col-12 col-md-6" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                <div className="pillar-content-block">
                  <div className="pillar-content-icon" style={{ color: '#c0392b', background: '#c0392b15' }}>
                    <i className={`fas ${err.icon}`}></i>
                  </div>
                  <h3>{err.title}</h3>
                  <p>{err.text}</p>
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
                  <Link href="/blog/cv-ats-2025" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#005153,#007a7d)' }}>
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag">Guide ATS</span>
                      <h3 className="svc-article-title">CV ATS en 2026 : le guide complet</h3>
                      <p className="svc-article-excerpt">Tout ce qu&apos;il faut savoir pour créer un CV qui passe les filtres automatiques et convainc les recruteurs.</p>
                      <span className="svc-article-cta">Lire l&apos;article <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </Link>
                </div>
                <div data-aos="fade-up" data-aos-delay="100">
                  <Link href="/blog/optimiser-profil-linkedin-recruteurs-2025" className="svc-article-card">
                    <div className="svc-article-banner" style={{ background: 'linear-gradient(135deg,#c78f00,#ecab23)' }}>
                      <i className="fab fa-linkedin"></i>
                    </div>
                    <div className="svc-article-body">
                      <span className="svc-article-tag svc-article-tag--gold">LinkedIn &amp; Emploi</span>
                      <h3 className="svc-article-title">Optimiser son profil LinkedIn pour les recruteurs</h3>
                      <p className="svc-article-excerpt">Les clés pour rendre votre profil LinkedIn irrésistible aux yeux des recruteurs et multiplier vos opportunités.</p>
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
                    <p>Candidatures, CV ATS et préparation aux entretiens pour décrocher votre poste.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
                <Link href="/guidance" className="svc-related-card">
                  <div className="svc-related-icon"><i className="fas fa-compass"></i></div>
                  <div>
                    <strong>Guidance</strong>
                    <p>Bilan de compétences et orientation professionnelle personnalisée.</p>
                  </div>
                  <i className="fas fa-chevron-right svc-related-arrow"></i>
                </Link>
                <Link href="/booking" className="svc-related-card svc-related-card--cta">
                  <div className="svc-related-icon svc-related-icon--cta"><i className="fas fa-calendar-alt"></i></div>
                  <div>
                    <strong>Consultation gratuite</strong>
                    <p>Faites auditer votre CV par un expert RPAM.</p>
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
              <h2 className="pillar-section-title text-white">Tout savoir sur les CV et les ATS</h2>
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
                <h2 className="mb-2">Prêt(e) à décrocher plus d&apos;entretiens ?</h2>
                <p className="mb-0 opacity-75">Nos experts RPAM auditent votre CV, l&apos;optimisent pour les ATS et vous accompagnent jusqu&apos;à la signature de votre contrat.</p>
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
