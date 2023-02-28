/// <reference types="react" />
import { FieldAPI } from '@contentful/field-editor-shared';
export interface TagsEditorContainerProps {
    /**
     * is the field disabled initially
     */
    isInitiallyDisabled: boolean;
    /**
     * sdk.field
     */
    field: FieldAPI;
}
export declare function TagsEditorContainer(props: TagsEditorContainerProps): JSX.Element;
export declare namespace TagsEditorContainer {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
