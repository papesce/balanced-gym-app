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

export const isToday = (date: Date): boolean => {
    return moment(date).isSame(moment(), 'day');
}

export const getTimeForGraph = (date: string ) => {
    const days: number = getDaysFromString(date);
    if (days === 0) {        
        moment.updateLocale('en', {
            relativeTime: {
                future: 'in %s',
                past: 'secs ago',
                s:  '<1m',
                ss: '%ss',
                m:  '1m',
                mm: '%dm',
                h:  '<1h',
                hh: '%dh',
                d:  '<1d',
                dd: '%dd',
          }
      });
      return getTimeFromString(date);
    }
    return `${days}d`;
}

export const formatDateString = (date: string) => {
    return moment(date).format('DD/MM/YY hh:mm:ss');
}

export const  millisToMinutesAndSeconds = (millis: number) => {
    const minutes: number = Math.floor(millis / 60000);
    const seconds: number = Math.trunc((millis % 60000) / 1000);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const secondsToNow = (date: string) => {
    const ms1 = new Date(date).getTime();
    const ms2 = new Date().getTime();
    const diff = ms2 - ms1;
    return  Math.trunc(diff / 1000);
}
    

