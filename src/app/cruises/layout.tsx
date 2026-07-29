import { Breadcrumbs } from '@/shared/components/ui/Breadcrumbs';
import Script from 'next/script';

export default function CruisesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="container mx-auto px-4 mt-4 relative z-10">
                <Breadcrumbs />
            </div>
            {children}
            <div
                className="infoflotWidget"
                data-id="YTo0OntzOjI6IklEIjtzOjQ6IjMxODUiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6InBjeWs0eTFjIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30="
                data-index="1"
            />
            <Script
                src="https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js"
                strategy="afterInteractive"
                async
                onLoad={() => {
                    if (typeof window !== 'undefined' && (window as any).createInfoflotWidget) {
                        (window as any).createInfoflotWidget(
                            'https://bitrix.infoflot.com/rest/api/search.filter/',
                            {
                                key: 'YTo0OntzOjI6IklEIjtzOjQ6IjMxODUiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6InBjeWs0eTFjIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=',
                                referer: encodeURIComponent(location.href),
                            }
                        );
                    }
                }}
            />
        </>
    );
}
