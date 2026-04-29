import { formatDistanceToNow, isToday as dfIsToday, format } from 'date-fns';

export const getDaysFromDate = (date1: Date, date2: Date = new Date()) => {
    const days = (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24);
    return Math.abs(Math.trunc(days));
};

export const getDaysFromString = (date1: string, date2?: string) => {
    const date = date2 ? new Date(date2) : undefined;
    return getDaysFromDate(new Date(date1), date);
};

export const getTimeFromDate = (date1: Date) => {
    return formatDistanceToNow(date1, { addSuffix: true });
};

export const getTimeFromString = (date1: string) => {
    return getTimeFromDate(new Date(date1));
};

export const isToday = (date: Date): boolean => {
    return dfIsToday(date);
};

export const getTimeForGraph = (date: string) => {
    const days: number = getDaysFromString(date);
    if (days === 0) {
        const seconds = secondsToNow(date);
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h`;
    }
    return `${days}d`;
};

export const formatDateString = (date: string) => {
    return format(new Date(date), 'dd/MM/yy HH:mm:ss');
};

export const millisToMinutesAndSeconds = (millis: number) => {
    const minutes: number = Math.floor(millis / 60000);
    const seconds: number = Math.trunc((millis % 60000) / 1000);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

export const secondsToNow = (date: string) => {
    const ms1 = new Date(date).getTime();
    const ms2 = new Date().getTime();
    const diff = ms2 - ms1;
    return Math.trunc(diff / 1000);
};
