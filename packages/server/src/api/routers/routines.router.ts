import { IRoutineSummary } from 'balanced-gym-model';
import RoutinesService from '../services/routines.service';
import { Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import express from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

const api = express.Router();

api.get('/routines', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const routines: IRoutineSummary[] = await RoutinesService.getRoutinesSummary(req.userId);
      return res.status(HttpStatus.OK).json(routines);
    }
    catch (err) {
      return next(err);
    }
  }
)

export default api;

