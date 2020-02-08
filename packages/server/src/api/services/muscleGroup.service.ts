import {
  IMuscleGroup,
  getMuscleGroupForRoutine,
  IExerciseDao,
  IRoutineDao,
  IMuscleGroupDao
} from "balanced-gym-model";
import L from "../../common/logger";
import { RoutineDocumentModel } from "../mongoose/routine.mongoose";
import { ExerciseDocumentModel } from "../mongoose/exercise.mongoose";
import { MuscleGroupDocumentModel } from "../mongoose/muscleGroup.mongoose";

export class MuscleGroupService {
  async getMuscleGroupById(
    routineId: string,
    muscleGroupId: string
  ): Promise<IMuscleGroup> {
    L.info(
      `fetch muscleGroup with routineId ${routineId} muscleGroupId: ${muscleGroupId}`
    );
    const muscleGroupDao: IMuscleGroupDao = await MuscleGroupDocumentModel.findOne(
      { _id: muscleGroupId }
    )
      .select("name")
      .lean()
      .exec();
    const routineDao: IRoutineDao = await RoutineDocumentModel.findOne({
      _id: routineId
    })
      .select("name")
      .lean()
      .exec();
    const exercisesDao: IExerciseDao[] = await ExerciseDocumentModel.find({
      routineId,
      muscleGroup: muscleGroupId
    })
      .select("name target synergists stabilizers")
      .populate("series")
      .populate("target", "name muscleURL")
      .lean()
      .exec();
    const muscleGroup: IMuscleGroup = getMuscleGroupForRoutine(
      routineDao,
      muscleGroupDao,
      exercisesDao
    );
    return Promise.resolve(muscleGroup);
  }
}

export default new MuscleGroupService();
