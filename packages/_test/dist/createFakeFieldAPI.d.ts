import type { Emitter } from 'mitt';
import { FieldAPI } from '@contentful/app-sdk';
declare type CustomizeMockFn = (fieldApi: FieldAPI) => FieldAPI;
export declare function createFakeFieldAPI<T>(customizeMock?: CustomizeMockFn, initialValue?: T): [FieldAPI, Emitter];
export {};
