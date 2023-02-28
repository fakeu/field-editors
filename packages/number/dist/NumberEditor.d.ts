/// <reference types="react" />
import { FieldAPI } from '@contentful/field-editor-shared';
export interface NumberEditorProps {
    /**
     * is the field disabled initially
     */
    isInitiallyDisabled: boolean;
    /**
     * sdk.field
     */
    field: FieldAPI;
}
export declare function NumberEditor(props: NumberEditorProps): JSX.Element;
export declare namespace NumberEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
