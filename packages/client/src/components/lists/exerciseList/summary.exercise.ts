import { getSynsAndStabs } from './../common';
import { IExerciseSummary } from 'balanced-gym-model';
import { getTimeFromString } from '../../../utils/dateUtils';

export const getExerciseSummary1 = (exercise: IExerciseSummary) => {
    let text = '';
    // setNumberOfDays(exercise: withExercise)
    const { lastSerie, seriesCount = 0, lastUpdated} = exercise;
    if (lastUpdated) {
        text = `${getTimeFromString(lastUpdated)}, `; 
    }
    if (lastSerie) {
        text = `${text}r:${lastSerie.reps} w:${lastSerie.weight} t:${seriesCount || 0}`
    };
    return text;
}

export const getExerciseSummary2 = (exercise: IExerciseSummary) => {
    let text = '';
    const { synergistsCount, stabilizersCount  } = exercise;
    text = text + getSynsAndStabs(synergistsCount, stabilizersCount);
    return text;
}