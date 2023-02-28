/// <reference types="react" />
import { FieldAPI, LocalesAPI } from '@contentful/field-editor-shared';
export interface MultipleLineEditorProps {
    /**
     * is the field disabled initially
     */
    isInitiallyDisabled: boolean;
    /**
     * whether char validation should be shown or not
     */
    withCharValidation: boolean;
    /**
     * sdk.field
     */
    field: FieldAPI;
    /**
     * sdk.locales
     */
    locales: LocalesAPI;
}
export declare function MultipleLineEditor(props: MultipleLineEditorProps): JSX.Element;
export declare namespace MultipleLineEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
        withCharValidation: boolean;
    };
}
