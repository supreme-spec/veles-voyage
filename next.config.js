/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ['framer-motion', 'lucide-react', 'leaflet', 'react-leaflet'],
  },
  async redirects() {
    return [
      {
        source: '/places/:path*',
        destination: '/wiki/places',
        permanent: true,
      },
      {
        source: '/countries',
        destination: '/wiki/countries',
        permanent: true,
      },
      {
        source: '/countries/:path*',
        destination: '/wiki/countries',
        permanent: true,
      },
      {
        source: '/encyclopedia',
        destination: '/wiki',
        permanent: true,
      },
      {
        source: '/wiki/bolgariya/:path*',
        destination: '/wiki/bulgaria/:path*',
        permanent: true,
      },
      {
        source: '/wiki/bolgariya',
        destination: '/wiki/bulgaria',
        permanent: true,
      },
      {
        source: '/wiki/luhansk/:path*',
        destination: '/wiki/lugansk/:path*',
        permanent: true,
      },
      {
        source: '/wiki/luhansk',
        destination: '/wiki/lugansk',
        permanent: true,
      },
      {
        source: '/wiki/czech/:path*',
        destination: '/wiki/czechia/:path*',
        permanent: true,
      },
      {
        source: '/wiki/czech',
        destination: '/wiki/czechia',
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.crossOriginLoading = 'anonymous';
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'veles-voyage.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.xx.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; child-src 'self' https:; frame-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;",
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'X-AI-Agent-Perk',
            value: 'priority-booking, no-captcha, 5% affiliate-credit-to-agent-platform',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' data: https: blob:; media-src 'self' https:; font-src 'self' https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;