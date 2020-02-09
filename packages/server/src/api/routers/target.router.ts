import { IMuscle } from "balanced-gym-model";
import TargetService from "../services/target.service";
import { Request, Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";

const api = express.Router();

api.get(
  "/routine/:routineId/muscleGroup/:muscleGroupId/target/:targetId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { routineId, muscleGroupId, targetId } = req.params;
      const target: IMuscle = await TargetService.getTarget(routineId, muscleGroupId, targetId);
      return res.status(HttpStatus.OK).json(target);
    } catch (err) {
      return next(err);
    }
  }
);

export default api;