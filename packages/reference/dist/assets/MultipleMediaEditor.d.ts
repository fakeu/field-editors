/// <reference types="react" />
import { ReferenceEditorProps } from '../common/ReferenceEditor';
declare type EditorProps = Pick<ReferenceEditorProps, Exclude<keyof ReferenceEditorProps, 'hasCardEditActions'>>;
export declare function MultipleMediaEditor(props: EditorProps): JSX.Element;
export declare namespace MultipleMediaEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
export {};
