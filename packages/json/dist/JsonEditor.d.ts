/// <reference types="react" />
import { FieldAPI } from '@contentful/field-editor-shared';
export interface JsonEditorProps {
    /**
     * is the field disabled initially
     */
    isInitiallyDisabled: boolean;
    /**
     * sdk.field
     */
    field: FieldAPI;
}
export default function JsonEditor(props: JsonEditorProps): JSX.Element;
