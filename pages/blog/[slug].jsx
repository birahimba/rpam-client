import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from '../../components/Layout'
import SEOHead from '../../components/SEOHead'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export async function getStaticPaths() {
  if (!fs.existsSync(BLOG_DIR)) return { paths: [], fallback: false }
  const slugs = fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => ({ params: { slug: f.replace('.md', '') } }))
  return { paths: slugs, fallback: false }
}

export async function getStaticProps({ params }) {
  const filePath = path.join(BLOG_DIR, `${params.slug}.md`)
  if (!fs.existsSync(filePath)) return { notFound: true }
  const { data: frontmatter, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  return { props: { frontmatter, content, slug: params.slug } }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPost({ frontmatter, content, slug }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "description": frontmatter.excerpt,
    "url": `https://www.rpam.fr/blog/${slug}`,
    "image": frontmatter.coverImage ? `https://www.rpam.fr${frontmatter.coverImage}` : undefined,
    "datePublished": frontmatter.date,
    "author": { "@type": "Organization", "name": "RPAM", "url": "https://www.rpam.fr" },
    "publisher": {
      "@type": "Organization",
      "name": "RPAM",
      "logo": { "@type": "ImageObject", "url": "https://www.rpam.fr/images/logo-rpam.png" }
    }
  }

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
                  {frontmatter.coverImage && (
                    <img
                      src={frontmatter.coverImage}
                      alt={frontmatter.title}
                      className="article-cover"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  )}
                  {frontmatter.tags && (
                    <div className="article-tags mb-3">
                      {frontmatter.tags.map(tag => (
                        <span key={tag} className="badge" style={{ background: 'var(--base-color,#005153)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', marginRight: '6px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1 className="article-title">{frontmatter.title}</h1>
                  <div className="article-meta">
                    {frontmatter.date && <span><i className="feather icon-feather-calendar"></i> {formatDate(frontmatter.date)}</span>}
                    {frontmatter.readTime && <span><i className="feather icon-feather-clock"></i> {frontmatter.readTime} min de lecture</span>}
                    <span><i className="feather icon-feather-user"></i> RPAM</span>
                  </div>
                </div>

                <div
                  className="article-content text-black"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* CTA Box */}
                <div style={{ background: 'linear-gradient(135deg,#005153,#007a7c)', borderRadius: '16px', padding: '40px', textAlign: 'center', margin: '40px 0' }}>
                  <h3 style={{ color: '#fff', marginBottom: '12px' }}>Besoin d&apos;un accompagnement personnalisé ?</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '24px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
                    Nos conseillers RPAM sont là pour vous aider à franchir chaque étape de votre parcours professionnel.
                  </p>
                  <Link href="/booking" style={{ display: 'inline-block', background: '#fff', color: '#005153', fontWeight: 700, padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', fontSize: '1rem' }}>
                    <i className="feather icon-feather-calendar" style={{ marginRight: '8px' }}></i>
                    Réserver ma consultation gratuite
                  </Link>
                </div>

                {/* Partage */}
                <div className="article-reactions" style={{ marginTop: '40px' }}>
                  <div className="article-share">
                    <span style={{ color: '#666', fontSize: '0.9rem', marginRight: '12px' }}>Partager :</span>
                    <a href={`https://twitter.com/intent/tweet?url=https://www.rpam.fr/blog/${slug}&text=${encodeURIComponent(frontmatter.title)}`} className="share-btn" target="_blank" rel="noopener noreferrer" title="Partager sur Twitter">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.rpam.fr/blog/${slug}`} className="share-btn" target="_blank" rel="noopener noreferrer" title="Partager sur LinkedIn">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.rpam.fr/blog/${slug}`} className="share-btn" target="_blank" rel="noopener noreferrer" title="Partager sur Facebook">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
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
                    {[
                      { href: '/guidance', icon: 'fa-compass', label: 'Orientation Professionnelle' },
                      { href: '/up-training', icon: 'fa-chart-line', label: 'Développement de Compétences' },
                      { href: '/job-getting', icon: 'fa-briefcase', label: 'Coaching Recherche d\'Emploi' },
                    ].map(({ href, icon, label }, i) => (
                      <li key={href} style={{ marginBottom: i < 2 ? '12px' : 0, paddingBottom: i < 2 ? '12px' : 0, borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
                        <Link href={href} style={{ color: '#333', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className={`fas ${icon}`} style={{ color: '#005153', width: '16px' }}></i>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {frontmatter.tags && (
                  <div className="sidebar-widget" style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                    <h3 className="sidebar-title" style={{ fontSize: '1rem', fontWeight: 700, color: '#333', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #005153' }}>Thématiques</h3>
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
