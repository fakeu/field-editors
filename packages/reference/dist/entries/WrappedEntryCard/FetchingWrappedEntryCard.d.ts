/// <reference types="react" />
import { RenderCustomMissingEntityCard } from '../../common/customCardTypes';
import { ReferenceEditorProps } from '../../common/ReferenceEditor';
import { ContentType, RenderDragFn } from '../../types';
export declare type EntryCardReferenceEditorProps = ReferenceEditorProps & {
    entryId: string;
    index?: number;
    allContentTypes: ContentType[];
    isDisabled: boolean;
    onRemove: () => void;
    renderDragHandle?: RenderDragFn;
    hasCardEditActions: boolean;
    onMoveTop?: () => void;
    onMoveBottom?: () => void;
    renderCustomMissingEntityCard?: RenderCustomMissingEntityCard;
    isBeingDragged?: boolean;
};
export declare function FetchingWrappedEntryCard(props: EntryCardReferenceEditorProps): JSX.Element;
