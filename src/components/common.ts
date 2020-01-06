import { IRoutine } from './../model/RoutineModel';
import { getTimeFromString } from '../utils/dateUtils';
import { addS } from '../utils/utils';

export const getRoutineSummary1 = (routine: IRoutine) => {
    const {targetsCount, exercisesCount = 0} = routine;
    let text = '';
    if (targetsCount === undefined) {
        return 'No targets';
    }
    if (targetsCount === 0) {
        return '0 targets';
    }
    text = `${text}${addS('target', targetsCount)} ${addS('exercise', exercisesCount)}`
    return text;
}

export const getRoutineSummary2 = (routine: IRoutine) => {
    const {targetsCount, lastUpdated, doneToday = 0} = routine;
    let text = '';
    if (targetsCount === undefined) {
        return '';
    }
    if (targetsCount === 0) {
        return '';
    }
    if (lastUpdated) {
        text = getTimeFromString(lastUpdated)
    } 
    if (doneToday) {
        text = `${text}, ${doneToday} done today`;
    }
    return text;
}


export const getSynsAndStabs = (synergistsCount: any, stabilizersCount: any) => {
    let text = ''
    if (synergistsCount || stabilizersCount) text = text + ` (`;
    if (synergistsCount) {
             text = text + `syns: ${synergistsCount}`;
    }
    if (stabilizersCount) {
        if (synergistsCount) text = text + `, `;
        text = text + `stbs: ${stabilizersCount}`;
    }
    if (synergistsCount || stabilizersCount) text = text + `)`;
    return text;
}


   
