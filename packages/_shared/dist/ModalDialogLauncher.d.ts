import React from 'react';
import { OpenCustomWidgetOptions } from '@contentful/app-sdk';
export declare function open(componentRenderer: (params: {
    onClose: Function;
    isShown: boolean;
}) => any): Promise<unknown>;
export declare function openDialog<T>(options: OpenCustomWidgetOptions, Component: React.SFC<{
    onClose: (result: T) => void;
}>): Promise<unknown>;
declare const _default: {
    openDialog: typeof openDialog;
};
export default _default;
