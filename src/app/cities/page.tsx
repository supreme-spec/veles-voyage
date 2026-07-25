import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/SEO/StructuredData';
import { allCities } from './all-cities';
import { SITE_URL } from '@/shared/constants/seo';

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: 'Города вылета — туры из 700+ городов России | Велес Вояж',
  description:
    'Полный список городов вылета Велес Вояж: туры в Турцию, Египет, ОАЭ и Таиланд из Москвы, Санкт-Петербурга и регионов России. Выберите свой город и подберите тур онлайн.',
  alternates: { canonical: `${siteUrl}/cities` },
  robots: { index: true, follow: true },
};

const breadcrumbsSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Города вылета', item: `${siteUrl}/cities` },
  ],
};

const federalDistricts = [
  { slug: 'central', name: 'Центральный' },
  { slug: 'northwest', name: 'Северо-Западный' },
  { slug: 'south', name: 'Южный' },
  { slug: 'north-caucasus', name: 'Северо-Кавказский' },
  { slug: 'volga', name: 'Приволжский' },
  { slug: 'ural', name: 'Уральский' },
  { slug: 'siberia', name: 'Сибирский' },
  { slug: 'far-east', name: 'Дальневосточный' },
];

export default function CitiesHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-5xl px-4 py-16 pt-20 md:pt-24">
        <StructuredData schemas={[breadcrumbsSchema]} />

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-blue-600 hover:underline dark:hover:text-blue-400">Главная</Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">Города вылета</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Выберите город вылета
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Найдите свой город — покажем доступные туры, цены и варианты перелёта.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10 border border-gray-100 dark:border-gray-700">
          <label htmlFor="city-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Поиск города
          </label>
          <input
            id="city-search"
            type="text"
            placeholder="Например, Москва"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
            autoComplete="off"
          />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Доступно {allCities.length}+ городов России
          </p>
        </div>

        {/* District grid */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Города по округам
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {federalDistricts.map((district) => (
            <Link
              key={district.slug}
              href={`/cities/district/${district.slug}`}
              className="block rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {district.name} округ
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Туры из городов {district.name} федерального округа
              </p>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Как выбрать город вылета?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Определитесь с ближайшим аэропортом: для Москвы и Санкт-Петербурга доступны
            прямые рейсы, для остальных регионов мы подбираем удобные стыковки. Откройте
            свой федеральный округ в списке выше — там вы увидите актуальные направления,
            примерное время перелёта и стартовые цены на туры.
          </p>
        </section>
      </div>
    </div>
  );
}
