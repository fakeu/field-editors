/// <reference types="codemirror" />
import { EditorDirection } from '../../types';
export declare function createMarkdownEditor(host: HTMLElement, options: {
    direction: EditorDirection;
    readOnly: boolean;
    fixedHeight?: number | boolean;
    height?: number | string;
}): {
    actions: {
        bold: () => void;
        italic: () => void;
        strike: () => void;
        quote: () => void;
        code: () => void;
        link: (url: string, text?: string | undefined, title?: string | undefined) => void;
        h1: () => void;
        h2: () => void;
        h3: () => void;
        ul: () => void;
        ol: () => void;
        undo: () => void;
        redo: () => void;
        hr: () => void;
        indent: () => void;
        dedent: () => void;
        table: (config: {
            rows: number;
            cols: number;
        }) => void;
    };
    history: {
        hasUndo: () => boolean;
        hasRedo: () => boolean;
    };
    events: {
        onScroll: (fn: Function) => void;
        onChange: (fn: Function) => void;
        onPaste: (fn: Function) => void;
    };
    insert: (text: string) => void;
    focus: () => void;
    getContent: () => string;
    destroy: () => void;
    setContent: (value?: string | undefined) => void;
    getSelectedText: () => string;
    usePrimarySelection: () => void;
    setReadOnly: (value: boolean) => void;
    selectBackwards: (skip: number, len: number) => void;
    getCursor: () => import("codemirror").Position;
    setCursor: (cursor: number | import("codemirror").Position) => void;
    clear: () => void;
    selectAll: () => void;
    setFullsize: () => void;
    refresh: () => void;
};
