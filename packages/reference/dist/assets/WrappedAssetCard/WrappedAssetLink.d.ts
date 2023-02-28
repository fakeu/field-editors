/// <reference types="react" />
import { SpaceAPI } from '@contentful/field-editor-shared';
import { Asset, RenderDragFn } from '../../types';
export interface WrappedAssetLinkProps {
    getEntityScheduledActions: SpaceAPI['getEntityScheduledActions'];
    asset: Asset;
    localeCode: string;
    defaultLocaleCode: string;
    href?: string;
    className?: string;
    isDisabled: boolean;
    onEdit: () => void;
    onRemove: () => void;
    renderDragHandle?: RenderDragFn;
}
export declare const WrappedAssetLink: (props: WrappedAssetLinkProps) => JSX.Element;
