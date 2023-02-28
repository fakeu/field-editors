import { Link } from '@contentful/app-sdk';
import { Element, RenderElementProps } from '../../../internal/types';
declare type HyperlinkElementProps = {
    element: Element & {
        data: {
            uri?: string;
            target: {
                sys: {
                    id: string;
                    linkType: 'Entry' | 'Asset';
                    type: 'Link';
                };
            };
        };
    };
    target?: Link;
    onEntityFetchComplete?: VoidFunction;
    children: Pick<RenderElementProps, 'children'>;
};
export declare function UrlHyperlink(props: HyperlinkElementProps): JSX.Element;
export {};
