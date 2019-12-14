import { getSynsAndStabs } from './../common';
import { IExercise } from '../../model/ExerciseModel';
import { IRoutine } from '../../model/RoutineModel';
import { getDaysFromString } from '../../utils/dateUtils';
import { addS } from '../../utils/utils';

export const getExerciseSummary1 = (exercise: IExercise) => {
    let text = '';
    // setNumberOfDays(exercise: withExercise)
    const { lastReps, lastWeight = 0, seriesCount = 0, lastUpdated} = exercise;
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

export const getExerciseSummary2 = (exercise: IExercise) => {
    let text = '';
    // setNumberOfDays(exercise: withExercise)
    const { lastReps, lastWeight = 0, seriesCount = 0, lastUpdated, synergistsCount, stabilizersCount  } = exercise;
    text = text + getSynsAndStabs(synergistsCount, stabilizersCount);
    // if (lastUpdated) {
    //     const days = getDaysFromString(lastUpdated);  
    //     text = `${addS('day', days)} `;
    // }
    // // TODO: self.setLineColor(color: Utils.getLabelColor(count: days))
    // if (lastReps) {
    //     // if let serie = withExercise.suggestedSerie {
    //     //    self.suggestedLabel.text = "sr:" + String(serie.reps) + " sw:" + String(format: "%g",serie.weight)
    //     // }
    //     text = `${text}r:${lastReps} w:${lastWeight} t:${seriesCount || 0}`
    // };
    return text;
}