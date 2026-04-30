import { IMuscleDao } from "balanced-gym-model";
import MuscleService, { IMuscleCreate } from "../services/muscle.service";
import { Request, Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";
import { adminMiddleware, AuthenticatedRequest } from "../middleware/auth.middleware";

const api = express.Router();

api.get("/muscles", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const muscles: IMuscleDao[] = await MuscleService.getAllMuscles();
    return res.status(HttpStatus.OK).json(muscles);
  } catch (err) {
    return next(err);
  }
});

api.post("/newMuscle", adminMiddleware, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const data: IMuscleCreate = req.body;
    const muscle = await MuscleService.createMuscle(data);
    return res.status(HttpStatus.CREATED).json(muscle);
  } catch (err) {
    return next(err);
  }
});

api.patch("/muscle/:muscleId", adminMiddleware, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { muscleId } = req.params;
    const data: Partial<IMuscleCreate> = req.body;
    const muscle = await MuscleService.updateMuscle(muscleId, data);
    return res.status(HttpStatus.OK).json(muscle);
  } catch (err) {
    return next(err);
  }
});

export default api;
