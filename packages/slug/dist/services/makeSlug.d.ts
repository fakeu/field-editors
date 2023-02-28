declare type MakeSlugOptions = {
    locale: string;
    isOptionalLocaleWithFallback: boolean;
    createdAt: string;
};
export declare function formatUtcDate(date: Date): string;
export declare function makeSlug(title: string | null | undefined, options: MakeSlugOptions): string;
export {};
