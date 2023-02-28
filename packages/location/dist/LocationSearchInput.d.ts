/// <reference types="react" />
import { Coords, GeocodeApiResponse } from './types';
declare type LocationSearchInputProps = {
    disabled: boolean;
    value?: Coords;
    onSearchAddress: (term: string) => Promise<GeocodeApiResponse>;
    onGetAddressFromLocation: (coors: Coords | undefined, value: string) => Promise<string>;
    onChangeLocation: (location?: Coords) => void;
};
export declare function LocationSearchInput(props: LocationSearchInputProps): JSX.Element;
export {};
