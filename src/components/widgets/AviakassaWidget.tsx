'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

interface AviakassaWidgetProps {
  id?: string;
  channelToken?: string;
  showAvia?: boolean;
  showRail?: boolean;
  showHotel?: boolean;
}

declare global {
  interface Window {
    Aviakassa: any;
  }
}

export default function AviakassaWidget({
  id = '9878',
  channelToken = '4da1c0bd1b87e6a72d79478ca5686792ff58108b',
  showAvia = false,
  showRail = false,
  showHotel = true,
}: AviakassaWidgetProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const initialized = useRef(false);
  const containerId = `ak-app-${id}`;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let attempts = 0;
    const maxAttempts = 80;

    function tryInit() {
      if (initialized.current) return;
      attempts++;

      try {
        const Partner = (window as any).Aviakassa?.Partner;
        if (typeof Partner !== 'function') {
          if (attempts >= maxAttempts) {
            setStatus('error');
            return;
          }
          timeout = setTimeout(tryInit, 100);
          return;
        }

        new Partner(containerId, {
          showAvia,
          showRail,
          showHotel,
          showAviaTitle: false,
          showRailTitle: false,
          showHotelTitle: false,
          aviaTitle: 'Поиск дешевых авиабилетов',
          railTitle: '',
          hotelTitle: '',
          showAviakassaLogo: false,
          showLocaleSelect: true,
          aviaShowComplexRoute: true,
          showAviaAirlinesPrefilter: true,
          channelToken,
          id: Number(id),
        });
        initialized.current = true;
        setStatus('ready');
      } catch (e) {
        console.error('Aviakassa widget init error:', e);
        setStatus('error');
      }
    }

    tryInit();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [id, channelToken, showAvia, showRail, showHotel]);

  return (
    <div style={{ minHeight: 500, position: 'relative' }}>
      {status === 'loading' && (
        <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Загрузка поиска отелей…</p>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="text-center">
            <p className="text-lg mb-2">✈️</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Поиск отелей временно недоступен. Попробуйте позже или свяжитесь с нами.
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
        id={`ak-app-script-${id}`}
        src="https://widgets.aviakassa.com/partner.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
