import mongoose from 'mongoose';
import { IMuscleDao } from 'balanced-gym-model';

const Schema = mongoose.Schema;

export interface IMuscleDocument extends mongoose.Document, IMuscleDao {
}


const schema = new Schema(
    {
        name: { type: String, required: true },
        muscleURL: { type: String },
      },
      {
        timestamps: true,
        usePushEach: true
      }
);

export const MuscleDocumentModel = mongoose.model<IMuscleDocument>("muscle", schema);