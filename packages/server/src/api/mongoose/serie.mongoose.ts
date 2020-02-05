import mongoose from 'mongoose';
import { ISerieDao } from 'balanced-gym-model';

const Schema = mongoose.Schema;

export interface ISerieDocument extends mongoose.Document, ISerieDao {
}


const schema = new Schema(
    {
        reps: Number,
        weight: Number,
        restTime: Number
      },
      {
        timestamps: true,
        usePushEach: true
      }
);

export const SerieDocumentModel = mongoose.model<ISerieDocument>("serie", schema);