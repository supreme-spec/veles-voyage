"use client";
import Script from 'next/script';

export default function AviakassaFlights() {
  return (
    <>
      <div id="ak-app-9870" style={{ minHeight: '500px', width: '100%' }} />
      <Script
        src="https://widgets.aviakassa.com/partner.js"
        strategy="afterInteractive"
        onReady={() => {
          if (typeof window !== 'undefined' && (window as any).Aviakassa?.Partner) {
            new (window as any).Aviakassa.Partner("ak-app-9870", {
              showAvia: true,
              showRail: false,
              showHotel: false,
              showAviaTitle: false,
              showRailTitle: false,
              showHotelTitle: false,
              aviaTitle: "Поиск дешевых авиабилетов",
              showAviakassaLogo: false,
              showLocaleSelect: true,
              aviaShowComplexRoute: true,
              showAviaAirlinesPrefilter: true,
              channelToken: "3332f56e290f67d4f939f48ed8d2d1a578817244",
              id: 9870
            });
          }
        }}
      />
    </>
  );
}
