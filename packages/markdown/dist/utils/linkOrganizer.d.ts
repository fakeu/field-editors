export declare const findInline: (text: string) => Array<any>;
export declare const findRefs: (text: string) => Array<any>;
export declare const findLabels: (text: string) => Array<any>;
export declare function convertInlineToRef(text: string): string;
export declare function rewriteRefs(text: string): string;
export declare function findMaxLabelId(textOrLabels: any): number;
