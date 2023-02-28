import { LocalesAPI } from '@contentful/app-sdk';
declare type CustomizeMockFn = (fieldApi: LocalesAPI) => LocalesAPI;
export declare function createFakeLocalesAPI(customizeMock?: CustomizeMockFn): LocalesAPI;
export {};
