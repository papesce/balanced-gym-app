import { ITarget } from './../model/TargetModel';
import { IRoutine } from './../model/RoutineModel';
import { getDaysFromString } from '../utils/dateUtils';
import { addS } from '../utils/utils';

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



export const getRoutineSummary = (routine: IRoutine) => {
    const {targetsCount, exercisesCount, lastUpdated, doneToday} = routine;
    let text = '';
    if (targetsCount === undefined) {
        return 'No targets';
    }
    const ecount = exercisesCount || 0;  
    if (targetsCount === 0) {
        text = addS('target', targetsCount);
    } else if (!lastUpdated) {
        text = `${addS('target', targetsCount)} ${addS('exercise', ecount)}`;
    } else {
    // TODO Color for labels
        const days = getDaysFromString(lastUpdated);    
        // self.daysLabel.textColor = Utils.getLabelColor(count: days)
        text = `${addS('day', days)} ${addS('target', targetsCount)} ${addS('exercise', ecount)}`
        if (doneToday || 0) {
            text = text + ` ${doneToday} done today`;
        }
    }
    return text;
}