import { IMuscleGroupSummary } from './MuscleGroup.metamodel';

export interface IRoutineDao {
    _id: any;
    name: string;
    createdAt?: string;
    updatedAt?: string;
};

// getRoutines
export interface IRoutineSummary {
    _id: string,
    name: string,
    targetsCount?: number ,
    exercisesCount?: number,
    lastUpdated?: string,
    doneToday?: number
}

// getRoutine
export interface IRoutine {
    _id: string,
    name: string,
    muscleGroups?: IMuscleGroupSummary[]
}