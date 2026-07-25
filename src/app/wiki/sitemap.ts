import type { MetadataRoute } from 'next';
import { allCountryIds } from '@/shared/data/wikiPages';
import { SITE_URL, SITE_LAST_UPDATED_ISO } from '@/shared/constants/seo';

const STATIC_DATE = new Date(SITE_LAST_UPDATED_ISO);

export default function wikiSitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const wikiUrls: MetadataRoute.Sitemap = allCountryIds.map((id) => ({
    url: `${baseUrl}/wiki/${id}`,
    lastModified: STATIC_DATE,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const matrixPages: MetadataRoute.Sitemap = allCountryIds.flatMap((id) => [
    {
      url: `${baseUrl}/wiki/${id}/visa`,
      lastModified: STATIC_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wiki/${id}/weather`,
      lastModified: STATIC_DATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/wiki/${id}/currency`,
      lastModified: STATIC_DATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]);

  return [...wikiUrls, ...matrixPages];
}
