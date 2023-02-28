import React from 'react';
import { Coords } from './types';
declare type GoogleMapViewProps = {
    disabled: boolean;
    location: Coords | undefined;
    onGoogleApiLoaded: ({ maps }: {
        maps: any;
    }) => void;
    onChangeLocation: (location: Coords) => void;
    googleMapsKey?: string;
};
declare type GoogleMapsViewState = {
    marker: any;
    maps: any;
};
export declare class GoogleMapView extends React.Component<GoogleMapViewProps, GoogleMapsViewState> {
    constructor(props: GoogleMapViewProps);
    componentDidUpdate(): void;
    onGoogleApiLoaded: (event: {
        maps: any;
        map: any;
    }) => void;
    render(): JSX.Element;
}
export {};
