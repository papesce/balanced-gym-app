import {
  IRoutineSummary,
  IRoutineDAO, 
  Routine,
  IExerciseDAO,
  Exercise,
  getRoutinesSummary
} from "balanced-gym-model";
// import { Types as mongooseTypes } from 'mongoose';
import L from "../../common/logger";
// import * as HttpStatus from 'http-status-codes';
// import * as errors from "../../common/errors";

export class RoutinesService {
  async all(): Promise<IRoutineSummary[]> {
    L.info("fetch all routines");

    const routinesDAO: IRoutineDAO[] = await Routine.find()
      .lean()
      .exec();
    const getExercises = async (routineId: string) => {
      const exerciseDAO: IExerciseDAO[] =
        await Exercise.find({ routineId })
          .populate("series")
          .lean()
          .exec();
        return exerciseDAO;
    }
    const result: IRoutineSummary[] = await getRoutinesSummary(
      routinesDAO,
      getExercises
    );
    return result;
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
