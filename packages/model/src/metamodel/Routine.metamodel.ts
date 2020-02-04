
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IRoutineDAO extends mongoose.Document {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

const schema = new Schema({
  name: { type: String, required: true }
},
  {
    timestamps: true,
    usePushEach: true
  }
);

export const Routine = mongoose.model<IRoutineDAO>("routine", schema);


export interface IRoutineSummary {
    _id: string,
    name: string,
    targetsCount?: number ,
    exercisesCount?: number,
    lastUpdated?: string,
    doneToday?: number
}

export interface IRoutine {
    _id: string,
    name: string,
    targetsCount?: number ,
    exercisesCount?: number,
    lastUpdated?: string,
    doneToday?: number,
    exercises?: string[],
    // muscleGroups?: IMuscleGroup[]
}