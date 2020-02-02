import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IRoutineModel extends mongoose.Document {
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

export const Routine = mongoose.model<IRoutineModel>("routine", schema);