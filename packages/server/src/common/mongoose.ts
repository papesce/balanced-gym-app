import mongoose from "mongoose";
import * as serie from "../api/mongoose/serie.mongoose";
import * as muscle from "../api/mongoose/muscle.mongoose";
import * as muscleGroup from "../api/mongoose/muscleGroup.mongoose";

export default class Mongoose {
  connectionURI = `${process.env.MONGO_URI}`;
  constructor() {}

  init() {
    mongoose.connect(this.connectionURI);

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    serie.SerieDocumentModel;
    muscle.MuscleDocumentModel;
    muscleGroup.MuscleGroupDocumentModel;
  }
}
