import {
  IRoutineSummary,
  IRoutineDao,
  IExerciseDao,
  getRoutinesSummary
} from "balanced-gym-model";
import L from "../../common/logger";
import { RoutineDocumentModel } from '../mongoose/routine.mongoose';
import { ExerciseDocumentModel } from '../mongoose/exercise.mongoose';

export class RoutinesService {
  async getRoutinesSummary(userId?: string): Promise<IRoutineSummary[]> {
    L.info("fetch all routines");
    const serieFilter = userId ? { userId } : {};
    const routinesDao: IRoutineDao[] = await RoutineDocumentModel.find()
      .lean()
      .exec();
    const getExercises = async (routineId: string) => {
      const exerciseDAO: IExerciseDao[] = await ExerciseDocumentModel.find({ routineId })
        .populate({ path: "series", match: serieFilter })
        .lean()
        .exec();
      return exerciseDAO;
    };
    return getRoutinesSummary(routinesDao, getExercises);
  }

  // async byId(id: string): Promise<IRoutineModel> {
  //   L.info(`fetch example with id ${id}`);

  //   if (!mongooseTypes.ObjectId.isValid(id)) throw new errors.HttpError(HttpStatus.BAD_REQUEST);

  //   const doc = await Example
  //     .findOne({ _id: id })
  //     .lean()
  //     .exec() as IExampleModel;

  //   if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);

  //   return doc;
  // }
}

export default new RoutinesService();
