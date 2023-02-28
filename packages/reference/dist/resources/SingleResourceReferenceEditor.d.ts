/// <reference types="react" />
import { ReferenceEditorProps } from '../common/ReferenceEditor';
import { EntryRoute } from './Cards/ContentfulEntryCard';
export declare function SingleResourceReferenceEditor(props: ReferenceEditorProps & {
    getEntryRouteHref: (entryRoute: EntryRoute) => string;
    apiUrl: string;
}): JSX.Element;
