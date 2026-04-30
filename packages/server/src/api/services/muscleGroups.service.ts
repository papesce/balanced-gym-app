import { IMuscleGroupDao } from "balanced-gym-model";
import L from "../../common/logger";
import { MuscleGroupDocumentModel } from "../mongoose/muscleGroup.mongoose";

export class MuscleGroupsService {
  async getAllMuscleGroups(): Promise<IMuscleGroupDao[]> {
    L.info("fetch all muscle groups");
    const muscleGroups: IMuscleGroupDao[] = await MuscleGroupDocumentModel.find()
      .select("name order")
      .sort("order")
      .lean()
      .exec();
    return muscleGroups;
  }
}

export default new MuscleGroupsService();
