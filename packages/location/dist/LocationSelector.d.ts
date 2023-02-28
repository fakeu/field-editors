/// <reference types="react" />
import { Coords, ViewType, GeocodeApiResponse } from './types';
interface LocationSelectorProps {
    disabled: boolean;
    value: Coords | undefined;
    view: ViewType;
    onChangeView: (view: ViewType) => void;
    onChangeLocation: (value?: Coords) => void;
    onSearchAddress: (value: string) => Promise<GeocodeApiResponse>;
    onGetAddressFromLocation: (location: Coords | undefined, address: string) => Promise<string>;
}
export declare function LocationSelector(props: LocationSelectorProps): JSX.Element;
export {};
