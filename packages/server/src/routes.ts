import { Application } from "express";
import routinesRouter from "./api/routers/routines.router";
import routineRouter from "./api/routers/routine.router";
import muscleGroupRouter from "./api/routers/muscleGroup.router";
import targetRouter from "./api/routers/target.router";
import exerciseRouter from "./api/routers/exercise.router";

const API_VERSION = '/api/v1';

export default function routes(app: Application): void {
  app.use(`${API_VERSION}`, routinesRouter);
  app.use(`${API_VERSION}`, routineRouter);
  app.use(`${API_VERSION}`, muscleGroupRouter);
  app.use(`${API_VERSION}`, targetRouter);
  app.use(`${API_VERSION}`, exerciseRouter);
}
