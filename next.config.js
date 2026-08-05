// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'maplibre-gl', 'react-map-gl'],
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
      {
        source: '/blog/morskie-ruizy-2026-gid-dlya-nachinayuschih',
        destination: '/blog/morskie-kruizy-2026-gid-dlya-nachinayuschih',
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.crossOriginLoading = 'anonymous';
    }
    config.plugins.push(new VeliteWebpackPlugin());
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
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.ostrovok.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.travelpayouts.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'photo.hotellook.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'q-cf.bstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'r-cf.bstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.level.travel',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.travelata.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.maps.yandex.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yastatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.aviakassa.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; child-src 'self' https:; frame-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self';",
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "img-src 'self' data: blob: https: " +
                'https://*.maps.yandex.net https://vec01.maps.yandex.net https://core-nmaps.maps.yandex.net ' +
                'https://yastatic.net ' +
                'https://*.ostrovok.ru https://img.ostrovok.ru https://cdn.ostrovok.ru ' +
                'https://*.travelpayouts.com https://photo.hotellook.com https://cdn.travelpayouts.com ' +
                'https://*.level.travel https://*.travelata.ru https://*.bronevik.com ' +
                'https://q-cf.bstatic.com https://r-cf.bstatic.com ' +
                'https://*.aviakassa.com',
              "media-src 'self' https:",
              "font-src 'self' https: data:",
              "style-src 'self' 'unsafe-inline' https: " +
                'https://bitrix.infoflot.com https://widgets.aviakassa.com',
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: " +
                'https://api-maps.yandex.ru https://yastatic.net ' +
                'https://widgets.aviakassa.com https://api4.aviakassa.com',
              "connect-src 'self' wss: https: " +
                'https://bitrix.infoflot.com https://widgets.aviakassa.com https://api4.aviakassa.com ' +
                'https://images.unsplash.com https://tiles.openfreemap.org https://demotiles.maplibre.org ' +
                'https://api-maps.yandex.ru https://geocode-maps.yandex.ru https://*.maps.yandex.net ' +
                'https://*.ostrovok.ru https://*.travelpayouts.com https://*.level.travel https://*.bronevik.com',
              "frame-src 'self' https: " +
                'https://bitrix.infoflot.com https://widgets.aviakassa.com https://yandex.ru ' +
                'https://*.ostrovok.ru https://*.travelpayouts.com https://*.level.travel https://*.travelata.ru',
              "frame-ancestors 'self' https://widgets.aviakassa.com",
              "worker-src 'self' blob:",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ];
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {any} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      const { build } = require('velite');
      await build({ watch: dev, clean: !dev });
    });
  }
}

module.exports = nextConfig;
