/// <reference types="react" />
import { Entry } from '@contentful/field-editor-shared';
import { RenderDragFn, ResourceInfo } from '../../types';
export declare type CardActionsHandlers = {
    onRemove?: VoidFunction;
    onMoveTop?: VoidFunction;
    onMoveBottom?: VoidFunction;
};
export declare type EntryRoute = {
    spaceId: string;
    environmentId: string;
    entryId: string;
};
declare type ContentfulEntryCardProps = {
    info: ResourceInfo<Entry>;
    isDisabled: boolean;
    renderDragHandle?: RenderDragFn;
    getEntryRouteHref: (entryRoute: EntryRoute) => string;
} & CardActionsHandlers;
export declare function ContentfulEntryCard({ info, isDisabled, renderDragHandle, onRemove, onMoveTop, onMoveBottom, getEntryRouteHref, }: ContentfulEntryCardProps): JSX.Element;
export {};
