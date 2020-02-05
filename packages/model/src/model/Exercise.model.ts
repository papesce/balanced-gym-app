import { sortByCreatedAt, isToday } from './utils';
import { IExerciseDao } from '../metamodel/Exercise.metamodel';
import { ISerieDao } from '../metamodel/Serie.metamodel';

const computeExtraWeight = (equip?: string) => {
    switch (equip) {
      case "Dumbbells":
        return { extraWeight: 3.6, multiplier: 2 };
      case "Dumbbell":
        return { extraWeight: 1.8, multiplier: 1 };
      case "Barbell Long":
        return { extraWeight: 7.8, multiplier: 1 };
      case "Barbell Short":
        return { extraWeight: 1.3, multiplier: 1 };
      default:
        return { extraWeight: 0, multiplier: 1 };
    }
  };

const normalizeWeight = (weight: number, equipment?: string) => {
    const { extraWeight, multiplier } = computeExtraWeight(equipment);
    return weight * multiplier + extraWeight;
  };

export const getLastUpdatedFromExercise = (exercise: IExerciseDao) => {
  let lastUpdated: string | undefined = undefined;
  let lastReps: number = 0;
  let lastWeight: number = 0;
  let normalizedWeight: number = 0;
  if (exercise.series && exercise.series.length > 0) {
    const { series = [] } = exercise;
    sortByCreatedAt(series);
    const bestSerie: ISerieDao = series[0];
    lastUpdated = bestSerie.createdAt;
    lastReps = bestSerie.reps;
    lastWeight = bestSerie.weight;
    normalizedWeight = normalizeWeight(bestSerie.weight, exercise.equipment);
  } else {
    lastReps = 0;
    lastWeight = 0;
    normalizedWeight = 0;
  }
  return { lastUpdated, lastReps, lastWeight, normalizedWeight };
}


export const getLastUpdatedFromExercises = (exercises: IExerciseDao[]) => {
    let maxLastUpdated: string | undefined = undefined;
    let updatedToday = 0;
    exercises.forEach(exerciseDao => {
       const { lastUpdated } = getLastUpdatedFromExercise(exerciseDao);
       if (lastUpdated) {
         if (!maxLastUpdated || maxLastUpdated < lastUpdated) {
           maxLastUpdated = lastUpdated;
         }
         if (isToday(new Date(lastUpdated))) {
            updatedToday += 1;
         }
       }
     });
    return { maxLastUpdated, updatedToday };
  };