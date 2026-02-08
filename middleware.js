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

    // Only intercept /blog-post pages with a slug
    if (!url.pathname.match(/^\/blog-post(\.html)?$/) || !url.searchParams.get('slug')) {
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
    prerenderUrl.searchParams.set('slug', url.searchParams.get('slug'));

    return fetch(prerenderUrl);
}

export const config = {
    matcher: ['/blog-post', '/blog-post.html']
};
