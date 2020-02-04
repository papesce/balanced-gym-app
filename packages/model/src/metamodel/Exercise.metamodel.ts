import { IRoutine } from './Routine.metamodel';
import { ITarget } from './Target.metamodel';
import { IMuscleGroup } from './MuscleGroup.metamodel';
import { ISerie } from './Serie.metamodel';

export interface IExerciseDAO {
    _id: any;
    name: string;
    // muscleGroup: ,
    target: any,
    // series: [{ type: mongoose.Schema.Types.ObjectId, ref: "serie" }],
    // gifURL: { type: String, required: true },
    // exerciseURL: { type: String },
    // synergists: [{ type: mongoose.Schema.Types.ObjectId, ref: "muscle" }],
    // stabilizers: [{ type: mongoose.Schema.Types.ObjectId, ref: "muscle" }],
    // equipment: { type: String },
    // routineId: { type: mongoose.Schema.Types.ObjectId, ref: "routine" },
    // links: [{ type: String }]
    createdAt: string;
    updatedAt: string;
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
  target?: ITarget,
  routineId?: IRoutine,
  series?: ISerie[],
  suggestedSerie?: ISerie,
  equipment?: string;
  synergists?: ITarget[];
  stabilizers?: ITarget[];
  lastCreationDate?: string;
 }