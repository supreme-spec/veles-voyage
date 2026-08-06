'use client';

import { useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    Aviakassa: any;
  }
}

export default function AviakassaFlightsWidget() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const containerId = 'ak-app-9870';

  return (
    <div style={{ minHeight: 500, position: 'relative' }}>
      {status === 'loading' && (
        <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Загрузка поиска авиабилетов…</p>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="text-center">
            <p className="text-lg mb-2">✈️</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Поиск авиабилетов временно недоступен. Попробуйте позже или свяжитесь с нами.
            </p>
            <a href="https://t.me/veles_voyage" target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-blue-600 hover:underline">
              Написать в Telegram
            </a>
          </div>
        </div>
      )}
      <div id={containerId} style={{ minHeight: status === 'ready' ? 500 : 0 }} />

      <Script
        src="https://widgets.aviakassa.com/partner.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).Aviakassa?.Partner) {
            try {
              new (window as any).Aviakassa.Partner(containerId, {
                showAvia: true,
                showRail: false,
                showHotel: false,
                showAviaTitle: false,
                showRailTitle: false,
                showHotelTitle: false,
                aviaTitle: 'Поиск дешевых авиабилетов',
                showAviakassaLogo: false,
                showLocaleSelect: true,
                aviaShowComplexRoute: true,
                showAviaAirlinesPrefilter: true,
                channelToken: '3332f56e290f67d4f939f48ed8d2d1a578817244',
                id: 9870,
              });
              setStatus('ready');
            } catch (e) {
              console.error('Aviakassa widget init error:', e);
              setStatus('error');
            }
          } else {
            setStatus('error');
          }
        }}
      />
    </div>
  );
}
