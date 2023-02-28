import moment from 'moment';
export declare type DateTimeFormat = 'dateonly' | 'time' | 'timeZ';
export declare type TimeFormat = '12' | '24';
export declare type TimeResult = {
    date?: moment.Moment;
    time?: string;
    ampm: string;
    utcOffset: string;
};
