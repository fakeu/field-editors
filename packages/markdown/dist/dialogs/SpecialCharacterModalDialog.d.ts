/// <reference types="react" />
import { DialogsAPI } from '@contentful/app-sdk';
export declare type SpecialCharacterModalResult = string | false | undefined;
declare type SpecialCharacterModalDialogProps = {
    onClose: (result: SpecialCharacterModalResult) => void;
};
export declare const SpecialCharacterModalDialog: ({ onClose }: SpecialCharacterModalDialogProps) => JSX.Element;
export declare const openInsertSpecialCharacter: (dialogs: DialogsAPI) => Promise<SpecialCharacterModalResult>;
export {};
