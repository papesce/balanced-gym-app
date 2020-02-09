import { IRoutine, IExercise } from "balanced-gym-model";
import ExerciseService from "../services/exercise.service";
import { Request, Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";

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

export default api;