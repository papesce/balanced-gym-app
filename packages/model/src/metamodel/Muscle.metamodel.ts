import { IExercise } from "./Exercise.metamodel";

export interface IMuscleDao {
  _id: any;
  name: string;
}

export interface IMuscle {
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

export interface IMuscleState {
  loading?: boolean;
  error?: string;
  target?: IMuscle;
}
