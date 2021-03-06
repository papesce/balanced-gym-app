import { IRoutineDao, IRoutine } from "../metamodel/Routine.metamodel";
import {
  IMuscleGroupSummary,
  IMuscleGroupDao
} from "../metamodel/MuscleGroup.metamodel";
import { IExerciseDao } from "../metamodel/Exercise.metamodel";
import { sortByOrder } from "./utils";
import { getLastUpdatedFromExercises } from "./Exercise.model";

interface IMuscleGroupById {
  muscleGroupDao: IMuscleGroupDao;
  exercisesDao: IExerciseDao[];
  targetsId: Set<string>;
}

// TODO: In the future this can be avoided with a many2many relationship between
// group exercises and targest by muscleGroup
const groupByMuscleGroupExercises = (exercises: IExerciseDao[]) => {
  const muscleGroupsById: any = {};
  exercises.forEach(exercise => {
    const { muscleGroup, target } = exercise;
    if (muscleGroup) {
      const muscleGroupId: string = muscleGroup._id;
      if (!muscleGroupsById[muscleGroupId]) {
        const muscleGroupById: IMuscleGroupById = {
          muscleGroupDao: muscleGroup,
          exercisesDao: [],
          targetsId: new Set()
        };
        muscleGroupsById[muscleGroupId] = muscleGroupById;
      }
      muscleGroupsById[muscleGroupId].exercisesDao.push(exercise);
      muscleGroupsById[muscleGroupId].targetsId.add(target._id);
    }
  });
  return muscleGroupsById;
};

const groupExercisesByMuscleGroup = (exercises: IExerciseDao[]): IMuscleGroupSummary[] => {
  const muscleGroups: IMuscleGroupSummary[] = [];
  const muscleGroupsById = groupByMuscleGroupExercises(exercises);
  for (const muscleGroupId in muscleGroupsById) {
    if (muscleGroupId) {
      const muscleGroupById: IMuscleGroupById = muscleGroupsById[muscleGroupId];
      const { muscleGroupDao, targetsId, exercisesDao } = muscleGroupById;
      const { maxLastUpdated, updatedToday } = getLastUpdatedFromExercises(
        exercisesDao
      );
      const muscleGroup: IMuscleGroupSummary = {
        _id: muscleGroupDao._id,
        name: muscleGroupDao.name,
        order: muscleGroupDao.order,
        exercisesCount: exercisesDao.length,
        targetsCount: targetsId.size,
        lastUpdated: maxLastUpdated,
        doneToday: updatedToday,
        
      };
      muscleGroups.push(muscleGroup);
    }
  }
  return muscleGroups;
};

// group exercises by muscle group. adding lastupdated, donetoday, targetsCount and exercisesCount
const getMuscleGroups = (exercisesDao: IExerciseDao[]) => {
  const muscleGroups: IMuscleGroupSummary[] = groupExercisesByMuscleGroup(
    exercisesDao
  );
  sortByOrder(muscleGroups)
  return muscleGroups;
};

export const getRoutineAndMuscles = (
  routineDao: IRoutineDao,
  exercisesDao: IExerciseDao[]
) => {
  const routine: IRoutine = {
    _id: routineDao._id,
    name: routineDao.name
  };
  const muscleGroups: IMuscleGroupSummary[] = getMuscleGroups(exercisesDao);
  routine.muscleGroups = muscleGroups;
  return routine;
};
