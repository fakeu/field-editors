/// <reference types="react" />
interface CharCounterProps {
    value?: string;
    checkConstraint: (n: number) => boolean;
}
export declare function CharCounter(props: CharCounterProps): JSX.Element;
export {};
