import * as React from 'react';
import type { FieldExtensionSDK } from '@contentful/field-editor-shared';
import type { EditorOptions, WidgetType } from './types';
declare type FieldProps = {
    sdk: FieldExtensionSDK;
    widgetId?: WidgetType;
    isInitiallyDisabled?: boolean;
    renderFieldEditor?: (widgetId: WidgetType, sdk: FieldExtensionSDK, isInitiallyDisabled: boolean) => JSX.Element | false;
    getOptions?: (widgetId: WidgetType, sdk: FieldExtensionSDK) => EditorOptions;
};
export declare const Field: React.FC<FieldProps>;
export {};
