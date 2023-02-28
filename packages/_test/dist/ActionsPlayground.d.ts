/// <reference types="react" />
import type { Emitter } from 'mitt';
declare type ActionsPlaygroundProps = {
    mitt: Emitter;
    renderValue: Function;
};
declare function ActionsPlayground(props: ActionsPlaygroundProps): JSX.Element;
declare namespace ActionsPlayground {
    var defaultProps: {
        renderValue: (value: any) => JSX.Element;
    };
}
export { ActionsPlayground };
