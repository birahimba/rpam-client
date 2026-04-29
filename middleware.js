// Bot user agents that don't execute JavaScript
const BOT_AGENTS = [
    'facebookexternalhit',
    'Facebot',
    'Twitterbot',
    'LinkedInBot',
    'WhatsApp',
    'Slackbot',
    'TelegramBot',
    'Pinterest',
    'Discordbot',
    'Embedly',
    'Quora Link Preview',
    'Showyoubot',
    'outbrain',
    'vkShare',
    'W3C_Validator',
    'redditbot',
    'Applebot',
    'SkypeUriPreview'
];

export default function middleware(request) {
    const url = new URL(request.url);

    // Extract slug from /blog/:slug path or ?slug= query param
    let slug = null;
    const cleanPathMatch = url.pathname.match(/^\/blog\/([a-zA-Z0-9-_]+)$/);
    if (cleanPathMatch) {
        slug = cleanPathMatch[1];
    } else if (url.pathname.match(/^\/blog-post(\.html)?$/)) {
        slug = url.searchParams.get('slug');
    }

    if (!slug) {
        return;
    }

    const userAgent = request.headers.get('user-agent') || '';

    // Check if the request comes from a bot
    const isBot = BOT_AGENTS.some(bot =>
        userAgent.toLowerCase().includes(bot.toLowerCase())
    );

    if (!isBot) {
        return;
    }

    // Rewrite bot requests to the prerender API
    const prerenderUrl = new URL('/api/blog-prerender', request.url);
    prerenderUrl.searchParams.set('slug', slug);

    return fetch(prerenderUrl);
}

export const config = {
    matcher: ['/blog/:slug*', '/blog-post', '/blog-post.html']
};
