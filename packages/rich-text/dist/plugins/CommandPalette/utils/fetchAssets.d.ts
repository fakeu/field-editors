import { FieldExtensionSDK } from '@contentful/app-sdk';
export declare function fetchAssets(sdk: FieldExtensionSDK, query: string): Promise<{
    contentTypeName: string;
    displayTitle: string;
    id: string;
    entity: import("@contentful/app-sdk").Asset;
    thumbnail: string;
}[]>;
