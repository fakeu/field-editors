import * as CodeMirrorWrapper from './CodeMirrorWrapper';
declare type EditorInstanceType = ReturnType<typeof CodeMirrorWrapper.create>;
/**
 * @description
 * A collection of commands used by the user bound to a
 * CodeMirrorWrapper instance.
 *
 * The command collection only depends on the wrapper instance and is
 * used by UI from code mirror stuff.
 */
export declare function create(editor: EditorInstanceType): {
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
export {};
