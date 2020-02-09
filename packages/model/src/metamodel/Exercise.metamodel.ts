import { IRoutine } from './Routine.metamodel';
import { IMuscle, IMuscleDao } from './Muscle.metamodel';
import { IMuscleGroup, IMuscleGroupDao } from './MuscleGroup.metamodel';
import { ISerie, ISerieDao } from './Serie.metamodel';

export interface IExerciseDao {
    _id: any;
    name: string;
    muscleGroup?: IMuscleGroupDao // | ObjectId,
    target?: any,  // IMuscleDao | ObjectId
    series?: ISerieDao[],
    gifURL?: string,
    // exerciseURL: { type: String },
    synergists?: any // IMuscleDao[] | ObjectId
    stabilizers?: any // IMuscleDao[] | ObjectId
    equipment?: string,
    // routineId: { type: mongoose.Schema.Types.ObjectId, ref: "routine" },
    // links: [{ type: String }]
    createdAt?: string;
    updatedAt?: string;
};


export interface IExerciseSummary {
  _id: string,
  name: string,
  gifURL?: string,
  lastUpdated?: string,
  lastSerie?: ISerie,
  normalizedWeight?: number,
  suggestedSerie?: ISerie,
  seriesCount?: number,
  synergistsCount?: number,
  stabilizersCount?: number,
}

export interface IExercise {
  _id: string,
  name: string,
  gifURL?: string,
  muscleGroup?: IMuscleGroup,
  target?: IMuscle,
  routineId?: IRoutine,
  series?: ISerie[],
  equipment?: string;
  synergists?: IMuscle[];
  stabilizers?: IMuscle[];
  lastCreationDate?: string;
  normalizedWeight?: number,
  suggestedSerie?: ISerie
 }