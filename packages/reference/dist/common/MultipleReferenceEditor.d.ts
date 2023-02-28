import * as React from 'react';
import { SortEndHandler, SortStartHandler } from 'react-sortable-hoc';
import { ReferenceValue, ContentEntityType, ContentType } from '../types';
import { ReferenceEditorProps } from './ReferenceEditor';
declare type ChildProps = {
    entityType: ContentEntityType;
    items: ReferenceValue[];
    isDisabled: boolean;
    setValue: (value: ReferenceValue[]) => void;
    allContentTypes: ContentType[];
    onSortStart: SortStartHandler;
    onSortEnd: SortEndHandler;
    onMove: (oldIndex: number, newIndex: number) => void;
};
export declare function MultipleReferenceEditor(props: ReferenceEditorProps & {
    entityType: ContentEntityType;
    children: (props: ReferenceEditorProps & ChildProps) => React.ReactElement;
    setIndexToUpdate?: React.Dispatch<React.SetStateAction<number | undefined>>;
}): JSX.Element;
export declare namespace MultipleReferenceEditor {
    var defaultProps: {
        hasCardEditActions: boolean;
    };
}
export {};
