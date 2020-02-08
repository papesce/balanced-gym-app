import { IRoutineDao } from "../metamodel/Routine.metamodel";
import { IExerciseDao, IExercise } from "../metamodel/Exercise.metamodel";
import { sortTargets } from "./utils";
import {
  IMuscleGroup,
  IMuscleGroupDao
} from "../metamodel/MuscleGroup.metamodel";
import { IMuscle, IMuscleDao } from "../metamodel/Muscle.metamodel";
import { getLastUpdatedFromExercises } from "./Exercise.model";

interface ITargetById {
  exercisesDao: IExerciseDao[];
  synergists: Set<string>;
  stabilizers: Set<string>;
  targetDao: IMuscleDao;
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
    const { target } = exerciseDao;  // target: IMuscleDao
    if (target) {
      const targetId: string = target._id;
      if (!targetsById[targetId]) {
        const targetById: ITargetById = {
          targetDao: target,
          exercisesDao: [],
          synergists: new Set(),
          stabilizers: new Set()
        };
        targetsById[targetId] = targetById;
      }
      targetsById[targetId].exercisesDao.push(exerciseDao);
      addAll(targetsById[targetId].stabilizers, exerciseDao.stabilizers);
      addAll(targetsById[targetId].synergists, exerciseDao.synergists);
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
      const { targetDao, exercisesDao, synergists, stabilizers } = targetById;
      const { maxLastUpdated, updatedToday } = getLastUpdatedFromExercises(
        exercisesDao
      );
      const target: IMuscle = {
        _id: targetDao._id,
        name: targetDao.name,
        muscleURL: targetDao.muscleURL,
        exercisesCount: exercisesDao.length,
        lastUpdated: maxLastUpdated,
        doneToday: updatedToday,
        synergistsCount: synergists.size,
        stabilizersCount: stabilizers.size
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
