import React from 'react';
import { EditorDirection, PreviewComponents } from '../types';
declare type MarkdownPreviewProps = {
    /**
     * Minimum height to set for the markdown preview
     */
    minHeight?: string | number;
    mode: 'default' | 'zen';
    direction: EditorDirection;
    value: string;
    previewComponents?: PreviewComponents;
};
export declare const MarkdownPreview: React.MemoExoticComponent<(props: MarkdownPreviewProps) => JSX.Element>;
export {};
