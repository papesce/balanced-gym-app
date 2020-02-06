import { IExerciseDao } from "../metamodel/Exercise.metamodel";
import { sortByLastUpdated } from "../utils/utils";
import { IRoutineDao, IRoutineSummary } from "../metamodel/Routine.metamodel";
import { getLastUpdatedFromExercises } from './Exercise.model';


export const getRoutineSummary = (
  routineDao: IRoutineDao,
  exercisesDao: IExerciseDao[]
) => {
  const newRoutine: IRoutineSummary = { _id: routineDao._id, name: routineDao.name };
  const targets = new Set();
  exercisesDao.forEach(exerciseDao => targets.add(exerciseDao.target.toString()));
  newRoutine.targetsCount = targets.size;
  newRoutine.exercisesCount = exercisesDao.length;
  const { maxLastUpdated, updatedToday } = getLastUpdatedFromExercises(exercisesDao);
  if (maxLastUpdated) newRoutine.lastUpdated = maxLastUpdated;
  newRoutine.doneToday = updatedToday;
  return newRoutine;
};

export const getRoutinesSummary = async (
  routines: IRoutineDao[],
  getExercisesDAO: (routineId: string) => Promise<IExerciseDao[]>
) => {
  const newRoutines: IRoutineSummary[] = [];
  for (const routineDAO of routines) {
    const exercisesDAO: IExerciseDao[] = await getExercisesDAO(routineDAO._id);
    const routineSummary: IRoutineSummary = await getRoutineSummary(
      routineDAO,
      exercisesDAO
    );
    newRoutines.push(routineSummary);
  }
  sortByLastUpdated(newRoutines);
  return newRoutines;
};
