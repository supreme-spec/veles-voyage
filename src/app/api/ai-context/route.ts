import { NextResponse } from 'next/server';
import { SITE_URL } from '@/shared/constants/seo';
import { countries } from '@lib/velite-data';

/**
 * API endpoint for AI agents to retrieve structured context for RAG
 * Returns clean, machine-readable data for LLM integration
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  const query = searchParams.get('query');

  // Basic context about the agency
  const agencyContext = {
    name: 'Велес Вояж',
    description: 'Туристическое агентство Велес Вояж — эксперты в организации индивидуальных туров, морских круизов и путешествий по России и миру.',
    license: 'РТА 0035678',
    contact: {
      phone: '+7-985-063-51-34',
      email: 'hello@veles-voyage.ru',
      telegram: 'https://t.me/Anastasiiiiyyaa'
    },
    website: SITE_URL,
    services: [
      'Индивидуальные туры',
      'Морские круизы',
      'Путеводители по странам',
      'Визовая поддержка',
      'Бронирование отелей',
      'Авиабилеты'
    ]
  };

  // If specific destination is requested
  if (destination) {
    try {
      const countryData = countries.find(c => c.slug === destination.toLowerCase());

      if (countryData) {
        return NextResponse.json({
          context: `Направление: ${countryData.title}. Описание: ${countryData.description}. ${countryData.capital ? `Столица: ${countryData.capital}.` : ''} ${countryData.currency ? `Валюта: ${countryData.currency}.` : ''} ${countryData.visaRequirements !== undefined ? `Виза: ${countryData.visaRequirements ? 'Требуется' : 'Не требуется'}.` : ''} ${countryData.bestTimeToVisit ? `Лучшее время: ${countryData.bestTimeToVisit}.` : ''}`,
          data: {
            name: countryData.title,
            description: countryData.description,
            capital: countryData.capital,
            currency: countryData.currency,
            visaRequired: countryData.visaRequirements,
            bestTimeToVisit: countryData.bestTimeToVisit,
            estimatedCost: countryData.estimatedCost,
            wikidataId: countryData.wikidata,
          wikipediaUrl: (countryData as Record<string, unknown>).wikipediaUrl as string | undefined ?? '',
          directAnswer: (countryData as Record<string, unknown>).directAnswer as string | undefined ?? '',
          },
          source_url: `${SITE_URL}/wiki/${destination}`,
          license: "Данные предоставлены турагентством Велес Вояж (РТА 0035678)"
        });
      }
    } catch (error) {
      console.error('Error loading country data:', error);
    }

    return NextResponse.json({ 
      error: 'Destination not found',
      context: `Информация о направлении ${destination}暂时 недоступна. Пожалуйста, посетите ${SITE_URL}/wiki/${destination} для получения актуальной информации.`
    }, { status: 404 });
  }

  // If query is provided for general context
  if (query) {
    return NextResponse.json({
      context: `Велес Вояж — туристическое агентство с лицензией РТА 0035678. Специализация: индивидуальные туры, морские круизы, путеводители по 200+ странам. Контакт: +7-985-063-51-34, hello@veles-voyage.ru. Сайт: ${SITE_URL}.`,
      agency: agencyContext,
      source_url: SITE_URL
    });
  }

  // Default response with agency information
  return NextResponse.json({
    context: `Велес Вояж — туристическое агентство с лицензией РТА 0035678. Специализация: индивидуальные туры, морские круизы, путеводители по 200+ странам мира. Контакт: +7-985-063-51-34, hello@veles-voyage.ru. Сайт: ${SITE_URL}.`,
    agency: agencyContext,
    source_url: SITE_URL,
    license: "Данные предоставлены турагентством Велес Вояж (РТА 0035678)"
  });
}
