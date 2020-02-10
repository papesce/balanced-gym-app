import { IRoutineDao } from "../metamodel/Routine.metamodel";
import { IExerciseDao } from "../metamodel/Exercise.metamodel";
import { sortTargets } from "./utils";
import {
  IMuscleGroup,
  IMuscleGroupDao
} from "../metamodel/MuscleGroup.metamodel";
import {
  IMuscle,
  IMuscleDao,
  IMuscleSummary
} from "../metamodel/Muscle.metamodel";
import { getLastUpdatedFromExercises } from "./Exercise.model";

interface ITargetById {
  exercisesDao: IExerciseDao[];
  synergists: Set<string>;
  stabilizers: Set<string>;
  targetDao: IMuscleDao;
  maxSeries: number;
  minSeries: number;
  totalSeries: number;
}

const addAll = (set: Set<string>, array?: string[]) => {
  if (array) {
    array.forEach(item => set.add(item.toString()));
  }
};

// TODO: In the future this can be avoided with a many2many relationship between
// ecercise and muscleGrup
export const groupByTargetExercises = (exercisesDao: IExerciseDao[]) => {
  const targetsById: any = {};
  exercisesDao.forEach(exerciseDao => {
    const { target, stabilizers, synergists } = exerciseDao; // target: IMuscleDao
    if (target) {
      const targetId: string = target._id;
      if (!targetsById[targetId]) {
        const targetById: ITargetById = {
          targetDao: target,
          exercisesDao: [],
          synergists: new Set(),
          stabilizers: new Set(),
          maxSeries: 0,
          minSeries: -1,
          totalSeries: 0
        };
        targetsById[targetId] = targetById;
      }
      const tById = targetsById[targetId];
      tById.exercisesDao.push(exerciseDao);
      addAll(tById.stabilizers, stabilizers);
      addAll(tById.synergists, synergists);
      if (exerciseDao.series) {
        const totalSeries = exerciseDao.series?.length;
        tById.totalSeries += totalSeries;
        if (tById.minSeries < 0 || totalSeries < tById.minSeries) {
          tById.minSeries = totalSeries;
        }
        if (tById.maxSeries < totalSeries) {
          tById.maxSeries = totalSeries;
        }
      }
    }
  });
  return targetsById;
};

export const groupExercisesByTarget = (exercisesDao: IExerciseDao[]) => {
  const targets: IMuscle[] = [];
  const targetsById = groupByTargetExercises(exercisesDao);
  for (const targetId in targetsById) {
    if (targetId) {
      const targetById: ITargetById = targetsById[targetId];
      const {
        targetDao,
        exercisesDao,
        synergists,
        stabilizers,
        maxSeries,
        minSeries,
        totalSeries
      } = targetById;
      const { maxLastUpdated, updatedToday } = getLastUpdatedFromExercises(
        exercisesDao
      );
      const target: IMuscleSummary = {
        _id: targetDao._id,
        name: targetDao.name,
        muscleURL: targetDao.muscleURL,
        exercisesCount: exercisesDao.length,
        lastUpdated: maxLastUpdated,
        doneToday: updatedToday,
        synergistsCount: synergists.size,
        stabilizersCount: stabilizers.size,
        maxSeries,
        minSeries,
        totalSeries
      };
      targets.push(target);
    }
  }
  return targets;
};

export const getMuscleGroupForRoutine = (
  routineDao: IRoutineDao,
  muscleGroupDao: IMuscleGroupDao,
  exercisesDao: IExerciseDao[]
) => {
  const targets: IMuscle[] = groupExercisesByTarget(exercisesDao);
  sortTargets(targets);
  const muscleGroup: IMuscleGroup = {
    _id: muscleGroupDao._id,
    name: muscleGroupDao.name,
    routineId: routineDao._id,
    routineName: routineDao.name,
    targets
  };
  return muscleGroup;
};
