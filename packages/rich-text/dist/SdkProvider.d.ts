import * as React from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';
interface SdkProviderProps {
    sdk: FieldExtensionSDK;
}
export declare const SdkProvider: React.FC<SdkProviderProps>, useSdkContext: () => FieldExtensionSDK;
export {};
