import React from 'react';
import { createMarkdownEditor } from './createMarkdownEditor';
import { EditorDirection } from '../../types';
export declare type InitializedEditorType = ReturnType<typeof createMarkdownEditor>;
declare type MarkdownTextareaProps = {
    /**
     * Minimum height to set for the markdown text area
     */
    minHeight?: string | number;
    mode: 'default' | 'zen';
    direction: EditorDirection;
    disabled: boolean;
    visible: boolean;
    onReady: (editor: InitializedEditorType) => void;
};
export declare const MarkdownTextarea: React.MemoExoticComponent<(props: MarkdownTextareaProps) => JSX.Element>;
export {};
