import Link from 'next/link'
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

export default function Blogs() {
  return (
    <Layout activePage="blogs">
      <SEOHead
        title="Blog RPAM – Articles sur l'orientation professionnelle, le coaching et le développement de compétences"
        description="Découvrez les articles du blog RPAM : conseils en orientation professionnelle, développement de compétences et coaching à la recherche d'emploi. Restez informé et inspiré."
        canonical="https://www.rpam.fr/blogs"
      />

      {/* Hero Section Blog */}
      <section className="blog-hero-section">
        <div className="blog-hero-bg"></div>
        <div className="blog-hero-overlay"></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <span className="blog-hero-badge" data-aos="fade-down" data-aos-duration="600">
                <i className="feather icon-feather-book-open"></i> Notre Blog
              </span>
              <h1 className="blog-hero-title" data-aos="fade-up" data-aos-duration="800">
                Découvrez nos dernières <span className="text-gradient">inspirations</span>
              </h1>
              <p className="blog-hero-subtitle" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                Plongez dans nos articles pour rester informé, inspiré et connecté à nos idées sur l&apos;orientation
                professionnelle, le développement de compétences et la recherche d&apos;emploi.
              </p>
              <div className="blog-hero-stats" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                <div className="stat-item">
                  <i className="feather icon-feather-file-text"></i>
                  <span>Articles</span>
                  <small>Orientation &amp; Coaching</small>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <i className="feather icon-feather-clock"></i>
                  <span>5-10</span>
                  <small>Min de lecture</small>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <i className="feather icon-feather-award"></i>
                  <span>Experts</span>
                  <small>RPAM</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
      </section>

      {/* Grille d'articles */}
      <section className="pt-5 pb-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            {/* Articles */}
            <div className="col-12 col-lg-8">
              <div className="blog-grid-modern">

                <article className="blog-card-modern" data-aos="fade-up" data-aos-duration="600">
                  <div className="blog-card-inner">
                    <div className="blog-card-image">
                      <Link href="/blog/reconversion-professionnelle-30-40-50-ans">
                        <img
                          src="/images/blog/reconversion-professionnelle-cover.jpg"
                          alt="Reconversion professionnelle à 30, 40 ou 50 ans"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </Link>
                      <span className="blog-card-category">Reconversion</span>
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        <span><i className="feather icon-feather-calendar"></i> 11 mai 2025</span>
                        <span><i className="feather icon-feather-clock"></i> 10 min de lecture</span>
                      </div>
                      <h2 className="blog-card-title">
                        <Link href="/blog/reconversion-professionnelle-30-40-50-ans">
                          Reconversion professionnelle à 30, 40 ou 50 ans : par où commencer en 2025 ?
                        </Link>
                      </h2>
                      <p className="blog-card-excerpt">
                        Guide complet pour réussir votre reconversion professionnelle à tout âge. Étapes clés, financement CPF, secteurs porteurs et conseils pour changer de métier avec succès.
                      </p>
                      <div className="blog-card-footer">
                        <Link href="/blog/reconversion-professionnelle-30-40-50-ans" className="read-more-btn">
                          Lire l&apos;article <i className="feather icon-feather-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>

              </div>
            </div>

            {/* Sidebar */}
            <aside className="col-12 col-lg-4">
              <div className="sidebar-modern">

                {/* Newsletter */}
                <div className="sidebar-card newsletter-widget" data-aos="fade-left" data-aos-duration="600">
                  <h3 className="sidebar-card-title">
                    <i className="feather icon-feather-mail"></i> Newsletter
                  </h3>
                  <p>Recevez nos meilleurs conseils carrière directement dans votre boîte mail.</p>
                  <form className="newsletter-form" action="https://formspree.io/f/contact@rpam.fr" method="post">
                    <input type="email" name="email" placeholder="Votre adresse email" required />
                    <button type="submit">
                      <i className="feather icon-feather-send"></i> S&apos;abonner
                    </button>
                  </form>
                </div>

                {/* Thématiques */}
                <div className="sidebar-card" data-aos="fade-left" data-aos-duration="600" data-aos-delay="100">
                  <h3 className="sidebar-card-title">
                    <i className="feather icon-feather-hash"></i> Thématiques
                  </h3>
                  <div className="tags-cloud-modern">
                    <Link href="/blogs" className="tag-cloud-item">#Reconversion</Link>
                    <Link href="/blogs" className="tag-cloud-item">#BilanDeCompétences</Link>
                    <Link href="/blogs" className="tag-cloud-item">#CoachingEmploi</Link>
                    <Link href="/blogs" className="tag-cloud-item">#CPF</Link>
                    <Link href="/blogs" className="tag-cloud-item">#Formation</Link>
                    <Link href="/blogs" className="tag-cloud-item">#Carrière</Link>
                  </div>
                </div>

                {/* Suivez-nous */}
                <div className="sidebar-card" data-aos="fade-left" data-aos-duration="600" data-aos-delay="200">
                  <h3 className="sidebar-card-title">
                    <i className="feather icon-feather-users"></i> Suivez-nous
                  </h3>
                  <div className="social-links-grid">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-link-item facebook" title="Facebook">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link-item linkedin" title="LinkedIn">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link-item twitter" title="Twitter">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link-item instagram" title="Instagram">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="pt-5 pb-5 bg-very-light-gray">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-12 text-center">
              <h2 className="fw-700 text-dark-gray ls-minus-1px mb-2">Prêt à passer à l&apos;action ?</h2>
              <p className="text-medium-gray fs-17">Nos articles vous inspirent — nos experts vous accompagnent concrètement.</p>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-md-4">
              <Link href="/guidance" className="d-block text-decoration-none h-100">
                <div className="p-4 bg-white border-radius-12px h-100 shadow-extra-small text-center">
                  <div className="mb-3"><i className="fas fa-compass text-base-color" style={{ fontSize: '2rem' }}></i></div>
                  <h3 className="fw-600 fs-18 text-dark-gray mb-2">Guidance</h3>
                  <p className="text-medium-gray fs-15 mb-3">Bilan de compétences, orientation professionnelle et plan d&apos;action pour votre reconversion.</p>
                  <span className="text-base-color fw-600 fs-14">Découvrir <i className="fas fa-arrow-right ms-1"></i></span>
                </div>
              </Link>
            </div>
            <div className="col-12 col-md-4">
              <Link href="/up-training" className="d-block text-decoration-none h-100">
                <div className="p-4 bg-white border-radius-12px h-100 shadow-extra-small text-center">
                  <div className="mb-3"><i className="fas fa-chart-line text-base-color" style={{ fontSize: '2rem' }}></i></div>
                  <h3 className="fw-600 fs-18 text-dark-gray mb-2">Up Training</h3>
                  <p className="text-medium-gray fs-15 mb-3">Formations sur mesure pour développer les compétences techniques et comportementales demandées.</p>
                  <span className="text-base-color fw-600 fs-14">Découvrir <i className="fas fa-arrow-right ms-1"></i></span>
                </div>
              </Link>
            </div>
            <div className="col-12 col-md-4">
              <Link href="/job-getting" className="d-block text-decoration-none h-100">
                <div className="p-4 bg-white border-radius-12px h-100 shadow-extra-small text-center">
                  <div className="mb-3"><i className="fas fa-briefcase text-base-color" style={{ fontSize: '2rem' }}></i></div>
                  <h3 className="fw-600 fs-18 text-dark-gray mb-2">Job Getting</h3>
                  <p className="text-medium-gray fs-15 mb-3">Coaching emploi, optimisation CV et LinkedIn, préparation aux entretiens d&apos;embauche.</p>
                  <span className="text-base-color fw-600 fs-14">Découvrir <i className="fas fa-arrow-right ms-1"></i></span>
                </div>
              </Link>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <Link href="/booking" className="btn btn-base-color btn-rounded btn-medium text-transform-none">
                Réserver une consultation gratuite
              </Link>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}
