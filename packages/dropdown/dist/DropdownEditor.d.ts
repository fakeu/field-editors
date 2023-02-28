/// <reference types="react" />
import { FieldAPI, LocalesAPI } from '@contentful/field-editor-shared';
export interface DropdownEditorProps {
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
export declare function DropdownEditor(props: DropdownEditorProps): JSX.Element;
export declare namespace DropdownEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
