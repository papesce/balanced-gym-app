import mongoose from "mongoose";
import * as serie from "../api/mongoose/serie.mongoose";
import * as muscle from "../api/mongoose/muscle.mongoose";
import * as muscleGroup from "../api/mongoose/muscleGroup.mongoose";

export default class Mongoose {
  connectionURI = `${process.env.MONGO_URI}`;
  constructor() {}

  init() {
    //Set up default mongoose connection
    mongoose.connect(this.connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;

    //Get the default connection
    const db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    //register models
    serie.SerieDocumentModel;
    muscle.MuscleDocumentModel;
    muscleGroup.MuscleGroupDocumentModel;
  }
}
