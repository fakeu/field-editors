/// <reference types="react" />
import { FieldAPI, LocalesAPI } from '@contentful/field-editor-shared';
export interface CheckboxEditorProps {
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
export declare function CheckboxEditor(props: CheckboxEditorProps): JSX.Element;
export declare namespace CheckboxEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
