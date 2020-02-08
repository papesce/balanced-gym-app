import { IRoutine } from "balanced-gym-model";
import MuscleGroupService from "../services/muscleGroup.service";
import { Request, Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";

const api = express.Router();

api.get(
  "/routine/:routineId/muscleGroup/:muscleGroupId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { routineId, muscleGroupId } = req.params;
      const routine: IRoutine = await MuscleGroupService.getMuscleGroupById(routineId, muscleGroupId);
      return res.status(HttpStatus.OK).json(routine);
    } catch (err) {
      return next(err);
    }
  }
);

export default api;
