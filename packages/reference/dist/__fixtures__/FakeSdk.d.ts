import { FieldExtensionSDK } from '@contentful/app-sdk';
import { Emitter } from 'mitt';
export declare type ReferenceEditorSdkProps = {
    initialValue?: any;
    validations?: any;
    fetchDelay?: number;
};
export declare function newReferenceEditorFakeSdk(props?: ReferenceEditorSdkProps): [FieldExtensionSDK, Emitter];
