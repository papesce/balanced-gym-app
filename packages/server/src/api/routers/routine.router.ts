import { IRoutine } from "balanced-gym-model";
import RoutineService from "../services/routine.service";
import { Request, Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";

const api = express.Router();

api.get("/routine/:routineId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { routineId } = req.params;
    const routine: IRoutine = await RoutineService.getRoutineById(routineId);
    return res.status(HttpStatus.OK).json(routine);
  } catch (err) {
    return next(err);
  }
});

export default api;
