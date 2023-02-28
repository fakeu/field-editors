import React from 'react';
import { MarkdownActions } from '../types';
interface MarkdownToolbarProps {
    canUploadAssets: boolean;
    disabled: boolean;
    actions: MarkdownActions;
    mode: 'default' | 'zen';
}
export declare function DefaultMarkdownToolbar(props: MarkdownToolbarProps): JSX.Element;
export declare function ZenMarkdownToolbar(props: MarkdownToolbarProps): JSX.Element;
export declare const MarkdownToolbar: React.MemoExoticComponent<(props: MarkdownToolbarProps) => JSX.Element>;
export {};
