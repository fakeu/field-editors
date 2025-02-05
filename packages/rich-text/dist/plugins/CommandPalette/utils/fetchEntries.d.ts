import { FieldExtensionSDK } from '@contentful/app-sdk';
import { ContentTypeProps } from 'contentful-management/types';
export declare function fetchEntries(sdk: FieldExtensionSDK, contentType: ContentTypeProps, query: string): Promise<{
    contentTypeName: string;
    displayTitle: string;
    id: string;
    description: string;
    entry: import("@contentful/app-sdk").Entry<unknown>;
}[]>;
