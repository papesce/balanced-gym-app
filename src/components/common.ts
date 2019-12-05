import { IExercise } from './../model/ExerciseModel';
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

export const getExerciseSummary = (exercise: IExercise) => {
    let text = '';
    // setNumberOfDays(exercise: withExercise)
    const { lastReps, lastWeight = 0, seriesCount = 0, lastUpdated,  } = exercise;
    if (lastUpdated) {
        const days = getDaysFromString(lastUpdated);  
        text = `${addS('day', days)} `;
    }
    // TODO: self.setLineColor(color: Utils.getLabelColor(count: days))
    if (lastReps) {
        // if let serie = withExercise.suggestedSerie {
        //    self.suggestedLabel.text = "sr:" + String(serie.reps) + " sw:" + String(format: "%g",serie.weight)
        // }
        text = `${text}r:${lastReps} w:${lastWeight} t:${seriesCount || 0}`
    };
    return text;
}

   
