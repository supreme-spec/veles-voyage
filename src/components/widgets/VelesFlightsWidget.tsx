"use client";
import { useEffect } from 'react';

export default function VelesFlightsWidget() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement("script");
      script.async = true;
      script.type = "module";
      script.src = "https://tpwgt.com/wl_web/main.js?wl_id=20834";
      script.setAttribute('nowprocket', '1');
      script.setAttribute('data-noptimize', '1');
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('data-wpfc-render', 'false');
      script.setAttribute('seraph-accel-crit', '1');
      script.setAttribute('data-no-defer', '1');
      document.head.appendChild(script);

      (window as any).TPWL_CONFIGURATION = {
        ...((window as any).TPWL_CONFIGURATION || {}),
        resultsURL: "https://fly.veles-voyage.ru"
      };

      const fixFooterLinks = () => {
        const container = document.getElementById('tpwl-search');
        if (!container) return;

        const links = container.querySelectorAll('a[href*="veles-voyage.ru/terms"], a[href*="veles-voyage.ru/privacy"], a[href*="veles-voyage.ru/cookie-policy"]');
        links.forEach((link) => {
          const href = link.getAttribute('href');
          if (href && href.includes('https://veles-voyage.ru/')) {
            link.setAttribute('href', href.replace('https://veles-voyage.ru/', 'https://veles-voyage.ru/'));
          }
        });
      };

      const observer = new MutationObserver(() => {
        fixFooterLinks();
      });

      const container = document.getElementById('tpwl-search');
      if (container) {
        observer.observe(container, { childList: true, subtree: true });
        fixFooterLinks();
      }
    }
  }, []);

  return <div id="tpwl-search" />;
}
