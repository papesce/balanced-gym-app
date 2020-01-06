import moment from 'moment';

export const getDaysFromDate = (date1: Date, date2: Date = new Date()) => {
    const days = (date1.getTime()- date2.getTime()) / (1000 * 3600 * 24);
    return Math.abs(Math.trunc(days));
};

export const getDaysFromString = (date1: string, date2?: string) => {
    const date = date2 ? new Date(date2) : undefined; 
    return getDaysFromDate(new Date(date1), date);
}

export const getTimeFromDate = (date1: Date, date2: Date = new Date()) => {
    return moment(date1).from(date2); //
}

export const getTimeFromString = (date1: string, date2?: string) => {
    const date = date2 ? new Date(date2) : undefined; 
    return getTimeFromDate(new Date(date1), date);
}



