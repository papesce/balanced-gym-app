import mongoose from 'mongoose';
import { IExerciseDao } from 'balanced-gym-model';

export interface IExerciseDocument extends mongoose.Document, IExerciseDao {
}

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    muscleGroup: { type: mongoose.Schema.Types.ObjectId, ref: "muscleGroup" },
    target: { type: mongoose.Schema.Types.ObjectId, ref: "muscle" },
    series: [{ type: mongoose.Schema.Types.ObjectId, ref: "serie" }],
    gifURL: { type: String, required: true },
    exerciseURL: { type: String },
    synergists: [{ type: mongoose.Schema.Types.ObjectId, ref: "muscle" }],
    stabilizers: [{ type: mongoose.Schema.Types.ObjectId, ref: "muscle" }],
    equipment: { type: String },
    routineId: { type: mongoose.Schema.Types.ObjectId, ref: "routine" },
    links: [{ type: String }]
  },
  {
    timestamps: true,
    usePushEach: true
  }
);

export const ExerciseDocumentModel = mongoose.model<IExerciseDocument>("exercise", schema);