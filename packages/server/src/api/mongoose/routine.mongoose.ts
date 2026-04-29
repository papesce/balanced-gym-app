import mongoose from "mongoose";
import { IRoutineDao } from "balanced-gym-model";

const Schema = mongoose.Schema;

export type IRoutineDocument = mongoose.Document & IRoutineDao;

const schema = new Schema(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true,

  }
);

export const getRoutineDao = (routineId: string) =>
  RoutineDocumentModel.findOne({
    _id: routineId
  })
    .select("name")
    .lean()
    .exec();

export const RoutineDocumentModel = mongoose.model<IRoutineDocument>(
  "routine",
  schema
);
