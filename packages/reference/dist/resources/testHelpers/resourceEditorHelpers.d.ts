import { FieldExtensionSDK } from '@contentful/app-sdk';
export declare function mockSdkForField(fieldDefinition: any, fieldValue?: any): FieldExtensionSDK;
declare type FakeEntryResource = {
    title: string;
    id: string;
    space: {
        id: string;
        name: string;
    };
};
export declare const createFakeEntryResource: ({ title, id, space }: FakeEntryResource) => {
    resource: {
        sys: {
            id: string;
            type: string;
            space: {
                sys: {
                    id: string;
                };
            };
            environment: {
                sys: {
                    id: string;
                };
            };
        };
        fields: {
            title: {
                en: string;
            };
        };
    };
    contentType: {
        sys: {
            id: string;
        };
        displayField: string;
        fields: {
            type: string;
            id: string;
            name: string;
        }[];
    };
    localeCode: string;
    defaultLocaleCode: string;
    space: {
        name: string;
    };
};
export {};
