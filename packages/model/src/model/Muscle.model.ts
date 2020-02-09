import { IMuscle, IMuscleDao } from "../metamodel/Muscle.metamodel";
import { IExerciseDao, IExerciseSummary } from "../metamodel/Exercise.metamodel";
import { IRoutineDao } from "../metamodel/Routine.metamodel";
import { IMuscleGroupDao } from "../metamodel/MuscleGroup.metamodel";
import { sortByLastUpdated } from "./utils";
import { ISerie } from "../metamodel/Serie.metamodel";
import { getLastUpdatedFromExercise, getSuggestedSerieFromExercise } from "./Exercise.model";

const getExercises = (exercisesDao: IExerciseDao[]) => {
    // const { maxLastUpdated, updatedToday } =
    // exercisesApi.addLastUpdatedToExercises(exercisesResult);
    return exercisesDao.map(exercise => {
      const { series = [], synergists = [], stabilizers = [] } = exercise;
      const { lastUpdated, lastSerie, normalizedWeight } = getLastUpdatedFromExercise(exercise);
      const suggestedSerie: ISerie = getSuggestedSerieFromExercise(exercise, exercisesDao);
      const exerciseSummary: IExerciseSummary = {
        _id: exercise._id,
        name: exercise.name,
        gifURL: exercise.gifURL,
        lastUpdated,
        lastSerie,
        normalizedWeight,
        suggestedSerie,
        seriesCount: series.length,
        synergistsCount: synergists.length,
        stabilizersCount: stabilizers.length
      };
      return exerciseSummary;
    });
  };

export const getTarget = (
  routineDao: IRoutineDao,
  muscleGroupDao: IMuscleGroupDao,
  targetDao: IMuscleDao,
  exercisesDao: IExerciseDao[]
) => {
  const exercisesSummary: IExerciseSummary[] = getExercises(exercisesDao);
  sortByLastUpdated(exercisesSummary);
  const target: IMuscle = {
    _id: targetDao._id,
    name: targetDao.name,
    routineId: routineDao._id,
    routineName: routineDao.name,
    muscleGroupId: muscleGroupDao._id,
    muscleGroupName: muscleGroupDao.name,
    muscleURL: targetDao.muscleURL,
    exercises: exercisesSummary
  };
  return target;
};
