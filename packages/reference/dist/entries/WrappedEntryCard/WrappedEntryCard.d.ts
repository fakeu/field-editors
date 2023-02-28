import * as React from 'react';
import { SpaceAPI } from '@contentful/app-sdk';
import { ContentType, Entry, RenderDragFn } from '../../types';
export interface WrappedEntryCardProps {
    getEntityScheduledActions: SpaceAPI['getEntityScheduledActions'];
    getAsset: (assetId: string) => Promise<unknown>;
    entryUrl?: string;
    size: 'small' | 'default' | 'auto';
    isDisabled: boolean;
    isSelected?: boolean;
    onRemove?: () => void;
    onEdit?: () => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    localeCode: string;
    defaultLocaleCode: string;
    contentType?: ContentType;
    spaceName?: string;
    entry: Entry;
    renderDragHandle?: RenderDragFn;
    isClickable?: boolean;
    onMoveTop?: () => void;
    onMoveBottom?: () => void;
    hasCardEditActions: boolean;
    hasCardMoveActions?: boolean;
    hasCardRemoveActions?: boolean;
}
export declare function WrappedEntryCard(props: WrappedEntryCardProps): JSX.Element;
export declare namespace WrappedEntryCard {
    var defaultProps: {
        isClickable: boolean;
        hasCardEditActions: boolean;
        hasCardMoveActions: boolean;
        hasCardRemoveActions: boolean;
    };
}
