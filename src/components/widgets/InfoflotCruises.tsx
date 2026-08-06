"use client";
import Script from 'next/script';

export default function InfoflotCruises() {
  return (
    <>
      <div
        className="infoflotWidget"
        data-id="YTo0OntzOjI6IklEIjtzOjQ6IjMxODUiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6IjQ1YmRiY2thIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30="
        data-index="1"
        style={{ minHeight: '600px', width: '100%' }}
      />
      <Script
        src="https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js"
        strategy="afterInteractive"
        onReady={() => {
          if (typeof window !== 'undefined' && (window as any).createInfoflotWidget) {
            (window as any).createInfoflotWidget("https://bitrix.infoflot.com/rest/api/search.filter/", {
              key: "YTo0OntzOjI6IklEIjtzOjQ6IjMxODUiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6IjQ1YmRiY2thIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=",
              referer: encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')
            });
          }
        }}
      />
    </>
  );
}
