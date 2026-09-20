import { useEffect, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import Link from 'next/link'
import Layout from '../../components/Layout'
import SEOHead from '../../components/SEOHead'
import { buildArticleSchema } from '../../lib/seo'
import { fetchArticles, fetchArticleBySlug } from '../../lib/blog-api'
import { STATIC_ARTICLE_SLUGS } from '../../lib/blog-routes'

// Revalidation ISR : un article publié dans le back-office apparaît sans redéploiement.
const REVALIDATE_SECONDS = 300

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[éèêëẽ]/g, 'e').replace(/[àâäã]/g, 'a')
    .replace(/[ùûüũ]/g, 'u').replace(/[îï]/g, 'i')
    .replace(/[ôöõ]/g, 'o').replace(/ç/g, 'c').replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

export async function getStaticPaths() {
  const articles = await fetchArticles()
  return {
    paths: articles
      .filter(article => !STATIC_ARTICLE_SLUGS.includes(article.slug))
      .map(article => ({ params: { slug: article.slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const article = await fetchArticleBySlug(params.slug)
  if (!article) return { notFound: true, revalidate: REVALIDATE_SECONDS }

  const { content: rawContent = '', faqs = [], pillarSlug = null, ...frontmatter } = article

  // Extraction des h2 pour le sommaire (sur le Markdown brut, avant rendu)
  const toc = []
  rawContent.split('\n').forEach(line => {
    const m = line.match(/^## (.+)/)
    if (m) {
      const text = m[1].trim().replace(/\*\*/g, '').replace(/`/g, '')
      toc.push({ id: slugify(text), text })
    }
  })

  // Rendu Markdown → HTML, puis assainissement : la source est désormais une base
  // éditable depuis un back-office et non plus un fichier versionné dans Git.
  let content = DOMPurify.sanitize(marked(rawContent))

  // Injection des id sur les h2 (dans l'ordre, en miroir du tableau toc)
  let cursor = 0
  content = content.replace(/<h2>(.*?)<\/h2>/g, (match, inner) => {
    const entry = toc[cursor++]
    return entry ? `<h2 id="${entry.id}">${inner}</h2>` : match
  })

  return {
    props: { frontmatter, content, slug: params.slug, toc, faqs, pillar: buildPillar(pillarSlug) },
    revalidate: REVALIDATE_SECONDS,
  }
}

// Libellés d'affichage des pages piliers. Le lien lui-même vient de pillarSlug
// (API) ; seul le texte reste ici, l'API n'exposant pas de titre de pilier.
const PILLAR_LABELS = {
  'reconversion-professionnelle': 'Reconversion professionnelle',
  'cv-ats': 'CV & ATS',
  'formation-ia': "Se former à l'IA",
  'linkedin-recruteurs': 'LinkedIn pour les recruteurs',
}

function buildPillar(pillarSlug) {
  if (!pillarSlug) return null
  const label = PILLAR_LABELS[pillarSlug] || pillarSlug.replace(/-/g, ' ')
  return { href: `/${pillarSlug}`, label: `Guide complet : ${label}` }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="article-faq-item">
      <button
        type="button"
        className="article-faq-question"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {question}
        <i className={`feather icon-feather-chevron-${open ? 'up' : 'down'}`} aria-hidden="true"></i>
      </button>
      {open && (
        <div className="article-faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function BlogPost({ frontmatter, content, slug, toc, faqs, pillar }) {
  const schema = buildArticleSchema({
    slug,
    title: frontmatter.title,
    description: frontmatter.excerpt,
    coverImage: frontmatter.coverImage,
    datePublished: frontmatter.date,
    dateModified: frontmatter.dateModified,
    keywords: frontmatter.keywords || [],
    faqs,
  })

  // Reading progress bar
  useEffect(() => {
    const bar = document.getElementById('reading-progress')
    if (!bar) return
    const update = () => {
      const article = document.querySelector('.article-content')
      if (!article) return
      const top = article.getBoundingClientRect().top + window.scrollY
      const height = article.offsetHeight
      const scrolled = window.scrollY - top
      const pct = Math.min(Math.max((scrolled / height) * 100, 0), 100)
      bar.style.width = pct + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <Layout activePage="blogs">
      <SEOHead
        title={`${frontmatter.title} | RPAM`}
        description={frontmatter.excerpt}
        canonical={`https://www.rpam.fr/blog/${slug}`}
        ogImage={frontmatter.coverImage ? `https://www.rpam.fr${frontmatter.coverImage}` : undefined}
        ogType="article"
        schema={schema}
      />

      {/* Reading progress bar */}
      <div className="reading-progress-track">
        <div id="reading-progress" className="reading-progress-bar" />
      </div>

      <section className="pt-0 pb-0 bg-very-light-gray top-space-margin">
        <div className="container">
          <div className="row">

            {/* ── Article ────────────────────────────────── */}
            <div className="col-lg-8">
              <article className="article-container">

                <Link href="/blogs" className="back-to-blog">
                  <i className="feather icon-feather-arrow-left"></i>
                  Retour aux articles
                </Link>

                {/* Header */}
                <div className="article-header">
                  {frontmatter.tags && (
                    <div className="article-tags mb-3">
                      {frontmatter.tags.map(tag => (
                        <span key={tag} className="article-tag-badge">{tag}</span>
                      ))}
                    </div>
                  )}

                  <h1 className="article-title">{frontmatter.title}</h1>

                  {frontmatter.excerpt && (
                    <p className="article-lead">{frontmatter.excerpt}</p>
                  )}

                  <div className="article-meta">
                    {frontmatter.date && (
                      <span><i className="feather icon-feather-calendar"></i>{formatDate(frontmatter.date)}</span>
                    )}
                    {frontmatter.readTime && (
                      <span><i className="feather icon-feather-clock"></i>{frontmatter.readTime} min de lecture</span>
                    )}
                    <span><i className="feather icon-feather-user"></i>RPAM</span>
                  </div>

                  {frontmatter.coverImage && (
                    <img
                      src={frontmatter.coverImage}
                      alt={frontmatter.title}
                      className="article-cover"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  )}
                </div>

                {/* Table of contents */}
                {toc.length >= 3 && (
                  <nav className="article-toc" aria-label="Sommaire">
                    <div className="article-toc-header">
                      <i className="feather icon-feather-list"></i>
                      Dans cet article
                    </div>
                    <ol className="article-toc-list">
                      {toc.map(({ id, text }) => (
                        <li key={id}>
                          <a href={`#${id}`}>{text}</a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                {/* Content */}
                <div
                  className="article-content text-black"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Author card */}
                <div className="author-card">
                  <img src="/images/vianney.jpg" alt="Équipe RPAM" className="author-avatar" onError={(e) => { e.target.style.display = 'none' }} />
                  <div className="author-info">
                    <div className="author-name">Équipe RPAM</div>
                    <p className="author-bio">
                      Experts en accompagnement professionnel — bilan de compétences, développement de compétences, coaching emploi. Nous aidons les actifs à trouver leur voie et atteindre leurs objectifs.
                    </p>
                    <Link href="/about" className="author-link">
                      En savoir plus <i className="feather icon-feather-arrow-right"></i>
                    </Link>
                  </div>
                </div>

                {/* FAQ */}
                {faqs.length > 0 && (
                  <section className="article-faq" aria-labelledby="article-faq-title">
                    <h2 id="article-faq-title" className="article-faq-title">Questions fréquentes</h2>
                    {faqs.map(({ question, answer }) => (
                      <FaqItem key={question} question={question} answer={answer} />
                    ))}
                  </section>
                )}

                {/* CTA */}
                <div className="article-cta-box">
                  <div className="article-cta-icon">
                    <i className="feather icon-feather-star"></i>
                  </div>
                  <h3>Besoin d&apos;un accompagnement personnalisé ?</h3>
                  <p>Nos conseillers RPAM sont là pour vous aider à franchir chaque étape de votre parcours professionnel.</p>
                  <Link href="/booking" className="article-cta-btn">
                    <i className="feather icon-feather-calendar"></i>
                    Réserver ma consultation gratuite
                  </Link>
                </div>

                {/* Share */}
                <div className="article-share-row">
                  <span className="article-share-label">Partager cet article :</span>
                  <div className="article-share-btns">
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.rpam.fr/blog/${slug}`} className="share-btn share-btn--linkedin" target="_blank" rel="noopener noreferrer" aria-label="Partager sur LinkedIn">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=https://www.rpam.fr/blog/${slug}&text=${encodeURIComponent(frontmatter.title)}`} className="share-btn share-btn--twitter" target="_blank" rel="noopener noreferrer" aria-label="Partager sur Twitter">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.rpam.fr/blog/${slug}`} className="share-btn share-btn--facebook" target="_blank" rel="noopener noreferrer" aria-label="Partager sur Facebook">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </div>
                </div>

              </article>
            </div>

            {/* ── Sidebar ─────────────────────────────────── */}
            <aside className="col-lg-4 top-space-margin">
              <div className="sidebar-sticky" style={{ position: 'sticky', top: '100px' }}>

                {pillar && (
                  <div className="sidebar-pillar-widget">
                    <span className="sidebar-pillar-label">Guide associé</span>
                    <p className="sidebar-pillar-desc">Approfondissez ce sujet avec notre guide complet.</p>
                    <Link href={pillar.href} className="sidebar-pillar-link">
                      <i className="fas fa-book-open"></i>
                      {pillar.label}
                      <i className="fas fa-arrow-right" style={{ marginLeft: 'auto' }}></i>
                    </Link>
                  </div>
                )}

                <div className="sidebar-widget">
                  <h3 className="sidebar-title">À propos de RPAM</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.7, margin: '0 0 16px' }}>
                    RPAM accompagne les actifs dans leurs transitions professionnelles : bilan de compétences, développement de compétences et coaching emploi.
                  </p>
                  <Link href="/booking" className="sidebar-cta-btn">
                    Consultation gratuite
                  </Link>
                </div>

                <div className="sidebar-widget">
                  <h3 className="sidebar-title">Nos services</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      { href: '/guidance',    icon: 'fa-compass',    label: 'Orientation Professionnelle' },
                      { href: '/up-training', icon: 'fa-chart-line', label: 'Développement de Compétences' },
                      { href: '/job-getting', icon: 'fa-briefcase',  label: "Coaching Recherche d'Emploi" },
                    ].map(({ href, icon, label }, i, arr) => (
                      <li key={href} style={{ marginBottom: i < arr.length - 1 ? '12px' : 0, paddingBottom: i < arr.length - 1 ? '12px' : 0, borderBottom: i < arr.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                        <Link href={href} style={{ color: '#333', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className={`fas ${icon}`} style={{ color: '#005153', width: '16px' }}></i>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {frontmatter.tags && (
                  <div className="sidebar-widget">
                    <h3 className="sidebar-title">Thématiques</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {frontmatter.tags.map(tag => (
                        <span key={tag} style={{ background: '#f0f9f9', color: '#005153', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </aside>

          </div>
        </div>
      </section>
    </Layout>
  )
}
