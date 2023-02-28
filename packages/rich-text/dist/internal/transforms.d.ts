import * as p from '@udecode/plate-core';
import * as s from 'slate';
import { Except } from 'type-fest';
import { PlateEditor, Node, ToggleNodeTypeOptions, EditorNodesOptions, BaseRange, Value, Element, Path, Span, BasePoint, Location } from './types';
/**
 * Apply editor normalization rules
 */
export declare const normalize: (editor: PlateEditor, options?: s.EditorNormalizeOptions) => void;
/**
 * Set the selection to a location
 */
export declare const setSelection: (editor: PlateEditor, props: Partial<BaseRange>) => void;
export declare const select: (editor: PlateEditor, location: Location) => void;
export declare const moveSelection: (editor: PlateEditor, options?: import("slate/dist/transforms/selection").SelectionMoveOptions | undefined) => void;
export declare const moveChildren: (editor: PlateEditor, options: p.MoveChildrenOptions<Value>) => number;
export declare const collapseSelection: (editor: PlateEditor, options?: import("slate/dist/transforms/selection").SelectionCollapseOptions | undefined) => void;
export declare const setNodes: (editor: PlateEditor, attrs: Partial<Except<Node, 'children' | 'text'>>, opts?: p.SetNodesOptions<Value> | undefined) => void;
export declare const unsetNodes: (editor: PlateEditor, props: string | number | (string | number)[], options?: p.UnsetNodesOptions<Value> | undefined) => void;
export declare const insertNodes: (editor: PlateEditor, nodes: Node | Node[], opts?: p.InsertNodesOptions<p.Value> | undefined) => void;
export declare const splitNodes: (editor: PlateEditor, options?: p.SplitNodesOptions<Value> | undefined) => void;
export declare const liftNodes: (editor: PlateEditor, options?: p.LiftNodesOptions<Value> | undefined) => void;
export declare const unwrapNodes: (editor: PlateEditor, options?: p.UnwrapNodesOptions<Value> | undefined) => void;
export declare const wrapNodes: (editor: PlateEditor, element: Element, options?: p.WrapNodesOptions<Value> | undefined) => void;
export declare const toggleNodeType: (editor: PlateEditor, options: ToggleNodeTypeOptions, editorOptions?: Omit<EditorNodesOptions, "match"> | undefined) => void;
export declare const removeMark: (editor: PlateEditor, type: string, at: BaseRange) => void;
export declare const unhangRange: (editor: PlateEditor, range?: Path | BasePoint | BaseRange | Span | null | undefined, options?: p.UnhangRangeOptions | undefined) => s.BaseRange | undefined;
export declare const toggleMark: (editor: PlateEditor, options: p.ToggleMarkOptions<Value, keyof p.TText>) => void;
export declare const addMark: (editor: PlateEditor, type: string, value?: unknown) => void;
export declare const insertText: (editor: PlateEditor, text: string, options?: import("slate/dist/transforms/text").TextInsertTextOptions | undefined) => void;
export declare const deleteText: (editor: PlateEditor, opts?: Parameters<typeof p.deleteText>['1']) => void;
export declare const removeNodes: (editor: PlateEditor, opts?: p.RemoveNodesOptions<Value> | undefined) => void;
export declare const moveNodes: (editor: PlateEditor, opts?: p.MoveNodesOptions<Value> | undefined) => void;
export declare const deleteFragment: (editor: PlateEditor, options?: s.EditorFragmentDeletionOptions | undefined) => void;
