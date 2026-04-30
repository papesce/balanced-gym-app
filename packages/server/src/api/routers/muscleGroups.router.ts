import { IMuscleGroupDao } from "balanced-gym-model";
import MuscleGroupsService from "../services/muscleGroups.service";
import { Request, Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";

const api = express.Router();

api.get("/muscleGroups", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const muscleGroups: IMuscleGroupDao[] = await MuscleGroupsService.getAllMuscleGroups();
    return res.status(HttpStatus.OK).json(muscleGroups);
  } catch (err) {
    return next(err);
  }
});

export default api;
