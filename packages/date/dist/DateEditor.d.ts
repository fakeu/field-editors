/// <reference types="react" />
import { FieldAPI, ParametersAPI } from '@contentful/field-editor-shared';
import { TimeFormat, DateTimeFormat } from './types';
export interface DateEditorProps {
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
        instance?: {
            format?: DateTimeFormat;
            ampm?: TimeFormat;
        };
    };
}
export declare function DateEditor(props: DateEditorProps): JSX.Element;
export declare namespace DateEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
