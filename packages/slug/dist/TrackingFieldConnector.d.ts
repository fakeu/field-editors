import React from 'react';
import { FieldExtensionSDK, FieldAPI } from '@contentful/app-sdk';
declare type Nullable = null | undefined;
interface TrackingFieldConnectorState<ValueType> {
    titleValue: ValueType | Nullable;
    isPublished: boolean;
    isSame: boolean;
}
interface TrackingFieldConnectorProps<ValueType> {
    sdk: FieldExtensionSDK;
    field: FieldAPI;
    defaultLocale: string;
    trackingFieldId?: string;
    isOptionalLocaleWithFallback: boolean;
    children: (state: TrackingFieldConnectorState<ValueType>) => React.ReactNode;
}
export declare class TrackingFieldConnector<ValueType> extends React.Component<TrackingFieldConnectorProps<ValueType>, TrackingFieldConnectorState<ValueType>> {
    static defaultProps: {
        children: () => null;
    };
    constructor(props: TrackingFieldConnectorProps<ValueType>);
    unsubscribeValue: Function | null;
    unsubscribeLocalizedValue: Function | null;
    unsubscribeSysChanges: Function | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
export {};
