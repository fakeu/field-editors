import { EditorNodesOptions, PlateEditor } from '../../../internal/types';
export declare type MoveListItemsOptions = {
    increase?: boolean;
    at?: EditorNodesOptions['at'];
};
export declare const moveListItems: (editor: PlateEditor, { increase, at }?: MoveListItemsOptions) => void;
