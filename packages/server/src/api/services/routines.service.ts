import {
  IRoutineSummary,
  IRoutineDAO,
  IExerciseDAO,
  Exercise,
  getRoutinesSummary
} from "balanced-gym-model";
import L from "../../common/logger";
import { RoutineDocumentModel } from '../mongoose/routines.mongoose';

export class RoutinesService {
  async getRoutinesSummary(): Promise<IRoutineSummary[]> {
    L.info("fetch all routines");

    const routinesDAO: IRoutineDAO[] = await RoutineDocumentModel.find()
      .lean()
      .exec();
    const getExercises = async (routineId: string) => {
      const exerciseDAO: IExerciseDAO[] = await Exercise.find({ routineId })
        .populate("series")
        .lean()
        .exec();
      return exerciseDAO;
    };
    return getRoutinesSummary(routinesDAO, getExercises);
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
