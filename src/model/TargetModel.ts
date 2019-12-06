import { IExercise } from './ExerciseModel';

export interface ITarget {
    _id: string,
    name: string,
    routineId?: string,
    routineName?: string,
    muscleGroupId?: string,
    muscleGroupName?: string,
    exercisesCount?: number,
    synergistsCount?: number,
    stabilizersCount?: number,
    doneToday?: number,
    lastUpdated?: string,
    exercises?: IExercise[]
    muscleURL?: string
}

export interface ITargetState {
    loading?: boolean;
    error?: string;
    target?: ITarget;
}
