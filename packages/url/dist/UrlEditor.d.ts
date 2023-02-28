import * as React from 'react';
import { FieldAPI } from '@contentful/field-editor-shared';
export interface UrlEditorProps {
    /**
     * is the field disabled initially
     */
    isInitiallyDisabled: boolean;
    /**
     * sdk.field
     */
    field: FieldAPI;
    children?: (props: {
        value: string | null | undefined;
    }) => React.ReactNode;
}
export declare function UrlEditor(props: UrlEditorProps): JSX.Element;
export declare namespace UrlEditor {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
