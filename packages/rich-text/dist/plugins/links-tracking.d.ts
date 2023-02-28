import React, { ComponentProps } from 'react';
import { HyperlinkElementProps } from './Hyperlink/components/EntityHyperlink';
export declare function withLinkTracking(Component: React.ComponentType<HyperlinkElementProps>): (props: ComponentProps<typeof Component>) => JSX.Element;
