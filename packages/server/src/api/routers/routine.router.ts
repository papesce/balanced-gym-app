import { IRoutine } from "balanced-gym-model";
import RoutineService from "../services/routine.service";
import { Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const api = express.Router();

api.get("/routine/:routineId", async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { routineId } = req.params;
    const routine: IRoutine = await RoutineService.getRoutineById(routineId, req.userId);
    return res.status(HttpStatus.OK).json(routine);
  } catch (err) {
    return next(err);
  }
});

export default api;
