import { getSynsAndStabs } from './../common';
import { IMuscleSummary } from 'balanced-gym-model';
import { getTimeFromString } from '../../../utils/dateUtils';
import { addS } from '../../../utils/utils';

export const getTargetSummary2 = (target: IMuscleSummary) => {
    let text = '';
    const { lastUpdated, doneToday } = target;
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

export const getTargetSummary1 = (target: IMuscleSummary) => {
    let text = '';
    const { exercisesCount, synergistsCount, stabilizersCount} = target;
    const ecount = exercisesCount || 0;  
    text = `${addS('ex', ecount)}`
    text = text + getSynsAndStabs(synergistsCount, stabilizersCount);
    return text;
}

export const getTargetSummary3 = (target: IMuscleSummary) => {
    let text = '';
    const { exercisesCount, maxSeries = 0, minSeries, totalSeries = 0 } = target;
    if (exercisesCount && exercisesCount > 0) {
        text = `ts:${totalSeries} maxs:${maxSeries}`;
        text = text + ((minSeries && minSeries >= 0) ? ` mins:${minSeries}` : ` mins:0`);
        text = text + ` ratio:${Math.round(totalSeries/exercisesCount)}`;
    }
    return text;
}

