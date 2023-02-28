import { FieldExtensionSDK } from '@contentful/app-sdk';
import { PlateEditor } from '../../internal/types';
export interface Command {
    id: string;
    thumbnail?: string;
    label: string;
    callback?: () => void;
}
export interface CommandGroup {
    group: string;
    commands: Command[];
}
export declare type CommandList = (Command | CommandGroup)[];
export declare function isCommandPromptPluginEnabled(sdk: FieldExtensionSDK): {
    inlineAllowed: boolean;
    entriesAllowed: boolean;
    assetsAllowed: boolean;
};
export declare const useCommands: (sdk: FieldExtensionSDK, query: string, editor: PlateEditor) => CommandList;
