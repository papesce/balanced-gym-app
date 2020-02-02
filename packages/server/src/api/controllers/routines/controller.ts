import RoutinesService from '../../services/routines.service';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

export class Controller {

  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const routines = await RoutinesService.all();
      const results = [];
      return res.status(HttpStatus.OK).json(results);
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
