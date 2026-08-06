'use client';

import { useEffect, useRef, useState } from 'react';

const WIDGET_SCRIPT_SRC = 'https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js';
const WIDGET_API_URL = 'https://bitrix.infoflot.com/rest/api/search.filter/';
const WIDGET_KEY = 'YTo0OntzOjI6IklEIjtzOjQ6IjMxODUiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6IjQ1YmRiY2thIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=';

export default function ClientInfoflotWidget() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const widgetRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SCRIPT_SRC}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = WIDGET_SCRIPT_SRC;
    script.async = true;

    function initWidget() {
      if (initialized.current) return;
      if (typeof window.createInfoflotWidget !== 'function') return;
      if (!widgetRef.current) return;

      try {
        window.createInfoflotWidget(WIDGET_API_URL, {
          key: WIDGET_KEY,
          referer: encodeURIComponent(location.href),
        });
        initialized.current = true;
        setStatus('ready');
      } catch (e) {
        console.error('Infoflot widget init error:', e);
        setStatus('error');
      }
    }

    script.onload = () => {
      if (typeof window.createInfoflotWidget === 'function') {
        initWidget();
      } else {
        let attempts = 0;
        const maxAttempts = 50;
        const poll = setInterval(() => {
          attempts++;
          if (typeof window.createInfoflotWidget === 'function') {
            clearInterval(poll);
            initWidget();
          } else if (attempts >= maxAttempts) {
            clearInterval(poll);
            setStatus('error');
          }
        }, 100);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Infoflot widget script');
      setStatus('error');
    };

    const firstScript = document.querySelector('script');
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      className="infoflotWidget"
      data-id={WIDGET_KEY}
      data-index="1"
      style={{ minHeight: 500, position: 'relative' }}
    >
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
    </div>
  );
}