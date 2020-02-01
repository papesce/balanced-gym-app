import { getSynsAndStabs } from './../common';
import { IExercise } from '../../../model/ExerciseModel';
import { getTimeFromString } from '../../../utils/dateUtils';

export const getExerciseSummary1 = (exercise: IExercise) => {
    let text = '';
    // setNumberOfDays(exercise: withExercise)
    const { lastReps, lastWeight = 0, seriesCount = 0, lastUpdated} = exercise;
    if (lastUpdated) {
        text = `${getTimeFromString(lastUpdated)}, `; 
    }
    if (lastReps) {
        text = `${text}r:${lastReps} w:${lastWeight} t:${seriesCount || 0}`
    };
    return text;
}

export const getExerciseSummary2 = (exercise: IExercise) => {
    let text = '';
    const { synergistsCount, stabilizersCount  } = exercise;
    text = text + getSynsAndStabs(synergistsCount, stabilizersCount);
    return text;
}