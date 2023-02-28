import { Asset, ContentEntityType, Entry, FieldExtensionSDK, Link, ScheduledAction } from '@contentful/app-sdk';
import { entityHelpers } from '@contentful/field-editor-shared';
export declare type FetchedEntityData = {
    jobs: ScheduledAction[];
    entity: Entry | Asset;
    entityTitle: string;
    entityDescription: string;
    entityStatus: ReturnType<typeof entityHelpers.getEntryStatus>;
    contentTypeName: string;
};
export declare type EntityInfoProps = {
    target: Link<ContentEntityType>;
    sdk: FieldExtensionSDK;
    onEntityFetchComplete?: VoidFunction;
};
export declare function useEntityInfo(props: EntityInfoProps): string;
