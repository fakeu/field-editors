import { FieldExtensionSDK } from '@contentful/app-sdk';
interface FetchingWrappedAssetCardProps {
    assetId: string;
    isDisabled: boolean;
    isSelected: boolean;
    locale: string;
    onEdit?: () => void;
    onRemove?: () => unknown;
    sdk: FieldExtensionSDK;
    onEntityFetchComplete?: VoidFunction;
}
export declare function FetchingWrappedAssetCard(props: FetchingWrappedAssetCardProps): JSX.Element;
export {};
