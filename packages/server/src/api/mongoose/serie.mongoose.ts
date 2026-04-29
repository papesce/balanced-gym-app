import mongoose from 'mongoose';
import { ISerieDao } from 'balanced-gym-model';

const Schema = mongoose.Schema;

export type ISerieDocument = mongoose.Document & ISerieDao;


const schema = new Schema(
    {
        reps: Number,
        weight: Number,
        restTime: Number
      },
      {
        timestamps: true,

      }
);

export const SerieDocumentModel = mongoose.model<ISerieDocument>("serie", schema);