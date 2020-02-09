import mongoose from "mongoose";
import { IMuscleDao } from "balanced-gym-model";

const Schema = mongoose.Schema;

export interface IMuscleDocument extends mongoose.Document, IMuscleDao {}

const schema = new Schema(
  {
    name: { type: String, required: true },
    muscleURL: { type: String }
  },
  {
    timestamps: true,
    usePushEach: true
  }
);

export const getTargetDao = (muscleId: string) =>
  MuscleDocumentModel.findOne({
    _id: muscleId
  })
    .select("name muscleURL")
    .lean()
    .exec();

export const MuscleDocumentModel = mongoose.model<IMuscleDocument>(
  "muscle",
  schema
);
