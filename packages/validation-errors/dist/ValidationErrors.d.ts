/// <reference types="react" />
import type { SpaceAPI, Entry, FieldAPI, LocalesAPI } from '@contentful/field-editor-shared';
export interface ValidationErrorsProps {
    field: FieldAPI;
    space: SpaceAPI;
    locales: LocalesAPI;
    getEntryURL: (entry: Entry) => string;
}
export declare function ValidationErrors(props: ValidationErrorsProps): JSX.Element | null;
