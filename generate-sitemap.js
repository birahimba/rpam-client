// Script de génération du sitemap
// Usage: node generate-sitemap.js
// À relancer après chaque publication d'article sur Hashnode

const fs = require('fs');

const HASHNODE_HOST = 'rpam.hashnode.dev';
const SITE_URL = 'https://www.rpam.fr';

const STATIC_PAGES = [
    { loc: '/',           lastmod: '2026-01-24', changefreq: 'weekly',  priority: '1.0' },
    { loc: '/about',      lastmod: '2026-01-24', changefreq: 'monthly', priority: '0.9' },
    { loc: '/guidance',   lastmod: '2026-01-24', changefreq: 'monthly', priority: '0.85' },
    { loc: '/up-training',lastmod: '2026-01-24', changefreq: 'monthly', priority: '0.85' },
    { loc: '/job-getting',lastmod: '2026-01-24', changefreq: 'monthly', priority: '0.85' },
    { loc: '/blogs',      lastmod: '2026-02-08', changefreq: 'weekly',  priority: '0.8' },
    { loc: '/news',       lastmod: '2026-01-24', changefreq: 'weekly',  priority: '0.8' },
    { loc: '/booking',    lastmod: '2026-01-24', changefreq: 'monthly', priority: '0.7' },
];

async function fetchAllPosts() {
    const query = `
        query {
            publication(host: "${HASHNODE_HOST}") {
                posts(first: 50) {
                    edges {
                        node {
                            slug
                            publishedAt
                        }
                    }
                }
            }
        }
    `;

    const response = await fetch('https://gql.hashnode.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    return data.data?.publication?.posts?.edges || [];
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
    return `    <url>
        <loc>${SITE_URL}${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
}

async function generateSitemap() {
    console.log('Récupération des articles Hashnode...');
    const posts = await fetchAllPosts();
    console.log(`${posts.length} article(s) trouvé(s)`);

    const staticEntries = STATIC_PAGES.map(urlEntry).join('\n\n');

    const blogEntries = posts.map(({ node: post }) => {
        const lastmod = post.publishedAt.split('T')[0];
        return urlEntry({
            loc: `/blog-post?slug=${post.slug}`,
            lastmod,
            changefreq: 'monthly',
            priority: '0.75'
        });
    }).join('\n\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticEntries}

    <!-- Articles de blog (${posts.length} articles) -->
${blogEntries}

</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
    console.log('sitemap.xml mis à jour avec succès');
}

generateSitemap().catch(console.error);
