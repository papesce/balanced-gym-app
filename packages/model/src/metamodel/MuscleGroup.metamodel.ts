import { IMuscle } from './Muscle.metamodel';

export interface IMuscleGroupDao {
    _id: string,
    name: string,
}

export interface IMuscleGroupSummary {
    _id: string,
    name: string,
    exercisesCount?: number,
    targetsCount?: number,
    lastUpdated?: string,
    doneToday?: number,
}

export interface IMuscleGroup {
    _id: string,
    name: string,
    routineId?: string,
    routineName?: string, 
    targets?: IMuscle[]
}

export interface IMuscleGroupState {
    loading?: boolean;
    error?: string;
    muscleGroup?: IMuscleGroup;
}
