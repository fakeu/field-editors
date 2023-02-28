/// <reference types="react" />
import { FieldExtensionSDK, FieldAPI } from '@contentful/app-sdk';
export interface SlugEditorProps {
    /**
     * is the field disabled initially
     */
    isInitiallyDisabled: boolean;
    baseSdk: FieldExtensionSDK;
    /**
     * sdk.field
     */
    field: FieldAPI;
    parameters?: {
        instance: {
            trackingFieldId?: string;
        };
    };
}
export declare function SlugEditor(props: SlugEditorProps): JSX.Element;
export declare namespace SlugEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
