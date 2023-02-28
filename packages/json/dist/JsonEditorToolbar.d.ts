/// <reference types="react" />
declare type JsonEditorToolbarProps = {
    isUndoDisabled: boolean;
    isRedoDisabled: boolean;
    onRedo: () => void;
    onUndo: () => void;
};
export declare function JsonEditorToolbar(props: JsonEditorToolbarProps): JSX.Element;
export {};
