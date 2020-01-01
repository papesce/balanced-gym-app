import { ITarget } from './TargetModel';

export interface IMuscleGroup {
    _id: string,
    name: string,
    routineId?: string,
    routineName?: string,
    targetsCount?: number,
    exercisesCount?: number,
    doneToday?: number,
    lastUpdated?: string,
    targets?: ITarget[]
}

export interface IMuscleGroupState {
    loading?: boolean;
    error?: string;
    muscleGroup?: IMuscleGroup;
}
