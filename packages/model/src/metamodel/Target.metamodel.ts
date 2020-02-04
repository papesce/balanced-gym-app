import { IExercise } from "./Exercise.metamodel";

export interface ITarget {
  _id: string;
  name: string;
  routineId?: string;
  routineName?: string;
  muscleGroupId?: string;
  muscleGroupName?: string;
  exercisesCount?: number;
  synergistsCount?: number;
  stabilizersCount?: number;
  doneToday?: number;
  lastUpdated?: string;
  exercises?: IExercise[];
  muscleURL?: string;
  muscleType?: string;
}

export interface ITargetState {
  loading?: boolean;
  error?: string;
  target?: ITarget;
}
