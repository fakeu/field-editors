/// <reference types="react" />
import { MarkdownTab } from '../types';
interface MarkdownTabsProps {
    active: MarkdownTab;
    onSelect: (selected: MarkdownTab) => void;
}
export declare function MarkdownTabs(props: MarkdownTabsProps): JSX.Element;
export {};
