/// <reference types="react" />
interface SlugEditorFieldProps {
    hasError: boolean;
    isOptionalLocaleWithFallback: boolean;
    isDisabled: boolean;
    value: string | null | undefined;
    locale: string;
    titleValue: string | null | undefined;
    createdAt: string;
    setValue: (value: string | null | undefined) => void;
    performUniqueCheck: (value: string) => Promise<boolean>;
}
export declare function SlugEditorFieldStatic(props: SlugEditorFieldProps & {
    onChange?: Function;
    onBlur?: Function;
}): JSX.Element;
export declare function SlugEditorField(props: SlugEditorFieldProps): JSX.Element;
export {};
