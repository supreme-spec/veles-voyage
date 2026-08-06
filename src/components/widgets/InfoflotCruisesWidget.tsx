'use client';

import { useState } from 'react';
import Script from 'next/script';

const WIDGET_SCRIPT_SRC = 'https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js';
const WIDGET_API_URL = 'https://bitrix.infoflot.com/rest/api/search.filter/';
const WIDGET_KEY = 'YTo0OntzOjI6IklEIjtzOjQ6IjMxODUiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6IjQ1YmRiY2thIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=';

export default function InfoflotCruisesWidget() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  return (
    <div style={{ minHeight: 500, position: 'relative' }}>
      {status === 'loading' && (
        <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Загрузка поисковика круизов…</p>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="text-center">
            <p className="text-lg mb-2">🚢</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Поиск круизов временно недоступен. Попробуйте позже или свяжитесь с нами.
            </p>
            <a href="https://t.me/veles_voyage" target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-blue-600 hover:underline">
              Написать в Telegram
            </a>
          </div>
        </div>
      )}

      <Script
        src={WIDGET_SCRIPT_SRC}
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).createInfoflotWidget) {
            try {
              (window as any).createInfoflotWidget(WIDGET_API_URL, {
                key: WIDGET_KEY,
                referer: encodeURIComponent(typeof window !== 'undefined' ? window.location.href : ''),
              });
              setStatus('ready');
            } catch (e) {
              console.error('Infoflot widget init error:', e);
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
