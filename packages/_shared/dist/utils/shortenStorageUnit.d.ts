/**
 * Transforms a number into a localized string (en-US)
 * toLocaleString(1000); // "1,000"
 * @param {Number} number
 */
export declare function toLocaleString(number: number): string;
declare type UnitOfMeasure = 'PB' | 'TB' | 'GB' | 'MB' | 'KB' | 'B';
/**
 * Make a storage unit number more readable by making them smaller
 * shortenStorageUnit(1000, 'GB'); // "1 TB"
 * shortenStorageUnit(0.001, 'TB'); // "1 GB"
 * @param value
 * @param uom Unit of measure
 * @returns
 */
export declare function shortenStorageUnit(value: number, uom: UnitOfMeasure): string;
export {};
