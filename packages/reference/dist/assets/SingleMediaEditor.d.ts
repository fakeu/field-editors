/// <reference types="react" />
import { ReferenceEditorProps } from '../common/ReferenceEditor';
declare type EditorProps = Pick<ReferenceEditorProps, Exclude<keyof ReferenceEditorProps, 'hasCardEditActions'>>;
export declare function SingleMediaEditor(props: EditorProps): JSX.Element;
export declare namespace SingleMediaEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
export {};
