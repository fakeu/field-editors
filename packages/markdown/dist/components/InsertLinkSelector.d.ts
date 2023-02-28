/// <reference types="react" />
interface InsertLinkSelectorProps {
    onSelectExisting: Function;
    onAddNew: Function;
    canAddNew: boolean;
    disabled: boolean;
}
export declare const InsertLinkSelector: (props: InsertLinkSelectorProps) => JSX.Element;
export {};
