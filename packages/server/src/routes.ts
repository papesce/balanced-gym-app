import { Application } from "express";
import routinesRouter from "./api/routers/routines.router";
import routineRouter from "./api/routers/routine.router";

const API_VERSION = '/api/v1';

export default function routes(app: Application): void {
  app.use(`${API_VERSION}/routines`, routinesRouter);
  app.use(`${API_VERSION}/routine`, routineRouter);
}
