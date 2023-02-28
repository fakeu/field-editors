import { JSONObject } from './types';
export declare function stringifyJSON(obj: JSONObject | null | undefined): string;
export declare function isValidJson(str: string): boolean;
export declare function parseJSON(str: string): {
    valid: boolean;
    value?: JSONObject;
};
