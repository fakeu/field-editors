import React from 'react';
import { FieldExtensionSDK } from '@contentful/field-editor-shared';
interface FetchingWrappedInlineEntryCardProps {
    entryId: string;
    sdk: FieldExtensionSDK;
    isSelected: boolean;
    isDisabled: boolean;
    onEdit: (event: React.MouseEvent<Element, MouseEvent>) => void;
    onRemove: (event: React.MouseEvent<Element, MouseEvent>) => void;
    onEntityFetchComplete?: VoidFunction;
}
export declare function FetchingWrappedInlineEntryCard(props: FetchingWrappedInlineEntryCardProps): JSX.Element;
export {};
