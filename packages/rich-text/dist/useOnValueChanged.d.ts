import { Document } from '@contentful/rich-text-types';
export declare type OnValueChangedProps = {
    editorId: string;
    handler?: (value: Document) => unknown;
    skip?: boolean;
    onSkip?: VoidFunction;
};
export declare const useOnValueChanged: ({ editorId, handler, skip, onSkip }: OnValueChangedProps) => (value: unknown) => void;
