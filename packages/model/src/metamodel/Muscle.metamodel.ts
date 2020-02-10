import { IExercise } from "./Exercise.metamodel";

export interface IMuscleDao {
  _id: any;
  name: string;
  muscleURL?: string;
}

export interface IMuscleSummary {
  _id: string;
  name: string;
  exercisesCount?: number;
  synergistsCount?: number;
  stabilizersCount?: number;
  doneToday?: number;
  lastUpdated?: string;
  muscleURL?: string;
  muscleType?: string;
  maxSeries?: number;
  minSeries?: number;
  totalSeries?: number;
}

export interface IMuscle {
  _id: string;
  name: string;
  routineId?: string;
  routineName?: string;
  muscleGroupId?: string;
  muscleGroupName?: string;
  muscleURL?: string;
  exercises?: IExercise[];
}

export interface IMuscleState {
  loading?: boolean;
  error?: string;
  target?: IMuscle;
}
