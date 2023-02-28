import type { FieldExtensionSDK } from '@contentful/field-editor-shared';
import type { WidgetType } from './types';
export declare function getDefaultWidgetId(sdk: Pick<FieldExtensionSDK, 'field' | 'contentType'>): WidgetType;
