import {
    IRoutine,
    // IRoutineDao,
    // IExerciseDao,
    getRoutineAndMuscles,
    IRoutineDao
  } from "balanced-gym-model";
  import L from "../../common/logger";
import { RoutineDocumentModel } from "../mongoose/routine.mongoose";
import { ExerciseDocumentModel } from "../mongoose/exercise.mongoose";
  // import { RoutineDocumentModel } from '../mongoose/routine.mongoose';
  // import { ExerciseDocumentModel } from '../mongoose/exercise.mongoose';
  
  export class RoutineService {
    async getRoutineById(routineId: string): Promise<IRoutine> {
      L.info(`fetch routine with id ${routineId}`);
  
      // if (!mongooseTypes.ObjectId.isValid(routineId)) throw new errors.HttpError(HttpStatus.BAD_REQUEST);
      const routineDao: IRoutineDao = await RoutineDocumentModel
        .findOne({ _id: routineId })
        .select('name').lean().exec();
       const exercisesDao = await ExerciseDocumentModel
        .find({ routineId }).select('name')
        .populate("muscleGroup", 'name')
        .populate("series")
        .populate("target", 'name')
        .populate("synergists")
        .populate("stabilizers").lean().exec();
    //   if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);
  
       const routine: IRoutine = getRoutineAndMuscles(routineDao, exercisesDao);
       return Promise.resolve(routine);
    }
  }
  
  export default new RoutineService();