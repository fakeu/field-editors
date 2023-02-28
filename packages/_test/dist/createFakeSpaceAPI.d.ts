import { SpaceAPI } from '@contentful/app-sdk';
declare type CustomizeMockFn = (api: SpaceAPI) => SpaceAPI;
export declare function createFakeSpaceAPI(customizeMock?: CustomizeMockFn): SpaceAPI;
export {};
