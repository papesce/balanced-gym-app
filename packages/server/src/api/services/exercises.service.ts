import {
  IExerciseDao,
} from "balanced-gym-model";
import L from "../../common/logger";
import { ExerciseDocumentModel } from "../mongoose/exercise.mongoose";

export class ExercisesService {
  async getExercises(query: Record<string, string>): Promise<IExerciseDao[]> {
    L.info(`fetch exercises with query ${JSON.stringify(query)}`);
    const exercises: IExerciseDao[] = await ExerciseDocumentModel.find(query)
      .populate("routineId", "name")
      .populate("muscleGroup", "name")
      .populate("series", "createdAt reps weight restTime")
      .populate("target", "name muscleURL")
      .populate("synergists", "name")
      .populate("stabilizers", "name")
      .sort({ muscleGroup: 1, target: 1 })
      .lean()
      .exec();
    return exercises;
  }
}

export default new ExercisesService();
