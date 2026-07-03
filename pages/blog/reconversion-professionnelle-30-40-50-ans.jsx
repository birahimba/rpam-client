import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import SEOHead from '../../components/SEOHead'

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://www.rpam.fr/blog/reconversion-professionnelle-30-40-50-ans#article",
      "headline": "Reconversion professionnelle à 30, 40 ou 50 ans : par où commencer en 2026 ?",
      "description": "Reconversion professionnelle à 30, 40 ou 50 ans : découvrez les étapes concrètes pour réussir votre changement de carrière en 2026, les aides disponibles et les erreurs à éviter.",
      "url": "https://www.rpam.fr/blog/reconversion-professionnelle-30-40-50-ans",
      "image": "https://www.rpam.fr/images/blog/reconversion-professionnelle-cover.jpg",
      "datePublished": "2025-05-11T08:00:00+02:00",
      "dateModified": "2026-07-03T08:00:00+02:00",
      "author": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" },
      "publisher": {
        "@type": "Organization",
        "name": "RPAM",
        "url": "https://www.rpam.fr",
        "logo": { "@type": "ImageObject", "url": "https://www.rpam.fr/images/logo-rpam.png" }
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.rpam.fr/blog/reconversion-professionnelle-30-40-50-ans" },
      "articleSection": "Reconversion professionnelle",
      "keywords": "reconversion professionnelle, bilan de compétences, changement de carrière, CPF, orientation professionnelle"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "À quel âge est-il trop tard pour se reconvertir ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Il n'est jamais trop tard pour se reconvertir professionnellement. À 50 ans, vous avez encore 15 à 20 ans de carrière devant vous." }
        },
        {
          "@type": "Question",
          "name": "Quelles aides financières existent pour une reconversion ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Le CPF, le PTP, l'AIF via France Travail, et le dispositif Pro-A peuvent financer votre reconversion." }
        },
        {
          "@type": "Question",
          "name": "Combien de temps dure une reconversion professionnelle ?",
          "acceptedAnswer": { "@type": "Answer", "text": "De quelques mois à 2-3 ans selon le secteur visé. En moyenne, 12 à 24 mois pour une reconversion bien préparée." }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.rpam.fr" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.rpam.fr/blogs" },
        { "@type": "ListItem", "position": 3, "name": "Reconversion professionnelle à 30, 40 ou 50 ans", "item": "https://www.rpam.fr/blog/reconversion-professionnelle-30-40-50-ans" }
      ]
    }
  ]
}

const faqs = [
  {
    question: "À quel âge est-il trop tard pour se reconvertir ?",
    answer: "Il n'est jamais trop tard pour se reconvertir professionnellement. À 50 ans, vous avez encore 15 à 20 ans de carrière devant vous. Les recruteurs valorisent de plus en plus l'expérience et la maturité professionnelle. Avec une bonne stratégie et un accompagnement adapté, une reconversion réussie est possible à tout âge."
  },
  {
    question: "Quelles aides financières existent pour une reconversion ?",
    answer: "Plusieurs dispositifs peuvent financer votre reconversion : le CPF pour les formations certifiantes, le PTP qui maintient votre salaire pendant la formation, l'AIF via France Travail pour les demandeurs d'emploi, et le dispositif Pro-A pour les salariés. Le bilan de compétences est lui aussi finançable via le CPF."
  },
  {
    question: "Combien de temps dure une reconversion professionnelle ?",
    answer: "La durée varie selon le secteur visé et votre situation de départ : de quelques mois pour une reconversion dans un domaine proche, à 2-3 ans pour un changement radical. En moyenne, une reconversion bien préparée prend entre 12 et 24 mois."
  },
  {
    question: "Le bilan de compétences est-il obligatoire pour se reconvertir ?",
    answer: "Non, il n'est pas obligatoire, mais il est fortement recommandé. Il vous permet de clarifier votre projet, d'identifier vos compétences transférables et d'éviter une reconversion mal ciblée. Il dure en général 16 à 24 heures et est entièrement finançable par le CPF."
  },
  {
    question: "Comment RPAM peut-il m'aider dans ma reconversion ?",
    answer: "RPAM vous accompagne à chaque étape de votre reconversion : bilan de compétences, définition de projet, exploration du marché, préparation à la recherche d'emploi dans votre nouveau secteur. Nos conseillers connaissent les spécificités de chaque tranche d'âge et vous proposent un accompagnement sur mesure."
  }
]

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ marginBottom: '16px', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', textAlign: 'left', padding: '18px 24px', background: '#fff', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {question}
        <i className={`feather icon-feather-chevron-${open ? 'up' : 'down'}`} style={{ flexShrink: 0, transition: 'transform 0.3s' }}></i>
      </button>
      {open && (
        <div style={{ padding: '0 24px 18px', color: '#666' }}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

const badgeStyle = { background: 'var(--base-color,#005153)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', marginRight: '6px' }

export default function ReconversionArticle() {
  return (
    <Layout activePage="blogs">
      <SEOHead
        title="Reconversion professionnelle à 30, 40 ou 50 ans : par où commencer en 2026 ? | RPAM"
        description="Reconversion professionnelle à 30, 40 ou 50 ans : découvrez les étapes concrètes pour réussir votre changement de carrière en 2026, les aides disponibles et les erreurs à éviter."
        canonical="https://www.rpam.fr/blog/reconversion-professionnelle-30-40-50-ans"
        ogImage="https://www.rpam.fr/images/blog/reconversion-professionnelle-cover.jpg"
        ogType="article"
        schema={schema}
      />

      <section className="pt-0 pb-0 bg-very-light-gray top-space-margin">
        <div className="container">
          <div className="row">
            {/* Article */}
            <div className="col-lg-8">
              <article className="article-container">

                <Link href="/blogs" className="back-to-blog">
                  <i className="feather icon-feather-arrow-left"></i>
                  Retour aux articles
                </Link>

                <div className="article-header">
                  <img
                    src="/images/blog/reconversion-professionnelle-cover.jpg"
                    alt="Reconversion professionnelle à 30, 40 ou 50 ans : guide complet 2026"
                    className="article-cover"
                    onError={(e) => { e.target.src = '/images/default-blog-cover.jpg' }}
                  />
                  <div className="article-tags mb-3">
                    <span className="badge" style={badgeStyle}>Reconversion</span>
                    <span className="badge" style={badgeStyle}>Carrière</span>
                    <span className="badge" style={badgeStyle}>Bilan de compétences</span>
                  </div>
                  <h1 className="article-title">Reconversion professionnelle à 30, 40 ou 50 ans : par où commencer en 2026 ?</h1>
                  <div className="article-meta">
                    <span><i className="feather icon-feather-calendar"></i> 11 mai 2025</span>
                    <span><i className="feather icon-feather-clock"></i> 10 min de lecture</span>
                    <span><i className="feather icon-feather-user"></i> RPAM</span>
                  </div>
                </div>

                <div className="article-content text-black">

                  <p className="lead">Se reconvertir professionnellement, c&apos;est l&apos;une des décisions les plus importantes — et les plus courageuses — qu&apos;un actif puisse prendre. En 2026, le contexte économique, les mutations du marché du travail et la quête de sens poussent de plus en plus de Français à envisager un changement de cap. Mais par où commencer ? Quelles étapes suivre selon son âge ? Quelles aides mobiliser ? Ce guide complet vous donne toutes les clés.</p>

                  <hr style={{ margin: '40px 0', borderColor: '#e5e5e5' }} />

                  <h2>Pourquoi se reconvertir en 2026 ?</h2>

                  <p>Selon les données de France Travail, <strong>plus d&apos;un actif sur deux</strong> envisage une reconversion professionnelle au cours de sa vie. Et ce phénomène s&apos;accélère : l&apos;automatisation de certains métiers, la montée en puissance du télétravail, l&apos;essor de l&apos;économie verte et la crise de sens post-pandémique ont profondément rebattu les cartes.</p>

                  <p>Reconversion ne rime plus avec échec ou instabilité. C&apos;est au contraire un acte stratégique : celui de reprendre le contrôle de sa trajectoire professionnelle, d&apos;aligner son travail avec ses valeurs, et d&apos;anticiper les transformations du marché plutôt que de les subir.</p>

                  <p>Les secteurs qui recrutent en 2026 sont nombreux : les <strong>métiers du numérique</strong> (cybersécurité, data, développement), les <strong>métiers du soin</strong> (aide à la personne, santé mentale), les <strong>métiers verts</strong> (transition énergétique, construction durable), et les métiers de l&apos;<strong>accompagnement humain</strong> (coaching, ressources humaines, formation).</p>

                  <h2>Reconversion à 30 ans : capitaliser sur l&apos;élan</h2>

                  <p>À 30 ans, vous avez accumulé plusieurs années d&apos;expérience professionnelle, forgé une première identité de carrière — et vous vous rendez compte que ce n&apos;est peut-être pas la bonne. C&apos;est une période charnière : assez tôt pour pivoter sans sacrifier l&apos;avenir, assez tard pour avoir des compétences réelles à valoriser.</p>

                  <h3>Vos atouts à 30 ans</h3>
                  <ul>
                    <li><strong>De l&apos;énergie et de l&apos;adaptabilité</strong> : vous avez encore la capacité d&apos;apprendre vite et de vous adapter à de nouveaux environnements.</li>
                    <li><strong>Des premières expériences transférables</strong> : même dans un secteur différent, vos compétences relationnelles, organisationnelles ou techniques ont de la valeur.</li>
                    <li><strong>Du temps devant vous</strong> : vous pouvez vous permettre une formation longue ou un démarrage au bas de l&apos;échelle dans un nouveau domaine.</li>
                  </ul>

                  <h3>Les erreurs à éviter à 30 ans</h3>
                  <ul>
                    <li>Se reconvertir par défaut (fuir son travail actuel plutôt que choisir un nouveau cap).</li>
                    <li>Sous-estimer ses compétences actuelles et repartir &quot;de zéro&quot; inutilement.</li>
                    <li>Négliger le bilan de compétences par manque de temps ou d&apos;urgence.</li>
                  </ul>

                  <div className="alert" style={{ background: '#f0f9f9', borderLeft: '4px solid #005153', padding: '20px 25px', borderRadius: '0 8px 8px 0', margin: '30px 0' }}>
                    <strong style={{ color: '#005153' }}>Conseil RPAM :</strong> À 30 ans, le bilan de compétences est un investissement-clé. Il vous aide à identifier précisément vos compétences transférables, vos véritables motivations et à cibler un secteur cohérent avec qui vous êtes. <Link href="/guidance" style={{ color: '#005153', fontWeight: 600 }}>En savoir plus sur notre accompagnement en orientation professionnelle →</Link>
                  </div>

                  <h2>Reconversion à 40 ans : transformer l&apos;expérience en levier</h2>

                  <p>La reconversion à 40 ans est souvent déclenchée par un tournant de vie : une réorganisation d&apos;entreprise, un sentiment d&apos;épuisement professionnel (burnout), un besoin de donner plus de sens à son travail, ou l&apos;opportunité d&apos;une rupture conventionnelle. C&apos;est un âge où l&apos;on a suffisamment de recul pour savoir ce qu&apos;on ne veut plus — et suffisamment de ressources pour construire ce qu&apos;on veut vraiment.</p>

                  <h3>Vos atouts à 40 ans</h3>
                  <ul>
                    <li><strong>Un réseau professionnel solide</strong> : vos contacts valent de l&apos;or dans toute reconversion. Le bouche-à-oreille et les recommandations restent les premières sources d&apos;embauche.</li>
                    <li><strong>Une expertise sectorielle monnayable</strong> : même si vous changez de métier, votre connaissance d&apos;un secteur est un avantage concurrentiel rare.</li>
                    <li><strong>Une maturité professionnelle</strong> : les recruteurs savent que vous gérerez les situations complexes avec plus de sérénité qu&apos;un junior.</li>
                  </ul>

                  <h3>Les étapes clés à 40 ans</h3>
                  <ol>
                    <li><strong>Réaliser un bilan de compétences</strong> : clarifier son projet avant toute chose.</li>
                    <li><strong>Explorer le marché</strong> : rencontrer des professionnels du secteur cible, se former aux réalités du métier visé.</li>
                    <li><strong>Valoriser ses compétences transversales</strong> : management, gestion de projet, relation client, analyse.</li>
                    <li><strong>Identifier les formations courtes et certifiantes</strong> qui permettent une montée en compétences ciblée sans reprendre 3 ans d&apos;études.</li>
                    <li><strong>Activer le réseau</strong> : LinkedIn, associations professionnelles, anciens collègues et managers.</li>
                  </ol>

                  <h2>Reconversion à 50 ans : jouer la carte de l&apos;expertise</h2>

                  <p>À 50 ans, se reconvertir peut sembler risqué — mais c&apos;est souvent une nécessité stratégique. Vous avez encore 15 à 20 ans de carrière active devant vous. Continuer dans un métier qui vous épuise ou qui est en déclin, c&apos;est perdre ces années. Bien accompagnée, une reconversion à 50 ans peut être la plus épanouissante de votre vie professionnelle.</p>

                  <h3>Les idées reçues à déconstruire</h3>
                  <ul>
                    <li><em>&quot;Les recruteurs ne veulent pas de seniors&quot;</em> → Faux dans de nombreux secteurs : santé, formation, conseil, artisanat, fonctions support.</li>
                    <li><em>&quot;Je n&apos;ai plus la capacité d&apos;apprendre&quot;</em> → La plasticité neurale reste active tout au long de la vie.</li>
                    <li><em>&quot;C&apos;est trop tard pour changer&quot;</em> → Des milliers de Français se reconvertissent avec succès après 50 ans.</li>
                  </ul>

                  <h3>Les pistes particulièrement adaptées à 50 ans</h3>
                  <ul>
                    <li><strong>La transmission et la formation</strong> : devenir formateur, tuteur, consultant indépendant.</li>
                    <li><strong>L&apos;artisanat et les métiers manuels</strong> : nombreuses reconversions réussies en ébénisterie, maraîchage, restauration.</li>
                    <li><strong>L&apos;entrepreneuriat</strong> : créer une activité basée sur son expertise.</li>
                    <li><strong>Les métiers de l&apos;humain</strong> : auxiliaire de vie, aide à domicile, médiateur social.</li>
                  </ul>

                  <hr style={{ margin: '40px 0', borderColor: '#e5e5e5' }} />

                  <h2>Les étapes universelles d&apos;une reconversion réussie</h2>

                  <p>Quel que soit votre âge, une reconversion professionnelle réussie suit une logique similaire. Voici les 6 étapes incontournables :</p>

                  <h3>Étape 1 — Faire le point sur soi (bilan de compétences)</h3>
                  <p>C&apos;est le point de départ obligatoire. Un <Link href="/guidance">bilan de compétences</Link> vous permet d&apos;identifier vos compétences, vos valeurs professionnelles, vos motivations profondes, et les conditions de travail dans lesquelles vous vous épanouissez.</p>

                  <h3>Étape 2 — Explorer et enquêter sur le marché</h3>
                  <p>Avant de vous lancer dans une formation ou une démarche, allez à la rencontre du terrain : rencontrez des professionnels du secteur cible, faites des enquêtes métier, consultez les offres d&apos;emploi pour comprendre ce que le marché attend vraiment.</p>

                  <h3>Étape 3 — Définir un projet clair et réaliste</h3>
                  <p>Votre projet doit répondre à trois critères : ce que vous <em>aimez</em> faire, ce que vous <em>savez</em> faire, et ce que le <em>marché valorise</em>.</p>

                  <h3>Étape 4 — Identifier les formations et les aides</h3>
                  <p>En 2026, les dispositifs de financement sont nombreux :</p>
                  <ul>
                    <li><strong>CPF (Compte Personnel de Formation)</strong> : pour financer des formations certifiantes inscrites au RNCP.</li>
                    <li><strong>PTP (Projet de Transition Professionnelle)</strong> : vous permet de suivre une formation longue tout en maintenant votre salaire.</li>
                    <li><strong>Pro-A</strong> : pour les salariés en reconversion dans leur entreprise.</li>
                    <li><strong>AIF (Aide Individuelle à la Formation)</strong> : via France Travail, pour les demandeurs d&apos;emploi.</li>
                    <li><strong>Contrat de professionnalisation ou d&apos;apprentissage</strong> : ouvert aux adultes, pour se former en alternance.</li>
                  </ul>

                  <h3>Étape 5 — Se former efficacement</h3>
                  <p>Privilégiez les formations courtes et certifiantes. Les bootcamps, les formations en alternance, les diplômes en VAE sont souvent plus adaptés à une reconversion adulte qu&apos;un retour à l&apos;université classique.</p>

                  <h3>Étape 6 — Être accompagné tout au long du processus</h3>
                  <p>La reconversion professionnelle est un chemin semé d&apos;incertitudes. Se faire accompagner par un professionnel réduit considérablement le risque d&apos;erreur et accélère le résultat. <Link href="/booking">RPAM propose des consultations personnalisées</Link> pour vous guider à chaque étape.</p>

                  <hr style={{ margin: '40px 0', borderColor: '#e5e5e5' }} />

                  <h2>Les signaux qui indiquent qu&apos;une reconversion s&apos;impose</h2>
                  <ul>
                    <li>Vous redoutez le lundi matin de façon chronique.</li>
                    <li>Votre travail ne fait plus appel à vos points forts.</li>
                    <li>Vous avez l&apos;impression de stagner depuis plusieurs années.</li>
                    <li>Votre secteur est en déclin ou en transformation radicale.</li>
                    <li>Vous souffrez de symptômes de burnout ou de bore-out.</li>
                    <li>Vous rêvez régulièrement d&apos;un autre métier ou d&apos;une autre vie professionnelle.</li>
                  </ul>

                  <hr style={{ margin: '40px 0', borderColor: '#e5e5e5' }} />

                  <h2>Questions fréquentes sur la reconversion professionnelle</h2>
                  <div className="faq-section">
                    {faqs.map((faq, i) => (
                      <FaqItem key={i} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>

                  <hr style={{ margin: '40px 0', borderColor: '#e5e5e5' }} />

                  {/* CTA Box */}
                  <div style={{ background: 'linear-gradient(135deg,#005153,#007a7c)', borderRadius: '16px', padding: '40px', textAlign: 'center', margin: '40px 0' }}>
                    <h3 style={{ color: '#fff', marginBottom: '12px' }}>Prêt à lancer votre reconversion ?</h3>
                    <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '24px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>Nos conseillers RPAM vous accompagnent de l&apos;identification de votre projet jusqu&apos;à votre prise de poste dans votre nouveau métier.</p>
                    <Link href="/booking" style={{ display: 'inline-block', background: '#fff', color: '#005153', fontWeight: 700, padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', fontSize: '1rem' }}>
                      <i className="feather icon-feather-calendar" style={{ marginRight: '8px' }}></i>
                      Réserver ma consultation gratuite
                    </Link>
                  </div>

                  {/* Internal links */}
                  <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '28px', margin: '30px 0' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#333' }}>Pour aller plus loin</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ marginBottom: '10px' }}>
                        <Link href="/guidance" style={{ color: '#005153', fontWeight: 500 }}>
                          <i className="feather icon-feather-arrow-right" style={{ marginRight: '8px' }}></i>
                          Découvrir notre service d&apos;orientation professionnelle (bilan de compétences)
                        </Link>
                      </li>
                      <li style={{ marginBottom: '10px' }}>
                        <Link href="/up-training" style={{ color: '#005153', fontWeight: 500 }}>
                          <i className="feather icon-feather-arrow-right" style={{ marginRight: '8px' }}></i>
                          Développer vos compétences avec notre programme Up Training
                        </Link>
                      </li>
                      <li style={{ marginBottom: '10px' }}>
                        <Link href="/job-getting" style={{ color: '#005153', fontWeight: 500 }}>
                          <i className="feather icon-feather-arrow-right" style={{ marginRight: '8px' }}></i>
                          Coaching recherche d&apos;emploi : décrocher votre prochain poste
                        </Link>
                      </li>
                      <li>
                        <Link href="/blogs" style={{ color: '#005153', fontWeight: 500 }}>
                          <i className="feather icon-feather-arrow-right" style={{ marginRight: '8px' }}></i>
                          Tous nos articles sur le blog RPAM
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Share */}
                  <div className="article-reactions" style={{ marginTop: '40px' }}>
                    <div className="article-share">
                      <span style={{ color: '#666', fontSize: '0.9rem', marginRight: '12px' }}>Partager :</span>
                      <a href="https://twitter.com/intent/tweet?url=https://www.rpam.fr/blog/reconversion-professionnelle-30-40-50-ans&text=Reconversion+professionnelle+%C3%A0+30%2C+40+ou+50+ans" className="share-btn" target="_blank" rel="noopener noreferrer" title="Partager sur Twitter">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                      <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.rpam.fr/blog/reconversion-professionnelle-30-40-50-ans" className="share-btn" target="_blank" rel="noopener noreferrer" title="Partager sur LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.rpam.fr/blog/reconversion-professionnelle-30-40-50-ans" className="share-btn" target="_blank" rel="noopener noreferrer" title="Partager sur Facebook">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </div>
                  </div>

                </div>
              </article>
            </div>

            {/* Sidebar */}
            <aside className="col-lg-4 top-space-margin">
              <div className="sidebar-sticky" style={{ position: 'sticky', top: '100px' }}>

                <div className="sidebar-widget mb-4" style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <h3 className="sidebar-title" style={{ fontSize: '1rem', fontWeight: 700, color: '#333', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #005153' }}>À propos de RPAM</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.7 }}>RPAM accompagne les actifs dans leurs transitions professionnelles : bilan de compétences, développement de compétences et coaching emploi.</p>
                  <Link href="/booking" style={{ display: 'block', background: '#005153', color: '#fff', textAlign: 'center', padding: '12px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', marginTop: '16px' }}>
                    Consultation gratuite
                  </Link>
                </div>

                <div className="sidebar-widget mb-4" style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <h3 className="sidebar-title" style={{ fontSize: '1rem', fontWeight: 700, color: '#333', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #005153' }}>Nos services</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>
                      <Link href="/guidance" style={{ color: '#333', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-compass" style={{ color: '#005153', width: '16px' }}></i>
                        Orientation Professionnelle
                      </Link>
                    </li>
                    <li style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>
                      <Link href="/up-training" style={{ color: '#333', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-chart-line" style={{ color: '#005153', width: '16px' }}></i>
                        Développement de Compétences
                      </Link>
                    </li>
                    <li>
                      <Link href="/job-getting" style={{ color: '#333', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-briefcase" style={{ color: '#005153', width: '16px' }}></i>
                        Coaching Recherche d&apos;Emploi
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="sidebar-widget" style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <h3 className="sidebar-title" style={{ fontSize: '1rem', fontWeight: 700, color: '#333', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #005153' }}>Thématiques</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['#reconversion', '#bilanDeCompétences', '#carrière', '#CPF', '#orientation'].map(tag => (
                      <span key={tag} style={{ background: '#f0f9f9', color: '#005153', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

    </Layout>
  )
}
