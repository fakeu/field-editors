/// <reference types="react" />
import { ReferenceEditorProps } from '../common/ReferenceEditor';
import { EntryRoute } from './Cards/ContentfulEntryCard';
export declare function MultipleResourceReferenceEditor(props: ReferenceEditorProps & {
    apiUrl: string;
    getEntryRouteHref: (entryRoute: EntryRoute) => string;
}): JSX.Element;
