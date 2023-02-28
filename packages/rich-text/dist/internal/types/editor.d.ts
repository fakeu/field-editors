/**
 * https://plate.udecode.io/docs/typescript
 */
import { MARKS } from '@contentful/rich-text-types';
import * as p from '@udecode/plate-core';
import * as s from 'slate';
import * as sr from 'slate-react';
import { SelectionMoveOptions as SlateSelectionMoveOptions, SelectionCollapseOptions as SlateSelectionCollapseOptions } from 'slate/dist/transforms/selection';
import { TextInsertTextOptions as SlateTextInsertTextOptions } from 'slate/dist/transforms/text';
import { TrackingPluginActions } from '../../plugins/Tracking';
export interface Text extends p.TText {
    [MARKS.BOLD]?: boolean;
    [MARKS.CODE]?: boolean;
    [MARKS.ITALIC]?: boolean;
    [MARKS.UNDERLINE]?: boolean;
    [MARKS.SUPERSCRIPT]?: boolean;
    [MARKS.SUBSCRIPT]?: boolean;
}
export interface Element extends p.TElement {
    type: string;
    data?: Record<string, unknown>;
    isVoid?: boolean;
    children: (Text | Element)[];
}
export declare type Value = Element[];
export declare type ReactEditor = p.TReactEditor<Value>;
export interface PlateEditor extends p.PlateEditor<Value> {
    tracking: TrackingPluginActions;
}
export declare type Node = p.ElementOf<PlateEditor> | p.TextOf<PlateEditor>;
export declare type Path = p.TPath;
export declare type NodeEntry<T extends Node = Node> = p.TNodeEntry<T>;
export declare type NodeMatch = p.ENodeMatch<Node>;
export declare type Ancestor = p.AncestorOf<PlateEditor>;
export declare type Descendant = p.DescendantOf<PlateEditor>;
export declare type Operation = p.TOperation<Descendant>;
export declare type Location = p.TLocation;
export declare type BaseRange = p.TRange;
export declare type ToggleNodeTypeOptions = p.ToggleNodeTypeOptions;
export declare type EditorNodesOptions = Omit<p.GetNodeEntriesOptions<Value>, 'match'>;
export declare type WithOverride<P = p.AnyObject> = p.WithOverride<P, Value, PlateEditor>;
export declare type SelectionMoveOptions = SlateSelectionMoveOptions;
export declare type TextInsertTextOptions = SlateTextInsertTextOptions;
export declare type SelectionCollapseOptions = SlateSelectionCollapseOptions;
export declare type HotkeyPlugin = p.HotkeyPlugin;
export declare type RenderLeafProps = sr.RenderLeafProps;
export declare type RenderElementProps = sr.RenderElementProps;
export declare type Span = p.TSpan;
export declare type BasePoint = s.BasePoint;
export declare type BaseSelection = s.BaseSelection;
export declare type PathRef = s.PathRef;
