import { ISerie, IExercise, ISerieUpdate } from "balanced-gym-model";
import SerieService from "../services/serie.service";
import ExerciseService from "../services/exercise.service";
import { Response, NextFunction } from "express";
import * as HttpStatus from "http-status-codes";
import express from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const api = express.Router();

api.patch(
  "/updateSerie/:serieId/exercise/:exerciseId",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { serieId, exerciseId } = req.params;
      const serieUpdate: ISerieUpdate = req.body;
      const updatedSerie: ISerie = await SerieService.updateSerie(serieId, serieUpdate);
      const exercise: IExercise = await ExerciseService.getExerciseById(
        exerciseId, req.userId
      );
      return res.status(HttpStatus.OK).json({ exercise, serie: updatedSerie });
    } catch (err) {
      return next(err);
    }
  }
);

api.delete(
  "/deleteSerie/:serieId/exercise/:exerciseId",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { serieId, exerciseId } = req.params;
      const updatedSerie: ISerie = await SerieService.deleteSerie(serieId);
      const exercise: IExercise = await ExerciseService.getExerciseById(
        exerciseId, req.userId
      );
      return res.status(HttpStatus.OK).json({ exercise, serie: updatedSerie });
    } catch (err) {
      return next(err);
    }
  }
);

api.post(
  "/newSerie/:exerciseId",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { exerciseId } = req.params;
      const serieUpdate: ISerieUpdate = req.body;
      const newSerie: ISerie = await SerieService.newSerie(exerciseId, serieUpdate, req.userId);
      const exercise: IExercise = await ExerciseService.getExerciseById(
        exerciseId, req.userId
      );
      return res.status(HttpStatus.OK).json({ exercise, serie: newSerie });
    } catch (err) {
      return next(err);
    }
  }
);

export default api;
