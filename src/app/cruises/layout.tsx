import { Breadcrumbs } from '@/shared/components/ui/Breadcrumbs';

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
            <script
                dangerouslySetInnerHTML={{
                    __html: `
(function(d,w){var h=d.getElementsByTagName("script")[0];s=d.createElement("script");s.src="https://bitrix.infoflot.com/local/templates/infoflot/frontend/js/infoflotIframe.js";s.async=!0;s.onload=function(){w.createInfoflotWidget("https://bitrix.infoflot.com/rest/api/search.filter/",{key: "YTo0OntzOjI6IklEIjtzOjQ6IjMxODUiO3M6NDoiVVNFUiI7czozMjoiY3k1emRtbHpkSFZ1YjNaQWFHOTBiV0ZwYkM1amIyMD0iO3M6NjoiUkFORE9NIjtzOjg6InBjeWs0eTFjIjtzOjE1OiJJTkZPRkxPVC1BUElLRVkiO3M6NDA6ImRiYzY0NDU0Mjc1ODQxMGNhMjg0MTgwNmI5ZTQ5YzdlZTY3NjY5ZTAiO30=",referer: encodeURIComponent(location.href)})};h.parentNode.insertBefore(s,h);})(document,window);
                    `,
                }}
            />
        </>
    );
}
