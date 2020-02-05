import { Application } from 'express';
import routinesRouter from './api/routers/routines.router'
export default function routes(app: Application): void {
  app.use('/api/v1/routines', routinesRouter);
};