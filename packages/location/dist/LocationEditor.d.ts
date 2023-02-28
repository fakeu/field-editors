import * as React from 'react';
import { FieldAPI, ParametersAPI } from '@contentful/field-editor-shared';
import { ViewType, NullableLocationValue, Coords, GeocodeApiResponse } from './types';
export interface LocationEditorConnectedProps {
    /**
     * is the field disabled initially
     */
    isInitiallyDisabled: boolean;
    /**
     * sdk.field
     */
    field: FieldAPI;
    /**
     * sdk.parameters
     */
    parameters?: ParametersAPI & {
        instance: {
            googleMapsKey?: string;
        };
    };
}
declare type LocationEditorProps = {
    disabled: boolean;
    value: NullableLocationValue;
    setValue: (value: NullableLocationValue) => void;
    googleMapsKey?: string;
    selectedView: ViewType;
    setSelectedView: (view: ViewType) => void;
};
export declare class LocationEditor extends React.Component<LocationEditorProps, {
    localValue?: Coords;
    mapsObject: any;
}> {
    constructor(props: LocationEditorProps);
    onSearchAddress: (value: string) => Promise<GeocodeApiResponse>;
    onGetAddressFromLocation: (location: Coords | undefined, value: string) => Promise<string>;
    render(): JSX.Element;
}
export declare function LocationEditorConnected(props: LocationEditorConnectedProps): JSX.Element;
export declare namespace LocationEditorConnected {
    var defaultProps: {
        isInitiallyDisabled: boolean;
    };
}
export {};
