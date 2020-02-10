import { ISerieUpdate, ISerieDao, ISerie, IExerciseDao, IExercise } from "balanced-gym-model";
import L from "../../common/logger";
import { SerieDocumentModel } from "../mongoose/serie.mongoose";
import { ExerciseDocumentModel, IExerciseDocument } from "../mongoose/exercise.mongoose";

export class SerieService {
  async updateSerie(
    serieId: string,
    serieUpdate: ISerieUpdate
  ): Promise<ISerie> {
    L.info(`updating serie id ${serieId}`);
    const serieDao: ISerieDao = await SerieDocumentModel.findOneAndUpdate(
      { _id: serieId },
      serieUpdate,
      { new: true }
    )
      .lean()
      .exec();
    const serie: ISerie = {
      _id: serieDao._id,
      reps: serieDao.reps,
      weight: serieDao.weight,
      createdAt: serieDao.createdAt,
      restTime: serieDao.restTime
    };
    return serie;
  }
  async newSerie(
    exerciseId: string,
    suggestedSerie: ISerieUpdate = { reps: 10, weight: 1 }
  ): Promise<ISerie> {
    L.info(`creating serie for exercise id ${exerciseId}`);
    const serieDao: ISerieDao = await new SerieDocumentModel(
      suggestedSerie
    ).save();
    const exerciseDao: IExerciseDocument = await ExerciseDocumentModel.findById(exerciseId).exec();
    exerciseDao.series.push(serieDao);
    // exerciseDao.lastUpdated = serieDao.createdAt;
    await exerciseDao.save();
    const serie: ISerie = {
      _id: serieDao._id,
      reps: serieDao.reps,
      weight: serieDao.weight,
      createdAt: serieDao.createdAt,
      restTime: serieDao.restTime
    };
    return serie;
  }
  async deleteSerie(
    serieId: string
  ): Promise<ISerie> {
    L.info(`deeleting serie id ${serieId}`);
    const serieDao: ISerieDao = await SerieDocumentModel.findOneAndRemove({
      _id: serieId
    })
      .lean()
      .exec();
    const serie: ISerie = {
      _id: serieDao._id,
      reps: serieDao.reps,
      weight: serieDao.weight,
      createdAt: serieDao.createdAt,
      restTime: serieDao.restTime
    };
    return serie;
  }
}

export default new SerieService();
