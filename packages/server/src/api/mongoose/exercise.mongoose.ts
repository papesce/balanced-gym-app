import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IExerciseDAO extends mongoose.Document {
    _id: string;
    name: string;
    // muscleGroup: ,
    target: mongoose.Types.ObjectId,
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

const schema = new Schema({
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

export const Exercise = mongoose.model<IExerciseDAO>("exercise", schema);