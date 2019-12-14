import { getSynsAndStabs } from './../common';
import { ITarget } from '../../model/TargetModel';
import { getDaysFromString } from '../../utils/dateUtils';
import { addS } from '../../utils/utils';

export const getTargetSummary2 = (target: ITarget) => {
    let text = '';
    const { lastUpdated, doneToday } = target;
    // const ecount = exercisesCount || 0;  
    if (!lastUpdated) {
         text = ``;
    } else {
     // TODO Color for labels
         const days = getDaysFromString(lastUpdated);    
         // self.daysLabel.textColor = Utils.getLabelColor(count: days)
        text = `${addS('day', days)}`
        if (doneToday || 0) {
            text = text + ` ${doneToday} done today`;
        }
     }
    return text;
}

export const getTargetSummary1 = (target: ITarget) => {
    let text = '';
    const { exercisesCount, synergistsCount, stabilizersCount} = target;
    const ecount = exercisesCount || 0;  
    text = `${addS('exercise', ecount)}`
    text = text + getSynsAndStabs(synergistsCount, stabilizersCount);
    return text;
}

export const getTargetSummary = (target: ITarget) => {
    let text = '';
    const { exercisesCount, lastUpdated, doneToday} = target;
    const ecount = exercisesCount || 0;  
    if (!lastUpdated) {
        text = `${addS('exercise', ecount)}`;
    } else {
    // TODO Color for labels
        const days = getDaysFromString(lastUpdated);    
        // self.daysLabel.textColor = Utils.getLabelColor(count: days)
        text = `${addS('day', days)} ${addS('exercise', ecount)}`
        if (doneToday || 0) {
            text = text + ` ${doneToday} done today`;
        }
    }
    return text;
}