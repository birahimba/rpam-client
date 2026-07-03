// Script de génération du sitemap
// Usage: node generate-sitemap.js
// Ajouter manuellement les articles dans BLOG_ARTICLES après chaque publication

const fs = require('fs');

const SITE_URL = 'https://www.rpam.fr';

const STATIC_PAGES = [
    { loc: '/',                              lastmod: '2026-05-11', changefreq: 'weekly',  priority: '1.0' },
    { loc: '/about',                         lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.9' },
    { loc: '/services',                      lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.85' },
    { loc: '/guidance',                      lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.85' },
    { loc: '/up-training',                   lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.85' },
    { loc: '/job-getting',                   lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.85' },
    { loc: '/blogs',                         lastmod: '2026-05-11', changefreq: 'weekly',  priority: '0.8' },
    { loc: '/news',                          lastmod: '2026-05-11', changefreq: 'weekly',  priority: '0.8' },
    { loc: '/booking',                       lastmod: '2026-05-11', changefreq: 'monthly', priority: '0.7' },
    // Pages piliers SEO
    { loc: '/reconversion-professionnelle',  lastmod: '2026-07-03', changefreq: 'monthly', priority: '0.9' },
    { loc: '/cv-ats',                        lastmod: '2026-07-03', changefreq: 'monthly', priority: '0.9' },
    { loc: '/formation-ia',                  lastmod: '2026-07-03', changefreq: 'monthly', priority: '0.9' },
    { loc: '/linkedin-recruteurs',           lastmod: '2026-07-03', changefreq: 'monthly', priority: '0.9' },
];

// Ajouter ici chaque nouvel article publié
// { loc: '/blog/slug-de-larticle', lastmod: 'YYYY-MM-DD', priority: '0.75' }
const BLOG_ARTICLES = [
    { loc: '/blog/optimiser-profil-linkedin-recruteurs-2025', lastmod: '2026-07-03', priority: '0.8' },
    { loc: '/blog/se-former-intelligence-artificielle-travail-2025', lastmod: '2026-07-03', priority: '0.8' },
    { loc: '/blog/cv-ats-2025', lastmod: '2026-07-03', priority: '0.8' },
    { loc: '/blog/reconversion-professionnelle-30-40-50-ans', lastmod: '2026-07-03', priority: '0.8' },
];

function urlEntry({ loc, lastmod, changefreq = 'monthly', priority = '0.75' }) {
    return `    <url>
        <loc>${SITE_URL}${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
}

function generateSitemap() {
    const staticEntries = STATIC_PAGES.map(urlEntry).join('\n\n');
    const blogEntries = BLOG_ARTICLES.map(urlEntry).join('\n\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticEntries}${BLOG_ARTICLES.length > 0 ? '\n\n    <!-- Articles de blog -->\n' + blogEntries : ''}

</urlset>`;

    fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');
    console.log(`public/sitemap.xml mis à jour — ${STATIC_PAGES.length} pages + ${BLOG_ARTICLES.length} articles`);
}

generateSitemap();
