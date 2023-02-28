import { NodeEntry } from '../../internal/types';
import { PlateEditor } from '../../internal/types';
import { FetchedEntityData } from './useEntityInfo';
export declare const hasText: (editor: PlateEditor, entry: NodeEntry<import("../../internal/types").Node>) => boolean;
export declare function getEntityInfo(data?: FetchedEntityData): string;
