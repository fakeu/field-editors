import { FieldExtensionSDK } from '@contentful/app-sdk';
import * as Contentful from '@contentful/rich-text-types';
import { RichTextTrackingActionHandler } from './plugins/Tracking';
declare type ConnectedProps = {
    sdk: FieldExtensionSDK;
    onAction?: RichTextTrackingActionHandler;
    minHeight?: string | number;
    value?: object;
    isDisabled?: boolean;
    onChange?: (doc: Contentful.Document) => unknown;
    isToolbarHidden?: boolean;
    actionsDisabled?: boolean;
    restrictedMarks?: string[];
};
export declare const ConnectedRichTextEditor: (props: ConnectedProps) => JSX.Element;
declare type Props = ConnectedProps & {
    isInitiallyDisabled: boolean;
};
declare const RichTextEditor: (props: Props) => JSX.Element;
export default RichTextEditor;
