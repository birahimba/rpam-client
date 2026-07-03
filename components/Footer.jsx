import Link from 'next/link'
import { useState } from 'react'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const r = await fetch('https://formspree.io/f/mojpjpwq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'Newsletter footer' }),
      })
      setStatus(r.ok ? 'success' : 'error')
      if (r.ok) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="d-inline-block w-100 newsletter-style-02 position-relative">
      <form onSubmit={handleSubmit} className="position-relative d-flex">
        <label htmlFor="footer-newsletter-email" className="visually-hidden">Votre adresse email</label>
        <input
          id="footer-newsletter-email"
          className="border-color-transparent-white-light bg-transparent border-radius-4px w-100 form-control lg-ps-15px required fs-16"
          type="email"
          name="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button className="btn btn-sm bg-white text-dark ms-2 border-radius-4px" type="submit" disabled={status === 'loading'} aria-label="S'abonner à la newsletter">
          {status === 'loading' ? '...' : 'OK'}
        </button>
      </form>
      {status === 'success' && (
        <p className="fs-14 mt-10px mb-0" style={{ color: '#6ee7b7' }} role="status">
          ✓ Merci ! Votre inscription est bien enregistrée.
        </p>
      )}
      {status === 'error' && (
        <p className="fs-14 mt-10px mb-0" style={{ color: '#fca5a5' }} role="status">
          Une erreur s&apos;est produite. Écrivez-nous à contact@rpam.fr
        </p>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="footer-dark bg-dark-gray pt-2 pb-2 lg-pb-35px">
      <div className="container">
        <div className="row justify-content-center fs-17 fw-300 mt-5 mb-4 md-mt-45px md-mb-45px xs-mt-35px xs-mb-35px">

          {/* Logo + Réseaux */}
          <div className="col-6 col-lg-3 order-sm-1 md-mb-40px xs-mb-30px last-paragraph-no-margin">
            <Link href="/" className="footer-logo mb-15px d-inline-block">
              <img src="/images/w-logo-rpam.png" alt="RPAM" width="217" height="50" loading="lazy" style={{ height: 'auto' }} />
            </Link>
            <p className="w-85 xl-w-95 sm-w-100"></p>
            <div className="elements-social social-icon-style-02 mt-20px lg-mt-20px">
              <ul className="small-icon light">
                <li>
                  <a className="linkedin" href="https://www.linkedin.com/company/rpam" target="_blank" rel="noopener" aria-label="RPAM sur LinkedIn">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* À propos */}
          <div className="col-6 col-lg-2 col-sm-4 xs-mb-30px order-sm-3 order-lg-2">
            <span className="fs-18 fw-400 d-block text-white mb-5px">À propos</span>
            <ul>
              <li><Link href="/about">Qui sommes-nous</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/blogs">Blog</Link></li>
              <li><Link href="/news">Actualités</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-6 col-lg-2 col-sm-4 xs-mb-30px order-sm-4 order-lg-3">
            <span className="fs-18 fw-400 d-block text-white mb-5px">Services</span>
            <ul>
              <li><Link href="/guidance">Orientation Professionnelle</Link></li>
              <li><Link href="/up-training">Développement de Compétences</Link></li>
              <li><Link href="/job-getting">Coaching à la recherche d&apos;emploi</Link></li>
            </ul>
          </div>

          {/* Guides piliers */}
          <div className="col-6 col-lg-2 col-sm-4 xs-mb-30px order-sm-4 order-lg-3">
            <span className="fs-18 fw-400 d-block text-white mb-5px">Nos guides</span>
            <ul>
              <li><Link href="/reconversion-professionnelle">Reconversion professionnelle</Link></li>
              <li><Link href="/cv-ats">Optimiser son CV (ATS)</Link></li>
              <li><Link href="/formation-ia">Se former à l&apos;IA</Link></li>
              <li><Link href="/linkedin-recruteurs">LinkedIn &amp; recruteurs</Link></li>
              <li><Link href="/blogs">Blog RPAM</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-6 col-lg-2 col-sm-4 xs-mb-30px order-sm-5 order-lg-4">
            <span className="fs-18 fw-400 d-block text-white mb-5px">Contactez-nous</span>
            <p className="mb-5px">Besoin d&apos;aide ?</p>
            <a href="mailto:contact@rpam.fr" className="text-white lh-16 d-block mb-15px">
              contact@rpam.fr
            </a>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-sm-6 md-mb-40px xs-mb-0 order-sm-2 order-lg-5">
            <span className="fs-18 fw-400 d-block text-white mb-5px">Abonnez-vous à la newsletter</span>
            <p className="mb-20px">Conseils carrière et actualités RPAM, une fois par mois.</p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="row align-items-center fs-16 fw-300">
          <div className="col-md-4 last-paragraph-no-margin order-2 order-md-1 text-center text-md-start">
            <p>&copy; Copyright {new Date().getFullYear()} <Link href="/" className="text-decoration-line-bottom text-white">RPAM</Link></p>
          </div>
          <div className="col-md-8 text-md-end order-1 order-md-2 text-center text-md-end sm-mb-10px">
            <ul className="footer-navbar sm-lh-normal">
              <li>
                <a href="/docs/Politique_de_confidentialite_RPAM_v2.pdf" className="nav-link" target="_blank" rel="noopener" aria-label="Ouvrir la Politique de confidentialité (PDF)">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="/docs/Termes_et_conditions_RPAM.pdf" className="nav-link" target="_blank" rel="noopener" aria-label="Ouvrir les Termes et conditions (PDF)">
                  Termes et conditions
                </a>
              </li>
              <li>
                <a href="/docs/Droits_d_auteur_RPAM.pdf" className="nav-link" target="_blank" rel="noopener" aria-label="Ouvrir Droits d'auteur (PDF)">
                  Droits d&apos;auteur
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
