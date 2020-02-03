import { IRoutineSummary } from 'balanced-gym-model';
import RoutinesService from '../../services/routines.service';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

export class Controller {

  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const routines: IRoutineSummary[] = await RoutinesService.all();
      return res.status(HttpStatus.OK).json(routines);
    }
    catch (err) {
      return next(err);
    }
  }

  // async byId(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const doc = await RoutinesService.byId(req.params.id);
  //     return res.status(HttpStatus.OK).json(doc);
  //   }
  //   catch (err) {
  //     return next(err);
  //   }
  // }
}

export default new Controller();
