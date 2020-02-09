import {
  IMuscle,
  IExerciseDao,
  IRoutineDao,
  IMuscleGroupDao,
  getTarget,
  IMuscleDao
} from "balanced-gym-model";
import L from "../../common/logger";
import {  getRoutineDao } from "../mongoose/routine.mongoose";
import { ExerciseDocumentModel } from "../mongoose/exercise.mongoose";
import {  getMuscleGroupDao } from "../mongoose/muscleGroup.mongoose";
import {  getTargetDao } from "../mongoose/muscle.mongoose";

export class TargetService {
  async getTarget(
    routineId: string,
    muscleGroupId: string,
    targetId: string
  ): Promise<IMuscle> {
    L.info(`fetch target with routineId targetId`);
    const targetDao: IMuscleDao = await getTargetDao(targetId);
    const muscleGroupDao: IMuscleGroupDao = await getMuscleGroupDao(muscleGroupId);
    const routineDao: IRoutineDao = await getRoutineDao(routineId);
    const exercisesDao: IExerciseDao[] = await ExerciseDocumentModel.find({
      routineId,
      muscleGroup: muscleGroupId,
      target: targetId
    })
      .select("name target gifURL synergists stabilizers series")
      .populate("series")
      .lean()
      .exec();
    const target: IMuscle = getTarget(
      routineDao,
      muscleGroupDao,
      targetDao,
      exercisesDao
    );
    return Promise.resolve(target);
  }
}

export default new TargetService();
