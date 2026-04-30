import {
  getExercise,
  IExercise,
  IExerciseDao,
  ISerieDao
} from "balanced-gym-model";
import L from "../../common/logger";
import { ExerciseDocumentModel } from "../mongoose/exercise.mongoose";
import { SerieDocumentModel } from "../mongoose/serie.mongoose";

export interface IExerciseCreate {
  name: string;
  muscleGroup?: string;
  target?: string;
  gifURL: string;
  exerciseURL?: string;
  equipment?: string;
  synergists?: string[];
  stabilizers?: string[];
  routineId?: string;
  links?: string[];
}

export class ExerciseService {
  async getExerciseById(exerciseId: string): Promise<IExercise> {
    L.info(`fetch exercise with id ${exerciseId}`);

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
    const exercise: IExercise = getExercise(
      exerciseDao,
      exercisesDao,
      lastCreationDate
    );
    return Promise.resolve(exercise);
  }

  async createExercise(routineId: string, data: IExerciseCreate): Promise<IExerciseDao> {
    L.info(`creating exercise in routine ${routineId}`);
    const exercise = await new ExerciseDocumentModel({
      name: data.name,
      series: [],
      muscleGroup: data.muscleGroup,
      target: data.target,
      gifURL: data.gifURL,
      exerciseURL: data.exerciseURL,
      equipment: data.equipment,
      synergists: data.synergists || [],
      stabilizers: data.stabilizers || [],
      routineId,
      links: data.links || []
    }).save();
    return exercise.toObject();
  }

  async updateExercise(exerciseId: string, data: Partial<IExerciseCreate>): Promise<IExerciseDao> {
    L.info(`updating exercise ${exerciseId}`);
    const exercise: IExerciseDao = await ExerciseDocumentModel.findOneAndUpdate(
      { _id: exerciseId },
      data,
      { new: true }
    )
      .lean()
      .exec();
    return exercise;
  }

  async deleteExercise(exerciseId: string): Promise<void> {
    L.info(`deleting exercise ${exerciseId}`);
    const exercise = await ExerciseDocumentModel.findById(exerciseId).lean().exec();
    if (exercise?.series?.length) {
      await SerieDocumentModel.deleteMany({ _id: { $in: exercise.series } }).exec();
    }
    await ExerciseDocumentModel.findByIdAndDelete(exerciseId).exec();
  }
}

export default new ExerciseService();
