// Construction du sitemap XML.
//
// Les pages éditoriales fixes sont listées ici ; les articles sont fournis par
// l'appelant (route pages/sitemap.xml.js) à partir de l'API rpam-connect, afin
// qu'un article publié ou dépublié depuis le back-office soit reflété sans
// redéploiement et sans intervention manuelle.

import { STATIC_ARTICLE_SLUGS } from './blog-routes'

export const SITE_URL = 'https://www.rpam.fr'

// lastmod des pages fixes : à remonter lorsqu'une page est réellement retravaillée.
// Une date gonflée à chaque déploiement décrédibilise le signal auprès de Google.
const STATIC_PAGES = [
  { loc: '/',                             lastmod: '2026-05-11', changefreq: 'weekly',  priority: '1.0' },
  { loc: '/about',                        lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.9' },
  { loc: '/services',                     lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.85' },
  { loc: '/guidance',                     lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.85' },
  { loc: '/up-training',                  lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.85' },
  { loc: '/job-getting',                  lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.85' },
  { loc: '/blogs',                        lastmod: '2026-05-11', changefreq: 'weekly',  priority: '0.8' },
  { loc: '/news',                         lastmod: '2026-05-11', changefreq: 'weekly',  priority: '0.8' },
  { loc: '/booking',                      lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.7' },
  // Pages piliers SEO
  { loc: '/reconversion-professionnelle', lastmod: '2026-07-03', changefreq: 'monthly', priority: '0.9' },
  { loc: '/cv-ats',                       lastmod: '2026-07-03', changefreq: 'monthly', priority: '0.9' },
  { loc: '/formation-ia',                 lastmod: '2026-07-03', changefreq: 'monthly', priority: '0.9' },
  { loc: '/linkedin-recruteurs',          lastmod: '2026-07-03', changefreq: 'monthly', priority: '0.9' },
]

const XML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, char => XML_ESCAPES[char])
}

/** Normalise une date d'article (ISO complet ou non) en YYYY-MM-DD, ou null si illisible. */
function toIsoDate(value) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10)
}

function urlEntry({ loc, lastmod, changefreq = 'monthly', priority = '0.75' }) {
  return [
    '    <url>',
    `        <loc>${escapeXml(SITE_URL + loc)}</loc>`,
    ...(lastmod ? [`        <lastmod>${lastmod}</lastmod>`] : []),
    `        <changefreq>${changefreq}</changefreq>`,
    `        <priority>${priority}</priority>`,
    '    </url>',
  ].join('\n')
}

/**
 * Transforme les cartes d'articles de l'API en entrées de sitemap.
 * Les slugs encore servis par une page dédiée sont ajoutés s'ils manquent :
 * la page existe en production, elle doit figurer dans le sitemap.
 */
function blogEntries(articles) {
  const known = new Map()

  for (const article of articles) {
    if (!article || !article.slug || known.has(article.slug)) continue
    known.set(article.slug, {
      loc: `/blog/${encodeURIComponent(article.slug)}`,
      lastmod: toIsoDate(article.dateModified || article.date),
      changefreq: 'monthly',
      priority: '0.8',
    })
  }

  for (const slug of STATIC_ARTICLE_SLUGS) {
    if (known.has(slug)) continue
    known.set(slug, { loc: `/blog/${encodeURIComponent(slug)}`, lastmod: null, changefreq: 'monthly', priority: '0.8' })
  }

  return [...known.values()]
}

/** Retourne le document sitemap complet, prêt à être servi avec le Content-Type XML. */
export function buildSitemap(articles = []) {
  const entries = [...STATIC_PAGES, ...blogEntries(articles)].map(urlEntry).join('\n\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entries}

</urlset>
`
}
