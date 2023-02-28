/// <reference types="react" />
import { DialogsAPI } from '@contentful/app-sdk';
declare type InsertLinkModalPositiveResult = {
    url: string;
    text: string;
    title: string;
};
export declare type InsertLinkModalResult = InsertLinkModalPositiveResult | false | undefined;
declare type InsertLinkModalProps = {
    selectedText?: string;
    onClose: (result: InsertLinkModalResult) => void;
};
export declare const InsertLinkModal: ({ selectedText, onClose }: InsertLinkModalProps) => JSX.Element;
export declare const openInsertLinkDialog: (dialogs: DialogsAPI, params: {
    selectedText?: string;
}) => Promise<InsertLinkModalResult>;
export {};
