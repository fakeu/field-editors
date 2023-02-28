/// <reference types="react" />
import { FieldAPI, LocalesAPI } from '@contentful/field-editor-shared';
export interface ListEditorProps {
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
export declare function ListEditor(props: ListEditorProps): JSX.Element;
export declare namespace ListEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
