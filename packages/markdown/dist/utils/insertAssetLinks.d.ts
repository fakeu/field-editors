declare type Asset = any;
declare type LinkWithMedia = {
    title: string;
    asset: Asset;
    url: string;
    isLocalized: boolean;
    isFallback: boolean;
    asMarkdown: string;
};
declare type Locales = {
    localeCode: string;
    fallbackCode: string | undefined;
    defaultLocaleCode: string;
};
export declare function replaceAssetDomain(fileUrl: string): string;
export declare function insertAssetLinks(assets: Array<Asset>, locales: Locales): Promise<{
    fallbacks: {
        title: string;
        thumbnailUrl: any;
        thumbnailAltText: string;
        description: string;
        asset: any;
    }[];
    links: LinkWithMedia[];
} | {
    links: LinkWithMedia[];
    fallbacks?: undefined;
}>;
export {};
