import { IRoutineSummary } from 'balanced-gym-model';
import RoutinesService from '../services/routines.service';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import express from 'express';

const api = express.Router();

api.get('/routines', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const routines: IRoutineSummary[] = await RoutinesService.getRoutinesSummary();
      return res.status(HttpStatus.OK).json(routines);
    }
    catch (err) {
      return next(err);
    }
  }
)

export default api;

