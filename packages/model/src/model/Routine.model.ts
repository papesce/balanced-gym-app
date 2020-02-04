import { IExerciseDAO } from "../metamodel/Exercise.metamodel";
import { sortByLastUpdated } from "../utils/utils";
import { IRoutineDao, IRoutineSummary } from "../metamodel/Routine.metamodel";

export const getRoutineSummary = (
  routineDAO: IRoutineDao,
  exercisesDAO: IExerciseDAO[]
) => {
  const newRoutine: IRoutineSummary = { _id: routineDAO._id, name: routineDAO.name };
  const targets = new Set();
  // const exercises: 
  exercisesDAO.forEach(exerciseDAO => targets.add(exerciseDAO.target.toString()));
  // console.log(targets);
  // const exercisesArray = routineResult.exercises;
  newRoutine.targetsCount = targets.size;
  // newRoutine.exercisesCount = exercisesResult.length;
  // newRoutine.exercises = exercisesResult;
  // TODO complete this
  // addLastUpdatedToRoutine(newRoutine);
  // delete newRoutine.exercises;
  // delete newRoutine.createdAt;
  // delete newRoutine.updatedAt;
  return newRoutine;
};

export const getRoutinesSummary = async (
  routines: IRoutineDao[],
  getExercisesDAO: (routineId: string) => Promise<IExerciseDAO[]>
) => {
  // const routines = await getRoutines();
  const newRoutines: IRoutineSummary[] = [];
  for (const routineDAO of routines) {
    const exercisesDAO: IExerciseDAO[] = await getExercisesDAO(routineDAO._id);
    const routineSummary: IRoutineSummary = await getRoutineSummary(
      routineDAO,
      exercisesDAO
    );
    newRoutines.push(routineSummary);
  }
  // const newRoutines: IRoutineSummary[] = await Promise.all(results);
  sortByLastUpdated(newRoutines);
  return newRoutines;
};
