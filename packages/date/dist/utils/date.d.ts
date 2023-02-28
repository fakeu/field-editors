import { TimeResult } from '../types';
/**
 * Parse user input into a string that is stored in the API.
 *
 * Returns a sum type with either the string as the `valid` property
 * or the `invalid` property set to `false`.
 */
export declare function buildFieldValue({ data, usesTime, usesTimezone, }: {
    data: TimeResult;
    usesTime: boolean;
    usesTimezone: boolean;
}): {
    invalid: boolean;
    valid?: undefined;
} | {
    valid: string | null;
    invalid: boolean;
};
export declare function getDefaultAMPM(): string;
export declare function getDefaultUtcOffset(): string;
/**
 * Create the user input object from the field value.
 */
export declare function userInputFromDatetime({ value, uses12hClock, }: {
    value: string | undefined | null;
    uses12hClock: boolean;
}): TimeResult;
