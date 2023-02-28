/// <reference types="react" />
import moment from 'moment';
export declare type DatePickerProps = {
    value?: moment.Moment;
    onChange: (val: moment.Moment | undefined) => void;
    disabled?: boolean;
};
export declare const DatepickerInput: (props: DatePickerProps) => JSX.Element;
