import mongoose from 'mongoose';
import { IRoutineDao } from 'balanced-gym-model';

const Schema = mongoose.Schema;

export interface IRoutineDocument extends mongoose.Document, IRoutineDao {
}

const schema = new Schema({
  name: { type: String, required: true }
},
  {
    timestamps: true,
    usePushEach: true
  }
);

export const RoutineDocumentModel = mongoose.model<IRoutineDocument>("routine", schema);