import type { MetadataRoute } from 'next';
import { allCountryIds } from '@/shared/data/wikiPages';
import { countries } from '@lib/velite-data';
import { SITE_URL, SITE_LAST_UPDATED_ISO } from '@/shared/constants/seo';

const STATIC_DATE = new Date(SITE_LAST_UPDATED_ISO);
const COUNTRY_MAP = new Map(
  countries
    .filter((c: any) => c.slug)
    .map((c: any) => [c.slug as string, c.body ?? ''])
);

function hasSection(id: string, body: string): boolean {
  return new RegExp(`id=["']${id}["']`).test(body);
}

export default function wikiSitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const wikiUrls: MetadataRoute.Sitemap = allCountryIds.map((id) => ({
    url: `${baseUrl}/wiki/${id}`,
    lastModified: STATIC_DATE,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const matrixPages: MetadataRoute.Sitemap = allCountryIds.flatMap((id) => {
    const body = COUNTRY_MAP.get(id) ?? '';
    const pages: MetadataRoute.Sitemap = [];
    if (hasSection('visa', body)) {
      pages.push({
        url: `${baseUrl}/wiki/${id}/visa`,
        lastModified: STATIC_DATE,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
    if (hasSection('weather', body)) {
      pages.push({
        url: `${baseUrl}/wiki/${id}/weather`,
        lastModified: STATIC_DATE,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
    if (hasSection('budget', body) || hasSection('currency', body)) {
      pages.push({
        url: `${baseUrl}/wiki/${id}/currency`,
        lastModified: STATIC_DATE,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
    return pages;
  });

  return [...wikiUrls, ...matrixPages];
}
