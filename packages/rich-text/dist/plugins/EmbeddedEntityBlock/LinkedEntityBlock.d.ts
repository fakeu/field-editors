import { Element, RenderElementProps } from '../../internal/types';
declare type LinkedEntityBlockProps = {
    element: Element & {
        data: {
            target: {
                sys: {
                    id: string;
                    linkType: 'Entry' | 'Asset';
                    type: 'Link';
                };
            };
        };
    };
    attributes: Pick<RenderElementProps, 'attributes'>;
    children: Pick<RenderElementProps, 'children'>;
    onEntityFetchComplete: VoidFunction;
};
export declare function LinkedEntityBlock(props: LinkedEntityBlockProps): JSX.Element;
export {};
