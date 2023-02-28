/// <reference types="react" />
export declare type TimepickerProps = {
    disabled: boolean;
    uses12hClock: boolean;
    onChange: (value: {
        time: string;
        ampm: string;
    }) => void;
    time?: string;
    ampm?: string;
};
export declare const TimepickerInput: ({ disabled, uses12hClock, time, ampm, onChange, }: TimepickerProps) => JSX.Element;
