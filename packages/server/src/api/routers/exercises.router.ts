import { IExerciseDao } from "balanced-gym-model";
import ExercisesService from "../services/exercises.service";
import { Request, Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";

const api = express.Router();

api.get("/exercises", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: Record<string, string> = {};
    if (req.query.routineId) query.routineId = req.query.routineId as string;
    if (req.query.muscleGroup) query.muscleGroup = req.query.muscleGroup as string;
    if (req.query.target) query.target = req.query.target as string;
    const exercises: IExerciseDao[] = await ExercisesService.getExercises(query);
    return res.status(HttpStatus.OK).json(exercises);
  } catch (err) {
    return next(err);
  }
});

export default api;
