/// <reference types="react" />
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { PlateEditor } from './internal/types';
export declare function getContentfulEditorId(sdk: FieldExtensionSDK): string;
export declare const editorContext: import("react").Context<string>;
export declare const ContentfulEditorIdProvider: import("react").Provider<string>;
export declare function useContentfulEditorId(id?: string): string;
export declare function useContentfulEditor(id?: string): PlateEditor | null;
export declare function useContentfulEditorRef(id?: string): PlateEditor | null;
