import { IRoutine } from './Routine.metamodel';
import { IMuscle, IMuscleDao } from './Muscle.metamodel';
import { IMuscleGroup, IMuscleGroupDao } from './MuscleGroup.metamodel';
import { ISerie, ISerieDao } from './Serie.metamodel';

export interface IExerciseDao {
    _id: any;
    name: string;
    muscleGroup?: IMuscleGroupDao // | ObjectId,
    target?: any,  // ITarget | ObjectId
    series?: ISerieDao[],
    // gifURL: { type: String, required: true },
    // exerciseURL: { type: String },
    // synergists: [{ type: mongoose.Schema.Types.ObjectId, ref: "muscle" }],
    // stabilizers: [{ type: mongoose.Schema.Types.ObjectId, ref: "muscle" }],
    equipment?: string,
    // routineId: { type: mongoose.Schema.Types.ObjectId, ref: "routine" },
    // links: [{ type: String }]
    createdAt?: string;
    updatedAt?: string;
};


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
  gifURL?: string,
  muscleGroup?: IMuscleGroup,
  target?: IMuscle,
  routineId?: IRoutine,
  series?: ISerie[],
  suggestedSerie?: ISerie,
  equipment?: string;
  synergists?: IMuscle[];
  stabilizers?: IMuscle[];
  lastCreationDate?: string;
 }