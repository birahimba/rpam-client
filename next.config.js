/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'rpam.fr' }],
        destination: 'https://www.rpam.fr/:path*',
        permanent: true,
      },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/:path*.html', destination: '/:path*', permanent: true },
    ]
  },
}

module.exports = nextConfig
