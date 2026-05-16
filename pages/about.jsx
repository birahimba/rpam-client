import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Réseau Professionnel Arvy Motivation (RPAM) – Qui sommes-nous",
    "url": "https://www.rpam.fr/about",
    "description": "Cabinet de coaching et orientation professionnelle en France",
    "publisher": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.rpam.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Qui sommes-nous", "item": "https://www.rpam.fr/about" }
    ]
  }
]

export default function About() {
  return (
    <Layout activePage="about">
      <SEOHead
        title="Réseau Professionnel Arvy Motivation (RPAM) – Cabinet de Coaching Professionnel"
        description="RPAM, cabinet spécialisé en coaching professionnel et orientation de carrière en France. Reconversion professionnelle, bilan de compétences, coaching emploi — accompagnement humain et personnalisé."
        canonical="https://www.rpam.fr/about"
        schema={schema}
      />

      {/* Start Page Title - Modern Hero */}
      <section className="top-space-margin position-relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%), url('/images/about.png')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '60vh' }}>
        <div className="container h-100 d-flex align-items-center py-5">
          <div className="row w-100 align-items-center">
            <div className="col-lg-7" data-aos="fade-up" data-aos-duration="1000">
              <span className="text-uppercase text-white-50 fw-600 ls-2px fs-14 d-block mb-3">À propos de RPAM</span>
              <h1 className="text-white fw-800 display-4 mb-4" style={{ lineHeight: '1.2' }}>
                Qui sommes <span style={{ color: '#ecab23' }}>nous ?</span>
              </h1>
              <p className="text-white-50 fs-18 mb-4 pe-lg-5">
                Votre partenaire de confiance pour transformer vos ambitions professionnelles en réussites
                concrètes.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a href="#about-rpam" className="btn btn-base-color btn-rounded px-4 py-3 fw-600">
                  Découvrir notre histoire
                </a>
                <Link href="/booking" className="btn btn-outline-light btn-rounded px-4 py-3 fw-600">
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block" data-aos="fade-left" data-aos-duration="1000"
              data-aos-delay="200">
              <div className="position-relative">
                <div className="glass-card p-4 text-center"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div className="d-flex justify-content-around mb-4">
                    <div>
                      <h2 className="text-white fw-800 mb-0">5+</h2>
                      <span className="text-white-50 fs-14">Années d&apos;expérience</span>
                    </div>
                    <div>
                      <h2 className="text-white fw-800 mb-0">100+</h2>
                      <span className="text-white-50 fs-14">Clients accompagnés</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-around">
                    <div>
                      <h2 className="text-white fw-800 mb-0">95%</h2>
                      <span className="text-white-50 fs-14">Taux de satisfaction</span>
                    </div>
                    <div>
                      <h2 className="text-white fw-800 mb-0">3</h2>
                      <span className="text-white-50 fs-14">Services clés</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Page Title */}

      {/* About RPAM (Modern Section) */}
      <section id="about-rpam" className="py-6 position-relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Image block */}
            <div className="col-lg-5" data-aos="fade-right" data-aos-duration="800">
              <div className="position-relative">
                <div className="about-image-wrapper" style={{ position: 'relative' }}>
                  <img src="/images/logo-rpam.png" alt="Mission RPAM" className="img-fluid"
                    style={{ maxWidth: '300px' }} />
                  <div className="floating-badge position-absolute"
                    style={{ bottom: '-20px', right: '-20px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', padding: '20px 30px', borderRadius: '15px', boxShadow: '0 15px 40px rgba(255,107,53,0.3)' }}>
                    <span className="text-white fw-700 fs-24">+5 ans</span>
                    <span className="text-white d-block fs-13">d&apos;expertise</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Text block */}
            <div className="col-lg-7" data-aos="fade-left" data-aos-duration="800">
              <span className="text-uppercase fw-600 ls-2px fs-13 d-inline-block mb-3" style={{ color: '#ecab23' }}>Qui
                sommes-nous</span>
              <h2 className="fw-800 text-dark mb-4" style={{ lineHeight: '1.3' }}>
                RPAM, votre <span style={{ color: '#ecab23' }}>partenaire stratégique</span> pour réussir
              </h2>
              <p className="fs-17 text-dark-gray mb-4" style={{ lineHeight: '1.8' }}>
                Nous sommes un levier clé pour accélérer votre insertion professionnelle et booster votre
                carrière. Notre équipe d&apos;experts vous accompagne à chaque étape de votre parcours professionnel.
              </p>
              <div className="row g-4 mt-2">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0 me-3">
                      <div
                        style={{ width: '50px', height: '50px', background: 'rgba(255,107,53,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-check" style={{ color: '#ecab23', fontSize: '18px' }}></i>
                      </div>
                    </div>
                    <div style={{ overflowWrap: 'break-word', minWidth: '0' }}>
                      <h6 className="fw-700 text-dark mb-1">Accompagnement personnalisé</h6>
                      <p className="fs-14 text-medium-gray mb-0">Un suivi adapté à vos besoins</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start">
                    <div className="flex-shrink-0 me-3">
                      <div
                        style={{ width: '50px', height: '50px', background: 'rgba(255,107,53,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-check" style={{ color: '#ecab23', fontSize: '18px' }}></i>
                      </div>
                    </div>
                    <div style={{ overflowWrap: 'break-word', minWidth: '0' }}>
                      <h6 className="fw-700 text-dark mb-1">Expertise reconnue</h6>
                      <p className="fs-14 text-medium-gray mb-0">Une équipe de professionnels</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Histoire - Modern Timeline */}
      <section className="py-6 position-relative" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="text-uppercase fw-600 ls-2px fs-13 d-inline-block mb-3" style={{ color: '#ecab23' }}>Notre
                parcours</span>
              <h2 className="fw-800 text-dark mb-4">Notre <span style={{ color: '#ecab23' }}>Histoire</span></h2>
              <p className="fs-17 text-medium-gray">
                Depuis plus de 5 ans, nous analysons les défis liés à l&apos;insertion et à l&apos;évolution
                professionnelle pour mieux vous accompagner.
              </p>
            </div>
          </div>
          <div className="row g-4">
            {/* Timeline Item 1 */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div className="timeline-card h-100 p-4"
                style={{ background: '#f8f9fa', borderRadius: '20px', borderLeft: '4px solid #ecab23', transition: 'all 0.3s ease' }}>
                <div className="d-flex align-items-center mb-3">
                  <div
                    style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                    <i className="fas fa-graduation-cap text-white fs-20"></i>
                  </div>
                  <div>
                    <h5 className="fw-700 text-dark mb-0">Jeunes diplômés</h5>
                  </div>
                </div>
                <p className="text-dark-gray mb-0" style={{ lineHeight: '1.7' }}>
                  En quête d&apos;une première expérience alignée à leurs aspirations, nous les guidons vers les
                  opportunités qui correspondent à leur profil et leurs ambitions.
                </p>
              </div>
            </div>
            {/* Timeline Item 2 */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <div className="timeline-card h-100 p-4"
                style={{ background: '#f8f9fa', borderRadius: '20px', borderLeft: '4px solid #ecab23', transition: 'all 0.3s ease' }}>
                <div className="d-flex align-items-center mb-3">
                  <div
                    style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                    <i className="fas fa-briefcase text-white fs-20"></i>
                  </div>
                  <div>
                    <h5 className="fw-700 text-dark mb-0">Salariés en transition</h5>
                  </div>
                </div>
                <p className="text-dark-gray mb-0" style={{ lineHeight: '1.7' }}>
                  En recherche de sens ou de progression dans leur carrière, nous les accompagnons dans leur
                  évolution professionnelle avec des outils adaptés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges - Modern Grid */}
      <section className="py-6 position-relative" style={{ background: 'linear-gradient(135deg, #005153 0%, #005153 100%)' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="text-uppercase fw-600 ls-2px fs-13 d-inline-block mb-3" style={{ color: '#ecab23' }}>Nos
                solutions</span>
              <h2 className="fw-800 text-white mb-4">Les défis que nous <span style={{ color: '#ecab23' }}>résolvons</span>
              </h2>
              <p className="fs-17 text-white-50">
                Nous vous aidons à dépasser les freins majeurs rencontrés dans les parcours professionnels.
              </p>
            </div>
          </div>
          <div className="row g-4">
            {/* Challenge 1 */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="challenge-card h-100 p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
                <div className="mb-4"
                  style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <i className="fas fa-compass text-white fs-24"></i>
                </div>
                <h5 className="fw-700 text-white mb-3">Manque de clarté</h5>
                <p className="text-white-50 fs-15 mb-0">Sur le projet professionnel et les objectifs de carrière</p>
              </div>
            </div>
            {/* Challenge 2 */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="challenge-card h-100 p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
                <div className="mb-4"
                  style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <i className="fas fa-door-open text-white fs-24"></i>
                </div>
                <h5 className="fw-700 text-white mb-3">Premier emploi</h5>
                <p className="text-white-50 fs-15 mb-0">Difficultés à décrocher une première opportunité</p>
              </div>
            </div>
            {/* Challenge 3 */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="challenge-card h-100 p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
                <div className="mb-4"
                  style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <i className="fas fa-cogs text-white fs-24"></i>
                </div>
                <h5 className="fw-700 text-white mb-3">Compétences</h5>
                <p className="text-white-50 fs-15 mb-0">Inadaptées aux exigences actuelles du marché</p>
              </div>
            </div>
            {/* Challenge 4 */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
              <div className="challenge-card h-100 p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
                <div className="mb-4"
                  style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                  <i className="fas fa-chart-line text-white fs-24"></i>
                </div>
                <h5 className="fw-700 text-white mb-3">Stagnation</h5>
                <p className="text-white-50 fs-15 mb-0">Ou isolement dans l&apos;évolution de carrière</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Modern Banner */}
      <section className="py-6 position-relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)' }}>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center" data-aos="fade-up">
              <span className="text-uppercase fw-600 ls-2px fs-13 d-inline-block mb-3 text-white-50">Ce qui nous
                anime</span>
              <h2 className="fw-800 text-white mb-4 display-5">Notre Mission</h2>
              <p className="fs-20 fw-400 text-white mb-4" style={{ lineHeight: '1.8', opacity: '0.95' }}>
                Aider chacun de nos bénéficiaires à <strong>s&apos;adapter et à évoluer avec confiance</strong> sur
                le marché de l&apos;emploi, en leur fournissant les outils et l&apos;accompagnement nécessaires pour
                atteindre leurs objectifs professionnels.
              </p>
              <Link href="/booking" className="btn btn-light btn-rounded px-5 py-3 fw-600 mt-3"
                style={{ color: '#ecab23' }}>
                Commencer votre transformation
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative shapes */}
        <div className="position-absolute"
          style={{ top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
        </div>
        <div className="position-absolute"
          style={{ bottom: '-30px', left: '-30px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
        </div>
      </section>

      {/* Values Section - Modern Cards */}
      <section className="py-6" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="text-uppercase fw-600 ls-2px fs-13 d-inline-block mb-3" style={{ color: '#ecab23' }}>Ce qui
                nous définit</span>
              <h2 className="fw-800 text-dark mb-4">Nos <span style={{ color: '#ecab23' }}>Valeurs</span></h2>
            </div>
          </div>
          <div className="row g-4">
            {/* Valeur 1 */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="value-card h-100 p-4 text-center"
                style={{ background: '#f8f9fa', borderRadius: '20px', transition: 'all 0.4s ease', cursor: 'pointer' }}>
                <div className="value-icon mb-4"
                  style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', transition: 'all 0.4s ease' }}>
                  <i className="fas fa-users text-white fs-28"></i>
                </div>
                <h5 className="fw-700 text-dark mb-3">Esprit d&apos;équipe</h5>
                <p className="text-medium-gray fs-15 mb-0" style={{ lineHeight: '1.7' }}>
                  Nous travaillons en synergie pour vous offrir un service de qualité optimale.
                </p>
              </div>
            </div>

            {/* Valeur 2 */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="value-card h-100 p-4 text-center"
                style={{ background: '#f8f9fa', borderRadius: '20px', transition: 'all 0.4s ease', cursor: 'pointer' }}>
                <div className="value-icon mb-4"
                  style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', transition: 'all 0.4s ease' }}>
                  <i className="fas fa-ear-listen text-white fs-28"></i>
                </div>
                <h5 className="fw-700 text-dark mb-3">Écoute</h5>
                <p className="text-medium-gray fs-15 mb-0" style={{ lineHeight: '1.7' }}>
                  Nous collectons chaque besoin avec attention et professionnalisme.
                </p>
              </div>
            </div>

            {/* Valeur 3 */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="value-card h-100 p-4 text-center"
                style={{ background: '#f8f9fa', borderRadius: '20px', transition: 'all 0.4s ease', cursor: 'pointer' }}>
                <div className="value-icon mb-4"
                  style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', transition: 'all 0.4s ease' }}>
                  <i className="fas fa-user-friends text-white fs-28"></i>
                </div>
                <h5 className="fw-700 text-dark mb-3">Proximité</h5>
                <p className="text-medium-gray fs-15 mb-0" style={{ lineHeight: '1.7' }}>
                  Nous vous accompagnons à chaque étape de votre parcours professionnel.
                </p>
              </div>
            </div>

            {/* Valeur 4 */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
              <div className="value-card h-100 p-4 text-center"
                style={{ background: '#f8f9fa', borderRadius: '20px', transition: 'all 0.4s ease', cursor: 'pointer' }}>
                <div className="value-icon mb-4"
                  style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', transition: 'all 0.4s ease' }}>
                  <i className="fas fa-handshake text-white fs-28"></i>
                </div>
                <h5 className="fw-700 text-dark mb-3">Professionnalisme</h5>
                <p className="text-medium-gray fs-15 mb-0" style={{ lineHeight: '1.7' }}>
                  Nous agissons avec intégrité pour des résultats à la hauteur de vos attentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Modern Design */}
      <section className="py-6" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <span className="text-uppercase fw-600 ls-2px fs-13 d-inline-block mb-3" style={{ color: '#ecab23' }}>Les
                visages de RPAM</span>
              <h2 className="fw-800 text-dark mb-4">Notre <span style={{ color: '#ecab23' }}>Équipe</span></h2>
              <p className="text-medium-gray fs-17">
                Une équipe passionnée et expérimentée, dédiée à votre réussite professionnelle.
              </p>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Vianney */}
            <div className="col-lg-5 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <article className="team-card-modern h-100"
                style={{ background: '#ffffff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', transition: 'all 0.4s ease' }}>
                <div className="team-header position-relative"
                  style={{ background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', padding: '30px', textAlign: 'center' }}>
                  <div className="team-photo-wrapper"
                    style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', border: '5px solid rgba(255,255,255,0.3)', margin: '0 auto' }}>
                    <img src="/images/df82eca3-e1db-4cfe-9941-5a2300618155.jpeg" alt="Vianney NZOCHE" loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 className="fw-700 text-white mt-3 mb-1">Vianney NZOCHE</h4>
                  <p className="text-white-50 mb-0 fs-14">CEO, Consultant IT &amp; Coach professionnel</p>
                </div>
                <div className="team-body p-4">
                  <p className="text-dark-gray fs-15 mb-3" style={{ lineHeight: '1.7' }}>
                    Co-Fondateur et CEO de RPAM, il pilote la vision stratégique et accompagne nos
                    bénéficiaires via des sessions de coaching en développement professionnel.
                  </p>
                  <div className="skills-tags mb-3">
                    <span className="badge me-1 mb-1"
                      style={{ background: 'rgba(255,107,53,0.1)', color: '#ecab23', padding: '6px 12px', borderRadius: '20px', fontWeight: '500' }}>Leadership</span>
                    <span className="badge me-1 mb-1"
                      style={{ background: 'rgba(255,107,53,0.1)', color: '#ecab23', padding: '6px 12px', borderRadius: '20px', fontWeight: '500' }}>Coaching</span>
                    <span className="badge me-1 mb-1"
                      style={{ background: 'rgba(255,107,53,0.1)', color: '#ecab23', padding: '6px 12px', borderRadius: '20px', fontWeight: '500' }}>Gestion
                      IT</span>
                  </div>
                  <blockquote className="mb-4 ps-3"
                    style={{ borderLeft: '3px solid #ecab23', fontStyle: 'italic', color: '#666' }}>
                    « Je crois que chacun peut devenir maître de son avenir professionnel. »
                  </blockquote>
                  <div className="team-social d-flex gap-2">
                    <a href="https://www.linkedin.com/in/arnaud-vianney-pombou-nzoche/" target="_blank"
                      rel="noopener" aria-label="LinkedIn de Vianney"
                      style={{ width: '40px', height: '40px', background: '#0077b5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                      <i className="bi bi-linkedin text-white"></i>
                    </a>
                    <a href="https://www.facebook.com/nzoche.vianney?locale=fr_FR" target="_blank"
                      rel="noopener" aria-label="Facebook de Vianney"
                      style={{ width: '40px', height: '40px', background: '#1877f2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                      <i className="bi bi-facebook text-white"></i>
                    </a>
                  </div>
                </div>
              </article>
            </div>

            {/* Elhadj */}
            <div className="col-lg-5 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <article className="team-card-modern h-100"
                style={{ background: '#ffffff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', transition: 'all 0.4s ease' }}>
                <div className="team-header position-relative"
                  style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '30px', textAlign: 'center' }}>
                  <div className="team-photo-wrapper"
                    style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', border: '5px solid rgba(255,255,255,0.3)', margin: '0 auto' }}>
                    <img src="/images/elhadj.png" alt="Elhadj BA" loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 className="fw-700 text-white mt-3 mb-1">Elhadj BA</h4>
                  <p className="text-white-50 mb-0 fs-14">CTO, Consultant IT &amp; Expert SI</p>
                </div>
                <div className="team-body p-4">
                  <p className="text-dark-gray fs-15 mb-3" style={{ lineHeight: '1.7' }}>
                    Co-Fondateur et CTO, moteur technologique de RPAM. Supervise la conception et le développement des
                    solutions numériques pour une expérience utilisateur optimale.
                  </p>
                  <div className="skills-tags mb-3">
                    <span className="badge me-1 mb-1"
                      style={{ background: 'rgba(22,33,62,0.1)', color: '#16213e', padding: '6px 12px', borderRadius: '20px', fontWeight: '500' }}>Dev
                      logiciel</span>
                    <span className="badge me-1 mb-1"
                      style={{ background: 'rgba(22,33,62,0.1)', color: '#16213e', padding: '6px 12px', borderRadius: '20px', fontWeight: '500' }}>UX/UI</span>
                    <span className="badge me-1 mb-1"
                      style={{ background: 'rgba(22,33,62,0.1)', color: '#16213e', padding: '6px 12px', borderRadius: '20px', fontWeight: '500' }}>Gestion
                      tech</span>
                  </div>
                  <blockquote className="mb-4 ps-3"
                    style={{ borderLeft: '3px solid #16213e', fontStyle: 'italic', color: '#666' }}>
                    « La technologie catalyse le passage des ambitions aux réussites tangibles. »
                  </blockquote>
                  <div className="team-social d-flex gap-2">
                    <a href="https://www.linkedin.com/in/elhadjbirahimba/" target="_blank" rel="noopener"
                      aria-label="LinkedIn de Elhadj"
                      style={{ width: '40px', height: '40px', background: '#0077b5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                      <i className="bi bi-linkedin text-white"></i>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Before Footer */}
      <section className="py-6 position-relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center" data-aos="fade-up">
              <h2 className="fw-800 text-white mb-4 display-6">Prêt à transformer votre carrière ?</h2>
              <p className="fs-18 text-white-50 mb-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
                Rejoignez les centaines de professionnels qui ont déjà fait confiance à RPAM pour atteindre
                leurs objectifs.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link href="/booking" className="btn btn-rounded px-5 py-3 fw-600"
                  style={{ background: 'linear-gradient(135deg, #ecab23 0%, #f7931e 100%)', color: 'white', border: 'none' }}>
                  <i className="fas fa-calendar-alt me-2"></i>Prendre rendez-vous
                </Link>
                <Link href="/guidance" className="btn btn-outline-light btn-rounded px-5 py-3 fw-600">
                  <i className="fas fa-arrow-right me-2"></i>Découvrir nos services
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="position-absolute"
          style={{ top: '20%', left: '5%', width: '100px', height: '100px', background: 'rgba(255,107,53,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}>
        </div>
        <div className="position-absolute"
          style={{ bottom: '20%', right: '10%', width: '150px', height: '150px', background: 'rgba(255,107,53,0.15)', borderRadius: '50%', filter: 'blur(50px)' }}>
        </div>
      </section>
    </Layout>
  )
}
