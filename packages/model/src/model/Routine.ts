import { sortByLastUpdated } from './../utils/utils';
import { IRoutineDAO, IRoutineSummary } from "../metamodel/Routine"


export const getRoutineSummary = (routine: IRoutineDAO) => {
    const result: IRoutineSummary = { _id: 'x', name: 'x'};
    return result;
}

export const getRoutinesSummary = async (routines: IRoutineDAO[]) => {
    // const routines = await getRoutines();
    const results = [];
    for (const routineDAO of routines) {
      const routineSummary: IRoutineSummary = getRoutineSummary(routineDAO);
      results.push(routineSummary);
    }
    const newRoutines = await Promise.all(results);
    sortByLastUpdated(newRoutines);
    return newRoutines;
}