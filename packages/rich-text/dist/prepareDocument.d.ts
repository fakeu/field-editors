import { Document } from '@contentful/rich-text-types';
import { CreatePlateEditorOptions } from './internal';
import { Value, PlateEditor, Node } from './internal/types';
/**
 * For legacy reasons, a document may not have any content at all
 * e.g:
 *
 * {nodeType: document, data: {}, content: []}
 *
 * Rendering such document will break the Slate editor
 */
export declare const hasContent: (doc?: Document | undefined) => boolean;
export declare const setEditorContent: (editor: PlateEditor, nodes?: Node[] | undefined) => void;
/**
 * Converts a Contentful rich text document to the corresponding slate editor
 * value
 */
export declare const documentToEditorValue: (doc?: Document | undefined) => Node[];
export declare const normalizeEditorValue: (value: Value, options?: Omit<CreatePlateEditorOptions, "id" | "editor"> | undefined) => Value;
