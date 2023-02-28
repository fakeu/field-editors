import * as React from 'react';
import type { FieldExtensionSDK, Entry } from '@contentful/field-editor-shared';
declare type FieldWrapperProps = {
    name: string;
    sdk: FieldExtensionSDK;
    /**
     * Generates a link to another entry with the same value when a "non unique" validation error occurs
     */
    getEntryURL?: (entry: Entry) => string;
    className?: string;
    showFocusBar?: boolean;
    children: React.ReactNode;
    renderHeading?: (name: string) => JSX.Element | null;
    renderHelpText?: (helpText: string) => JSX.Element | null;
};
export declare const FieldWrapper: React.FC<FieldWrapperProps>;
export {};
