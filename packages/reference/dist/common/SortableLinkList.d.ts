import React from 'react';
import { SortableContainerProps } from 'react-sortable-hoc';
import { ReferenceEditorProps } from './ReferenceEditor';
declare type SortableContainerChildProps<IType> = Pick<SortableLinkListProps<IType>, 'items' | 'isDisabled'> & {
    item: IType;
    index: number;
    DragHandle?: typeof DragHandle;
};
declare type SortableLinkListProps<T> = ReferenceEditorProps & {
    items: T[];
    isDisabled: boolean;
    children: (props: SortableContainerChildProps<T>) => React.ReactElement;
    className?: string;
};
declare const DragHandle: (props: {
    drag: React.ReactElement;
}) => JSX.Element;
export declare function SortableLinkList<T>(props: SortableLinkListProps<T> & SortableContainerProps): JSX.Element;
export {};
