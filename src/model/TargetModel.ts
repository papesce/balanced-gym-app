import { IExercise } from './ExerciseModel';

export interface ITarget {
    _id: string,
    name: string,
    exercisesCount?: number,
    doneToday?: number,
    lastUpdated?: string,
    exercises?: IExercise[]
}

export interface ITargetState {
    loading?: boolean;
    error?: string;
    target?: ITarget;
}
