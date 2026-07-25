import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { generateMetadata as generateSEOMetadata } from '@/shared/utils/generateMetadata';
import { SITE_URL } from '@/shared/constants/seo';
import StructuredData from '@/components/SEO/StructuredData';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Партнёры Велес Вояж — надежные компании для путешествий',
  description:
    'Наши проверенные партнёры: Franglish — репетитор английского и французского языков. Индивидуальный подход, 18+ лет опыта, гарантированный результат.',
  url: `${SITE_URL}/partners`,
  type: 'website',
  keywords: [
    'партнёры Велес Вояж',
    'репетитор английского',
    'репетитор французского',
    'Franglish',
    'подготовка к ЕГЭ',
    'подготовка к ОГЭ',
    'индивидуальные занятия',
  ],
});

const breadcrumbsSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Партнёры', item: `${SITE_URL}/partners` },
  ],
};

const franglishSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Franglish',
  alternateName: 'Колесникова Анастасия Юрьевна',
  url: 'https://franglish-original.ru/',
  telephone: '+7-985-063-51-34',
  logo: 'https://franglish-original.ru/photo.webp',
  image: 'https://franglish-original.ru/photo.webp',
  description:
    'Персональный репетитор английского и французского языков с 18-летним опытом работы. Индивидуальный подход, современные методики и гарантированный результат.',
  foundingDate: '2006',
  sameAs: [
    'https://t.me/anastasia_franglish',
    'https://wa.me/79850635134',
    'https://franglish-original.ru/'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+7-985-063-51-34',
    contactType: 'customer service',
    availableLanguage: ['Russian', 'English', 'French']
  },
  knowsAbout: [
    'Английский язык',
    'Французский язык',
    'Подготовка к ЕГЭ',
    'Подготовка к ОГЭ',
    'CAE',
    'TKT',
    'PTE',
    'Разговорные курсы'
  ]
};

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Партнёры Велес Вояж',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.partner-speakable']
  }
};

export default function PartnersPage() {
  const partners = [
    {
      id: 'franglish',
      name: 'Franglish',
      description: 'Английский и французский',
      fullDescription:
        'Персональный репетитор английского и французского языков с 18-летним опытом работы. Индивидуальный подход, современные методики и гарантированный результат. Подготовка к ЕГЭ и ОГЭ, разговорные курсы, международные экзамены CAE, TKT, PTE.',
      logo: '/images/partners/logo-franglish.webp',
      alt: 'Franglish — репетитор английского и французского',
      url: 'https://franglish-original.ru/',
      benefits: ['18+ лет опыта', 'Сертифицированный эксперт ЕГЭ', 'Индивидуальный подход', 'Онлайн-занятия'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-20 pt-20 md:pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Наши партнёры
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Мы сотрудничаем с проверенными профессионалами, чтобы сделать ваше путешествие и подготовку к нему комфортными и надёжными.
          </p>
        </div>

        <StructuredData schemas={[breadcrumbsSchema, franglishSchema, speakableSchema]} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{partner.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{partner.description}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 partner-speakable" dangerouslySetInnerHTML={{ __html: partner.fullDescription }} />
              <div className="flex flex-wrap gap-2 mb-4">
                {partner.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="inline-block bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                Перейти на сайт партнёра
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
