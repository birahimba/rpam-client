const SITE_URL = 'https://www.rpam.fr'

const publisher = {
  "@type": "Organization",
  "name": "RPAM",
  "url": SITE_URL,
  "logo": { "@type": "ImageObject", "url": `${SITE_URL}/images/logo-rpam.png` },
}

/**
 * Génère le schema @graph complet pour un article de blog.
 * Inclut BlogPosting, BreadcrumbList, et FAQPage si des FAQs sont fournies.
 *
 * @param {object} opts
 * @param {string}   opts.slug          - slug de l'article (ex: "mon-article")
 * @param {string}   opts.title         - titre de l'article
 * @param {string}   opts.description   - meta description (150–160 cars)
 * @param {string}   [opts.coverImage]  - chemin relatif depuis /public (ex: "/images/blog/cover.jpg")
 * @param {string}   opts.datePublished - ISO 8601 (ex: "2026-05-16")
 * @param {string}   [opts.dateModified]- ISO 8601 (défaut = datePublished)
 * @param {string[]} [opts.keywords]    - tableau de mots-clés
 * @param {Array}    [opts.faqs]        - [{ question, answer }]
 */
export function buildArticleSchema({
  slug,
  title,
  description,
  coverImage,
  datePublished,
  dateModified,
  keywords = [],
  faqs = [],
}) {
  const url = `${SITE_URL}/blog/${slug}`
  const image = coverImage
    ? `${SITE_URL}${coverImage}`
    : `${SITE_URL}/images/og-rpam.jpg`

  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      "headline": title,
      "description": description,
      "url": url,
      "image": image,
      "datePublished": datePublished,
      "dateModified": dateModified || datePublished,
      "author": { "@type": "Organization", "name": "RPAM", "url": SITE_URL },
      "publisher": publisher,
      "mainEntityOfPage": { "@type": "WebPage", "@id": url },
      ...(keywords.length > 0 && { "keywords": keywords.join(", ") }),
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Blog",    "item": `${SITE_URL}/blogs` },
        { "@type": "ListItem", "position": 3, "name": title,     "item": url },
      ],
    },
  ]

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "mainEntity": faqs.map(({ question, answer }) => ({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": { "@type": "Answer", "text": answer },
      })),
    })
  }

  return { "@context": "https://schema.org", "@graph": graph }
}
