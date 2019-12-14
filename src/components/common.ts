import { IRoutine } from './../model/RoutineModel';
import { getDaysFromString } from '../utils/dateUtils';
import { addS } from '../utils/utils';

export const getRoutineSummary = (routine: IRoutine) => {
    const {targetsCount, exercisesCount = 0, lastUpdated, doneToday = 0} = routine;
    let text = '';
    if (targetsCount === undefined) {
        return 'No targets';
    }
    if (targetsCount === 0) {
        return addS('target', targetsCount);
    }
    if (lastUpdated) {
        const days = getDaysFromString(lastUpdated); 
        text = `${addS('day', days)} `;
    } 
    // TODO Color for labels           
    // self.daysLabel.textColor = Utils.getLabelColor(count: days)
    text = `${text}${addS('target', targetsCount)} ${addS('exercise', exercisesCount)}`
    if (doneToday) {
        text = `${text} ${doneToday} done today`;
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


   
