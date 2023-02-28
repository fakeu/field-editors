import { Entry } from '@contentful/field-editor-shared';
interface Fields {
    [key: string]: {
        [localeKey: string]: any;
    };
}
export declare const createEntry: (contentTypeId: string, fields: Fields) => Entry;
export {};
