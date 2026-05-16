import { useEffect } from 'react'
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
        "name": "Comment fonctionne le CPF en 2025 ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le Compte Personnel de Formation (CPF) permet à chaque actif de financer des formations qualifiantes. Depuis 2023, une participation de 100 € est demandée sauf cas d'exonération. RPAM accompagne ses clients dans l'activation et l'utilisation optimale de leur CPF pour financer bilan de compétences et formations."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles sont les compétences les plus recherchées par les employeurs en France en 2025 ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En 2025, les employeurs français recherchent principalement : les compétences numériques (IA, data, cybersécurité), les soft skills (communication, adaptabilité, intelligence émotionnelle), les compétences en management de projet et les expertises sectorielles dans la santé, le green tech et le digital. RPAM adapte ses formations et coachings à ces besoins du marché."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que France Travail et comment peut-il m'aider ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "France Travail (anciennement Pôle Emploi) est l'opérateur public de l'emploi en France. Il propose accompagnement à la recherche d'emploi, formations, aides financières et mise en relation avec les employeurs. RPAM travaille en complémentarité avec France Travail pour offrir un accompagnement personnalisé plus intensif."
        }
      },
      {
        "@type": "Question",
        "name": "Comment réussir une reconversion professionnelle en France ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une reconversion réussie passe par 4 étapes : 1) Faire un bilan de compétences pour identifier ses forces et son projet, 2) Se former aux nouvelles compétences nécessaires, 3) Construire son réseau professionnel dans le nouveau secteur, 4) Préparer sa candidature et ses entretiens. RPAM accompagne chaque étape avec ses services Guidance, Up Training et Job Getting."
        }
      }
    ]
  }
]

export default function News() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const navbar = document.getElementById('mainNavbar')
      const hamburger = document.getElementById('hamburgerBtn')
      const mobileMenu = document.getElementById('mobileMenu')
      const servicesToggle = document.getElementById('servicesToggle')
      const servicesSubmenu = document.getElementById('servicesSubmenu')

      // Scroll effect
      const handleScroll = function () {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled')
        } else {
          navbar.classList.remove('scrolled')
        }
      }
      window.addEventListener('scroll', handleScroll)

      // Mobile menu toggle
      const handleHamburger = function () {
        this.classList.toggle('active')
        mobileMenu.classList.toggle('active')
        document.body.classList.toggle('menu-open')
      }
      if (hamburger) hamburger.addEventListener('click', handleHamburger)

      // Services submenu toggle
      const handleServicesToggle = function (e) {
        e.preventDefault()
        servicesSubmenu.classList.toggle('active')
        this.querySelector('.arrow').style.transform =
          servicesSubmenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)'
      }
      if (servicesToggle) servicesToggle.addEventListener('click', handleServicesToggle)

      // Close menu when clicking outside
      const handleOutsideClick = function (e) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
          hamburger.classList.remove('active')
          mobileMenu.classList.remove('active')
          document.body.classList.remove('menu-open')
        }
      }
      document.addEventListener('click', handleOutsideClick)

      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (hamburger) hamburger.removeEventListener('click', handleHamburger)
        if (servicesToggle) servicesToggle.removeEventListener('click', handleServicesToggle)
        document.removeEventListener('click', handleOutsideClick)
      }
    }
  }, [])

  return (
    <Layout activePage="news">
      <SEOHead
        title="Actualités professionnelles – Conseils &amp; tendances | RPAM"
        description="Restez informé des dernières actualités sur l'emploi, la formation et le coaching professionnel. RPAM vous partage conseils et tendances du marché."
        canonical="https://www.rpam.fr/news"
        schema={schema}
      />

      <br /> <br />

      {/* start page title */}
      <section className="pb-0 bg-very-light-gray ipad-top-space-margin md-pt-0">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-xl-9 col-lg-9 text-center position-relative page-title-double-large">
              <div className="d-flex flex-column justify-content-center extra-very-small-screen">
                <h1 className="text-base-color alt-font ls-minus-1px fw-700">Votre Hub d&apos;Actualités Professionnelles
                </h1>
                <h2 className="text-dark-gray d-inline-block fw-400 ls-0px w-80 xs-w-100 mx-auto">Explorez nos
                  actualités pour rester connecté, inspiré et prêt à saisir de nouvelles opportunités
                  professionnelles.</h2>
              </div> <br />
            </div>
          </div>
        </div>
      </section> <br />
      {/* end page title */}

      {/* Section : Tendances du marché de l'emploi */}
      <section className="pt-5 pb-5 bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-10 text-center">
              <h2 className="fw-700 text-dark-gray ls-minus-1px mb-3">Tendances du marché de l&apos;emploi en France</h2>
              <p className="fs-18 fw-400 text-medium-gray">Comprendre les évolutions du marché pour mieux orienter votre carrière.</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-4 h-100 border border-1 border-color-light-gray border-radius-8px">
                <div className="mb-3">
                  <i className="fas fa-chart-line text-base-color fs-30"></i>
                </div>
                <h3 className="fw-600 fs-20 text-dark-gray mb-2">L&apos;emploi en tension</h3>
                <p className="fw-400 text-medium-gray fs-16">Certains secteurs peinent à recruter : santé, numérique, logistique et industrie verte. Ces tensions créent de réelles opportunités pour les candidats prêts à se former et à évoluer rapidement.</p>
                <p className="fw-400 text-medium-gray fs-16">RPAM vous aide à identifier les secteurs porteurs et à construire votre repositionnement stratégique.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-4 h-100 border border-1 border-color-light-gray border-radius-8px">
                <div className="mb-3">
                  <i className="fas fa-robot text-base-color fs-30"></i>
                </div>
                <h3 className="fw-600 fs-20 text-dark-gray mb-2">IA et transformation des métiers</h3>
                <p className="fw-400 text-medium-gray fs-16">L&apos;intelligence artificielle transforme profondément les métiers. 40 % des emplois sont concernés par des changements majeurs de compétences. Savoir s&apos;adapter et monter en compétences sur les outils IA devient un avantage concurrentiel décisif.</p>
                <p className="fw-400 text-medium-gray fs-16">Nos formations sur mesure intègrent ces nouvelles réalités du marché.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-4 h-100 border border-1 border-color-light-gray border-radius-8px">
                <div className="mb-3">
                  <i className="fas fa-leaf text-base-color fs-30"></i>
                </div>
                <h3 className="fw-600 fs-20 text-dark-gray mb-2">Green tech et emplois verts</h3>
                <p className="fw-400 text-medium-gray fs-16">La transition écologique génère des milliers d&apos;emplois en France : énergies renouvelables, rénovation thermique, mobilité durable, agriculture responsable. Ces secteurs recrutent des profils de tous horizons.</p>
                <p className="fw-400 text-medium-gray fs-16">Un bilan de compétences RPAM peut révéler votre potentiel dans ces filières d&apos;avenir.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section : Reconversion & Formation */}
      <section className="pt-5 pb-5 bg-very-light-gray">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2 className="fw-700 text-dark-gray ls-minus-1px mb-4">Reconversion professionnelle : ce qui change en 2025</h2>
              <p className="fw-400 text-medium-gray fs-17 mb-3">Le marché du travail français évolue à un rythme sans précédent. En 2025, la reconversion professionnelle n&apos;est plus une exception — c&apos;est une stratégie de carrière adoptée par des millions d&apos;actifs.</p>
              <h3 className="fw-600 fs-18 text-dark-gray mb-2">Le CPF et ses nouvelles règles</h3>
              <p className="fw-400 text-medium-gray fs-16 mb-3">Depuis la réforme de 2023, le Compte Personnel de Formation demande une participation de 100 € aux salariés (sauf cas d&apos;exonération pour demandeurs d&apos;emploi, travailleurs handicapés). Le CPF reste néanmoins un levier puissant pour financer bilan de compétences, certifications et formations qualifiantes.</p>
              <h3 className="fw-600 fs-18 text-dark-gray mb-2">France Travail : un accompagnement renforcé</h3>
              <p className="fw-400 text-medium-gray fs-16 mb-4">France Travail (anciennement Pôle Emploi) intensifie son accompagnement des demandeurs d&apos;emploi avec des parcours individualisés, des formations accélérées et des aides à la mobilité géographique. RPAM complète ce dispositif avec un coaching personnalisé et une approche humaine.</p>
              <Link href="/guidance" className="btn btn-base-color btn-rounded btn-medium text-transform-none">Découvrir nos services d&apos;orientation</Link>
            </div>
            <div className="col-12 col-lg-6">
              <div className="bg-white p-4 border-radius-12px shadow-small">
                <h3 className="fw-600 fs-18 text-dark-gray mb-4">Chiffres clés 2025</h3>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="text-center p-3 bg-very-light-gray border-radius-8px">
                      <span className="fw-700 text-base-color" style={{ fontSize: '2rem' }}>58%</span>
                      <p className="fw-500 text-dark-gray fs-14 mb-0">des actifs envisagent une reconversion dans les 5 prochaines années</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 bg-very-light-gray border-radius-8px">
                      <span className="fw-700 text-base-color" style={{ fontSize: '2rem' }}>3 mois</span>
                      <p className="fw-500 text-dark-gray fs-14 mb-0">durée moyenne d&apos;un bilan de compétences accompagné</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 bg-very-light-gray border-radius-8px">
                      <span className="fw-700 text-base-color" style={{ fontSize: '2rem' }}>85%</span>
                      <p className="fw-500 text-dark-gray fs-14 mb-0">des personnes accompagnées retrouvent un emploi adapté</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 bg-very-light-gray border-radius-8px">
                      <span className="fw-700 text-base-color" style={{ fontSize: '2rem' }}>+12%</span>
                      <p className="fw-500 text-dark-gray fs-14 mb-0">de salaire moyen après reconversion réussie</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section : Soft Skills & Recrutement */}
      <section className="pt-5 pb-5 bg-white">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-10 text-center">
              <h2 className="fw-700 text-dark-gray ls-minus-1px mb-3">Recrutement 2025 : ce que cherchent vraiment les employeurs</h2>
              <p className="fs-17 fw-400 text-medium-gray">Au-delà des diplômes, les recruteurs évaluent des compétences comportementales décisives.</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <h3 className="fw-600 fs-18 text-dark-gray mb-3">Les compétences techniques incontournables</h3>
              <ul className="list-unstyled">
                <li className="d-flex align-items-start mb-3"><i className="fas fa-check-circle text-base-color me-3 mt-1"></i><div><strong className="text-dark-gray">Intelligence artificielle et data</strong><br /><span className="text-medium-gray fs-15">Savoir utiliser les outils IA (ChatGPT, Copilot, outils sectoriels) devient indispensable dans presque tous les métiers.</span></div></li>
                <li className="d-flex align-items-start mb-3"><i className="fas fa-check-circle text-base-color me-3 mt-1"></i><div><strong className="text-dark-gray">Compétences digitales</strong><br /><span className="text-medium-gray fs-15">Marketing digital, CRM, analytics, gestion de projet en mode agile sont devenus des prérequis dans de nombreux secteurs.</span></div></li>
                <li className="d-flex align-items-start mb-3"><i className="fas fa-check-circle text-base-color me-3 mt-1"></i><div><strong className="text-dark-gray">Langues étrangères</strong><br /><span className="text-medium-gray fs-15">L&apos;anglais professionnel reste un critère de sélection majeur, y compris dans les PME françaises qui s&apos;internationalisent.</span></div></li>
              </ul>
            </div>
            <div className="col-12 col-md-6">
              <h3 className="fw-600 fs-18 text-dark-gray mb-3">Les soft skills les plus valorisés</h3>
              <ul className="list-unstyled">
                <li className="d-flex align-items-start mb-3"><i className="fas fa-star text-base-color me-3 mt-1"></i><div><strong className="text-dark-gray">Adaptabilité et résilience</strong><br /><span className="text-medium-gray fs-15">Dans un monde qui change vite, la capacité à apprendre, désapprendre et réapprendre est plus valorisée que les connaissances figées.</span></div></li>
                <li className="d-flex align-items-start mb-3"><i className="fas fa-star text-base-color me-3 mt-1"></i><div><strong className="text-dark-gray">Intelligence émotionnelle</strong><br /><span className="text-medium-gray fs-15">Gestion du stress, empathie, communication assertive et leadership bienveillant sont en tête des critères RH en 2025.</span></div></li>
                <li className="d-flex align-items-start mb-3"><i className="fas fa-star text-base-color me-3 mt-1"></i><div><strong className="text-dark-gray">Autonomie et proactivité</strong><br /><span className="text-medium-gray fs-15">Le télétravail hybride a renforcé l&apos;exigence d&apos;autonomie. Les candidats qui prennent des initiatives se démarquent nettement.</span></div></li>
              </ul>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <Link href="/up-training" className="btn btn-base-color btn-rounded btn-medium text-transform-none me-3">Développer mes compétences</Link>
              <Link href="/job-getting" className="btn btn-outline btn-rounded btn-medium text-transform-none">Préparer mes entretiens</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="pt-5 pb-5 bg-very-light-gray">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-10 text-center">
              <h2 className="fw-700 text-dark-gray ls-minus-1px mb-3">Questions fréquentes sur l&apos;actualité professionnelle</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
              <div className="accordion" id="faqAccordionNews">
                <div className="accordion-item border mb-3 border-radius-8px overflow-hidden">
                  <h3 className="accordion-header">
                    <button className="accordion-button fw-600 fs-17 text-dark-gray" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      Comment fonctionne le CPF en 2025 ?
                    </button>
                  </h3>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordionNews">
                    <div className="accordion-body text-medium-gray fs-16">
                      Le Compte Personnel de Formation (CPF) permet à chaque actif de financer des formations qualifiantes. Depuis 2023, une participation de 100 € est demandée sauf pour les demandeurs d&apos;emploi, les travailleurs handicapés et certains cas d&apos;exonération. RPAM accompagne ses clients dans l&apos;activation et l&apos;utilisation optimale de leur CPF pour financer bilan de compétences, certifications et formations sur mesure.
                    </div>
                  </div>
                </div>
                <div className="accordion-item border mb-3 border-radius-8px overflow-hidden">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed fw-600 fs-17 text-dark-gray" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      Quelles compétences sont les plus recherchées par les employeurs en France en 2025 ?
                    </button>
                  </h3>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordionNews">
                    <div className="accordion-body text-medium-gray fs-16">
                      Les employeurs français recherchent principalement des compétences numériques (IA, data, cybersécurité), des soft skills (communication, adaptabilité, intelligence émotionnelle), des compétences en management de projet et des expertises dans les secteurs de la santé, du green tech et du digital. RPAM adapte ses formations et coachings à ces réalités du marché.
                    </div>
                  </div>
                </div>
                <div className="accordion-item border mb-3 border-radius-8px overflow-hidden">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed fw-600 fs-17 text-dark-gray" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      Comment réussir une reconversion professionnelle en France ?
                    </button>
                  </h3>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordionNews">
                    <div className="accordion-body text-medium-gray fs-16">
                      Une reconversion réussie passe par 4 étapes : 1) Faire un bilan de compétences pour identifier ses forces et clarifier son projet, 2) Se former aux nouvelles compétences nécessaires, 3) Construire son réseau professionnel dans le nouveau secteur, 4) Préparer sa candidature et ses entretiens. RPAM accompagne chaque étape avec ses services Guidance, Up Training et Job Getting.
                    </div>
                  </div>
                </div>
                <div className="accordion-item border mb-3 border-radius-8px overflow-hidden">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed fw-600 fs-17 text-dark-gray" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                      Quels sont les secteurs qui recrutent le plus en France en 2025 ?
                    </button>
                  </h3>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordionNews">
                    <div className="accordion-body text-medium-gray fs-16">
                      Les secteurs en forte croissance en France en 2025 sont : le numérique et la tech (développeurs, data scientists, cybersécurité), la santé et le médico-social, le BTP et la rénovation énergétique, la logistique et le transport, ainsi que le tourisme et l&apos;hôtellerie. Le secteur de l&apos;IA et de l&apos;automatisation génère également de nombreux métiers émergents.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-5 pb-5 bg-base-color">
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-12 col-lg-8">
              <h2 className="fw-700 text-white ls-minus-1px mb-3">Prêt à agir sur votre carrière ?</h2>
              <p className="fs-18 fw-400 text-white mb-4 opacity-8">Ces actualités vous concernent directement. Nos experts RPAM vous accompagnent pour transformer les tendances du marché en opportunités concrètes pour votre carrière.</p>
              <Link href="/booking" className="btn btn-white btn-rounded btn-medium text-transform-none text-base-color fw-600">Réserver ma consultation gratuite</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
