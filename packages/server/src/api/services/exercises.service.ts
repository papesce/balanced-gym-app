import {
  IExerciseDao,
} from "balanced-gym-model";
import L from "../../common/logger";
import { ExerciseDocumentModel } from "../mongoose/exercise.mongoose";

export class ExercisesService {
  async getExercises(query: Record<string, string>, userId?: string): Promise<IExerciseDao[]> {
    L.info(`fetch exercises with query ${JSON.stringify(query)}`);
    const serieFilter = userId ? { userId } : {};
    const exercises: IExerciseDao[] = await ExerciseDocumentModel.find(query)
      .populate("routineId", "name")
      .populate("muscleGroup", "name")
      .populate({ path: "series", select: "createdAt reps weight restTime", match: serieFilter })
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
