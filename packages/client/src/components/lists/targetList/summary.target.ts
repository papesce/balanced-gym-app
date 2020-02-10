import { getSynsAndStabs } from './../common';
import { IMuscleSummary } from 'balanced-gym-model';
import { getTimeForGraph } from '../../../utils/dateUtils';
import { addS } from '../../../utils/utils';

export const getTargetSummary2 = (target: IMuscleSummary) => {
    let text = '';
    const { lastUpdated, doneToday } = target;
    if (!lastUpdated) {
         text = ``;
    } else {
        if (lastUpdated) {
            text = getTimeForGraph(lastUpdated)
        } 
        if (doneToday) {
            text = `${text}, ${doneToday} done today`;
        }
     }
    return text;
}

export const getTargetSummary1 = (target: IMuscleSummary) => {
    let text = '';
    const { exercisesCount, synergistsCount, stabilizersCount} = target;
    const ecount = exercisesCount || 0;  
    text = `${addS('exercise', ecount)}`
    text = text + getSynsAndStabs(synergistsCount, stabilizersCount);
    return text;
}

