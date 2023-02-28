/// <reference types="react" />
import { DialogsAPI, DialogExtensionSDK } from '@contentful/app-sdk';
import { PreviewComponents } from '../types';
export declare type ZenModeResult = {
    value: string;
    cursor?: {
        ch: number;
        line: number;
    };
};
declare type ZenModeDialogProps = {
    saveValueToSDK: (value: string | null | undefined) => void;
    onClose: (result: ZenModeResult) => void;
    initialValue: string;
    locale: string;
    sdk: DialogExtensionSDK;
    previewComponents?: PreviewComponents;
};
export declare const ZenModeModalDialog: (props: ZenModeDialogProps) => JSX.Element;
export declare const openZenMode: (dialogs: DialogsAPI, options: {
    initialValue: string;
    locale: string;
}) => Promise<ZenModeResult>;
export {};
