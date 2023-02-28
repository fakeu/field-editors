/// <reference types="react" />
import { DialogsAPI } from '@contentful/app-sdk';
declare type InsertTableModalPositiveResult = {
    cols: number;
    rows: number;
};
export declare type InsertTableModalResult = InsertTableModalPositiveResult | false | undefined;
declare type InsertTableModalProps = {
    onClose: (result: InsertTableModalResult) => void;
};
export declare const InsertTableModal: ({ onClose }: InsertTableModalProps) => JSX.Element;
export declare const openInsertTableDialog: (dialogs: DialogsAPI) => Promise<InsertTableModalResult>;
export {};
