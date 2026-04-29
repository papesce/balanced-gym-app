import mongoose from "mongoose";
import { IMuscleGroupDao } from "balanced-gym-model";

const Schema = mongoose.Schema;

export type IMuscleGroupDocument = mongoose.Document & IMuscleGroupDao;

const schema = new Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true}
  },
  {
    timestamps: true,

  }
);

export const getMuscleGroupDao = (muscleGroupId: string) =>
  MuscleGroupDocumentModel.findOne({ _id: muscleGroupId })
    .select("name")
    .lean()
    .exec();

export const MuscleGroupDocumentModel = mongoose.model<IMuscleGroupDocument>(
  "muscleGroup",
  schema
);
