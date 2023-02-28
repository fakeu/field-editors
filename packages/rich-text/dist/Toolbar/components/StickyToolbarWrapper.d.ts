import { ReactNode } from 'react';
declare type StickyToolbarProps = {
    isDisabled?: boolean;
    children: ReactNode;
};
declare const StickyToolbarWrapper: ({ isDisabled, children }: StickyToolbarProps) => JSX.Element;
export default StickyToolbarWrapper;
