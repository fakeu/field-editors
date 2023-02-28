/// <reference types="react" />
import { RenderDragFn, ResourceLink } from '../../types';
import { CardActionsHandlers, EntryRoute } from './ContentfulEntryCard';
declare type ResourceCardProps = {
    index?: number;
    resourceLink?: ResourceLink;
    isDisabled: boolean;
    renderDragHandle?: RenderDragFn;
    getEntryRouteHref: (entryRoute: EntryRoute) => string;
} & CardActionsHandlers;
export declare function ResourceCard(props: ResourceCardProps): JSX.Element;
export {};
