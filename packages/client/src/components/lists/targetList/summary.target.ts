import { getSynsAndStabs } from './../common';
import { ITarget } from 'balanced-gym-model';
import { getTimeFromString } from '../../../utils/dateUtils';
import { addS } from '../../../utils/utils';

export const getTargetSummary2 = (target: ITarget) => {
    let text = '';
    const { lastUpdated, doneToday } = target;
    // const ecount = exercisesCount || 0;  
    if (!lastUpdated) {
         text = ``;
    } else {
        if (lastUpdated) {
            text = getTimeFromString(lastUpdated)
        } 
        if (doneToday) {
            text = `${text}, ${doneToday} done today`;
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

