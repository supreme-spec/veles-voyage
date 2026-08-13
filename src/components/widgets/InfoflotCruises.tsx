"use client";
import { useEffect } from 'react';

const INFOFLOT_KEY = 'YTo0OntzOjI6IklEIjtzOjQ6IjMxODUiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6IjN0bmtwZ2FpIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=';

export default function InfoflotCruises() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initWidget = () => {
      const container = document.querySelector('.infoflotWidget');
      if (!container) return;

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js';
      script.onload = () => {
        if (typeof window !== 'undefined' && (window as any).createInfoflotWidget) {
          (window as any).createInfoflotWidget('https://bitrix.infoflot.com/rest/api/search.filter/', {
            key: INFOFLOT_KEY,
            referer: encodeURIComponent(window.location.href)
          });
        }
      };
      document.head.appendChild(script);
    };

    initWidget();
  }, []);

  return (
    <div
      className="infoflotWidget"
      data-id={INFOFLOT_KEY}
      data-index="1"
      style={{ minHeight: '600px', width: '100%' }}
    />
  );
}
