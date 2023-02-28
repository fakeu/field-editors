/// <reference types="react" />
import { DialogsAPI } from '@contentful/app-sdk';
export declare type EmbedExternalContentModalResult = string | false | undefined;
declare type EmbedExternalContentModalProps = {
    onClose: (result: EmbedExternalContentModalResult) => void;
};
export declare const EmbedExternalContentModal: ({ onClose }: EmbedExternalContentModalProps) => JSX.Element;
export declare const openEmbedExternalContentDialog: (dialogs: DialogsAPI) => Promise<EmbedExternalContentModalResult>;
export {};
