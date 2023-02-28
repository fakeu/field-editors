import { PlateEditor } from '../../internal/types';
import { TrackingPluginActions } from '../../plugins/Tracking';
export declare function selectEntityAndInsert(nodeType: any, sdk: any, editor: any, logAction: TrackingPluginActions['onToolbarAction'] | TrackingPluginActions['onShortcutAction']): Promise<void>;
export declare function insertBlock(editor: PlateEditor, nodeType: string, entity: any): void;
