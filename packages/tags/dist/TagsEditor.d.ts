/// <reference types="react" />
import { ConstraintsType, Constraint } from './types';
export interface TagsEditorProps {
    items: string[];
    isDisabled: boolean;
    hasError: boolean;
    constraintsType?: ConstraintsType;
    constraints?: Constraint;
    onUpdate: (items: string[]) => void;
}
export declare function TagsEditor(props: TagsEditorProps): JSX.Element;
