import { IRoutineDao, IRoutine } from "../metamodel/Routine.metamodel";
import { IMuscleGroupSummary, IMuscleGroupDao } from "../metamodel/MuscleGroup.metamodel";
import { IExerciseDao, IExercise } from "../metamodel/Exercise.metamodel";
import { sortByLastUpdated } from './utils';
import { IMuscle, IMuscleDao } from "../metamodel/Muscle.metamodel";

 interface IMuscleGroupById {
         muscleGroupDao: IMuscleGroupDao,
         exercisesDao: IExerciseDao[],
         targetsId: Set<string>
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

const groupExercisesByMuscleGroup = (exercises: IExerciseDao[]) => {
    const muscleGroups: IMuscleGroupSummary[] = [];
    // const groupedExercisesById = exercisesResult; // []; // routineResult;
    const muscleGroupsById = groupByMuscleGroupExercises(exercises);
    for (const muscleGroupId in muscleGroupsById) {
       if (muscleGroupId) {
         const muscleGroupById:IMuscleGroupById = muscleGroupsById[muscleGroupId];
         const { muscleGroupDao, targetsId, exercisesDao } = muscleGroupById;
    //     const { maxLastUpdated, updatedToday } =
    //       exercisesApi.addLastUpdatedToExercises(exercises);
         const muscleGroup: IMuscleGroupSummary = {
             _id: muscleGroupDao._id,
             name: muscleGroupDao.name,
             exercisesCount: exercisesDao.length,
             targetsCount: targetsId.size,
    //      lastUpdated: maxLastUpdated,
    //       doneToday: updatedToday
         };
         muscleGroups.push(muscleGroup);
       }
    }
    return muscleGroups;
  };


// group exercises by muscle group. adding lastupdated, donetoday, targetsCount and exercisesCount
const getMuscleGroups = (exercisesDao: IExerciseDao[]) => {  
    const muscleGroups: IMuscleGroupSummary[] = groupExercisesByMuscleGroup(exercisesDao);
    sortByLastUpdated(muscleGroups);
    return muscleGroups;
  };


export const getRoutineAndMuscles = (routineDao: IRoutineDao, exercisesDao: IExerciseDao[]) => {
    const routine: IRoutine = {
        _id: routineDao._id,
        name: routineDao.name
    };
    const muscleGroups: IMuscleGroupSummary[] = getMuscleGroups(exercisesDao);
    routine.muscleGroups = muscleGroups;
    return routine;
  };