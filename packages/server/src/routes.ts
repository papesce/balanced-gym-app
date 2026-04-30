import { Application } from "express";
import { authMiddleware } from "./api/middleware/auth.middleware";
import routinesRouter from "./api/routers/routines.router";
import routineRouter from "./api/routers/routine.router";
import muscleGroupRouter from "./api/routers/muscleGroup.router";
import muscleGroupsRouter from "./api/routers/muscleGroups.router";
import muscleRouter from "./api/routers/muscle.router";
import targetRouter from "./api/routers/target.router";
import exerciseRouter from "./api/routers/exercise.router";
import exercisesRouter from "./api/routers/exercises.router";
import serieRouter from "./api/routers/serie.router";

const API_VERSION = '/api/v1';

export default function routes(app: Application): void {
  app.use(`${API_VERSION}`, authMiddleware);
  app.use(`${API_VERSION}`, routinesRouter);
  app.use(`${API_VERSION}`, routineRouter);
  app.use(`${API_VERSION}`, muscleGroupRouter);
  app.use(`${API_VERSION}`, muscleGroupsRouter);
  app.use(`${API_VERSION}`, muscleRouter);
  app.use(`${API_VERSION}`, targetRouter);
  app.use(`${API_VERSION}`, exerciseRouter);
  app.use(`${API_VERSION}`, exercisesRouter);
  app.use(`${API_VERSION}`, serieRouter);
}
