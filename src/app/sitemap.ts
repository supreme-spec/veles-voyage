import type { MetadataRoute } from 'next';
import { SITE_URL, SITE_LAST_UPDATED_ISO } from '@/shared/constants/seo';
import citiesSitemap from './cities/sitemap';
import wikiSitemap from './wiki/sitemap';
import visualSitemap from './visual-sitemap';
import { blogPosts } from '@/shared/data/blogPosts';

const STATIC_DATE = new Date(SITE_LAST_UPDATED_ISO);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const mainUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mission`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: STATIC_DATE,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: STATIC_DATE,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/values`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/wiki`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cities`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wiki/places`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours/oceania`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tours/south-america`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cruises`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/flights`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: STATIC_DATE,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const noindexPatterns = [/\/api\//, /\/_next\//, /\/private\//, /\/admin\//, /\/search\?/];

  let cities: MetadataRoute.Sitemap = [];
  let wiki: MetadataRoute.Sitemap = [];
  let visual: MetadataRoute.Sitemap = [];
  try {
    cities = citiesSitemap();
  } catch (e) {
    console.error('citiesSitemap error:', e);
  }
  try {
    wiki = wikiSitemap();
  } catch (e) {
    console.error('wikiSitemap error:', e);
  }
  try {
    visual = visualSitemap();
  } catch (e) {
    console.error('visualSitemap error:', e);
  }

  const filtered = [
    ...mainUrls,
    ...wiki,
    ...cities,
    ...visual,
  ].filter((entry) => !noindexPatterns.some((re) => re.test(entry.url)));

  return filtered as MetadataRoute.Sitemap;
}
