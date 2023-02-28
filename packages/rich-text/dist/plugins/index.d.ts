import { FieldExtensionSDK } from '@contentful/app-sdk';
import { PlateProps } from '@udecode/plate-core';
import { PlatePlugin } from '../internal/types';
import { RichTextTrackingActionHandler } from './Tracking';
export declare const getPlugins: (sdk: FieldExtensionSDK, onAction: RichTextTrackingActionHandler, restrictedMarks?: string[] | undefined) => PlatePlugin[];
export declare const disableCorePlugins: PlateProps['disableCorePlugins'];
