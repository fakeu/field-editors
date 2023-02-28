/// <reference types="react" />
import * as p from '@udecode/plate-core';
import { StoreApiGet } from '@udecode/zustood';
import * as s from 'slate';
import type { Value, PlateEditor, PlatePlugin } from './types';
export declare type CreatePlateEditorOptions = Omit<p.CreatePlateEditorOptions<Value, PlateEditor>, 'plugins'> & {
    plugins?: PlatePlugin[];
};
export declare const createPlateEditor: (options?: CreatePlateEditorOptions) => PlateEditor & Omit<s.BaseEditor, "children" | "operations" | "marks" | "isInline" | "isVoid" | "normalizeNode" | "apply" | "getFragment" | "insertFragment" | "insertNode"> & {
    children: Value;
    operations: p.TOperation<p.TDescendant>[];
    marks: Record<string, any> | null;
    isInline: <N extends p.TElement>(element: N) => boolean;
    isVoid: <N_1 extends p.TElement>(element: N_1) => boolean;
    normalizeNode: <N_2 extends p.TNode>(entry: p.TNodeEntry<N_2>) => void;
    apply: <N_3 extends p.TDescendant>(operation: p.TOperation<N_3>) => void;
    getFragment: <N_4 extends p.TDescendant>() => N_4[];
    insertFragment: <N_5 extends p.TDescendant>(fragment: N_5[]) => void;
    insertNode: <N_6 extends p.TDescendant>(node: N_6 | N_6[]) => void;
} & p.UnknownObject & Pick<import("slate-history").HistoryEditor, "history" | "undo" | "redo"> & Pick<import("slate-react").ReactEditor, "insertData" | "insertFragmentData" | "setFragmentData" | "insertTextData" | "hasRange"> & {
    key: any;
    id: string;
    plugins: p.WithPlatePlugin<{}, Value, p.PlateEditor<Value>>[];
    pluginsByKey: Record<string, p.WithPlatePlugin<{}, Value, p.PlateEditor<Value>>>;
    prevSelection: s.BaseRange | null;
    currentKeyboardEvent: import("react").KeyboardEvent<Element> | null;
};
export declare const withoutNormalizing: (editor: PlateEditor, fn: () => boolean | void) => boolean;
export declare const focusEditor: (editor: PlateEditor, target?: s.Location | undefined) => void;
export declare const blurEditor: (editor: PlateEditor) => void;
export declare const selectEditor: (editor: PlateEditor, opts: p.SelectEditorOptions) => void;
export declare const fromDOMPoint: (editor: PlateEditor, domPoint: [Node, number], opts?: {
    exactMatch: boolean;
    suppressThrow: boolean;
}) => s.BasePoint | null | undefined;
export declare const mockPlugin: (plugin?: Partial<PlatePlugin> | undefined) => p.WithPlatePlugin<p.AnyObject, p.Value, p.PlateEditor<p.Value>>;
export declare const getPlateSelectors: (id?: string | undefined) => StoreApiGet<p.PlateStoreState<Value, PlateEditor>, {}>;
