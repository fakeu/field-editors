/// <reference types="react" />
import { FieldAPI, LocalesAPI } from '@contentful/field-editor-shared';
export interface RadioEditorProps {
    /**
     * is the field disabled initially
     */
    isInitiallyDisabled: boolean;
    /**
     * sdk.field
     */
    field: FieldAPI;
    /**
     * sdk.locales
     */
    locales: LocalesAPI;
}
export declare function RadioEditor(props: RadioEditorProps): JSX.Element;
export declare namespace RadioEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
