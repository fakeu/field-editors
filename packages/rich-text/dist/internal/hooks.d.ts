import * as p from '@udecode/plate-core';
export declare const useReadOnly: () => boolean;
export declare const usePlateEditorRef: <V extends p.Value = p.Value, E extends p.PlateEditor<V> = p.PlateEditor<V>>(id?: string | undefined) => E | null;
export declare const usePlateEditorState: <V extends p.Value = p.Value, E extends p.PlateEditor<V> = p.PlateEditor<V>>(id?: string | undefined) => E | null;
