import { sortByCreatedAt, isToday } from "./utils";
import { IExerciseDao, IExercise } from "../metamodel/Exercise.metamodel";
import { ISerieDao, ISerie } from "../metamodel/Serie.metamodel";
import { IMuscleDao } from "../metamodel/Muscle.metamodel";
import { serie0dao } from "../samples/Serie.sample";

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

const denormalizeWeight = (weight: number, equipment?: string) => {
  const { extraWeight, multiplier } = computeExtraWeight(equipment);
  const value = (weight - extraWeight) / multiplier;
  return value > 0 ? value : 0;
};

const normalizeWeight = (weight: number, equipment?: string) => {
  const { extraWeight, multiplier } = computeExtraWeight(equipment);
  return weight * multiplier + extraWeight;
};

export const getLastUpdatedFromExercise = (exercise: IExerciseDao) => {
  let lastUpdated: string | undefined = undefined;
  let lastSerie: ISerie | undefined = undefined;
  let normalizedWeight: number = 0;
  if (exercise.series && exercise.series.length > 0) {
    const { series = [] } = exercise;
    sortByCreatedAt(series);
    const bestSerie: ISerieDao = series[0];
    lastUpdated = bestSerie.createdAt;
    lastSerie = {
      _id: bestSerie._id,
      reps: bestSerie.reps,
      weight: bestSerie.weight
    };
    normalizedWeight = normalizeWeight(bestSerie.weight, exercise.equipment);
  } else {
    normalizedWeight = 0;
  }
  return { lastUpdated, lastSerie, normalizedWeight };
};

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

const areSimilar = (musc1s: IMuscleDao[], musc2s: IMuscleDao[]) => {
  const s1: Set<string> = new Set(musc1s.map(m => m.name));
  const s2: Set<string> = new Set(musc2s.map(m => m.name));
  const difference1: Set<String> = new Set(
    Array.from(s1).filter(x => !s2.has(x))
  );
  const difference2: Set<String> = new Set(
    Array.from(s2).filter(x => !s1.has(x))
  );
  return difference1.size === 0 && difference2.size === 0;
};

const isSimilar = (ex1: IExerciseDao, ex2: IExerciseDao) => {
  if (!ex1.synergists && ex2.synergists) return false;
  if (!ex2.synergists && ex1.synergists) return false;
  if (!ex1.synergists && !ex2.synergists) return true;
  return areSimilar(ex1.synergists, ex2.synergists);
};

export const computeSuggestedSerie = (
  exercise: IExerciseDao,
  targetGroup: IExerciseDao[]
) => {
  // let serie: ISerie | undefined = {};
  const maxserie: ISerie = { _id: "", reps: 0, weight: -1 };
  targetGroup.forEach(ex => {
    //   // console.log('eq:', ex.equipment);
    if (isSimilar(exercise, ex) && ex.series && ex.series.length > 0) {
      sortByCreatedAt(ex.series);
      const [serie] = ex.series;
      if (exercise.equipment !== "TRX" || ex.equipment === "TRX") {
        const nweight = normalizeWeight(serie.weight, ex.equipment);
        if (nweight > maxserie.weight) {
          maxserie.weight = nweight;
          maxserie.reps = serie.reps;
        }
      }
    }
  });
  if (maxserie.weight === -1) {
    maxserie.weight = 0;
  }
  return maxserie;
};

export const getSuggestedSerieFromExercise = (
  exercise: IExerciseDao,
  exercises: IExerciseDao[]
) => {
  const suggestedSerie: ISerie = computeSuggestedSerie(exercise, exercises);
  if (suggestedSerie) {
    const reps: number = Math.round(suggestedSerie.reps);
    const weight =
      Math.round(
        denormalizeWeight(suggestedSerie.weight, exercise.equipment) * 100
      ) / 100;
    suggestedSerie.reps = reps;
    suggestedSerie.weight = weight;
  }
  return suggestedSerie;
};

export const getExercise = (
  exerciseDao: IExerciseDao,
  exercisesDao: IExerciseDao[],
  lastCreationDate?: string
) => {
  const { lastUpdated, normalizedWeight } = getLastUpdatedFromExercise(
    exerciseDao
  );
  const suggestedSerie: ISerie = getSuggestedSerieFromExercise(
    exerciseDao,
    exercisesDao
  );
  const exercise: IExercise = {
    _id: exerciseDao._id,
    name: exerciseDao.name,
    muscleGroup: exerciseDao.muscleGroup,
    target: exerciseDao.target,
    series: exerciseDao.series,
    gifURL: exerciseDao.gifURL,
    routineId: exerciseDao.routineId,
    equipment: exerciseDao.equipment,
    synergists: exerciseDao.synergists,
    stabilizers: exerciseDao.stabilizers,
    lastUpdated,
    normalizedWeight,
    suggestedSerie,
    lastCreationDate
  };
  return exercise;
};
