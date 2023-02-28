/// <reference types="react" />
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { PreviewComponents } from './types';
export interface MarkdownEditorProps {
    /**
     * is the field disabled initially
     */
    isInitiallyDisabled: boolean;
    /**
     * Minimum height to set for the markdown text area and preview
     */
    minHeight?: string | number;
    sdk: FieldExtensionSDK;
    previewComponents?: PreviewComponents;
    onReady?: Function;
}
export declare function MarkdownEditor(props: MarkdownEditorProps & {
    disabled: boolean;
    initialValue: string | null | undefined;
    saveValueToSDK: Function;
}): JSX.Element;
export declare function MarkdownEditorConnected(props: MarkdownEditorProps): JSX.Element;
