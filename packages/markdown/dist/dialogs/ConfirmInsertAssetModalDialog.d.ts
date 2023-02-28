/// <reference types="react" />
import { DialogsAPI } from '@contentful/app-sdk';
interface ConfirmInsertAssetModalDialogProps {
    onClose: (result: boolean) => void;
    assets: Array<{
        title: string;
        description: string;
        thumbnailUrl: string;
        thumbnailAltText: string;
    }>;
    locale: string;
}
export declare const ConfirmInsertAssetModalDialog: ({ onClose, assets, locale, }: ConfirmInsertAssetModalDialogProps) => JSX.Element;
export declare const openConfirmInsertAsset: (dialogs: DialogsAPI, options: {
    locale: string;
    assets: Array<{
        title: string;
        description: string;
        thumbnailUrl: string;
        thumbnailAltText: string;
    }>;
}) => Promise<boolean>;
export {};
