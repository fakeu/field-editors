import React from 'react';
import { BaseExtensionSDK } from '@contentful/app-sdk';
import { Asset, ContentType, Entry, Resource, ResourceType, Space, ScheduledAction } from '../types';
export declare type ResourceInfo<R extends Resource = Resource> = {
    resource: R;
    defaultLocaleCode: string;
    contentType: ContentType;
    space: Space;
};
declare type EntityStoreProps = {
    sdk: BaseExtensionSDK;
    queryConcurrency?: number;
};
declare type GetOptions = {
    priority?: number;
};
declare type GetEntityOptions = GetOptions & {
    spaceId?: string;
    environmentId?: string;
};
declare type UseEntityOptions = GetEntityOptions & {
    enabled?: boolean;
};
declare type QueryEntityResult<E> = Promise<E>;
declare type GetResourceOptions = GetOptions;
declare type QueryResourceResult<R extends Resource = Resource> = QueryEntityResult<ResourceInfo<R>>;
declare type UseResourceOptions = GetResourceOptions & {
    enabled?: boolean;
};
declare type UseEntityResult<E> = {
    status: 'idle';
    data: never;
} | {
    status: 'loading';
    data: never;
} | {
    status: 'error';
    data: never;
} | {
    status: 'success';
    data: E;
};
declare type FetchableEntityType = 'Entry' | 'Asset';
declare type FetchableEntity = Entry | Asset;
export declare class UnsupportedError extends Error {
    isUnsupportedError: boolean;
    constructor(message: string);
}
export declare function isUnsupportedError(value: unknown): value is UnsupportedError;
declare const useEntityLoader: () => {
    getResource: <R extends Resource = Resource>(resourceType: ResourceType, urn: string, options?: GetOptions | undefined) => QueryResourceResult<R>;
    getEntity: <E extends FetchableEntity>(entityType: FetchableEntityType, entityId: string, options?: GetEntityOptions | undefined) => QueryEntityResult<E>;
    getEntityScheduledActions: (entityType: FetchableEntityType, entityId: string, options?: GetEntityOptions | undefined) => QueryEntityResult<ScheduledAction[]>;
};
export declare function useEntity<E extends FetchableEntity>(entityType: FetchableEntityType, entityId: string, options?: UseEntityOptions): UseEntityResult<E>;
export declare function useResource(resourceType: ResourceType, urn: string, options?: UseResourceOptions): {
    status: "loading" | "error" | "success";
    data: ResourceInfo<Resource> | undefined;
    error: unknown;
};
declare function EntityProvider({ children, ...props }: React.PropsWithChildren<EntityStoreProps>): JSX.Element;
export { EntityProvider, useEntityLoader };
