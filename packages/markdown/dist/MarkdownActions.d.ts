import { InitializedEditorType } from './components/MarkdownTextarea/MarkdownTextarea';
import { KnownSDK } from '@contentful/app-sdk';
export declare function createMarkdownActions(props: {
    sdk: KnownSDK;
    editor: InitializedEditorType | null;
    locale: string;
}): {
    headings: {
        h1: () => void;
        h2: () => void;
        h3: () => void;
    };
    simple: {
        italic: () => void;
        bold: () => void;
        quote: () => void;
        ol: () => void;
        ul: () => void;
        strike: () => void;
        code: () => void;
        hr: () => void;
        indent: () => void;
        dedent: () => void;
    };
    history: {
        undo: () => void;
        redo: () => void;
    };
    insertLink: () => Promise<void>;
    insertSpecialCharacter: () => Promise<void>;
    insertTable: () => Promise<void>;
    organizeLinks: () => void;
    embedExternalContent: () => Promise<void>;
    addNewMedia: () => Promise<void>;
    linkExistingMedia: () => Promise<void>;
    openZenMode: () => Promise<void>;
    closeZenMode: () => void;
};
