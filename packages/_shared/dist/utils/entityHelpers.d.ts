import { Asset, ContentType, ContentTypeField, Entry, File } from '../typesEntity';
export declare function getFieldValue({ 
/**
 * Expects an entity fetched with a flag Skip-Transformation: true
 */
entity, fieldId, localeCode, defaultLocaleCode, }: {
    entity: {
        fields: {
            [key: string]: {
                [valueKey: string]: string | undefined;
            };
        };
    };
    fieldId: string;
    localeCode: string;
    defaultLocaleCode: string;
}): string | undefined;
export declare function getAssetTitle({ asset, localeCode, defaultLocaleCode, defaultTitle, }: {
    asset: Asset;
    localeCode: string;
    defaultLocaleCode: string;
    defaultTitle: string;
}): string;
/**
 * Returns true if field is an Asset
 *
 * @param field
 * @returns {boolean}
 */
export declare const isAssetField: (field: ContentTypeField) => boolean;
/**
 * Returns true if field is a Title
 */
export declare function isDisplayField({ field, contentType, }: {
    field: ContentTypeField;
    contentType: ContentType;
}): boolean;
/**
 * Returns true if field is a short Description
 */
export declare function isDescriptionField({ field, contentType, }: {
    field: ContentTypeField;
    contentType: ContentType;
}): boolean;
export declare function getEntityDescription({ entity, contentType, localeCode, defaultLocaleCode, }: {
    entity: Entry;
    contentType?: ContentType;
    localeCode: string;
    defaultLocaleCode: string;
}): string;
export declare function getEntryTitle({ entry, contentType, localeCode, defaultLocaleCode, defaultTitle, }: {
    entry: Entry;
    contentType?: ContentType;
    localeCode: string;
    defaultLocaleCode: string;
    defaultTitle: string;
}): string;
export declare function getEntryStatus(sys: Entry['sys']): "deleted" | "archived" | "changed" | "published" | "draft";
/**
 * Gets a promise resolving with a localized asset image field representing a
 * given entities file. The promise may resolve with null.
 */
export declare const getEntryImage: ({ entry, contentType, localeCode, }: {
    entry: Entry;
    contentType?: ContentType | undefined;
    localeCode: string;
    defaultLocaleCode: string;
}, getAsset: (assetId: string) => Promise<unknown>) => Promise<null | File>;
