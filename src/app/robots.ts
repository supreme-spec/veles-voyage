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
        crawlDelay: 1,
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
        userAgent: 'Amazonbot',
        allow: '/',
      },
      {
        userAgent: 'FacebookBot',
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