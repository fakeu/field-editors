/// <reference types="lodash" />
import React from 'react';
import { FieldAPI, ValidationError } from '@contentful/app-sdk';
declare type Nullable = null | undefined;
export interface FieldConnectorChildProps<ValueType> {
    isLocalValueChange: boolean;
    externalReset: number;
    lastRemoteValue: ValueType | Nullable;
    value: ValueType | Nullable;
    disabled: boolean;
    errors: ValidationError[];
    setValue: (value: ValueType | Nullable) => Promise<unknown>;
}
interface FieldConnectorState<ValueType> {
    isLocalValueChange: boolean;
    externalReset: number;
    lastRemoteValue: ValueType | Nullable;
    value: ValueType | Nullable;
    disabled: boolean;
    errors: ValidationError[];
}
interface FieldConnectorProps<ValueType> {
    field: FieldAPI;
    isInitiallyDisabled: boolean;
    children: (state: FieldConnectorChildProps<ValueType>) => React.ReactNode;
    isEmptyValue: (value: ValueType | null) => boolean;
    isEqualValues: (value1: ValueType | Nullable, value2: ValueType | Nullable) => boolean;
    throttle: number;
}
export declare class FieldConnector<ValueType> extends React.Component<FieldConnectorProps<ValueType>, FieldConnectorState<ValueType>> {
    static defaultProps: {
        children: () => null;
        isEmptyValue: (value: any | Nullable) => boolean;
        isEqualValues: (value1: any | Nullable, value2: any | Nullable) => boolean;
        throttle: number;
    };
    constructor(props: FieldConnectorProps<ValueType>);
    unsubscribeErrors: Function | null;
    unsubscribeDisabled: Function | null;
    unsubscribeValue: Function | null;
    setValue: (value: ValueType | Nullable) => Promise<void>;
    triggerSetValueCallbacks: import("lodash").DebouncedFunc<(value: ValueType | Nullable) => Promise<unknown>>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
export {};
