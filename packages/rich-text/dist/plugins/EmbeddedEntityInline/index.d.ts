import { FieldExtensionSDK } from '@contentful/app-sdk';
import { PlatePlugin } from '../../internal/types';
interface ToolbarEmbeddedEntityInlineButtonProps {
    onClose: () => void;
    isDisabled: boolean;
}
export declare function ToolbarEmbeddedEntityInlineButton(props: ToolbarEmbeddedEntityInlineButtonProps): JSX.Element;
export declare function createEmbeddedEntityInlinePlugin(sdk: FieldExtensionSDK): PlatePlugin;
export {};
