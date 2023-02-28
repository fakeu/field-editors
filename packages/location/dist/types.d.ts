export { Coords } from 'google-map-react';
export declare type LocationValue = {
    lat: number;
    lon: number;
};
export declare type NullableLocationValue = LocationValue | null | undefined;
export declare enum ViewType {
    Address = "Address",
    Coordinates = "Coordinates"
}
export declare type GeocodeApiResponse = null | Array<{
    formatted_address: string;
    geometry: {
        location: {
            lat: () => number;
            lng: () => number;
        };
    };
}>;
