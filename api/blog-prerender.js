export default async function handler(req) {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');

    if (!slug || !/^[a-zA-Z0-9-_]+$/.test(slug) || slug.length > 200) {
        return new Response('Not found', { status: 404 });
    }

    try {
        const query = `
            query Post {
                publication(host: "rpam.hashnode.dev") {
                    post(slug: "${slug.replace(/"/g, '\\"')}") {
                        title
                        brief
                        slug
                        coverImage { url }
                        publishedAt
                        author { name }
                        tags { name }
                        readTimeInMinutes
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
        const post = data.data?.publication?.post;

        if (!post) {
            return new Response('Not found', { status: 404 });
        }

        const articleUrl = `https://www.rpam.fr/blog-post?slug=${encodeURIComponent(post.slug)}`;
        const description = (post.brief || '').substring(0, 160);
        const image = post.coverImage?.url || 'https://www.rpam.fr/images/og-rpam.jpg';
        const author = post.author?.name || 'RPAM';
        const keywords = post.tags ? post.tags.map(t => t.name).join(', ') : '';

        const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>${escapeHtml(post.title)} - Blog RPAM</title>
    <meta name="description" content="${escapeAttr(description)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${escapeAttr(articleUrl)}">

    <!-- Open Graph -->
    <meta property="og:title" content="${escapeAttr(post.title)}">
    <meta property="og:description" content="${escapeAttr(description)}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${escapeAttr(articleUrl)}">
    <meta property="og:image" content="${escapeAttr(image)}">
    <meta property="og:locale" content="fr_FR">
    <meta property="og:site_name" content="RPAM">
    <meta property="article:published_time" content="${escapeAttr(post.publishedAt || '')}">
    <meta property="article:author" content="${escapeAttr(author)}">
    <meta property="article:section" content="Blog">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttr(post.title)}">
    <meta name="twitter:description" content="${escapeAttr(description)}">
    <meta name="twitter:image" content="${escapeAttr(image)}">

    <!-- JSON-LD -->
    <script type="application/ld+json">
    ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": description,
        "url": articleUrl,
        "image": image,
        "datePublished": post.publishedAt || '',
        "author": { "@type": "Person", "name": author },
        "publisher": {
            "@type": "Organization",
            "name": "RPAM",
            "url": "https://www.rpam.fr",
            "logo": { "@type": "ImageObject", "url": "https://www.rpam.fr/images/logo-rpam.png" }
        },
        "keywords": keywords,
        "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl }
    })}
    </script>

    <!-- Redirect browsers to the real page -->
    <meta http-equiv="refresh" content="0;url=${escapeAttr(articleUrl)}">
</head>
<body>
    <h1>${escapeHtml(post.title)}</h1>
    <p>${escapeHtml(description)}</p>
    <p><a href="${escapeAttr(articleUrl)}">Lire l'article</a></p>
</body>
</html>`;

        return new Response(html, {
            status: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
            }
        });

    } catch (error) {
        return new Response('Server error', { status: 500 });
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const config = {
    runtime: 'edge'
};
