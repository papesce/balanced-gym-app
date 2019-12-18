import { IRoutine } from './RoutineModel';
import { ITarget } from './TargetModel';
import { IMuscleGroup } from './MuscleGroupModel';
import { ISerie } from './SerieModel';


export interface IExercise {
    _id: string,
    name: string,
    lastUpdated?: string,
    lastReps?: number,
    lastWeight?: number,
    normalizedWeight?: number,
    seriesCount?: number
    synergistsCount?: number,
    stabilizersCount?: number,
    suggestedSerie?: ISerie,
    gifURL?: string,
    muscleGroup?: IMuscleGroup,
    target?: ITarget,
    routineId?: IRoutine,
    series?: ISerie[]
}

export interface IExerciseState {
    loading?: boolean;
    error?: string;
    exercise?: IExercise;
}
