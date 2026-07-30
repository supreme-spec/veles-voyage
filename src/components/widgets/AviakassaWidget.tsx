'use client';

import { useEffect, useState } from 'react';

interface AviakassaWidgetProps {
  id?: string;
  channelToken?: string;
  showAvia?: boolean;
  showRail?: boolean;
  showHotel?: boolean;
}

export default function AviakassaWidget({
  id = '9878',
  channelToken = '4da1c0bd1b87e6a72d79478ca5686792ff58108b',
  showAvia = false,
  showRail = true,
  showHotel = true,
}: AviakassaWidgetProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const containerId = `ak-app-${id}`;
    const scriptId = `ak-app-script-${id}`;
    const container = document.getElementById(containerId);
    if (!container) return;

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      initWidget(containerId);
      return;
    }

    const script = document.createElement('script');
    script.defer = true;
    script.id = scriptId;
    script.charset = 'utf-8';
    script.src = 'https://widgets.aviakassa.com/partner.js';
    script.type = 'text/javascript';

    const timeout = setTimeout(() => {
      setStatus('error');
      script.remove();
    }, 8000);

    script.addEventListener('load', () => {
      clearTimeout(timeout);
      initWidget(containerId);
    });

    script.addEventListener('error', () => {
      clearTimeout(timeout);
      setStatus('error');
      script.remove();
    });

    document.body.appendChild(script);

    return () => {
      clearTimeout(timeout);
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [id, channelToken, showAvia, showRail, showHotel]);

  function initWidget(containerId: string) {
    try {
      const Partner = (window as any).Aviakassa?.Partner;
      if (typeof Partner !== 'function') {
        setStatus('error');
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
      setStatus('ready');
    } catch (e) {
      console.error('Aviakassa widget init error:', e);
      setStatus('error');
    }
  }

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
            <a
              href="https://t.me/veles_voyage"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-blue-600 hover:underline"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      )}
      <div id={`ak-app-${id}`} style={{ minHeight: status === 'ready' ? 500 : 0 }} />
    </div>
  );
}
