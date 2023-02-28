import { FieldExtensionSDK } from '@contentful/app-sdk';
import { EntryProps } from 'contentful-management';
import { LinkActionsProps } from '../components';
export declare function useResourceLinkActions({ dialogs, field, onAfterLink, apiUrl, }: Pick<FieldExtensionSDK, 'field' | 'dialogs'> & {
    apiUrl: string;
    onAfterLink?: (e: EntryProps) => void;
}): LinkActionsProps;
