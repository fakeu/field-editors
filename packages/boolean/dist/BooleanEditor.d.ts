/// <reference types="react" />
import { FieldAPI, ParametersAPI } from '@contentful/field-editor-shared';
export interface BooleanEditorProps {
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
            trueLabel?: string;
            falseLabel?: string;
        };
    };
}
export declare function BooleanEditor(props: BooleanEditorProps): JSX.Element;
export declare namespace BooleanEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
