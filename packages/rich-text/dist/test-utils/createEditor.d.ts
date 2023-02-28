/// <reference types="react" />
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { PlateEditor, PlatePlugin, Value } from '../internal/types';
import { RichTextTrackingActionHandler } from '../plugins/Tracking';
export declare const createTestEditor: (options: {
    input?: any;
    sdk?: FieldExtensionSDK;
    trackingHandler?: RichTextTrackingActionHandler;
    plugins?: PlatePlugin[];
}) => {
    editor: PlateEditor & Omit<import("slate").BaseEditor, "children" | "operations" | "marks" | "isInline" | "isVoid" | "normalizeNode" | "apply" | "getFragment" | "insertFragment" | "insertNode"> & {
        children: Value;
        operations: import("@udecode/plate-core").TOperation<import("@udecode/plate-core").TDescendant>[];
        marks: Record<string, any> | null;
        isInline: <N extends import("@udecode/plate-core").TElement>(element: N) => boolean;
        isVoid: <N_1 extends import("@udecode/plate-core").TElement>(element: N_1) => boolean;
        normalizeNode: <N_2 extends import("@udecode/plate-core").TNode>(entry: import("@udecode/plate-core").TNodeEntry<N_2>) => void;
        apply: <N_3 extends import("@udecode/plate-core").TDescendant>(operation: import("@udecode/plate-core").TOperation<N_3>) => void;
        getFragment: <N_4 extends import("@udecode/plate-core").TDescendant>() => N_4[];
        insertFragment: <N_5 extends import("@udecode/plate-core").TDescendant>(fragment: N_5[]) => void;
        insertNode: <N_6 extends import("@udecode/plate-core").TDescendant>(node: N_6 | N_6[]) => void;
    } & import("@udecode/plate-core").UnknownObject & Pick<import("slate-history").HistoryEditor, "history" | "undo" | "redo"> & Pick<import("slate-react").ReactEditor, "insertData" | "insertFragmentData" | "setFragmentData" | "insertTextData" | "hasRange"> & {
        key: any;
        id: string;
        plugins: import("@udecode/plate-core").WithPlatePlugin<{}, Value, import("@udecode/plate-core").PlateEditor<Value>>[];
        pluginsByKey: Record<string, import("@udecode/plate-core").WithPlatePlugin<{}, Value, import("@udecode/plate-core").PlateEditor<Value>>>;
        prevSelection: import("slate").BaseRange | null;
        currentKeyboardEvent: import("react").KeyboardEvent<Element> | null;
    };
    normalize: () => void;
};
