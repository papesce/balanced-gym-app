import {
  getExercise,
  IExercise,
  IExerciseDao,
  ISerieDao
} from "balanced-gym-model";
import L from "../../common/logger";
import { ExerciseDocumentModel } from "../mongoose/exercise.mongoose";
import { SerieDocumentModel } from "../mongoose/serie.mongoose";

export class ExerciseService {
  async getExerciseById(exerciseId: string): Promise<IExercise> {
    L.info(`fetch exercise with id ${exerciseId}`);

    // if (!mongooseTypes.ObjectId.isValid(routineId)) throw new errors.HttpError(HttpStatus.BAD_REQUEST);
    let lastCreationDate: string | undefined = undefined;
    const seriesDao: ISerieDao[] = await SerieDocumentModel.find()
      .sort({
        createdAt: -1
      })
      .limit(1)
      .lean()
      .exec();
    if (seriesDao.length === 1) {
      lastCreationDate = seriesDao[0].createdAt;
    }
    const exerciseDao: IExerciseDao = await ExerciseDocumentModel.findOne({
      _id: exerciseId
    })
      .select("name equipment gifURL")
      .populate("routineId", "name")
      .populate("muscleGroup", "name")
      .populate("target", "name muscleURL")
      .populate("synergists", "name muscleURL")
      .populate("stabilizers", "name muscleURL")
      // .populate("series", 'createdAt reps weight')
      .populate({
        path: "series",
        select: "createdAt reps weight restTime",
        options: { limit: 100, sort: { createdAt: -1 } }
      })
      .lean()
      .exec();
    const exercisesDao: IExerciseDao[] = await ExerciseDocumentModel.find({
      routineId: exerciseDao.routineId,
      muscleGroup: exerciseDao.muscleGroup,
      target: exerciseDao.target
    })
      .select("name equipment")
      .populate("series", "createdAt reps weight restTime")
      .populate("synergists", "name")
      .populate("stabilizers", "name")
      .lean()
      .exec();
    //   if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);
    // L.info(exercisesDao)
    const exercise: IExercise = getExercise(
      exerciseDao,
      exercisesDao,
      lastCreationDate
    );
    return Promise.resolve(exercise);
  }
}

export default new ExerciseService();
