/// <reference types="react" />
import { DialogExtensionSDK } from '@contentful/app-sdk';
import { MarkdownDialogsParams } from '../types';
export declare const renderMarkdownDialog: (sdk: DialogExtensionSDK & {
    parameters: {
        invocation: MarkdownDialogsParams;
    };
}) => JSX.Element;
