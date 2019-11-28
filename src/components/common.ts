import { getDaysFromString } from '../utils/dateUtils';
import { addS } from '../utils/utils';

export const getSummary = (targetsCount: number | undefined, 
    exercisesCount: number | undefined,
    lastUpdated: string| undefined,
    doneToday: number | undefined) => {
    let text = '';
    const tcount = targetsCount;
    if (tcount === undefined) {
        return 'No targets';
    }
    const ecount = exercisesCount || 0;  
    if (tcount === 0) {
        text = addS('target', tcount);
    } else if (!lastUpdated) {
        text = `${addS('target', tcount)} ${addS('exercise', ecount)}`;
    } else {
    // TODO Color for labels
        const days = getDaysFromString(lastUpdated);    
        // self.daysLabel.textColor = Utils.getLabelColor(count: days)
        text = `${addS('day', days)} ${addS('target', tcount)} ${addS('exercise', ecount)}`
        if (doneToday || 0) {
            text = text + ` ${doneToday} done today`;
        }
    }
    return text;
}