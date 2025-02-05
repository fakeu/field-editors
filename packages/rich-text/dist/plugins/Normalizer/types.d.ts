import { NodeEntry, NodeMatch, PlateEditor } from '../../internal/types';
export declare type NodeTransformer = (editor: PlateEditor, entry: NodeEntry) => void;
export declare type NodeValidator = (editor: PlateEditor, entry: NodeEntry) => boolean;
declare type BaseRule = {
    /**
     * A helper to return a Node to which valid* rules are applied
     * against.
     *
     * By default it returns only Elements of type `plugin.type`.
     */
    match?: NodeMatch;
    /**
     * A helper to normalize invalid Node(s). By default it removes
     * invalid nodes.
     *
     * Transformations are automatically wrapped in a
     * `Editor.withoutNormalization()` call to avoid unnecessary
     * normalization cycles.
     */
    transform?: NodeTransformer | Record<string | 'default', NodeTransformer>;
};
export declare type ValidNodeRule = BaseRule & {
    /**
     * Checks if matching Node(s) are valid.
     */
    validNode: NodeValidator;
};
export declare type ValidChildrenRule = BaseRule & {
    /**
     * Checks if matching Node's children are valid.
     *
     * The value can be an array of strings as a shorthand to indicate
     * valid children types.
     */
    validChildren: NodeValidator | string[];
};
export declare type NormalizerRule = ValidNodeRule | ValidChildrenRule;
export {};
