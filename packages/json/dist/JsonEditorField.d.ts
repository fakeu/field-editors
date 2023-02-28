/// <reference types="react" />
declare type JsonEditorFieldProps = {
    isDisabled: boolean;
    value: string;
    onChange: (value: string) => void;
};
export declare function JsonEditorField(props: JsonEditorFieldProps): JSX.Element;
export {};
