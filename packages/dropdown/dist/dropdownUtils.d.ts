import { FieldAPI } from '@contentful/field-editor-shared';
declare type DropdownOption = {
    id: string;
    value: string | number | undefined;
    label: string;
};
export declare function parseValue(value: string, fieldType: string): string | number | undefined;
export declare function getOptions(field: FieldAPI): DropdownOption[];
export {};
