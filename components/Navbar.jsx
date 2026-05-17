import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Accueil', key: 'home' },
  { href: '/about', label: 'Qui sommes-nous', key: 'about' },
  { href: '/blogs', label: 'Blog', key: 'blogs' },
  { href: '/news', label: 'Actualités', key: 'news' },
]

const SERVICE_LINKS = [
  { href: '/guidance', icon: 'fa-compass', title: 'Orientation Professionnelle', desc: 'Guidance pour trouver votre voie et définir vos objectifs de carrière' },
  { href: '/up-training', icon: 'fa-chart-line', title: 'Développement de Compétences', desc: 'Up Training pour acquérir les skills demandés sur le marché' },
  { href: '/job-getting', icon: 'fa-briefcase', title: 'Coaching Recherche d\'Emploi', desc: 'Job Getting pour décrocher le poste de vos rêves' },
]

export default function Navbar({ activePage }) {
  const isActive = (key) => activePage === key ? ' active' : ''
  const isServices = ['services', 'guidance', 'up-training', 'job-getting'].includes(activePage)
  const [menuOpen, setMenuOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const menuRef = useRef(null)

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu = () => { setMenuOpen(false); setSubmenuOpen(false) }

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef}>
      {/* Main Navbar */}
      <nav className="navbar-modern" id="mainNavbar">
        <div className="container-fluid">
          <div className="navbar-container">

            {/* Logo */}
            <Link href="/" className="navbar-logo">
              <img src="/images/logo-rpam.png" alt="RPAM" width="217" height="50" fetchPriority="high" decoding="async" />
            </Link>

            {/* Navigation Desktop */}
            <ul className="nav-menu-desktop">
              <li className="nav-item-modern">
                <Link href="/" className={`nav-link-modern${isActive('home')}`}>Accueil</Link>
              </li>
              <li className="nav-item-modern">
                <Link href="/about" className={`nav-link-modern${isActive('about')}`}>Qui sommes-nous</Link>
              </li>
              <li className="nav-item-modern">
                <Link href="/services" className={`nav-link-modern${isServices ? ' active' : ''}`}>
                  Nos Services
                  <i className="fas fa-chevron-down dropdown-arrow"></i>
                </Link>
                {/* Mega Menu */}
                <div className="mega-menu">
                  <div className="mega-menu-grid">
                    {SERVICE_LINKS.map((s) => (
                      <Link key={s.href} href={s.href} className="mega-menu-item">
                        <div className="mega-menu-icon">
                          <i className={`fas ${s.icon} text-white`} style={{ fontSize: '20px' }}></i>
                        </div>
                        <div className="mega-menu-content">
                          <h4>{s.title}</h4>
                          <p>{s.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
              <li className="nav-item-modern">
                <Link href="/blogs" className={`nav-link-modern${isActive('blogs')}`}>Blog</Link>
              </li>
              <li className="nav-item-modern">
                <Link href="/news" className={`nav-link-modern${isActive('news')}`}>Actualités</Link>
              </li>
            </ul>

            {/* CTA Desktop */}
            <div className="navbar-cta">
              <a href="https://rpam-connect.vercel.app/" target="_blank" rel="noopener" className="btn-connect-modern">
                <i className="fas fa-sign-in-alt"></i>
                Se connecter
              </a>
              <Link href="/booking" className="btn-cta-modern">
                <i className="fas fa-calendar-alt"></i>
                Réserver un rendez-vous
              </Link>
            </div>

            {/* Hamburger */}
            <div className={`hamburger-modern${menuOpen ? ' active' : ''}`} id="hamburgerBtn" onClick={toggleMenu} aria-label="Menu" role="button">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu-modern${menuOpen ? ' active' : ''}`} id="mobileMenu">
        <ul className="mobile-nav-list">
          <li className="mobile-nav-item">
            <Link href="/" className={`mobile-nav-link${isActive('home')}`} onClick={closeMenu}>Accueil</Link>
          </li>
          <li className="mobile-nav-item">
            <Link href="/about" className={`mobile-nav-link${isActive('about')}`} onClick={closeMenu}>Qui sommes-nous</Link>
          </li>
          <li className="mobile-nav-item">
            <span className={`mobile-nav-link${isServices ? ' active' : ''}`} id="servicesToggle" onClick={() => setSubmenuOpen(prev => !prev)} style={{ cursor: 'pointer' }}>
              Nos Services
              <i className={`fas fa-chevron-down arrow${submenuOpen ? ' rotated' : ''}`}></i>
            </span>
            <div className={`mobile-submenu${submenuOpen ? ' active' : ''}`} id="servicesSubmenu">
              <ul className="mobile-submenu-list">
                {SERVICE_LINKS.map((s) => (
                  <li key={s.href} className="mobile-submenu-item">
                    <Link href={s.href} className="mobile-submenu-link" onClick={closeMenu}>
                      <i className={`fas ${s.icon} text-white`} style={{ fontSize: '20px' }}></i>
                      <div className="submenu-text">
                        <h5>{s.title}</h5>
                        <span>{s.href.replace('/', '')}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="mobile-nav-item">
            <Link href="/blogs" className={`mobile-nav-link${isActive('blogs')}`} onClick={closeMenu}>Blog</Link>
          </li>
          <li className="mobile-nav-item">
            <Link href="/news" className={`mobile-nav-link${isActive('news')}`} onClick={closeMenu}>Actualités</Link>
          </li>
        </ul>

        {/* Mobile CTA */}
        <div className="mobile-cta">
          <a href="https://rpam-connect.vercel.app/" target="_blank" rel="noopener"
            className="btn-connect-modern"
            style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}>
            <i className="fas fa-sign-in-alt"></i>
            Se connecter
          </a>
          <Link href="/booking" className="btn-cta-modern">
            <i className="fas fa-calendar-alt"></i>
            Réserver un rendez-vous
          </Link>
          <div className="mobile-contact-info">
            <a href="mailto:contact@rpam.fr">
              <i className="fas fa-envelope"></i>
              contact@rpam.fr
            </a>
            <a href="#">
              <i className="fas fa-map-marker-alt"></i>
              Paris, France
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
