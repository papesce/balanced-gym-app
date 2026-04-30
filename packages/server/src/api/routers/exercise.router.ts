import { IExercise } from "balanced-gym-model";
import ExerciseService, { IExerciseCreate } from "../services/exercise.service";
import { Request, Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";
import { adminMiddleware, AuthenticatedRequest } from "../middleware/auth.middleware";

const api = express.Router();

api.get("/exercise/:exerciseId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { exerciseId } = req.params;
    const exercise: IExercise = await ExerciseService.getExerciseById(exerciseId);
    return res.status(HttpStatus.OK).json(exercise);
  } catch (err) {
    return next(err);
  }
});

api.post("/newExercise/:routineId", adminMiddleware, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { routineId } = req.params;
    const data: IExerciseCreate = req.body;
    const exercise = await ExerciseService.createExercise(routineId, data);
    return res.status(HttpStatus.CREATED).json(exercise);
  } catch (err) {
    return next(err);
  }
});

api.patch("/exercise/:exerciseId", adminMiddleware, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { exerciseId } = req.params;
    const data: Partial<IExerciseCreate> = req.body;
    const exercise = await ExerciseService.updateExercise(exerciseId, data);
    return res.status(HttpStatus.OK).json(exercise);
  } catch (err) {
    return next(err);
  }
});

api.delete("/exercise/:exerciseId", adminMiddleware, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { exerciseId } = req.params;
    await ExerciseService.deleteExercise(exerciseId);
    return res.status(HttpStatus.NO_CONTENT).send();
  } catch (err) {
    return next(err);
  }
});

export default api;