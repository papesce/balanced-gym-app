import { IMuscleGroup } from './MuscleGroupModel';


export interface IRoutine {
    _id: string,
    name: string,
    targetsCount?: number ,
    exercisesCount?: number,
    lastUpdated?: string,
    doneToday?: number,
    exercises?: string[],
    muscleGroups?: IMuscleGroup[]
}

export interface IRoutineState {
    loading?: boolean;
    error?: string;
    routines?: IRoutine[];
}
