import { FieldExtensionSDK, OpenCustomWidgetOptions } from '@contentful/app-sdk';
import { MarkdownDialogsParams, PreviewComponents } from '../types';
export declare const openMarkdownDialog: (sdk: FieldExtensionSDK, previewComponents?: PreviewComponents | undefined) => (options: OpenCustomWidgetOptions & {
    parameters?: MarkdownDialogsParams;
}) => Promise<unknown>;
