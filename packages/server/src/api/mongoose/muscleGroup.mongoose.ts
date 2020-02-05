import mongoose from 'mongoose';
import { IMuscleGroupDao } from 'balanced-gym-model';

const Schema = mongoose.Schema;

export interface IMuscleGroupDocument extends mongoose.Document, IMuscleGroupDao {
}


const schema = new Schema(
    {
        name: { type: String, required: true },
      },
      {
        timestamps: true,
        usePushEach: true
      }
);

export const MuscleGroupDocumentModel = mongoose.model<IMuscleGroupDocument>("muscleGroup", schema);