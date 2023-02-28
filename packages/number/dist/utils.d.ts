import { FieldAPI } from '@contentful/field-editor-shared';
declare type RangeValidation = {
    min?: number;
    max?: number;
};
export declare const getRangeFromField: (field: FieldAPI) => RangeValidation;
export declare const valueToString: (value: number | null | undefined) => string;
export declare const countDecimals: (number: number) => number;
export {};
