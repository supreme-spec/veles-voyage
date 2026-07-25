import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/constants/seo';

export default function robots(): MetadataRoute.Robots {
  const commonDisallow = [
    '/api/',
    '/private/',
    '/admin/',
    '/_next/',
    '/static/',
    '/*-gid', // Block old legacy slugs with -gid suffix
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: commonDisallow,
      },
      // Specific rules for search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: commonDisallow,
      },
      // Retrieval-боты ИИ (разрешаем для цитирования в реальном времени)
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-User',
        allow: '/',
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },
      // Обучающие боты ИИ (разрешаем для GEO/AEO)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // Rules for web3 crawlers
      {
        userAgent: 'ipfs',
        allow: '/',
      },
      {
        userAgent: 'ipld',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}