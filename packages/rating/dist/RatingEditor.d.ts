/// <reference types="react" />
import { FieldAPI, ParametersAPI } from '@contentful/field-editor-shared';
export interface RatingEditorProps {
    /**
     * is the field disabled initially
     */
    isInitiallyDisabled: boolean;
    /**
     * sdk.field
     */
    field: FieldAPI;
    /**
     * sdk.parameters
     */
    parameters?: ParametersAPI & {
        instance: {
            stars?: number;
        };
    };
}
export declare function RatingEditor(props: RatingEditorProps): JSX.Element;
export declare namespace RatingEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
