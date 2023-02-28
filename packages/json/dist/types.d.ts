export declare type JSONPrimitive = string | number | boolean | null;
export declare type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export declare type JSONObject = {
    [member: string]: JSONValue;
};
export interface JSONArray extends Array<JSONValue> {
}
