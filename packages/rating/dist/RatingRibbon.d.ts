import * as React from 'react';
declare type RatingRibbonProps = {
    disabled: boolean;
    stars: number;
    value: number | null | undefined;
    onSelect: (val: number) => void;
};
declare type RatingRibbonState = {
    hovered: null | number;
};
export declare class RatingRibbon extends React.Component<RatingRibbonProps, RatingRibbonState> {
    state: {
        hovered: null;
    };
    isSelected: (num: number) => boolean;
    onBlur: () => void;
    onFocus: (num: number) => () => void;
    render(): JSX.Element;
}
export {};
