import { IMuscle } from "balanced-gym-model";
import TargetService from "../services/target.service";
import { Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const api = express.Router();

api.get(
  "/routine/:routineId/muscleGroup/:muscleGroupId/target/:targetId",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { routineId, muscleGroupId, targetId } = req.params;
      const target: IMuscle = await TargetService.getTarget(routineId, muscleGroupId, targetId, req.userId);
      return res.status(HttpStatus.OK).json(target);
    } catch (err) {
      return next(err);
    }
  }
);

export default api;