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
    }
  }, []);

  return <div id="tpwl-search" />;
}
