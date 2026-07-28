import type { OrganizationSchema } from '@/shared/types/schema';
import { SOCIAL_LINKS } from '@/shared/constants/seo';

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'Organization',
    name: 'Велес Вояж | Экспертная редакция',
    url: 'https://veles-voyage.ru/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://veles-voyage.ru/images/logo.png',
    },
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '89850635134',
      contactType: 'customer service',
      email: 'hello@veles-voyage.ru',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Московская область, Одинцовский р-н, Голицыно, Керамиков пр-т, д. 103',
      addressLocality: 'Голицыно',
      postalCode: '143041',
      addressCountry: 'RU',
    },
    sameAs: [
      SOCIAL_LINKS.vk,
      SOCIAL_LINKS.telegram,
      SOCIAL_LINKS.rutube,
      SOCIAL_LINKS.max,
    ],
    priceRange: '₽₽',
    areaServed: { '@type': 'Country', name: 'Russia' },
  };
}

